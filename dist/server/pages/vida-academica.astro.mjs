import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_BYrrl7zG.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Toh0JOX8.mjs';
import { $ as $$PageBanner } from '../chunks/PageBanner_x-h4jp7h.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Calendar, Eye, Download, ExternalLink, X } from 'lucide-react';
import { g as getSiteContent } from '../chunks/content-store_C8ssfVzj.mjs';
export { renderers } from '../renderers.mjs';

const CATEGORIES = ["Todos", "Reglamento", "Calendario", "Plan de Estudios", "Complementario"];
function PdfDocumentsHub({ documents }) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [previewDoc, setPreviewDoc] = useState(null);
  const filtered = selectedCategory === "Todos" ? documents : documents.filter((d) => d.category === selectedCategory);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white border border-[#0C1E35]/10 shadow-sm w-fit", children: CATEGORIES.map((cat) => {
      const isActive = selectedCategory === cat;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setSelectedCategory(cat),
          className: `relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${isActive ? "text-white" : "text-[#52647B] hover:text-[#0C1E35]"}`,
          children: [
            isActive && /* @__PURE__ */ jsx(
              motion.span,
              {
                layoutId: "pdf-cat-pill",
                transition: { type: "spring", stiffness: 400, damping: 32 },
                className: "absolute inset-0 rounded-xl bg-[#0C1E35]"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "relative z-10", children: cat })
          ]
        },
        cat
      );
    }) }),
    /* @__PURE__ */ jsx(motion.div, { layout: true, className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "popLayout", children: filtered.map((doc) => /* @__PURE__ */ jsxs(
      motion.article,
      {
        layout: true,
        initial: { opacity: 0, scale: 0.96, y: 14 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.96 },
        transition: { duration: 0.3 },
        whileHover: { y: -5 },
        className: "group relative rounded-3xl bg-white p-6 sm:p-7 border border-[#0C1E35]/10 hover:border-[#C69D48]/60 shadow-sm hover:shadow-[0_22px_50px_-22px_rgba(12,30,53,0.2)] transition-all flex flex-col justify-between gap-6",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-[#0C1E35] text-[#E6C77B] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform", children: /* @__PURE__ */ jsx(FileText, { className: "w-6 h-6" }) }),
              /* @__PURE__ */ jsx("span", { className: "px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#C69D48]/15 text-[#8A6620]", children: doc.category })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl font-bold text-[#0C1E35] leading-snug mb-2", children: doc.title }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-[#52647B] leading-relaxed", children: doc.description })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-[#52647B] pt-4 border-t border-[#0C1E35]/8", children: [
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5 text-[#C69D48]" }),
                "Actualizado: ",
                doc.updatedAt
              ] }),
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#0C1E35]", children: doc.fileSize })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setPreviewDoc(doc),
                  className: "flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#0C1E35] text-white hover:bg-[#17355A] transition-colors cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4 text-[#E6C77B]" }),
                    /* @__PURE__ */ jsx("span", { children: "Visualizar PDF" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "a",
                {
                  href: doc.fileUrl,
                  download: true,
                  className: "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border border-[#0C1E35]/15 text-[#0C1E35] hover:border-[#C69D48] hover:bg-[#FAF8F4] transition-colors",
                  children: [
                    /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 text-[#C69D48]" }),
                    /* @__PURE__ */ jsx("span", { children: "Descargar" })
                  ]
                }
              )
            ] })
          ] })
        ]
      },
      doc.id
    )) }) }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: previewDoc && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: () => setPreviewDoc(null),
        className: "fixed inset-0 z-50 bg-[#071323]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6",
        children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.94, y: 20 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.94, y: 20 },
            transition: { type: "spring", stiffness: 320, damping: 28 },
            onClick: (e) => e.stopPropagation(),
            className: "w-full max-w-5xl h-[86vh] rounded-3xl bg-white shadow-2xl border border-[#C69D48]/40 overflow-hidden flex flex-col",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "px-5 sm:px-6 py-4 bg-[#0C1E35] text-white flex items-center justify-between gap-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxs("p", { className: "text-[10px] uppercase tracking-[0.2em] text-[#E6C77B] font-semibold", children: [
                    "Visor de Documentos Oficiales · ",
                    previewDoc.category
                  ] }),
                  /* @__PURE__ */ jsx("h4", { className: "font-display text-xl font-bold truncate", children: previewDoc.title })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: previewDoc.fileUrl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 transition-colors",
                      children: [
                        /* @__PURE__ */ jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                        /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Nueva pestaña" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: previewDoc.fileUrl,
                      download: true,
                      className: "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#C69D48] text-[#071323] hover:brightness-105 transition-all",
                      children: [
                        /* @__PURE__ */ jsx(Download, { className: "w-3.5 h-3.5" }),
                        /* @__PURE__ */ jsx("span", { children: "Descargar" })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setPreviewDoc(null),
                      "aria-label": "Cerrar visor",
                      className: "w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer",
                      children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex-1 bg-[#E8E4DB]", children: /* @__PURE__ */ jsx(
                "iframe",
                {
                  src: `${previewDoc.fileUrl}#view=FitH`,
                  title: previewDoc.title,
                  className: "w-full h-full border-0"
                }
              ) })
            ]
          }
        )
      }
    ) })
  ] });
}

const $$VidaAcademica = createComponent(async ($$result, $$props, $$slots) => {
  const content = await getSiteContent();
  const { academicLife } = content;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "content": content, "title": "Vida Acad\xE9mica", "description": `Consulta y descarga el reglamento institucional, calendario escolar, plan de estudios en PDF y cartelera de eventos acad\xE9micos de ${content.brand.name}.` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PageBanner", $$PageBanner, { "eyebrow": "Comunidad Universitaria", "title": "Vida Acad\xE9mica", "subtitle": academicLife.introDescription, "breadcrumb": "Vida Acad\xE9mica" })}  ${maybeRenderHead()}<section id="documentos" class="py-16 sm:py-24"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10"> <div class="max-w-3xl space-y-3" data-reveal> <p class="text-xs font-semibold uppercase tracking-[0.22em]" style="color: var(--brand-accent);">
Repositorio Oficial en PDF
</p> <h2 class="font-display text-3xl sm:text-5xl font-bold text-[#0C1E35]"> ${academicLife.introTitle} </h2> <p class="text-sm sm:text-base text-[#52647B]">
Visualiza cualquier documento directamente en pantalla o descárgalo en formato PDF para consultarlo sin conexión.
</p> </div> ${renderComponent($$result2, "PdfDocumentsHub", PdfDocumentsHub, { "client:visible": true, "documents": academicLife.documents, "client:component-hydration": "visible", "client:component-path": "C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/components/interactive/PdfDocumentsHub", "client:component-export": "default" })} </div> </section>  <section id="eventos" class="py-16 sm:py-24 bg-white border-t border-[#0C1E35]/8"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"> <div class="flex flex-col md:flex-row md:items-end justify-between gap-6" data-reveal> <div class="space-y-2 max-w-2xl"> <p class="text-xs font-semibold uppercase tracking-[0.22em]" style="color: var(--brand-accent);">
Agenda Institucional
</p> <h2 class="font-display text-3xl sm:text-5xl font-bold text-[#0C1E35]">
Cartelera de Eventos Académicos
</h2> </div> <a href="/contacto" class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#0C1E35] hover:text-[#C69D48] transition-colors"> <span>Confirmar asistencia a un evento →</span> </a> </div> <div class="space-y-5"> ${academicLife.events.map((ev, idx) => renderTemplate`<article data-spotlight data-reveal${addAttribute(String(idx * 80), "data-delay")} class="spotlight-card rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8"> <!-- Architectural Calendar Badge --> <div class="w-20 h-22 rounded-2xl bg-[#0C1E35] text-white flex flex-col items-center justify-center shrink-0 border border-[#C69D48]/40 shadow-md"> <span class="text-[11px] uppercase tracking-[0.2em] text-[#E6C77B] font-bold"> ${ev.monthLabel} </span> <span class="font-display text-4xl font-bold leading-none mt-1"> ${ev.dayLabel} </span> </div> <!-- Event Info --> <div class="flex-1 space-y-2"> <div class="flex flex-wrap items-center gap-2.5 text-xs"> <span class="px-3 py-1 rounded-full font-bold uppercase tracking-wider bg-[#C69D48]/18 text-[#8A6620]"> ${ev.category} </span> <span class="text-[#52647B] font-medium">🕒 ${ev.time}</span> <span class="text-[#52647B] font-medium">📍 ${ev.location}</span> </div> <h3 class="font-display text-2xl sm:text-3xl font-bold text-[#0C1E35] leading-snug"> ${ev.title} </h3> <p class="text-sm text-[#52647B] leading-relaxed">${ev.description}</p> <p class="text-xs font-semibold text-[#0C1E35] pt-1">
Imparte / Coordina: <span class="font-normal text-[#52647B]">${ev.speaker}</span> </p> </div> <!-- Action --> <div class="shrink-0"> <a href="/contacto" data-magnetic="0.12" class="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs uppercase tracking-[0.14em] btn-primary"> <span>Registrarse</span> </a> </div> </article>`)} </div> </div> </section> ` })}`;
}, "C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/vida-academica.astro", void 0);

const $$file = "C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/vida-academica.astro";
const $$url = "/vida-academica";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$VidaAcademica,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
