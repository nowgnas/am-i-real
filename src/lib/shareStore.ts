const TTL_MS = 3 * 60 * 60 * 1000; // 3 hours

interface ShareEntry {
  resultKey: string;
  createdAt: number;
}

// globalThis trick: persists the Map across Next.js hot reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var __shareStore: Map<string, ShareEntry> | undefined;
}

const store: Map<string, ShareEntry> =
  globalThis.__shareStore ??
  (globalThis.__shareStore = new Map<string, ShareEntry>());

function cleanup() {
  const now = Date.now();
  Array.from(store.entries()).forEach(([id, entry]) => {
    if (now - entry.createdAt > TTL_MS) store.delete(id);
  });
}

function generateId(): string {
  const a = Math.random().toString(36).substring(2, 8).toUpperCase();
  const b = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${a}${b}`;
}

export function createShare(resultKey: string): string {
  cleanup();
  const id = generateId();
  store.set(id, { resultKey, createdAt: Date.now() });
  return id;
}

export function getShare(id: string): ShareEntry | null {
  const entry = store.get(id);
  if (!entry) return null;
  if (Date.now() - entry.createdAt > TTL_MS) {
    store.delete(id);
    return null;
  }
  return entry;
}

export function getRemainingMs(id: string): number {
  const entry = store.get(id);
  if (!entry) return 0;
  return Math.max(0, TTL_MS - (Date.now() - entry.createdAt));
}
