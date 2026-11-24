import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BYrrl7zG.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Toh0JOX8.mjs';
import { $ as $$PageBanner } from '../chunks/PageBanner_x-h4jp7h.mjs';
import { g as getSiteContent } from '../chunks/content-store_C8ssfVzj.mjs';
export { renderers } from '../renderers.mjs';

const $$AvisoDePrivacidad = createComponent(async ($$result, $$props, $$slots) => {
  const content = await getSiteContent();
  const { privacy } = content;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "content": content, "title": "Aviso de Privacidad", "description": `Aviso de privacidad integral de ${content.brand.name}.` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PageBanner", $$PageBanner, { "eyebrow": "Marco Legal y Transparencia", "title": "Aviso de Privacidad", "subtitle": `\xDAltima actualizaci\xF3n: ${privacy.lastUpdated} \xB7 Responsable: ${privacy.responsibleEntity}`, "breadcrumb": "Aviso de Privacidad" })} ${maybeRenderHead()}<section class="py-16 sm:py-24"> <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="rounded-3xl bg-white border border-[#0C1E35]/10 shadow-sm p-8 sm:p-12 space-y-8" data-reveal> <p class="text-base text-[#132238] leading-relaxed font-medium border-l-4 border-[#C69D48] pl-5"> ${privacy.summary} </p> <div class="space-y-7 pt-2"> ${privacy.clauses.map((clause) => renderTemplate`<article class="space-y-2"> <h2 class="font-display text-2xl font-bold text-[#0C1E35]">${clause.title}</h2> <p class="text-sm sm:text-[15px] text-[#52647B] leading-relaxed">${clause.content}</p> </article>`)} </div> <div class="pt-6 border-t border-[#0C1E35]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#52647B]"> <span>Responsable: ${privacy.responsibleEntity}</span> <a href="/contacto" class="font-semibold text-[#0C1E35] hover:text-[#C69D48] transition-colors">
Contactar para ejercer Derechos ARCO →
</a> </div> </div> </div> </section> ` })}`;
}, "C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/aviso-de-privacidad.astro", void 0);

const $$file = "C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/aviso-de-privacidad.astro";
const $$url = "/aviso-de-privacidad";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$AvisoDePrivacidad,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
