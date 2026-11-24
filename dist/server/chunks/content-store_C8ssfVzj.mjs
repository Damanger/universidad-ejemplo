import fs from 'node:fs/promises';
import path from 'node:path';

const DATA_DIR = path.resolve(process.cwd(), "src/data");
const CONTENT_FILE = path.join(DATA_DIR, "site-content.json");
const MESSAGES_FILE = path.join(DATA_DIR, "contact-messages.json");
async function getSiteContent() {
  const raw = await fs.readFile(CONTENT_FILE, "utf-8");
  return JSON.parse(raw);
}
async function saveSiteContent(content) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), "utf-8");
}
async function getContactSubmissions() {
  try {
    const raw = await fs.readFile(MESSAGES_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
async function addContactSubmission(submission) {
  const existing = await getContactSubmissions();
  const entry = {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    read: false,
    ...submission
  };
  existing.unshift(entry);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(existing, null, 2), "utf-8");
  return entry;
}
async function markMessageRead(id) {
  const existing = await getContactSubmissions();
  const updated = existing.map((m) => m.id === id ? { ...m, read: true } : m);
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(updated, null, 2), "utf-8");
}
function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "admin2026";
}

export { getAdminPassword as a, addContactSubmission as b, getContactSubmissions as c, getSiteContent as g, markMessageRead as m, saveSiteContent as s };
