import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const email = formData.get('email') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
    }

    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['pdf', 'docx'].includes(ext || '')) {
      return NextResponse.json({ error: 'Only PDF and DOCX files accepted' }, { status: 400 });
    }

    const blob = await put(
      `resumes/${email || 'unknown'}/${Date.now()}-${file.name}`,
      file,
      { access: 'public', contentType: file.type }
    );

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error) {
    console.error('Resume upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
