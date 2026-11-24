import { c as getContactSubmissions, m as markMessageRead } from '../../chunks/content-store_C8ssfVzj.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async ({ cookies }) => {
  if (cookies.get("uant_admin_session")?.value !== "authenticated") {
    return new Response(JSON.stringify({ ok: false, error: "No autorizado." }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  const messages = await getContactSubmissions();
  return new Response(JSON.stringify({ ok: true, messages }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
const PATCH = async ({ request, cookies }) => {
  if (cookies.get("uant_admin_session")?.value !== "authenticated") {
    return new Response(JSON.stringify({ ok: false, error: "No autorizado." }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  const body = await request.json();
  if (body.id) {
    await markMessageRead(String(body.id));
  }
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  PATCH
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
