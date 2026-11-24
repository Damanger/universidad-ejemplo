import { a as getAdminPassword } from '../../chunks/content-store_C8ssfVzj.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const password = String(body.password || "");
    if (password !== getAdminPassword()) {
      return new Response(
        JSON.stringify({ ok: false, error: "Contraseña incorrecta." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    cookies.set("uant_admin_session", "authenticated", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 12
    });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: "Solicitud inválida." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
};
const DELETE = async ({ cookies }) => {
  cookies.delete("uant_admin_session", { path: "/" });
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
