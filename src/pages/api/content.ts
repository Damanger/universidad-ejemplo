import type { APIRoute } from 'astro';
import { getSiteContent, saveSiteContent } from '../../lib/content-store';
import type { SiteContent } from '../../types/content';

export const GET: APIRoute = async () => {
  const content = await getSiteContent();
  return new Response(JSON.stringify(content), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const PUT: APIRoute = async ({ request, cookies }) => {
  if (cookies.get('uant_admin_session')?.value !== 'authenticated') {
    return new Response(
      JSON.stringify({ ok: false, error: 'No autorizado. Inicia sesión en el panel.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const updated = (await request.json()) as SiteContent;
    if (!updated.brand?.name || !updated.program?.name) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Faltan campos institucionales obligatorios.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    await saveSiteContent(updated);
    return new Response(JSON.stringify({ ok: true, content: updated }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error al guardar los cambios.';
    return new Response(
      JSON.stringify({ ok: false, error: msg }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
