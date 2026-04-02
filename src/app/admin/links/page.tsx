'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { LinkItem, LinkStyle } from '@/types/links';

const EMOJI_OPTIONS = ['🔗', '📞', '🌐', '📸', '💼', '🎙️', '📝', '🎓', '📧', '🛒', '🎯', '💡', '📱', '🎨', '🤖', '📊', '🏠', '▶️', '📄', '📦', '💬', '🐦'];

const STYLE_OPTIONS: { value: LinkStyle; label: string }[] = [
  { value: 'cta-red', label: 'CTA (Red)' },
  { value: 'cta-dark', label: 'CTA (Dark)' },
  { value: 'card', label: 'Card' },
  { value: 'community', label: 'Community (Dashed)' },
  { value: 'social', label: 'Social Icon' },
];

const STYLE_COLORS: Record<LinkStyle, string> = {
  'cta-red': 'border-l-accent',
  'cta-dark': 'border-l-white',
  'card': 'border-l-blue-400',
  'community': 'border-l-green-400',
  'social': 'border-l-g400',
};

export default function AdminLinks() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newLink, setNewLink] = useState({ title: '', subtitle: '', url: '', icon: '🔗', style: 'card' as LinkStyle });
  const [editLink, setEditLink] = useState({ title: '', subtitle: '', url: '', icon: '🔗', style: 'card' as LinkStyle });
  const router = useRouter();

  const fetchLinks = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/links');
      if (res.status === 401) {
        router.push('/admin');
        return;
      }
      const data = await res.json();
      setLinks(data.links?.sort((a: LinkItem, b: LinkItem) => a.order - b.order) || []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newLink.title || !newLink.url) return;
    setSaving(true);

    await fetch('/api/admin/links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLink),
    });

    setNewLink({ title: '', subtitle: '', url: '', icon: '🔗', style: 'card' });
    setShowAddForm(false);
    setSaving(false);
    fetchLinks();
  }

  async function handleUpdate(id: string) {
    setSaving(true);
    await fetch('/api/admin/links', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...editLink }),
    });
    setEditingId(null);
    setSaving(false);
    fetchLinks();
  }

  async function handleToggle(link: LinkItem) {
    await fetch('/api/admin/links', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: link.id, active: !link.active }),
    });
    fetchLinks();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this link?')) return;
    await fetch('/api/admin/links', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchLinks();
  }

  async function handleMove(index: number, direction: 'up' | 'down') {
    const newLinks = [...links];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= newLinks.length) return;

    [newLinks[index], newLinks[swapIndex]] = [newLinks[swapIndex], newLinks[index]];

    setLinks(newLinks);
    await fetch('/api/admin/links', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reorder: newLinks.map((l) => l.id) }),
    });
  }

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin');
  }

  function startEditing(link: LinkItem) {
    setEditingId(link.id);
    setEditLink({ title: link.title, subtitle: link.subtitle || '', url: link.url, icon: link.icon || '🔗', style: link.style || 'card' });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-g400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-carbon/95 backdrop-blur-sm border-b border-g700">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-heading font-bold text-white">
            Link Manager
          </h1>
          <div className="flex items-center gap-3">
            <a
              href="/links"
              target="_blank"
              className="text-sm text-g400 hover:text-white transition-colors"
            >
              Preview
            </a>
            <button
              onClick={handleLogout}
              className="text-sm text-g400 hover:text-accent transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-6">
        {/* Add button */}
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full py-3 border-2 border-dashed border-g600 rounded-xl text-g400 hover:text-white hover:border-accent transition-colors mb-6 font-heading font-semibold"
          >
            + Add Link
          </button>
        )}

        {/* Add form */}
        {showAddForm && (
          <form
            onSubmit={handleAdd}
            className="bg-g700 rounded-xl p-4 mb-6 space-y-3 border border-g600"
          >
            <div className="flex gap-2">
              <select
                value={newLink.icon}
                onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
                className="appearance-none bg-g600 border border-g500 rounded-lg px-3 py-2.5 text-xl cursor-pointer focus:outline-none focus:border-accent w-14 text-center"
              >
                {EMOJI_OPTIONS.map((emoji) => (
                  <option key={emoji} value={emoji}>{emoji}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Link title"
                value={newLink.title}
                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                autoFocus
                className="flex-1 px-3 py-2.5 bg-g600 border border-g500 rounded-lg text-white placeholder:text-g400 focus:outline-none focus:border-accent text-sm"
              />
            </div>
            <input
              type="text"
              placeholder="Subtitle (optional)"
              value={newLink.subtitle}
              onChange={(e) => setNewLink({ ...newLink, subtitle: e.target.value })}
              className="w-full px-3 py-2.5 bg-g600 border border-g500 rounded-lg text-white placeholder:text-g400 focus:outline-none focus:border-accent text-sm"
            />
            <input
              type="url"
              placeholder="https://..."
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              className="w-full px-3 py-2.5 bg-g600 border border-g500 rounded-lg text-white placeholder:text-g400 focus:outline-none focus:border-accent text-sm"
            />
            <select
              value={newLink.style}
              onChange={(e) => setNewLink({ ...newLink, style: e.target.value as LinkStyle })}
              className="w-full px-3 py-2.5 bg-g600 border border-g500 rounded-lg text-white focus:outline-none focus:border-accent text-sm"
            >
              {STYLE_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving || !newLink.title || !newLink.url}
                className="flex-1 py-2.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors disabled:opacity-50 text-sm"
              >
                {saving ? 'Adding...' : 'Add Link'}
              </button>
              <button
                type="button"
                onClick={() => { setShowAddForm(false); setNewLink({ title: '', subtitle: '', url: '', icon: '🔗', style: 'card' }); }}
                className="px-4 py-2.5 bg-g600 text-g300 rounded-lg hover:text-white transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Links list */}
        <div className="space-y-2">
          {links.map((link, index) => (
            <div
              key={link.id}
              className={`bg-g700 rounded-xl border-l-4 border border-g600 transition-colors ${STYLE_COLORS[link.style] || 'border-l-g400'} ${
                !link.active ? 'opacity-50' : ''
              }`}
            >
              {editingId === link.id ? (
                <div className="p-4 space-y-3">
                  <div className="flex gap-2">
                    <select
                      value={editLink.icon}
                      onChange={(e) => setEditLink({ ...editLink, icon: e.target.value })}
                      className="appearance-none bg-g600 border border-g500 rounded-lg px-3 py-2.5 text-xl cursor-pointer focus:outline-none focus:border-accent w-14 text-center"
                    >
                      {EMOJI_OPTIONS.map((emoji) => (
                        <option key={emoji} value={emoji}>{emoji}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={editLink.title}
                      onChange={(e) => setEditLink({ ...editLink, title: e.target.value })}
                      className="flex-1 px-3 py-2.5 bg-g600 border border-g500 rounded-lg text-white focus:outline-none focus:border-accent text-sm"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Subtitle (optional)"
                    value={editLink.subtitle}
                    onChange={(e) => setEditLink({ ...editLink, subtitle: e.target.value })}
                    className="w-full px-3 py-2.5 bg-g600 border border-g500 rounded-lg text-white placeholder:text-g400 focus:outline-none focus:border-accent text-sm"
                  />
                  <input
                    type="url"
                    value={editLink.url}
                    onChange={(e) => setEditLink({ ...editLink, url: e.target.value })}
                    className="w-full px-3 py-2.5 bg-g600 border border-g500 rounded-lg text-white focus:outline-none focus:border-accent text-sm"
                  />
                  <select
                    value={editLink.style}
                    onChange={(e) => setEditLink({ ...editLink, style: e.target.value as LinkStyle })}
                    className="w-full px-3 py-2.5 bg-g600 border border-g500 rounded-lg text-white focus:outline-none focus:border-accent text-sm"
                  >
                    {STYLE_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(link.id)}
                      disabled={saving}
                      className="flex-1 py-2 bg-accent text-white font-semibold rounded-lg text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="px-4 py-2 bg-g600 text-g300 rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-3 flex items-center gap-3">
                  {/* Reorder */}
                  <div className="flex flex-col gap-0.5">
                    <button
                      onClick={() => handleMove(index, 'up')}
                      disabled={index === 0}
                      className="text-g400 hover:text-white disabled:opacity-20 transition-colors p-0.5"
                      aria-label="Move up"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                    </button>
                    <button
                      onClick={() => handleMove(index, 'down')}
                      disabled={index === links.length - 1}
                      className="text-g400 hover:text-white disabled:opacity-20 transition-colors p-0.5"
                      aria-label="Move down"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                  </div>

                  <span className="text-xl">{link.icon || '🔗'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">
                      {link.title}
                    </div>
                    <div className="text-g400 text-xs truncate">
                      {link.subtitle || link.url}
                    </div>
                  </div>

                  <span className="text-[10px] text-g500 bg-g600 px-1.5 py-0.5 rounded font-mono flex-shrink-0">
                    {link.style}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggle(link)}
                      className={`w-9 h-5 rounded-full transition-colors relative ${
                        link.active ? 'bg-success' : 'bg-g600'
                      }`}
                      aria-label={link.active ? 'Disable' : 'Enable'}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                          link.active ? 'left-[18px]' : 'left-0.5'
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => startEditing(link)}
                      className="p-1.5 text-g400 hover:text-white transition-colors"
                      aria-label="Edit"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                    </button>
                    <button
                      onClick={() => handleDelete(link.id)}
                      className="p-1.5 text-g400 hover:text-accent transition-colors"
                      aria-label="Delete"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {links.length === 0 && !showAddForm && (
          <div className="text-center py-12 text-g400">
            <p className="text-lg mb-2">No links yet</p>
            <p className="text-sm">Add your first link to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
