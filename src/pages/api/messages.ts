import type { APIRoute } from 'astro';
import { getContactSubmissions, markMessageRead } from '../../lib/content-store';

export const GET: APIRoute = async ({ cookies }) => {
  if (cookies.get('uant_admin_session')?.value !== 'authenticated') {
    return new Response(JSON.stringify({ ok: false, error: 'No autorizado.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const messages = await getContactSubmissions();
  return new Response(JSON.stringify({ ok: true, messages }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const PATCH: APIRoute = async ({ request, cookies }) => {
  if (cookies.get('uant_admin_session')?.value !== 'authenticated') {
    return new Response(JSON.stringify({ ok: false, error: 'No autorizado.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const body = await request.json();
  if (body.id) {
    await markMessageRead(String(body.id));
  }
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
