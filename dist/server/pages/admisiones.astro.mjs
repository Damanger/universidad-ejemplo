import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_BYrrl7zG.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Toh0JOX8.mjs';
import { $ as $$PageBanner } from '../chunks/PageBanner_x-h4jp7h.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ClipboardCheck, CheckCircle2 } from 'lucide-react';
import { g as getSiteContent } from '../chunks/content-store_C8ssfVzj.mjs';
export { renderers } from '../renderers.mjs';

function AdmissionsStepper({ steps, documents }) {
  const [activeStep, setActiveStep] = useState(0);
  const [checkedDocs, setCheckedDocs] = useState({});
  const toggleDoc = (idx) => {
    setCheckedDocs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };
  const completedCount = Object.values(checkedDocs).filter(Boolean).length;
  const docProgress = documents.length > 0 ? Math.round(completedCount / documents.length * 100) : 0;
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-10 items-start", children: [
    /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7 space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 mb-6", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-[#C69D48]", children: "Paso a Paso" }),
        /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-[#0C1E35]", children: "Proceso de Inscripción" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-[#52647B]", children: "Haz clic en cada etapa para consultar cómo avanzar de forma sencilla en tu ingreso." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative space-y-4", children: steps.map((item, index) => {
        const isActive = activeStep === index;
        const isPast = index < activeStep;
        return /* @__PURE__ */ jsx(
          motion.button,
          {
            type: "button",
            onClick: () => setActiveStep(index),
            whileHover: { x: 4 },
            className: `w-full text-left p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer ${isActive ? "bg-[#0C1E35] text-white border-[#C69D48] shadow-[0_20px_45px_-20px_rgba(12,30,53,0.45)]" : "bg-white text-[#0C1E35] border-[#0C1E35]/10 hover:border-[#C69D48]/50"}`,
            children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${isActive ? "bg-[#C69D48] text-[#071323]" : isPast ? "bg-emerald-100 text-emerald-700" : "bg-[#FAF8F4] text-[#0C1E35] border border-[#0C1E35]/10"}`,
                  children: isPast ? /* @__PURE__ */ jsx(Check, { className: "w-5 h-5" }) : item.step
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-1.5", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ jsx("h3", { className: "font-display text-xl sm:text-2xl font-bold leading-tight", children: item.title }),
                  /* @__PURE__ */ jsx(
                    ArrowRight,
                    {
                      className: `w-4 h-4 shrink-0 transition-transform ${isActive ? "text-[#E6C77B] translate-x-1" : "text-[#52647B]/40"}`
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    className: `text-sm leading-relaxed ${isActive ? "text-white/80" : "text-[#52647B]"}`,
                    children: item.description
                  }
                )
              ] })
            ] })
          },
          item.step
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 rounded-3xl bg-white border border-[#0C1E35]/10 shadow-sm p-6 sm:p-7 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C69D48]", children: [
            /* @__PURE__ */ jsx(ClipboardCheck, { className: "w-3.5 h-3.5" }),
            "Lista Interactiva"
          ] }),
          /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl sm:text-3xl font-bold text-[#0C1E35]", children: "Documentación Necesaria" })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "px-3 py-1 rounded-full text-xs font-bold bg-[#FAF8F4] text-[#0C1E35] border border-[#0C1E35]/10", children: [
          completedCount,
          "/",
          documents.length
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs text-[#52647B]", children: [
          /* @__PURE__ */ jsx("span", { children: "Marca los documentos que ya tienes listos" }),
          /* @__PURE__ */ jsxs("span", { className: "font-semibold text-[#0C1E35]", children: [
            docProgress,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-2 rounded-full bg-[#FAF8F4] overflow-hidden border border-[#0C1E35]/8", children: /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "h-full rounded-full",
            style: { background: "linear-gradient(90deg, #0C1E35, #C69D48)" },
            initial: { width: 0 },
            animate: { width: `${docProgress}%` },
            transition: { type: "spring", stiffness: 220, damping: 28 }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: documents.map((doc, idx) => {
        const checked = Boolean(checkedDocs[idx]);
        return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => toggleDoc(idx),
            className: `w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${checked ? "bg-emerald-50/70 border-emerald-300/70" : "bg-[#FAF8F4]/70 border-[#0C1E35]/8 hover:border-[#C69D48]/50"}`,
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${checked ? "bg-emerald-600 text-white" : "bg-white border border-[#0C1E35]/25"}`,
                  children: checked && /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    className: `text-sm font-semibold transition-colors ${checked ? "text-emerald-900 line-through opacity-80" : "text-[#0C1E35]"}`,
                    children: doc.name
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-[#52647B] leading-relaxed", children: doc.detail })
              ] })
            ]
          }
        ) }, idx);
      }) }),
      docProgress === 100 && /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          className: "p-4 rounded-2xl bg-emerald-600 text-white flex items-center gap-3 text-sm",
          children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: "¡Excelente! Ya tienes tu expediente completo para iniciar tu inscripción." })
          ]
        }
      )
    ] })
  ] });
}

const $$Admisiones = createComponent(async ($$result, $$props, $$slots) => {
  const content = await getSiteContent();
  const { admissions } = content;
  const waUrl = `https://wa.me/${content.contact.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(content.contact.whatsappMessage)}`;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "content": content, "title": "Admisiones", "description": `Convocatoria vigente, requisitos de ingreso, documentaci\xF3n, fechas importantes y proceso de inscripci\xF3n en ${content.brand.name}.` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PageBanner", $$PageBanner, { "eyebrow": "Ingreso Universitario", "title": "Admisiones", "subtitle": "Toda la informaci\xF3n clara y transparente para integrarte a nuestra comunidad universitaria.", "breadcrumb": "Admisiones" })}  ${maybeRenderHead()}<section class="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div data-reveal="scale" class="rounded-3xl bg-white shadow-[0_24px_60px_-24px_rgba(12,30,53,0.18)] border border-[#C69D48]/40 p-7 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8"> <div class="space-y-3 max-w-3xl"> <div class="flex flex-wrap items-center gap-3"> <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800"> <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> ${admissions.announcementStatus} </span> <span class="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#FAF8F4] text-[#0C1E35] border border-[#0C1E35]/10"> ${admissions.announcementPeriod} </span> </div> <h2 class="font-display text-3xl sm:text-4xl font-bold text-[#0C1E35]"> ${admissions.announcementTitle} </h2> <p class="text-sm sm:text-base text-[#52647B] leading-relaxed"> ${admissions.announcementSummary} </p> </div> <div class="flex flex-wrap lg:flex-col gap-3 shrink-0"> <a${addAttribute(admissions.announcementPdfUrl, "href")} target="_blank" rel="noopener noreferrer" data-magnetic="0.14" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs uppercase tracking-[0.14em] btn-primary"> <span>Descargar Convocatoria PDF</span> </a> <a href="/contacto" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs uppercase tracking-[0.14em] btn-gold"> <span>Solicitar Información</span> </a> </div> </div> </section>  <section class="py-16 sm:py-20"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10"> <div class="max-w-2xl space-y-2" data-reveal> <p class="text-xs font-semibold uppercase tracking-[0.22em]" style="color: var(--brand-accent);">
Criterios Académicos
</p> <h2 class="font-display text-3xl sm:text-5xl font-bold text-[#0C1E35]">
Requisitos de Ingreso
</h2> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-5"> ${admissions.requirements.map((req, idx) => renderTemplate`<div data-spotlight data-reveal${addAttribute(String(idx * 70), "data-delay")} class="spotlight-card rounded-2xl p-6 flex items-start gap-4"> <span class="w-9 h-9 rounded-xl bg-[#0C1E35] text-[#E6C77B] font-bold text-sm flex items-center justify-center shrink-0">
0${idx + 1} </span> <p class="text-sm sm:text-[15px] text-[#132238] leading-relaxed pt-1">${req}</p> </div>`)} </div> </div> </section>  <section class="py-16 sm:py-24 bg-white border-y border-[#0C1E35]/8"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> ${renderComponent($$result2, "AdmissionsStepper", AdmissionsStepper, { "client:visible": true, "steps": admissions.enrollmentSteps, "documents": admissions.documents, "client:component-hydration": "visible", "client:component-path": "C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/components/interactive/AdmissionsStepper", "client:component-export": "default" })} </div> </section>  <section class="py-16 sm:py-24"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12"> <div class="max-w-2xl space-y-2" data-reveal> <p class="text-xs font-semibold uppercase tracking-[0.22em]" style="color: var(--brand-accent);">
Cronograma Oficial
</p> <h2 class="font-display text-3xl sm:text-5xl font-bold text-[#0C1E35]">
Fechas Importantes
</h2> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5"> ${admissions.importantDates.map((item, idx) => renderTemplate`<article data-spotlight data-reveal${addAttribute(String(idx * 75), "data-delay")}${addAttribute(`spotlight-card rounded-3xl p-6 flex flex-col justify-between gap-4 ${item.status === "active" ? "ring-2 ring-[#C69D48] bg-[#FFFDF8]!" : ""}`, "class")}> <div class="space-y-3"> <span${addAttribute(`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.status === "active" ? "bg-emerald-100 text-emerald-800" : item.status === "completed" ? "bg-slate-200 text-slate-600" : "bg-[#0C1E35]/8 text-[#0C1E35]"}`, "class")}> ${item.status === "active" ? "En curso" : item.status === "completed" ? "Concluido" : "Pr\xF3ximo"} </span> <p class="text-xs font-bold uppercase tracking-wider text-[#C69D48]">${item.date}</p> <h3 class="font-display text-xl font-bold text-[#0C1E35] leading-snug">${item.title}</h3> </div> <p class="text-xs text-[#52647B] leading-relaxed">${item.description}</p> </article>`)} </div> </div> </section>  <section class="pb-20 sm:pb-28"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div data-reveal="scale" class="rounded-[2rem] bg-[#0C1E35] text-white p-8 sm:p-12 space-y-8 relative overflow-hidden"> <div class="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-15 blur-3xl" style="background: var(--brand-accent);"></div> <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10"> <div class="space-y-2 max-w-2xl"> <p class="text-xs font-semibold uppercase tracking-[0.22em] text-[#E6C77B]">
Inversión Educativa
</p> <h2 class="font-display text-3xl sm:text-4xl font-bold">
Información de Costos y Becas
</h2> <p class="text-sm text-white/75 leading-relaxed">${admissions.costsNote}</p> </div> <div class="flex flex-wrap gap-3"> <a href="/contacto" data-magnetic="0.14" class="px-6 py-3 rounded-full text-xs uppercase tracking-[0.14em] btn-gold">
Solicitar Información
</a> <a${addAttribute(waUrl, "href")} target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-full text-xs uppercase tracking-[0.14em] font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors">
Consultar por WhatsApp
</a> </div> </div> ${admissions.costsAvailable && admissions.costs.length > 0 ? renderTemplate`<div class="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10"> ${admissions.costs.map((cost) => renderTemplate`<div data-spotlight class="spotlight-card-dark rounded-2xl p-6 space-y-2"> <p class="text-xs uppercase tracking-wider text-white/60">${cost.frequency}</p> <p class="font-display text-3xl font-bold text-[#E6C77B]">${cost.amount}</p> <p class="text-sm font-medium text-white">${cost.concept}</p> </div>`)} </div>` : renderTemplate`<div class="p-6 rounded-2xl bg-white/8 border border-white/15 text-sm text-white/80 relative z-10">
La tabla de cuotas para el próximo ciclo se encuentra en proceso de publicación. Solicita orientación personalizada con nuestro equipo de Admisiones.
</div>`} </div> </div> </section> ` })}`;
}, "C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/admisiones.astro", void 0);

const $$file = "C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/admisiones.astro";
const $$url = "/admisiones";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admisiones,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
