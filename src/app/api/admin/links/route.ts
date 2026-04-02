import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';
import { getLinks, saveLinks, generateId, reorderLinks } from '@/lib/links-store';
import type { LinkItem } from '@/types/links';

async function requireAuth() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

// GET - fetch all links (public for the linktree page, returns only active for non-admin)
export async function GET(request: NextRequest) {
  const isAdmin = await isAuthenticated();
  const data = await getLinks();

  if (!isAdmin) {
    // Public: only return active links, sorted by order
    return NextResponse.json({
      links: data.links
        .filter((l) => l.active)
        .sort((a, b) => a.order - b.order),
    });
  }

  return NextResponse.json(data);
}

// POST - add a new link
export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { title, subtitle, url, icon, style } = await request.json();

  if (!title || !url) {
    return NextResponse.json(
      { error: 'Title and URL are required' },
      { status: 400 }
    );
  }

  const data = await getLinks();
  const newLink: LinkItem = {
    id: generateId(),
    title,
    subtitle: subtitle || undefined,
    url,
    icon: icon || '🔗',
    style: style || 'card',
    active: true,
    order: data.links.length,
  };

  data.links.push(newLink);
  data.updatedAt = new Date().toISOString();
  await saveLinks(data);

  return NextResponse.json({ success: true, link: newLink });
}

// PUT - bulk save all links (replaces entire list)
export async function PUT(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const body = await request.json();

  if (!body.links || !Array.isArray(body.links)) {
    return NextResponse.json({ error: 'links array required' }, { status: 400 });
  }

  const linksData = {
    links: (body.links as LinkItem[]).map((link, index) => ({
      ...link,
      order: index,
    })),
    updatedAt: new Date().toISOString(),
  };

  await saveLinks(linksData);
  return NextResponse.json({ success: true });
}

// DELETE - remove a link
export async function DELETE(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await request.json();
  const data = await getLinks();

  data.links = data.links.filter((l) => l.id !== id);
  data.links = reorderLinks(data.links);
  data.updatedAt = new Date().toISOString();
  await saveLinks(data);

  return NextResponse.json({ success: true });
}
