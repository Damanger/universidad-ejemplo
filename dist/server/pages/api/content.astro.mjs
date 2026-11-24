import { g as getSiteContent, s as saveSiteContent } from '../../chunks/content-store_C8ssfVzj.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  const content = await getSiteContent();
  return new Response(JSON.stringify(content), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
const PUT = async ({ request, cookies }) => {
  if (cookies.get("uant_admin_session")?.value !== "authenticated") {
    return new Response(
      JSON.stringify({ ok: false, error: "No autorizado. Inicia sesión en el panel." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    const updated = await request.json();
    if (!updated.brand?.name || !updated.program?.name) {
      return new Response(
        JSON.stringify({ ok: false, error: "Faltan campos institucionales obligatorios." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    await saveSiteContent(updated);
    return new Response(JSON.stringify({ ok: true, content: updated }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: "Error al guardar los cambios." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
