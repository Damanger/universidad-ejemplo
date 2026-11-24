import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_BYrrl7zG.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Toh0JOX8.mjs';
import { $ as $$PageBanner } from '../chunks/PageBanner_x-h4jp7h.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { g as getSiteContent } from '../chunks/content-store_C8ssfVzj.mjs';
export { renderers } from '../renderers.mjs';

const TOPICS = [
  "Información sobre la Licenciatura",
  "Proceso de Admisiones y Convocatoria",
  "Becas y Costos",
  "Agendar Visita al Campus",
  "Otros asuntos institucionales"
];
function ContactForm({ recipientEmail }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: TOPICS[0],
    message: "",
    acceptPrivacy: true
  });
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.acceptPrivacy) {
      setStatus("error");
      setFeedback("Por favor acepta el Aviso de Privacidad para enviar tu solicitud.");
      return;
    }
    setStatus("submitting");
    setFeedback("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setFeedback(data.error || "Ocurrió un error al enviar tu mensaje.");
        return;
      }
      setStatus("success");
      setFeedback(data.message);
      setForm({
        name: "",
        email: "",
        phone: "",
        topic: TOPICS[0],
        message: "",
        acceptPrivacy: true
      });
    } catch {
      setStatus("error");
      setFeedback("No se pudo conectar con el servidor. Intenta de nuevo.");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "rounded-3xl bg-white border border-[#0C1E35]/10 shadow-[0_24px_60px_-28px_rgba(12,30,53,0.18)] p-6 sm:p-9", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-7 space-y-2", children: [
      /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-[#C69D48]", children: "Solicitud de Información" }),
      /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-[#0C1E35]", children: "Envíanos un mensaje" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#52647B]", children: [
        "Tu consulta se registra y canaliza directamente a ",
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-[#0C1E35]", children: recipientEmail }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: status === "success" ? /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0 },
        className: "py-10 px-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4",
        children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { scale: 0 },
              animate: { scale: 1 },
              transition: { type: "spring", stiffness: 300, damping: 18 },
              className: "w-16 h-16 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg",
              children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-9 h-9" })
            }
          ),
          /* @__PURE__ */ jsx("h3", { className: "font-display text-3xl font-bold text-[#0C1E35]", children: "¡Mensaje Enviado!" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-[#52647B] max-w-md mx-auto leading-relaxed", children: feedback }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setStatus("idle"),
              className: "inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-[#0C1E35] text-white hover:bg-[#17355A] transition-colors cursor-pointer",
              children: "Enviar otra consulta"
            }
          )
        ]
      },
      "success"
    ) : /* @__PURE__ */ jsxs(
      motion.form,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        onSubmit: handleSubmit,
        className: "space-y-5",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "cf-name", className: "block text-xs font-semibold uppercase tracking-wider text-[#0C1E35]", children: "Nombre completo *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "cf-name",
                  type: "text",
                  required: true,
                  value: form.name,
                  onChange: (e) => setForm({ ...form, name: e.target.value }),
                  placeholder: "Ej. María Fernanda López",
                  className: "w-full px-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#0C1E35]/15 text-sm text-[#0C1E35] focus:outline-none focus:border-[#C69D48] focus:bg-white focus:ring-2 focus:ring-[#C69D48]/20 transition-all"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "cf-email", className: "block text-xs font-semibold uppercase tracking-wider text-[#0C1E35]", children: "Correo electrónico *" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "cf-email",
                  type: "email",
                  required: true,
                  value: form.email,
                  onChange: (e) => setForm({ ...form, email: e.target.value }),
                  placeholder: "tu.correo@ejemplo.com",
                  className: "w-full px-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#0C1E35]/15 text-sm text-[#0C1E35] focus:outline-none focus:border-[#C69D48] focus:bg-white focus:ring-2 focus:ring-[#C69D48]/20 transition-all"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "cf-phone", className: "block text-xs font-semibold uppercase tracking-wider text-[#0C1E35]", children: "Teléfono / WhatsApp" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "cf-phone",
                  type: "tel",
                  value: form.phone,
                  onChange: (e) => setForm({ ...form, phone: e.target.value }),
                  placeholder: "Ej. 951 123 4567",
                  className: "w-full px-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#0C1E35]/15 text-sm text-[#0C1E35] focus:outline-none focus:border-[#C69D48] focus:bg-white focus:ring-2 focus:ring-[#C69D48]/20 transition-all"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsx("label", { htmlFor: "cf-topic", className: "block text-xs font-semibold uppercase tracking-wider text-[#0C1E35]", children: "Motivo de consulta" }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  id: "cf-topic",
                  value: form.topic,
                  onChange: (e) => setForm({ ...form, topic: e.target.value }),
                  className: "w-full px-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#0C1E35]/15 text-sm text-[#0C1E35] focus:outline-none focus:border-[#C69D48] focus:bg-white focus:ring-2 focus:ring-[#C69D48]/20 transition-all",
                  children: TOPICS.map((t) => /* @__PURE__ */ jsx("option", { value: t, children: t }, t))
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "cf-message", className: "block text-xs font-semibold uppercase tracking-wider text-[#0C1E35]", children: "Mensaje o dudas *" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "cf-message",
                rows: 4,
                required: true,
                value: form.message,
                onChange: (e) => setForm({ ...form, message: e.target.value }),
                placeholder: "Cuéntanos en qué podemos orientarte (horarios, becas, requisitos, visita guiada...)",
                className: "w-full px-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#0C1E35]/15 text-sm text-[#0C1E35] focus:outline-none focus:border-[#C69D48] focus:bg-white focus:ring-2 focus:ring-[#C69D48]/20 transition-all resize-none"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-3 text-xs text-[#52647B] cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: form.acceptPrivacy,
                onChange: (e) => setForm({ ...form, acceptPrivacy: e.target.checked }),
                className: "mt-0.5 rounded border-[#0C1E35]/30 accent-[#0C1E35]"
              }
            ),
            /* @__PURE__ */ jsxs("span", { children: [
              "He leído y acepto el",
              " ",
              /* @__PURE__ */ jsx("a", { href: "/aviso-de-privacidad", className: "underline font-semibold text-[#0C1E35] hover:text-[#C69D48]", children: "Aviso de Privacidad" }),
              " ",
              "para el tratamiento de mis datos de contacto."
            ] })
          ] }),
          status === "error" && /* @__PURE__ */ jsxs("div", { className: "p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: feedback })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: status === "submitting",
              className: "w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm uppercase tracking-[0.15em] btn-primary flex items-center justify-center gap-2.5 disabled:opacity-60 cursor-pointer",
              children: status === "submitting" ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }),
                /* @__PURE__ */ jsx("span", { children: "Enviando solicitud..." })
              ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(Send, { className: "w-4 h-4 text-[#E6C77B]" }),
                /* @__PURE__ */ jsx("span", { children: "Enviar Solicitud de Información" })
              ] })
            }
          )
        ]
      },
      "form"
    ) })
  ] });
}

const $$Contacto = createComponent(async ($$result, $$props, $$slots) => {
  const content = await getSiteContent();
  const { contact } = content;
  const waUrl = `https://wa.me/${contact.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(contact.whatsappMessage)}`;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "content": content, "title": "Contacto", "description": `Comun\xEDcate con ${content.brand.name} en Oaxaca. Direcci\xF3n, tel\xE9fono, correo institucional, horarios, WhatsApp y mapa de ubicaci\xF3n.` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "PageBanner", $$PageBanner, { "eyebrow": "Atenci\xF3n a Aspirantes y P\xFAblico", "title": "Contacto y Ubicaci\xF3n", "subtitle": "Estamos para orientarte en cada paso. Escr\xEDbenos por formulario, WhatsApp o vis\xEDtanos en nuestro campus en Oaxaca.", "breadcrumb": "Contacto" })}  ${maybeRenderHead()}<section class="py-16 sm:py-24"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"> <!-- Left: Institutional Contact Information --> <div class="lg:col-span-5 space-y-5"> <div data-spotlight data-reveal class="spotlight-card rounded-3xl p-6 space-y-2"> <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C69D48]">Dirección Física</p> <p class="font-display text-2xl font-bold text-[#0C1E35]">${contact.address}</p> <p class="text-sm text-[#52647B]">${contact.cityState}</p> <a${addAttribute(contact.mapsDirectionsUrl, "href")} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0C1E35] hover:text-[#C69D48] pt-1 transition-colors"> <span>Abrir indicaciones en Google Maps →</span> </a> </div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"> <div data-spotlight data-reveal data-delay="70" class="spotlight-card rounded-3xl p-6 space-y-1.5"> <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C69D48]">Teléfono</p> <a${addAttribute(`tel:${contact.phone.replace(/[^\d+]/g, "")}`, "href")} class="font-display text-2xl font-bold text-[#0C1E35] hover:text-[#C69D48] transition-colors block"> ${contact.phone} </a> </div> <div data-spotlight data-reveal data-delay="120" class="spotlight-card rounded-3xl p-6 space-y-1.5"> <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C69D48]">Correo Institucional</p> <a${addAttribute(`mailto:${contact.email}`, "href")} class="text-base font-bold text-[#0C1E35] hover:text-[#C69D48] transition-colors break-all block"> ${contact.email} </a> </div> </div> <div data-spotlight data-reveal data-delay="170" class="spotlight-card rounded-3xl p-6 space-y-2"> <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C69D48]">Horarios de Atención</p> <p class="text-sm text-[#132238] leading-relaxed font-medium">${contact.officeHours}</p> </div> <!-- Direct WhatsApp Card --> <div data-reveal data-delay="220" class="rounded-3xl p-6 bg-[#0C1E35] text-white space-y-4 border border-[#C69D48]/30"> <div class="space-y-1"> <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E6C77B]">Respuesta Rápida</p> <h3 class="font-display text-2xl font-bold">Acceso Directo a WhatsApp</h3> <p class="text-xs text-white/75 leading-relaxed">
¿Prefieres escribirnos desde tu celular? Un asesor de admisiones atenderá tus dudas al instante.
</p> </div> <a${addAttribute(waUrl, "href")} target="_blank" rel="noopener noreferrer" class="w-full py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-[0.14em] flex items-center justify-center gap-2 transition-colors"> <span>Iniciar conversación en WhatsApp</span> </a> </div> </div> <!-- Right: Interactive Contact Form --> <div class="lg:col-span-7" data-reveal="right"> ${renderComponent($$result2, "ContactForm", ContactForm, { "client:visible": true, "recipientEmail": contact.email, "client:component-hydration": "visible", "client:component-path": "C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/components/interactive/ContactForm", "client:component-export": "default" })} </div> </div> </div> </section>  <section class="pb-20 sm:pb-28"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"> <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4" data-reveal> <div> <p class="text-xs font-semibold uppercase tracking-[0.22em]" style="color: var(--brand-accent);">
Mapa de Ubicación
</p> <h2 class="font-display text-3xl sm:text-4xl font-bold text-[#0C1E35]">
Encuéntranos en Oaxaca de Juárez
</h2> </div> <a${addAttribute(contact.mapsDirectionsUrl, "href")} target="_blank" rel="noopener noreferrer" class="text-xs font-bold uppercase tracking-[0.14em] text-[#0C1E35] hover:text-[#C69D48] transition-colors">
Ver en Google Maps →
</a> </div> <div data-reveal="scale" class="rounded-3xl overflow-hidden border border-[#0C1E35]/12 shadow-xl bg-white h-[400px] sm:h-[460px]"> <iframe${addAttribute(contact.mapsEmbedUrl, "src")}${addAttribute(`Mapa de ubicaci\xF3n de ${content.brand.name}`, "title")} class="w-full h-full border-0" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe> </div> </div> </section> ` })}`;
}, "C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/contacto.astro", void 0);

const $$file = "C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/contacto.astro";
const $$url = "/contacto";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contacto,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
