import fs from 'node:fs/promises';
import path from 'node:path';
import type { SiteContent, ContactSubmission } from '../types/content';

const DATA_DIR = path.resolve(process.cwd(), 'src/data');
const CONTENT_FILE = path.join(DATA_DIR, 'site-content.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'contact-messages.json');

export async function getSiteContent(): Promise<SiteContent> {
  const raw = await fs.readFile(CONTENT_FILE, 'utf-8');
  return JSON.parse(raw) as SiteContent;
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const raw = await fs.readFile(MESSAGES_FILE, 'utf-8');
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
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(existing, null, 2), 'utf-8');
  return entry;
}

export async function markMessageRead(id: string): Promise<void> {
  const existing = await getContactSubmissions();
  const updated = existing.map((m) => (m.id === id ? { ...m, read: true } : m));
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(updated, null, 2), 'utf-8');
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'admin2026';
}
