import type { APIRoute } from 'astro';
import fs from 'node:fs/promises';
import path from 'node:path';
import { put } from '@vercel/blob';
import { getStorageMode } from '../../lib/content-store';

const ALLOWED_IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg']);
const ALLOWED_DOC_EXT = new Set(['.pdf']);

const MIME_BY_EXT: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

export const POST: APIRoute = async ({ request, cookies }) => {
  if (cookies.get('uant_admin_session')?.value !== 'authenticated') {
    return new Response(
      JSON.stringify({ ok: false, error: 'No autorizado.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const kind = String(formData.get('kind') || 'image');

    if (!(file instanceof File)) {
      return new Response(
        JSON.stringify({ ok: false, error: 'No se recibió ningún archivo.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const ext = path.extname(file.name).toLowerCase();
    const isPdf = kind === 'pdf';
    if (isPdf && !ALLOWED_DOC_EXT.has(ext)) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Solo se permiten archivos PDF (.pdf).' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    if (!isPdf && !ALLOWED_IMAGE_EXT.has(ext)) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Formato de imagen no válido (JPG, PNG, WEBP o SVG).' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const baseName = path
      .basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9-_]+/g, '-')
      .slice(0, 48);
    const filename = `${baseName || 'archivo'}-${Date.now()}${ext}`;
    const subFolder = isPdf ? 'docs' : 'uploads';

    const buffer = Buffer.from(await file.arrayBuffer());
    const sizeKB = Math.max(1, Math.round(buffer.length / 1024));
    const sizeLabel = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;

    const mode = getStorageMode();

    if (mode === 'vercel-blob') {
      const blob = await put(`${subFolder}/${filename}`, buffer, {
        access: 'public',
        contentType: MIME_BY_EXT[ext] || 'application/octet-stream',
      });
      return new Response(
        JSON.stringify({
          ok: true,
          url: blob.url,
          sizeLabel,
          originalName: file.name,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (mode === 'vercel-readonly') {
      return new Response(
        JSON.stringify({
          ok: false,
          error:
            'Para subir imágenes o archivos PDF en Vercel, conecta Vercel Blob (Vercel Dashboard → Storage → Create Blob Store).',
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Local filesystem persistence
    const destDir = path.resolve(process.cwd(), 'public', subFolder);
    await fs.mkdir(destDir, { recursive: true });
    await fs.writeFile(path.join(destDir, filename), buffer);

    return new Response(
      JSON.stringify({
        ok: true,
        url: `/${subFolder}/${filename}`,
        sizeLabel,
        originalName: file.name,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: 'Error al subir el archivo.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
