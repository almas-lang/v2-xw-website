export function getStorageItem(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setStorageItem(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // Silently fail if storage is full or unavailable
  }
}

export function getStorageJSON<T>(key: string): T | null {
  const raw = getStorageItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setStorageJSON(key: string, value: unknown): void {
  setStorageItem(key, JSON.stringify(value));
}
