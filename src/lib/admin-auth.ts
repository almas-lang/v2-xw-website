import { cookies } from 'next/headers';

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('xw-admin')?.value;

  if (!token) return false;

  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const parts = decoded.split(':');
    const storedPassword = parts.slice(1).join(':');
    return storedPassword === process.env.ADMIN_PASSWORD;
  } catch {
    return false;
  }
}
