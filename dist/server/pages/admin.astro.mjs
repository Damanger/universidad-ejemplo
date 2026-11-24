import { e as createAstro, f as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BYrrl7zG.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Toh0JOX8.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { Lock, ExternalLink, Loader2, Save, LogOut, CheckCircle2, Upload, Plus, Trash2, Palette, Building2, GraduationCap, CalendarCheck, FileText, Phone, Inbox } from 'lucide-react';
import { g as getSiteContent } from '../chunks/content-store_C8ssfVzj.mjs';
export { renderers } from '../renderers.mjs';

function AdminPanel({ initialContent, isAuthenticated: initialAuth }) {
  const [authed, setAuthed] = useState(initialAuth);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [activeTab, setActiveTab] = useState("brand");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [uploadingKey, setUploadingKey] = useState(null);
  const [messages, setMessages] = useState([]);
  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4200);
  };
  useEffect(() => {
    if (authed) {
      fetch("/api/messages").then((r) => r.json()).then((d) => {
        if (d.ok && Array.isArray(d.messages)) setMessages(d.messages);
      }).catch(() => {
      });
    }
  }, [authed]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setAuthError(data.error || "Contraseña incorrecta.");
      } else {
        setAuthed(true);
        setPassword("");
      }
    } catch {
      setAuthError("Error de conexión.");
    } finally {
      setAuthLoading(false);
    }
  };
  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setAuthed(false);
  };
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content)
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        showToast("err", data.error || "No se pudieron guardar los cambios.");
      } else {
        showToast("ok", "Cambios guardados y publicados en el sitio web.");
      }
    } catch {
      showToast("err", "Error de red al guardar.");
    } finally {
      setSaving(false);
    }
  };
  const uploadFile = async (file, kind, key, onDone) => {
    setUploadingKey(key);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("kind", kind);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        showToast("err", data.error || "Error al subir el archivo.");
      } else {
        onDone(data.url, data.sizeLabel);
        showToast("ok", 'Archivo subido. Recuerda presionar "Guardar Cambios".');
      }
    } catch {
      showToast("err", "No se pudo subir el archivo.");
    } finally {
      setUploadingKey(null);
    }
  };
  const markRead = async (id) => {
    await fetch("/api/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
  };
  if (!authed) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#071323] via-[#0C1E35] to-[#152D4B]", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md rounded-3xl bg-white p-8 sm:p-10 shadow-2xl border border-[#C69D48]/30 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center space-y-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-14 h-14 mx-auto rounded-2xl bg-[#0C1E35] text-[#E6C77B] flex items-center justify-center", children: /* @__PURE__ */ jsx(Lock, { className: "w-7 h-7" }) }),
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold uppercase tracking-[0.22em] text-[#C69D48]", children: "Panel de Administración" }),
        /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-bold text-[#0C1E35]", children: content.brand.name }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[#52647B]", children: "Actualiza textos, imágenes, convocatorias y documentos PDF sin modificar código." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "admin-pass", className: "block text-xs font-semibold uppercase tracking-wider text-[#0C1E35]", children: "Contraseña de acceso" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "admin-pass",
              type: "password",
              required: true,
              value: password,
              onChange: (e) => setPassword(e.target.value),
              placeholder: "Ingresa la contraseña",
              className: "w-full px-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#0C1E35]/15 text-sm focus:outline-none focus:border-[#C69D48] focus:bg-white"
            }
          )
        ] }),
        authError && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl p-3", children: authError }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: authLoading,
            className: "w-full py-3.5 rounded-xl text-xs uppercase tracking-[0.14em] font-bold bg-[#0C1E35] text-white hover:bg-[#17355A] transition-colors cursor-pointer disabled:opacity-60",
            children: authLoading ? "Verificando..." : "Ingresar al Panel"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-3.5 rounded-xl bg-[#FAF8F4] border border-[#0C1E35]/8 text-[11px] text-[#52647B] text-center space-y-1", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Contraseña de demostración por defecto: ",
          /* @__PURE__ */ jsx("strong", { className: "text-[#0C1E35]", children: "admin2026" })
        ] }),
        /* @__PURE__ */ jsx("p", { children: "(Configurable en producción con la variable de entorno ADMIN_PASSWORD)" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx("a", { href: "/", className: "text-xs font-semibold text-[#0C1E35] hover:text-[#C69D48] transition-colors", children: "← Volver al sitio institucional" }) })
    ] }) });
  }
  const unreadCount = messages.filter((m) => !m.read).length;
  const tabs = [
    { key: "brand", label: "Identidad y Colores", icon: /* @__PURE__ */ jsx(Palette, { className: "w-4 h-4" }) },
    { key: "university", label: "Inicio y Universidad", icon: /* @__PURE__ */ jsx(Building2, { className: "w-4 h-4" }) },
    { key: "program", label: "Oferta Educativa", icon: /* @__PURE__ */ jsx(GraduationCap, { className: "w-4 h-4" }) },
    { key: "admissions", label: "Admisiones", icon: /* @__PURE__ */ jsx(CalendarCheck, { className: "w-4 h-4" }) },
    { key: "docs-events", label: "PDFs y Eventos", icon: /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4" }) },
    { key: "contact", label: "Contacto y Redes", icon: /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }) },
    { key: "inbox", label: "Solicitudes", icon: /* @__PURE__ */ jsx(Inbox, { className: "w-4 h-4" }), badge: unreadCount }
  ];
  const inputCls = "w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#0C1E35]/15 text-sm text-[#0C1E35] focus:outline-none focus:border-[#C69D48] focus:bg-white transition-all";
  const labelCls = "block text-xs font-semibold uppercase tracking-wider text-[#52647B] mb-1.5";
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#F5F2EB] text-[#0C1E35]", children: [
    /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 bg-[#0C1E35] text-white border-b border-[#C69D48]/30 px-4 sm:px-8 py-3.5", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "px-2.5 py-1 rounded-lg bg-[#C69D48] text-[#071323] text-[11px] font-bold uppercase tracking-wider", children: "CMS" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "font-display text-xl font-bold leading-tight", children: content.brand.name }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-white/60", children: "Panel de Administración de Contenidos" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/",
            target: "_blank",
            className: "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 transition-colors",
            children: [
              /* @__PURE__ */ jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Ver sitio" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: handleSave,
            disabled: saving,
            className: "inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#C69D48] text-[#071323] hover:brightness-105 transition-all cursor-pointer disabled:opacity-60",
            children: [
              saving ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: saving ? "Guardando..." : "Guardar Cambios" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleLogout,
            title: "Cerrar sesión",
            className: "p-2 rounded-xl bg-white/10 hover:bg-red-500/80 transition-colors cursor-pointer",
            children: /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }) }),
    toast && /* @__PURE__ */ jsxs(
      "div",
      {
        className: `fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-medium flex items-center gap-2.5 ${toast.type === "ok" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"}`,
        children: [
          /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 shrink-0" }),
          /* @__PURE__ */ jsx("span", { children: toast.text })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-7 items-start", children: [
      /* @__PURE__ */ jsx("aside", { className: "lg:col-span-3 bg-white rounded-3xl p-3 border border-[#0C1E35]/10 shadow-sm space-y-1", children: tabs.map((t) => /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab(t.key),
          className: `w-full px-4 py-3 rounded-2xl text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${activeTab === t.key ? "bg-[#0C1E35] text-white shadow-sm" : "text-[#52647B] hover:bg-[#FAF8F4] hover:text-[#0C1E35]"}`,
          children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: activeTab === t.key ? "text-[#E6C77B]" : "", children: t.icon }),
              /* @__PURE__ */ jsx("span", { children: t.label })
            ] }),
            t.badge ? /* @__PURE__ */ jsx("span", { className: "px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#C69D48] text-[#071323]", children: t.badge }) : null
          ]
        },
        t.key
      )) }),
      /* @__PURE__ */ jsxs("section", { className: "lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-[#0C1E35]/10 shadow-sm space-y-8", children: [
        activeTab === "brand" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl font-bold", children: "Identidad Institucional y Colores" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-[#52647B]", children: "Personaliza el nombre oficial, eslogan, logotipo, banner y paleta de colores de la universidad." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Nombre de la Universidad" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.brand.name,
                  onChange: (e) => setContent({ ...content, brand: { ...content.brand, name: e.target.value } })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Siglas" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.brand.shortName,
                  onChange: (e) => setContent({ ...content, brand: { ...content.brand, shortName: e.target.value } })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Eslogan o frase institucional" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.brand.slogan,
                  onChange: (e) => setContent({ ...content, brand: { ...content.brand, slogan: e.target.value } })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Ubicación (encabezado)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.brand.locationLabel,
                  onChange: (e) => setContent({ ...content, brand: { ...content.brand, locationLabel: e.target.value } })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Año de fundación" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.brand.foundedYear,
                  onChange: (e) => setContent({ ...content, brand: { ...content.brand, foundedYear: e.target.value } })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl bg-[#FAF8F4] border border-[#0C1E35]/8 space-y-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-sm text-[#0C1E35]", children: "Colores Oficiales de la Universidad" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4", children: [
              { key: "primary", label: "Color Principal" },
              { key: "primaryDark", label: "Principal Oscuro" },
              { key: "accent", label: "Color Acento / Dorado" },
              { key: "surface", label: "Fondo Editorial" }
            ].map((c) => /* @__PURE__ */ jsxs("label", { className: "space-y-1.5 block", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-[#52647B] block", children: c.label }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-white p-2 rounded-xl border border-[#0C1E35]/10", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "color",
                    value: content.brand.colors[c.key],
                    onChange: (e) => setContent({
                      ...content,
                      brand: {
                        ...content.brand,
                        colors: { ...content.brand.colors, [c.key]: e.target.value }
                      }
                    }),
                    className: "w-8 h-8 rounded cursor-pointer border-0"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-xs font-mono text-[#0C1E35]", children: content.brand.colors[c.key] })
              ] })
            ] }, c.key)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border border-[#0C1E35]/10 space-y-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-[#0C1E35]", children: "Logotipo Oficial" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-[#52647B]", children: "Deja vacío para usar el escudo institucional SVG o sube tu propio logotipo PNG/SVG." }),
              content.brand.logoUrl && /* @__PURE__ */ jsx("img", { src: content.brand.logoUrl, alt: "Logo", className: "h-14 object-contain" }),
              /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0C1E35] text-white text-xs font-semibold cursor-pointer hover:bg-[#17355A]", children: [
                /* @__PURE__ */ jsx(Upload, { className: "w-3.5 h-3.5 text-[#E6C77B]" }),
                /* @__PURE__ */ jsx("span", { children: uploadingKey === "logo" ? "Subiendo..." : "Subir Logotipo" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    className: "hidden",
                    onChange: (e) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        uploadFile(
                          f,
                          "image",
                          "logo",
                          (url) => setContent((prev) => ({ ...prev, brand: { ...prev.brand, logoUrl: url } }))
                        );
                      }
                    }
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border border-[#0C1E35]/10 space-y-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-[#0C1E35]", children: "Imagen Principal (Banner)" }),
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: content.home.heroImage,
                  alt: "Banner principal",
                  className: "w-full h-28 object-cover rounded-xl"
                }
              ),
              /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0C1E35] text-white text-xs font-semibold cursor-pointer hover:bg-[#17355A]", children: [
                /* @__PURE__ */ jsx(Upload, { className: "w-3.5 h-3.5 text-[#E6C77B]" }),
                /* @__PURE__ */ jsx("span", { children: uploadingKey === "hero" ? "Subiendo..." : "Cambiar Banner" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    accept: "image/*",
                    className: "hidden",
                    onChange: (e) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        uploadFile(
                          f,
                          "image",
                          "hero",
                          (url) => setContent((prev) => ({ ...prev, home: { ...prev.home, heroImage: url } }))
                        );
                      }
                    }
                  }
                )
              ] })
            ] })
          ] })
        ] }),
        activeTab === "university" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl font-bold", children: "Portada y La Universidad" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-[#52647B]", children: "Edita los textos de inicio, ¿Quiénes somos?, Misión, Visión y Objetivo." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Aviso destacado en portada (Badge)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.home.heroBadge,
                  onChange: (e) => setContent({ ...content, home: { ...content.home, heroBadge: e.target.value } })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Título principal de portada" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.home.heroTitle,
                  onChange: (e) => setContent({ ...content, home: { ...content.home, heroTitle: e.target.value } })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Subtítulo de portada" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 2,
                  className: inputCls,
                  value: content.home.heroSubtitle,
                  onChange: (e) => setContent({ ...content, home: { ...content.home, heroSubtitle: e.target.value } })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Breve descripción institucional (Inicio)" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 3,
                  className: inputCls,
                  value: content.home.introDescription,
                  onChange: (e) => setContent({ ...content, home: { ...content.home, introDescription: e.target.value } })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("hr", { className: "border-[#0C1E35]/10" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Título ¿Quiénes somos?" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.university.whoWeAreTitle,
                  onChange: (e) => setContent({
                    ...content,
                    university: { ...content.university, whoWeAreTitle: e.target.value }
                  })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Misión" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 3,
                  className: inputCls,
                  value: content.university.mission,
                  onChange: (e) => setContent({
                    ...content,
                    university: { ...content.university, mission: e.target.value }
                  })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Visión" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 3,
                  className: inputCls,
                  value: content.university.vision,
                  onChange: (e) => setContent({
                    ...content,
                    university: { ...content.university, vision: e.target.value }
                  })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Objetivo Institucional" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 3,
                  className: inputCls,
                  value: content.university.institutionalObjective,
                  onChange: (e) => setContent({
                    ...content,
                    university: { ...content.university, institutionalObjective: e.target.value }
                  })
                }
              )
            ] })
          ] })
        ] }),
        activeTab === "program" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl font-bold", children: "Oferta Educativa" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-[#52647B]", children: "Actualiza la información completa de la licenciatura." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Nombre de la Licenciatura" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.program.name,
                  onChange: (e) => setContent({ ...content, program: { ...content.program, name: e.target.value } })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Grado académico que se obtiene" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.program.academicDegree,
                  onChange: (e) => setContent({ ...content, program: { ...content.program, academicDegree: e.target.value } })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Duración" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.program.duration,
                  onChange: (e) => setContent({ ...content, program: { ...content.program, duration: e.target.value } })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Modalidad" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.program.modality,
                  onChange: (e) => setContent({ ...content, program: { ...content.program, modality: e.target.value } })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Horario" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.program.schedule,
                  onChange: (e) => setContent({ ...content, program: { ...content.program, schedule: e.target.value } })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Referencia RVOE" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.program.rvoe,
                  onChange: (e) => setContent({ ...content, program: { ...content.program, rvoe: e.target.value } })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Descripción general" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 3,
                  className: inputCls,
                  value: content.program.generalDescription,
                  onChange: (e) => setContent({
                    ...content,
                    program: { ...content.program, generalDescription: e.target.value }
                  })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Objetivo del programa educativo" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 3,
                  className: inputCls,
                  value: content.program.objective,
                  onChange: (e) => setContent({ ...content, program: { ...content.program, objective: e.target.value } })
                }
              )
            ] })
          ] })
        ] }),
        activeTab === "admissions" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl font-bold", children: "Admisiones y Convocatoria Vigente" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-[#52647B]", children: "Actualiza las fechas, estado de la convocatoria, archivo PDF y visibilidad de costos." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Título de la Convocatoria Vigente" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.admissions.announcementTitle,
                  onChange: (e) => setContent({
                    ...content,
                    admissions: { ...content.admissions, announcementTitle: e.target.value }
                  })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Estado actual" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.admissions.announcementStatus,
                  onChange: (e) => setContent({
                    ...content,
                    admissions: { ...content.admissions, announcementStatus: e.target.value }
                  })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Periodo de ingreso" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.admissions.announcementPeriod,
                  onChange: (e) => setContent({
                    ...content,
                    admissions: { ...content.admissions, announcementPeriod: e.target.value }
                  })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Resumen de convocatoria" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 3,
                  className: inputCls,
                  value: content.admissions.announcementSummary,
                  onChange: (e) => setContent({
                    ...content,
                    admissions: { ...content.admissions, announcementSummary: e.target.value }
                  })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl bg-[#FAF8F4] border border-[#0C1E35]/10 flex flex-wrap items-center justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold uppercase tracking-wider text-[#0C1E35]", children: "PDF de Convocatoria" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-[#52647B] mt-0.5", children: content.admissions.announcementPdfUrl })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0C1E35] text-white text-xs font-semibold cursor-pointer", children: [
              /* @__PURE__ */ jsx(Upload, { className: "w-3.5 h-3.5 text-[#E6C77B]" }),
              /* @__PURE__ */ jsx("span", { children: uploadingKey === "convocatoria" ? "Subiendo..." : "Subir nuevo PDF" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  accept: "application/pdf",
                  className: "hidden",
                  onChange: (e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      uploadFile(
                        f,
                        "pdf",
                        "convocatoria",
                        (url) => setContent((prev) => ({
                          ...prev,
                          admissions: { ...prev.admissions, announcementPdfUrl: url }
                        }))
                      );
                    }
                  }
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl border border-[#0C1E35]/10 space-y-4", children: [
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: content.admissions.costsAvailable,
                  onChange: (e) => setContent({
                    ...content,
                    admissions: { ...content.admissions, costsAvailable: e.target.checked }
                  }),
                  className: "w-4 h-4 accent-[#0C1E35]"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-[#0C1E35]", children: "Mostrar tabla de costos en la página de Admisiones" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Nota sobre costos y becas" }),
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 2,
                  className: inputCls,
                  value: content.admissions.costsNote,
                  onChange: (e) => setContent({
                    ...content,
                    admissions: { ...content.admissions, costsNote: e.target.value }
                  })
                }
              )
            ] })
          ] })
        ] }),
        activeTab === "docs-events" && /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl font-bold", children: "Documentos PDF Oficiales" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-[#52647B]", children: "Sube o reemplaza el reglamento, calendario escolar, plan de estudios y documentos complementarios." })
              ] }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    const newDoc = {
                      id: `doc-${Date.now()}`,
                      category: "Complementario",
                      title: "Nuevo Documento Institucional",
                      description: "Descripción breve del documento PDF.",
                      fileUrl: "/docs/reglamento-institucional.pdf",
                      updatedAt: "Noviembre 2026",
                      fileSize: "PDF Oficial"
                    };
                    setContent({
                      ...content,
                      academicLife: {
                        ...content.academicLife,
                        documents: [...content.academicLife.documents, newDoc]
                      }
                    });
                  },
                  className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0C1E35] text-white text-xs font-semibold cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 text-[#E6C77B]" }),
                    /* @__PURE__ */ jsx("span", { children: "Agregar PDF" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4", children: content.academicLife.documents.map((doc, idx) => /* @__PURE__ */ jsxs("div", { className: "p-5 rounded-2xl bg-[#FAF8F4] border border-[#0C1E35]/10 space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
                  /* @__PURE__ */ jsx("label", { className: labelCls, children: "Título" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      className: inputCls,
                      value: doc.title,
                      onChange: (e) => {
                        const next = [...content.academicLife.documents];
                        next[idx] = { ...doc, title: e.target.value };
                        setContent({ ...content, academicLife: { ...content.academicLife, documents: next } });
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: labelCls, children: "Categoría" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      className: inputCls,
                      value: doc.category,
                      onChange: (e) => {
                        const next = [...content.academicLife.documents];
                        next[idx] = { ...doc, category: e.target.value };
                        setContent({ ...content, academicLife: { ...content.academicLife, documents: next } });
                      },
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "Reglamento", children: "Reglamento" }),
                        /* @__PURE__ */ jsx("option", { value: "Calendario", children: "Calendario" }),
                        /* @__PURE__ */ jsx("option", { value: "Plan de Estudios", children: "Plan de Estudios" }),
                        /* @__PURE__ */ jsx("option", { value: "Complementario", children: "Complementario" })
                      ]
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: labelCls, children: "Descripción" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    className: inputCls,
                    value: doc.description,
                    onChange: (e) => {
                      const next = [...content.academicLife.documents];
                      next[idx] = { ...doc, description: e.target.value };
                      setContent({ ...content, academicLife: { ...content.academicLife, documents: next } });
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 pt-1", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-xs text-[#52647B] truncate max-w-xs", children: [
                  "Archivo: ",
                  doc.fileUrl
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxs("label", { className: "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#0C1E35]/15 text-xs font-semibold cursor-pointer hover:border-[#C69D48]", children: [
                    /* @__PURE__ */ jsx(Upload, { className: "w-3.5 h-3.5 text-[#C69D48]" }),
                    /* @__PURE__ */ jsx("span", { children: uploadingKey === doc.id ? "Subiendo..." : "Subir archivo PDF" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "file",
                        accept: "application/pdf",
                        className: "hidden",
                        onChange: (e) => {
                          const f = e.target.files?.[0];
                          if (f) {
                            uploadFile(f, "pdf", doc.id, (url, sizeLabel) => {
                              setContent((prev) => {
                                const next = [...prev.academicLife.documents];
                                next[idx] = { ...next[idx], fileUrl: url, fileSize: sizeLabel };
                                return {
                                  ...prev,
                                  academicLife: { ...prev.academicLife, documents: next }
                                };
                              });
                            });
                          }
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        const next = content.academicLife.documents.filter((_, i) => i !== idx);
                        setContent({ ...content, academicLife: { ...content.academicLife, documents: next } });
                      },
                      className: "p-2 rounded-xl text-red-600 hover:bg-red-50 cursor-pointer",
                      title: "Eliminar documento",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] })
              ] })
            ] }, doc.id)) })
          ] }),
          /* @__PURE__ */ jsx("hr", { className: "border-[#0C1E35]/10" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl font-bold", children: "Cartelera de Eventos Académicos" }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-[#52647B]", children: "Agrega conferencias, talleres o jornadas de puertas abiertas." })
              ] }),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    const newEv = {
                      id: `ev-${Date.now()}`,
                      date: "2027-02-15",
                      monthLabel: "FEB",
                      dayLabel: "15",
                      time: "10:00 – 12:00 h",
                      title: "Nuevo Evento Académico",
                      location: "Auditorio Principal",
                      category: "Conferencia",
                      speaker: "Dirección Académica",
                      description: "Descripción del evento.",
                      featured: false
                    };
                    setContent({
                      ...content,
                      academicLife: {
                        ...content.academicLife,
                        events: [newEv, ...content.academicLife.events]
                      }
                    });
                  },
                  className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0C1E35] text-white text-xs font-semibold cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 text-[#E6C77B]" }),
                    /* @__PURE__ */ jsx("span", { children: "Agregar Evento" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-3", children: content.academicLife.events.map((ev, idx) => /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-2xl bg-[#FAF8F4] border border-[#0C1E35]/10 space-y-3", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
                  /* @__PURE__ */ jsx("label", { className: labelCls, children: "Título del evento" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      className: inputCls,
                      value: ev.title,
                      onChange: (e) => {
                        const next = [...content.academicLife.events];
                        next[idx] = { ...ev, title: e.target.value };
                        setContent({ ...content, academicLife: { ...content.academicLife, events: next } });
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: labelCls, children: "Mes (ej. DIC)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      className: inputCls,
                      value: ev.monthLabel,
                      onChange: (e) => {
                        const next = [...content.academicLife.events];
                        next[idx] = { ...ev, monthLabel: e.target.value.toUpperCase() };
                        setContent({ ...content, academicLife: { ...content.academicLife, events: next } });
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("label", { className: labelCls, children: "Día (ej. 12)" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      className: inputCls,
                      value: ev.dayLabel,
                      onChange: (e) => {
                        const next = [...content.academicLife.events];
                        next[idx] = { ...ev, dayLabel: e.target.value };
                        setContent({ ...content, academicLife: { ...content.academicLife, events: next } });
                      }
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    const next = content.academicLife.events.filter((_, i) => i !== idx);
                    setContent({ ...content, academicLife: { ...content.academicLife, events: next } });
                  },
                  className: "inline-flex items-center gap-1 text-xs text-red-600 hover:underline cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsx("span", { children: "Eliminar evento" })
                  ]
                }
              ) })
            ] }, ev.id)) })
          ] })
        ] }),
        activeTab === "contact" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl font-bold", children: "Contacto, WhatsApp y Redes Sociales" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-[#52647B]", children: "Mantén actualizados los canales de comunicación institucional." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Dirección física" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.contact.address,
                  onChange: (e) => setContent({ ...content, contact: { ...content.contact, address: e.target.value } })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Ciudad y Estado" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.contact.cityState,
                  onChange: (e) => setContent({ ...content, contact: { ...content.contact, cityState: e.target.value } })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Teléfono" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.contact.phone,
                  onChange: (e) => setContent({ ...content, contact: { ...content.contact, phone: e.target.value } })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Correo institucional" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.contact.email,
                  onChange: (e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Número WhatsApp (con lada, ej. 52951...)" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.contact.whatsappNumber,
                  onChange: (e) => setContent({ ...content, contact: { ...content.contact, whatsappNumber: e.target.value } })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "Horarios de atención" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.contact.officeHours,
                  onChange: (e) => setContent({ ...content, contact: { ...content.contact, officeHours: e.target.value } })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
              /* @__PURE__ */ jsx("label", { className: labelCls, children: "URL embebida de Google Maps" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: inputCls,
                  value: content.contact.mapsEmbedUrl,
                  onChange: (e) => setContent({ ...content, contact: { ...content.contact, mapsEmbedUrl: e.target.value } })
                }
              )
            ] })
          ] })
        ] }),
        activeTab === "inbox" && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl font-bold", children: "Buzón de Solicitudes de Información" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-[#52647B]", children: "Mensajes enviados por aspirantes y público general desde el formulario de contacto." })
          ] }),
          messages.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-10 rounded-2xl bg-[#FAF8F4] border border-[#0C1E35]/8 text-center text-sm text-[#52647B]", children: "Aún no hay solicitudes recibidas. Cuando un aspirante envíe el formulario en /contacto aparecerá aquí." }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: messages.map((msg) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: `p-5 rounded-2xl border space-y-2 ${msg.read ? "bg-[#FAF8F4]/60 border-[#0C1E35]/8" : "bg-white border-[#C69D48] shadow-sm"}`,
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                    !msg.read && /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-[#C69D48]" }),
                    /* @__PURE__ */ jsx("p", { className: "font-bold text-sm text-[#0C1E35]", children: msg.name }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs px-2.5 py-0.5 rounded-full bg-[#0C1E35]/8 text-[#0C1E35]", children: msg.topic })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-[#52647B]", children: new Date(msg.createdAt).toLocaleString("es-MX") })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#52647B]", children: [
                  "Correo: ",
                  /* @__PURE__ */ jsx("strong", { className: "text-[#0C1E35]", children: msg.email }),
                  msg.phone ? ` · Tel: ${msg.phone}` : ""
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-[#132238] pt-1", children: msg.message }),
                !msg.read && /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => markRead(msg.id),
                    className: "text-xs font-semibold text-[#C69D48] hover:underline cursor-pointer pt-1",
                    children: "Marcar como leído"
                  }
                )
              ]
            },
            msg.id
          )) })
        ] })
      ] })
    ] })
  ] });
}

const $$Astro = createAstro("https://universidadantequera.edu.mx");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const content = await getSiteContent();
  const isAuthenticated = Astro2.cookies.get("uant_admin_session")?.value === "authenticated";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "content": content, "title": "Panel Administrativo", "hideChrome": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "AdminPanel", AdminPanel, { "client:load": true, "initialContent": content, "isAuthenticated": isAuthenticated, "client:component-hydration": "load", "client:component-path": "C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/components/admin/AdminPanel", "client:component-export": "default" })} ` })}`;
}, "C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/admin/index.astro", void 0);

const $$file = "C:/Users/omarc/OneDrive/Desktop/Proyectos/Escuela/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
