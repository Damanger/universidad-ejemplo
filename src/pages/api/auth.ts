import type { APIRoute } from 'astro';
import { getAdminPassword } from '../../lib/content-store';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const password = String(body.password || '');

    if (password !== getAdminPassword()) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Contraseña incorrecta.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    cookies.set('uant_admin_session', 'authenticated', {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 12,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: 'Solicitud inválida.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const DELETE: APIRoute = async ({ cookies }) => {
  cookies.delete('uant_admin_session', { path: '/' });
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
