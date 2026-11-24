import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_BYrrl7zG.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Toh0JOX8.mjs';
import { $ as $$PageBanner } from '../chunks/PageBanner_x-h4jp7h.mjs';
import { g as getSiteContent } from '../chunks/content-store_C8ssfVzj.mjs';
export { renderers } from '../renderers.mjs';

const $$Universidad = createComponent(async ($$result, $$props, $$slots) => {
  const content = await getSiteContent();
  const { university } = content;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "content": content, "title": "La Universidad", "description": `Conoce qui\xE9nes somos, la misi\xF3n, visi\xF3n, valores y objetivo institucional de ${content.brand.name}.` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PageBanner", $$PageBanner, { "eyebrow": "Identidad Institucional", "title": "La Universidad", "subtitle": `Conoce la filosof\xEDa educativa, los principios \xE9ticos y los espacios acad\xE9micos que dan vida a ${content.brand.name}.`, "breadcrumb": "La Universidad" })}  ${maybeRenderHead()}<section class="py-16 sm:py-24"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"> <div class="lg:col-span-6 space-y-6" data-reveal="left"> <p class="text-xs font-semibold uppercase tracking-[0.22em]" style="color: var(--brand-accent);">
¿Quiénes Somos?
</p> <h2 class="font-display text-3xl sm:text-5xl font-bold text-[#0C1E35] leading-[1.1]"> ${university.whoWeAreTitle} </h2> <div class="space-y-4 text-base text-[#52647B] leading-relaxed"> ${university.whoWeAreParagraphs.map((para) => renderTemplate`<p>${para}</p>`)} </div> </div> <div class="lg:col-span-6" data-reveal="right"> <div class="img-zoom-frame rounded-3xl overflow-hidden shadow-2xl border border-[#0C1E35]/10 aspect-[4/3]"> <img${addAttribute(university.gallery[0]?.url || "/images/hero-campus.jpg", "src")}${addAttribute(university.gallery[0]?.caption || content.brand.name, "alt")} class="w-full h-full object-cover"> </div> </div> </div> </div> </section>  <section class="py-16 sm:py-24 bg-white border-y border-[#0C1E35]/8"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"> <div class="text-center max-w-2xl mx-auto space-y-3" data-reveal> <p class="text-xs font-semibold uppercase tracking-[0.22em]" style="color: var(--brand-accent);">
Horizonte Educativo
</p> <h2 class="font-display text-3xl sm:text-5xl font-bold text-[#0C1E35]">
Misión, Visión y Objetivo Institucional
</h2> </div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"> <article data-spotlight data-reveal data-delay="0" class="spotlight-card rounded-3xl p-8 space-y-4"> <span class="inline-flex w-11 h-11 rounded-2xl bg-[#0C1E35] text-[#E6C77B] items-center justify-center font-display text-xl font-bold">
01
</span> <h3 class="font-display text-3xl font-bold text-[#0C1E35]">Misión</h3> <p class="text-sm sm:text-[15px] text-[#52647B] leading-relaxed"> ${university.mission} </p> </article> <article data-spotlight data-reveal data-delay="90" class="spotlight-card rounded-3xl p-8 space-y-4"> <span class="inline-flex w-11 h-11 rounded-2xl bg-[#C69D48] text-[#071323] items-center justify-center font-display text-xl font-bold">
02
</span> <h3 class="font-display text-3xl font-bold text-[#0C1E35]">Visión</h3> <p class="text-sm sm:text-[15px] text-[#52647B] leading-relaxed"> ${university.vision} </p> </article> <article data-spotlight data-reveal data-delay="180" class="spotlight-card rounded-3xl p-8 space-y-4"> <span class="inline-flex w-11 h-11 rounded-2xl bg-[#0C1E35] text-[#E6C77B] items-center justify-center font-display text-xl font-bold">
03
</span> <h3 class="font-display text-3xl font-bold text-[#0C1E35]">Objetivo Institucional</h3> <p class="text-sm sm:text-[15px] text-[#52647B] leading-relaxed"> ${university.institutionalObjective} </p> </article> </div> </div> </section>  <section class="py-16 sm:py-24"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"> <div class="max-w-2xl space-y-3" data-reveal> <p class="text-xs font-semibold uppercase tracking-[0.22em]" style="color: var(--brand-accent);">
Principios que nos guían
</p> <h2 class="font-display text-3xl sm:text-5xl font-bold text-[#0C1E35]">
Nuestros Valores
</h2> </div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> ${university.values.map((val, idx) => renderTemplate`<article data-spotlight data-reveal${addAttribute(String(idx * 65), "data-delay")} class="spotlight-card rounded-3xl p-7 space-y-3.5"> <div class="w-10 h-10 rounded-xl bg-[#C69D48]/15 text-[#8A6620] flex items-center justify-center font-bold text-sm">
0${idx + 1} </div> <h3 class="font-display text-2xl font-bold text-[#0C1E35]">${val.title}</h3> <p class="text-sm text-[#52647B] leading-relaxed">${val.description}</p> </article>`)} </div> </div> </section>  <section class="py-16 sm:py-24 bg-[#0C1E35] text-white"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10"> <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4" data-reveal> <div class="space-y-2"> <p class="text-xs font-semibold uppercase tracking-[0.22em] text-[#E6C77B]">
Espacios Universitarios
</p> <h2 class="font-display text-3xl sm:text-5xl font-bold">
Imágenes Representativas de la Institución
</h2> </div> <a href="/contacto" class="text-xs font-semibold uppercase tracking-[0.16em] text-[#E6C77B] hover:text-white transition-colors">
Agenda una visita presencial →
</a> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> ${university.gallery.map((item, idx) => renderTemplate`<figure data-reveal="scale"${addAttribute(String(idx * 90), "data-delay")} class="group rounded-3xl overflow-hidden bg-white/5 border border-white/10"> <div class="img-zoom-frame aspect-[4/3]"> <img${addAttribute(item.url, "src")}${addAttribute(item.caption, "alt")} class="w-full h-full object-cover"> </div> <figcaption class="p-5 space-y-1"> <span class="text-[11px] uppercase tracking-[0.18em] text-[#E6C77B] font-semibold"> ${item.category} </span> <p class="text-sm text-white/85 leading-snug">${item.caption}</p> </figcaption> </figure>`)} </div> </div> </section> ` })}`;
}, "C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/universidad.astro", void 0);

const $$file = "C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/universidad.astro";
const $$url = "/universidad";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Universidad,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
