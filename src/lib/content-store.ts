import fs from 'node:fs/promises';
import path from 'node:path';
import { list, put } from '@vercel/blob';
import defaultContentJson from '../data/site-content.json';
import type { SiteContent, ContactSubmission } from '../types/content';

const DATA_DIR = path.resolve(process.cwd(), 'src/data');
const CONTENT_FILE = path.join(DATA_DIR, 'site-content.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'contact-messages.json');
const TMP_MESSAGES_FILE = '/tmp/uant-contact-messages.json';

const BLOB_CONTENT_PATH = 'cms/site-content.json';
const BLOB_MESSAGES_PATH = 'cms/contact-messages.json';

export type StorageMode = 'vercel-blob' | 'local' | 'vercel-readonly';

export function getStorageMode(): StorageMode {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return 'vercel-blob';
  }
  if (process.env.VERCEL === '1') {
    return 'vercel-readonly';
  }
  return 'local';
}

async function readBlobJson<T>(pathname: string): Promise<T | null> {
  try {
    const { blobs } = await list({ prefix: pathname, limit: 5 });
    const match = blobs.find((b) => b.pathname === pathname) ?? blobs[0];
    if (!match?.url) return null;

    const res = await fetch(`${match.url}?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function writeBlobJson(pathname: string, data: unknown): Promise<void> {
  await put(pathname, JSON.stringify(data, null, 2), {
    access: 'public',
    allowOverwrite: true,
    addRandomSuffix: false,
    contentType: 'application/json',
  });
}

export async function getSiteContent(): Promise<SiteContent> {
  const mode = getStorageMode();

  if (mode === 'vercel-blob') {
    const remote = await readBlobJson<SiteContent>(BLOB_CONTENT_PATH);
    if (remote?.brand?.name) return remote;
    return defaultContentJson as SiteContent;
  }

  if (mode === 'local') {
    try {
      const raw = await fs.readFile(CONTENT_FILE, 'utf-8');
      return JSON.parse(raw) as SiteContent;
    } catch {
      return defaultContentJson as SiteContent;
    }
  }

  return defaultContentJson as SiteContent;
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  const mode = getStorageMode();

  if (mode === 'vercel-blob') {
    await writeBlobJson(BLOB_CONTENT_PATH, content);
    return;
  }

  if (mode === 'vercel-readonly') {
    throw new Error(
      'Para guardar cambios desde /admin en Vercel, conecta Vercel Blob (Vercel Dashboard → Storage → Create Blob Store) y vuelve a desplegar.'
    );
  }

  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const mode = getStorageMode();

  if (mode === 'vercel-blob') {
    const remote = await readBlobJson<ContactSubmission[]>(BLOB_MESSAGES_PATH);
    return Array.isArray(remote) ? remote : [];
  }

  const targetFile = mode === 'vercel-readonly' ? TMP_MESSAGES_FILE : MESSAGES_FILE;
  try {
    const raw = await fs.readFile(targetFile, 'utf-8');
    return JSON.parse(raw) as ContactSubmission[];
  } catch {
    return [];
  }
}

export async function addContactSubmission(
  submission: Omit<ContactSubmission, 'id' | 'createdAt' | 'read'>
): Promise<ContactSubmission> {
  const existing = await getContactSubmissions();
  const entry: ContactSubmission = {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    read: false,
    ...submission,
  };
  existing.unshift(entry);

  const mode = getStorageMode();
  if (mode === 'vercel-blob') {
    await writeBlobJson(BLOB_MESSAGES_PATH, existing);
    return entry;
  }

  if (mode === 'vercel-readonly') {
    try {
      await fs.writeFile(TMP_MESSAGES_FILE, JSON.stringify(existing, null, 2), 'utf-8');
    } catch {
      // Ephemeral fallback on serverless without Blob
    }
    return entry;
  }

  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(existing, null, 2), 'utf-8');
  return entry;
}

export async function markMessageRead(id: string): Promise<void> {
  const existing = await getContactSubmissions();
  const updated = existing.map((m) => (m.id === id ? { ...m, read: true } : m));
  const mode = getStorageMode();

  if (mode === 'vercel-blob') {
    await writeBlobJson(BLOB_MESSAGES_PATH, updated);
    return;
  }

  const targetFile = mode === 'vercel-readonly' ? TMP_MESSAGES_FILE : MESSAGES_FILE;
  try {
    await fs.writeFile(targetFile, JSON.stringify(updated, null, 2), 'utf-8');
  } catch {
    // Ignore read-only write errors
  }
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'admin2026';
}
