import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_BYrrl7zG.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Toh0JOX8.mjs';
import { $ as $$PageBanner } from '../chunks/PageBanner_x-h4jp7h.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Sparkles, GraduationCap, BookOpen } from 'lucide-react';
import { g as getSiteContent } from '../chunks/content-store_C8ssfVzj.mjs';
export { renderers } from '../renderers.mjs';

function CurriculumExplorer({ curriculum, pdfUrl = "/docs/plan-de-estudios-lige.pdf" }) {
  const [activeSemester, setActiveSemester] = useState(curriculum[0]?.semester ?? 1);
  const current = curriculum.find((s) => s.semester === activeSemester) ?? curriculum[0];
  const totalCredits = current ? current.subjects.reduce((acc, sub) => acc + (Number(sub.credits) || 0), 0) : 0;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "inline-flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-white border border-[#0C1E35]/10 shadow-sm",
          role: "tablist",
          "aria-label": "Semestres del plan de estudios",
          children: curriculum.map((sem) => {
            const isSelected = sem.semester === activeSemester;
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": isSelected,
                onClick: () => setActiveSemester(sem.semester),
                className: `relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${isSelected ? "text-[#071323]" : "text-[#52647B] hover:text-[#0C1E35]"}`,
                children: [
                  isSelected && /* @__PURE__ */ jsx(
                    motion.span,
                    {
                      layoutId: "semester-active-pill",
                      transition: { type: "spring", stiffness: 380, damping: 32 },
                      className: "absolute inset-0 rounded-xl shadow-sm",
                      style: { background: "linear-gradient(135deg, #D5B263, #C69D48)" }
                    }
                  ),
                  /* @__PURE__ */ jsxs("span", { className: "relative z-10", children: [
                    sem.semester,
                    "° Semestre"
                  ] })
                ]
              },
              sem.semester
            );
          })
        }
      ),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: pdfUrl,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.14em] font-semibold bg-[#0C1E35] text-white hover:bg-[#152E4F] transition-all shadow-sm hover:-translate-y-0.5",
          children: [
            /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 text-[#C69D48]" }),
            /* @__PURE__ */ jsx("span", { children: "Descargar Plan PDF" })
          ]
        }
      )
    ] }),
    current && /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16, filter: "blur(4px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -12, filter: "blur(4px)" },
        transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
        className: "rounded-3xl bg-white border border-[#0C1E35]/10 shadow-[0_24px_60px_-30px_rgba(12,30,53,0.18)] overflow-hidden",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "px-6 sm:px-8 py-6 bg-[#0C1E35] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#E6C77B] font-semibold", children: [
                /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5" }),
                "Bloque Formativo · Semestre ",
                current.semester
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl sm:text-3xl font-bold", children: current.title })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/8 border border-white/15 shrink-0", children: [
              /* @__PURE__ */ jsx(GraduationCap, { className: "w-5 h-5 text-[#E6C77B]" }),
              /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-wider text-white/65", children: "Carga Curricular" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm font-bold text-white", children: [
                  current.subjects.length,
                  " Materias · ",
                  totalCredits,
                  " Créditos"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: current.subjects.map((sub, idx) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: idx * 0.05, duration: 0.35 },
              whileHover: { y: -4, transition: { duration: 0.2 } },
              className: "group p-5 rounded-2xl bg-[#FAF8F4] border border-[#0C1E35]/8 hover:border-[#C69D48]/55 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between gap-4",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
                  /* @__PURE__ */ jsx("span", { className: "px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wider uppercase bg-[#0C1E35]/8 text-[#0C1E35] group-hover:bg-[#0C1E35] group-hover:text-[#E6C77B] transition-colors", children: sub.code }),
                  /* @__PURE__ */ jsx(BookOpen, { className: "w-4 h-4 text-[#C69D48] opacity-75 group-hover:opacity-100 transition-opacity" })
                ] }),
                /* @__PURE__ */ jsx("h4", { className: "font-semibold text-[#0C1E35] text-[15px] leading-snug", children: sub.name }),
                /* @__PURE__ */ jsxs("div", { className: "pt-3 border-t border-[#0C1E35]/8 flex items-center justify-between text-xs text-[#52647B]", children: [
                  /* @__PURE__ */ jsx("span", { children: "Asignatura obligatoria" }),
                  /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#0C1E35]", children: [
                    sub.credits,
                    " créditos"
                  ] })
                ] })
              ]
            },
            sub.code + idx
          )) })
        ]
      },
      current.semester
    ) })
  ] });
}

const $$OfertaEducativa = createComponent(async ($$result, $$props, $$slots) => {
  const content = await getSiteContent();
  const { program } = content;
  const planDoc = content.academicLife.documents.find((d) => d.category === "Plan de Estudios");
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "content": content, "title": "Oferta Educativa", "description": `${program.name} en ${content.brand.name}. Conoce perfil de ingreso, egreso, plan de estudios y campo laboral.` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PageBanner", $$PageBanner, { "eyebrow": "Oferta Educativa", "title": program.name, "subtitle": program.generalDescription, "breadcrumb": "Oferta Educativa" })}  ${maybeRenderHead()}<section class="relative -mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div data-reveal="scale" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-7 rounded-3xl bg-white shadow-[0_24px_60px_-24px_rgba(12,30,53,0.16)] border border-[#0C1E35]/10"> <div class="p-4 rounded-2xl bg-[#FAF8F4] space-y-1"> <p class="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#C69D48]">Grado Académico</p> <p class="text-sm font-bold text-[#0C1E35] leading-snug">${program.academicDegree}</p> </div> <div class="p-4 rounded-2xl bg-[#FAF8F4] space-y-1"> <p class="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#C69D48]">Duración</p> <p class="text-sm font-bold text-[#0C1E35]">${program.duration}</p> </div> <div class="p-4 rounded-2xl bg-[#FAF8F4] space-y-1"> <p class="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#C69D48]">Modalidad</p> <p class="text-sm font-bold text-[#0C1E35]">${program.modality}</p> </div> <div class="p-4 rounded-2xl bg-[#FAF8F4] space-y-1"> <p class="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#C69D48]">Horario y Registro</p> <p class="text-sm font-bold text-[#0C1E35]">${program.schedule}</p> </div> </div> </section>  <section class="py-16 sm:py-24"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"> <div class="lg:col-span-6 space-y-6" data-reveal="left"> <p class="text-xs font-semibold uppercase tracking-[0.22em]" style="color: var(--brand-accent);">
Propósito Formativo
</p> <h2 class="font-display text-3xl sm:text-5xl font-bold text-[#0C1E35] leading-tight">
Objetivo del Programa Educativo
</h2> <p class="text-base sm:text-lg text-[#52647B] leading-relaxed"> ${program.objective} </p> <div class="p-4 rounded-2xl bg-white border border-[#C69D48]/35 text-xs text-[#52647B]"> <strong class="text-[#0C1E35]">Referencia académica:</strong> ${program.rvoe} </div> </div> <div class="lg:col-span-6" data-reveal="right"> <div class="img-zoom-frame rounded-3xl overflow-hidden shadow-2xl border border-[#0C1E35]/10 aspect-[4/3]"> <img${addAttribute(program.heroImage, "src")}${addAttribute(program.name, "alt")} class="w-full h-full object-cover"> </div> </div> </div> </div> </section>  <section class="py-16 sm:py-24 bg-white border-y border-[#0C1E35]/8"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"> <!-- Perfil de Ingreso --> <article data-spotlight data-reveal="left" class="spotlight-card rounded-3xl p-8 sm:p-10 space-y-6"> <div class="space-y-2"> <span class="inline-flex px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#0C1E35]/8 text-[#0C1E35]">
Aspirantes
</span> <h2 class="font-display text-3xl sm:text-4xl font-bold text-[#0C1E35]">Perfil de Ingreso</h2> </div> <ul class="space-y-4"> ${program.entryProfile.map((item, idx) => renderTemplate`<li class="flex items-start gap-3.5 text-sm sm:text-[15px] text-[#52647B] leading-relaxed"> <span class="mt-0.5 w-6 h-6 rounded-full bg-[#FAF8F4] border border-[#C69D48]/50 text-[#0C1E35] text-xs font-bold flex items-center justify-center shrink-0"> ${idx + 1} </span> <span>${item}</span> </li>`)} </ul> </article> <!-- Perfil de Egreso --> <article data-spotlight data-reveal="right" class="spotlight-card rounded-3xl p-8 sm:p-10 space-y-6 bg-[#0C1E35]! text-white border-[#C69D48]/30!"> <div class="space-y-2"> <span class="inline-flex px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#C69D48]/25 text-[#F5DFAA]">
Competencias Profesionales
</span> <h2 class="font-display text-3xl sm:text-4xl font-bold text-white">Perfil de Egreso</h2> </div> <ul class="space-y-4"> ${program.exitProfile.map((item) => renderTemplate`<li class="flex items-start gap-3.5 text-sm sm:text-[15px] text-white/82 leading-relaxed"> <span class="mt-1 w-5 h-5 rounded-full bg-[#C69D48] text-[#071323] text-xs font-bold flex items-center justify-center shrink-0">
✓
</span> <span>${item}</span> </li>`)} </ul> </article> </div> </div> </section>  <section id="plan-de-estudios" class="py-16 sm:py-24"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10"> <div class="max-w-2xl space-y-3" data-reveal> <p class="text-xs font-semibold uppercase tracking-[0.22em]" style="color: var(--brand-accent);">
Mapa Curricular Interactivo
</p> <h2 class="font-display text-3xl sm:text-5xl font-bold text-[#0C1E35]">
Plan de Estudios
</h2> <p class="text-sm sm:text-base text-[#52647B]">
Explora las asignaturas semestre por semestre y descarga la versión oficial en PDF.
</p> </div> ${renderComponent($$result2, "CurriculumExplorer", CurriculumExplorer, { "client:visible": true, "curriculum": program.curriculum, "pdfUrl": planDoc?.fileUrl || "/docs/plan-de-estudios-lige.pdf", "client:component-hydration": "visible", "client:component-path": "C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/components/interactive/CurriculumExplorer", "client:component-export": "default" })} </div> </section>  <section class="py-16 sm:py-24 bg-white border-t border-[#0C1E35]/8"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"> <div class="flex flex-col md:flex-row md:items-end justify-between gap-6" data-reveal> <div class="space-y-3 max-w-2xl"> <p class="text-xs font-semibold uppercase tracking-[0.22em]" style="color: var(--brand-accent);">
Proyección Profesional
</p> <h2 class="font-display text-3xl sm:text-5xl font-bold text-[#0C1E35]">
Campo Laboral
</h2> </div> <a href="/admisiones" data-magnetic="0.14" class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.14em] btn-gold w-fit"> <span>Iniciar Proceso de Admisión →</span> </a> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${program.careerField.map((field, idx) => renderTemplate`<article data-spotlight data-reveal${addAttribute(String(idx * 60), "data-delay")} class="spotlight-card rounded-3xl p-7 space-y-3"> <span class="inline-block w-8 h-1 rounded-full" style="background: var(--brand-accent);"></span> <h3 class="font-display text-2xl font-bold text-[#0C1E35]">${field.area}</h3> <p class="text-sm text-[#52647B] leading-relaxed">${field.description}</p> </article>`)} </div> </div> </section> ` })}`;
}, "C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/oferta-educativa.astro", void 0);

const $$file = "C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/oferta-educativa.astro";
const $$url = "/oferta-educativa";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$OfertaEducativa,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
