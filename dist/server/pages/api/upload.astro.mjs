import fs from 'node:fs/promises';
import path from 'node:path';
export { renderers } from '../../renderers.mjs';

const ALLOWED_IMAGE_EXT = /* @__PURE__ */ new Set([".jpg", ".jpeg", ".png", ".webp", ".svg"]);
const ALLOWED_DOC_EXT = /* @__PURE__ */ new Set([".pdf"]);
const POST = async ({ request, cookies }) => {
  if (cookies.get("uant_admin_session")?.value !== "authenticated") {
    return new Response(
      JSON.stringify({ ok: false, error: "No autorizado." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const kind = String(formData.get("kind") || "image");
    if (!(file instanceof File)) {
      return new Response(
        JSON.stringify({ ok: false, error: "No se recibió ningún archivo." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const ext = path.extname(file.name).toLowerCase();
    const isPdf = kind === "pdf";
    if (isPdf && !ALLOWED_DOC_EXT.has(ext)) {
      return new Response(
        JSON.stringify({ ok: false, error: "Solo se permiten archivos PDF (.pdf)." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!isPdf && !ALLOWED_IMAGE_EXT.has(ext)) {
      return new Response(
        JSON.stringify({ ok: false, error: "Formato de imagen no válido (JPG, PNG, WEBP o SVG)." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const baseName = path.basename(file.name, ext).toLowerCase().replace(/[^a-z0-9-_]+/g, "-").slice(0, 48);
    const filename = `${baseName || "archivo"}-${Date.now()}${ext}`;
    const subFolder = isPdf ? "docs" : "uploads";
    const destDir = path.resolve(process.cwd(), "public", subFolder);
    await fs.mkdir(destDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(destDir, filename), buffer);
    const distClientDir = path.resolve(process.cwd(), "dist", "client", subFolder);
    try {
      await fs.access(path.resolve(process.cwd(), "dist", "client"));
      await fs.mkdir(distClientDir, { recursive: true });
      await fs.writeFile(path.join(distClientDir, filename), buffer);
    } catch {
    }
    const sizeKB = Math.max(1, Math.round(buffer.length / 1024));
    const sizeLabel = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;
    return new Response(
      JSON.stringify({
        ok: true,
        url: `/${subFolder}/${filename}`,
        sizeLabel,
        originalName: file.name
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: "Error al subir el archivo." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
