import React, { useState, useEffect } from 'react';
import {
  Palette,
  Building2,
  GraduationCap,
  CalendarCheck,
  FileText,
  Phone,
  Inbox,
  Save,
  Upload,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  Lock,
  Loader2,
} from 'lucide-react';
import type { SiteContent, ContactSubmission, AcademicDocument, AcademicEvent } from '../../types/content';

interface Props {
  initialContent: SiteContent;
  isAuthenticated: boolean;
  storageMode?: 'vercel-blob' | 'local' | 'vercel-readonly';
}

type TabKey =
  | 'brand'
  | 'university'
  | 'program'
  | 'admissions'
  | 'docs-events'
  | 'contact'
  | 'inbox';

export default function AdminPanel({
  initialContent,
  isAuthenticated: initialAuth,
  storageMode = 'local',
}: Props) {
  const [authed, setAuthed] = useState(initialAuth);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [content, setContent] = useState<SiteContent>(initialContent);
  const [activeTab, setActiveTab] = useState<TabKey>('brand');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [messages, setMessages] = useState<ContactSubmission[]>([]);

  const showToast = (type: 'ok' | 'err', text: string) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 4200);
  };

  useEffect(() => {
    if (authed) {
      fetch('/api/messages')
        .then((r) => r.json())
        .then((d) => {
          if (d.ok && Array.isArray(d.messages)) setMessages(d.messages);
        })
        .catch(() => {});
    }
  }, [authed]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setAuthError(data.error || 'Contraseña incorrecta.');
      } else {
        setAuthed(true);
        setPassword('');
      }
    } catch {
      setAuthError('Error de conexión.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    setAuthed(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        showToast('err', data.error || 'No se pudieron guardar los cambios.');
      } else {
        showToast('ok', 'Cambios guardados y publicados en el sitio web.');
      }
    } catch {
      showToast('err', 'Error de red al guardar.');
    } finally {
      setSaving(false);
    }
  };

  const uploadFile = async (
    file: File,
    kind: 'image' | 'pdf',
    key: string,
    onDone: (url: string, sizeLabel: string) => void
  ) => {
    setUploadingKey(key);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('kind', kind);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        showToast('err', data.error || 'Error al subir el archivo.');
      } else {
        onDone(data.url, data.sizeLabel);
        showToast('ok', 'Archivo subido. Recuerda presionar "Guardar Cambios".');
      }
    } catch {
      showToast('err', 'No se pudo subir el archivo.');
    } finally {
      setUploadingKey(null);
    }
  };

  const markRead = async (id: string) => {
    await fetch('/api/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  // LOGIN SCREEN
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#071323] via-[#0C1E35] to-[#152D4B]">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 sm:p-10 shadow-2xl border border-[#C69D48]/30 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#0C1E35] text-[#E6C77B] flex items-center justify-center">
              <Lock className="w-7 h-7" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C69D48]">
              Panel de Administración
            </p>
            <h1 className="font-display text-3xl font-bold text-[#0C1E35]">
              {content.brand.name}
            </h1>
            <p className="text-xs text-[#52647B]">
              Actualiza textos, imágenes, convocatorias y documentos PDF sin modificar código.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="admin-pass" className="block text-xs font-semibold uppercase tracking-wider text-[#0C1E35]">
                Contraseña de acceso
              </label>
              <input
                id="admin-pass"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña"
                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#0C1E35]/15 text-sm focus:outline-none focus:border-[#C69D48] focus:bg-white"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 rounded-xl text-xs uppercase tracking-[0.14em] font-bold bg-[#0C1E35] text-white hover:bg-[#17355A] transition-colors cursor-pointer disabled:opacity-60"
            >
              {authLoading ? 'Verificando...' : 'Ingresar al Panel'}
            </button>
          </form>

          <div className="p-3.5 rounded-xl bg-[#FAF8F4] border border-[#0C1E35]/8 text-[11px] text-[#52647B] text-center space-y-1">
            <p>
              Contraseña de demostración por defecto: <strong className="text-[#0C1E35]">admin2026</strong>
            </p>
            <p>(Configurable en producción con la variable de entorno ADMIN_PASSWORD)</p>
          </div>

          <div className="text-center">
            <a href="/" className="text-xs font-semibold text-[#0C1E35] hover:text-[#C69D48] transition-colors">
              ← Volver al sitio institucional
            </a>
          </div>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter((m) => !m.read).length;

  const tabs: { key: TabKey; label: string; icon: React.ReactNode; badge?: number }[] = [
    { key: 'brand', label: 'Identidad y Colores', icon: <Palette className="w-4 h-4" /> },
    { key: 'university', label: 'Inicio y Universidad', icon: <Building2 className="w-4 h-4" /> },
    { key: 'program', label: 'Oferta Educativa', icon: <GraduationCap className="w-4 h-4" /> },
    { key: 'admissions', label: 'Admisiones', icon: <CalendarCheck className="w-4 h-4" /> },
    { key: 'docs-events', label: 'PDFs y Eventos', icon: <FileText className="w-4 h-4" /> },
    { key: 'contact', label: 'Contacto y Redes', icon: <Phone className="w-4 h-4" /> },
    { key: 'inbox', label: 'Solicitudes', icon: <Inbox className="w-4 h-4" />, badge: unreadCount },
  ];

  const inputCls =
    'w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F4] border border-[#0C1E35]/15 text-sm text-[#0C1E35] focus:outline-none focus:border-[#C69D48] focus:bg-white transition-all';
  const labelCls = 'block text-xs font-semibold uppercase tracking-wider text-[#52647B] mb-1.5';

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#0C1E35]">
      {/* Sticky Top Admin Bar */}
      <header className="sticky top-0 z-40 bg-[#0C1E35] text-white border-b border-[#C69D48]/30 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-[#C69D48] text-[#071323] text-[11px] font-bold uppercase tracking-wider">
              CMS
            </span>
            <div>
              <h1 className="font-display text-xl font-bold leading-tight">{content.brand.name}</h1>
              <p className="text-[11px] text-white/60">Panel de Administración de Contenidos</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ver sitio</span>
            </a>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#C69D48] text-[#071323] hover:brightness-105 transition-all cursor-pointer disabled:opacity-60"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{saving ? 'Guardando...' : 'Guardar Cambios'}</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              title="Cerrar sesión"
              className="p-2 rounded-xl bg-white/10 hover:bg-red-500/80 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-medium flex items-center gap-2.5 ${
            toast.type === 'ok' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toast.text}</span>
        </div>
      )}

      {/* Storage status banner when deployed on Vercel without Blob yet */}
      {storageMode === 'vercel-readonly' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs sm:text-sm flex flex-wrap items-center justify-between gap-3">
            <div>
              <strong>Activa Vercel Blob para guardar cambios en la nube:</strong> En tu proyecto de Vercel ve a{' '}
              <span className="font-semibold">Storage → Create Database → Blob</span> y vuelve a desplegar. Esto habilita guardar textos y subir imágenes/PDFs desde este panel.
            </div>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 md:grid-cols-12 gap-7 items-start">
        {/* Sidebar Navigation */}
        <aside className="md:col-span-4 lg:col-span-3 bg-white rounded-3xl p-3 border border-[#0C1E35]/10 shadow-sm space-y-1 md:sticky md:top-24">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActiveTab(t.key)}
              className={`w-full px-4 py-3 rounded-2xl text-sm font-semibold flex items-center justify-between transition-all cursor-pointer ${
                activeTab === t.key
                  ? 'bg-[#0C1E35] text-white shadow-sm'
                  : 'text-[#52647B] hover:bg-[#FAF8F4] hover:text-[#0C1E35]'
              }`}
            >
              <span className="flex items-center gap-3">
                <span className={activeTab === t.key ? 'text-[#E6C77B]' : ''}>{t.icon}</span>
                <span>{t.label}</span>
              </span>
              {t.badge ? (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#C69D48] text-[#071323]">
                  {t.badge}
                </span>
              ) : null}
            </button>
          ))}
        </aside>

        {/* Editor Area */}
        <section className="md:col-span-8 lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-[#0C1E35]/10 shadow-sm space-y-8">
          {/* TAB 1: BRAND & COLORS */}
          {activeTab === 'brand' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-3xl font-bold">Identidad Institucional y Colores</h2>
                <p className="text-sm text-[#52647B]">
                  Personaliza el nombre oficial, eslogan, logotipo, banner y paleta de colores de la universidad.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Nombre de la Universidad</label>
                  <input
                    className={inputCls}
                    value={content.brand.name}
                    onChange={(e) =>
                      setContent({ ...content, brand: { ...content.brand, name: e.target.value } })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Siglas</label>
                  <input
                    className={inputCls}
                    value={content.brand.shortName}
                    onChange={(e) =>
                      setContent({ ...content, brand: { ...content.brand, shortName: e.target.value } })
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Eslogan o frase institucional</label>
                  <input
                    className={inputCls}
                    value={content.brand.slogan}
                    onChange={(e) =>
                      setContent({ ...content, brand: { ...content.brand, slogan: e.target.value } })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Ubicación (encabezado)</label>
                  <input
                    className={inputCls}
                    value={content.brand.locationLabel}
                    onChange={(e) =>
                      setContent({ ...content, brand: { ...content.brand, locationLabel: e.target.value } })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Año de fundación</label>
                  <input
                    className={inputCls}
                    value={content.brand.foundedYear}
                    onChange={(e) =>
                      setContent({ ...content, brand: { ...content.brand, foundedYear: e.target.value } })
                    }
                  />
                </div>
              </div>

              {/* Colors */}
              <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#0C1E35]/8 space-y-4">
                <h3 className="font-semibold text-sm text-[#0C1E35]">Colores Oficiales de la Universidad</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { key: 'primary', label: 'Color Principal' },
                    { key: 'primaryDark', label: 'Principal Oscuro' },
                    { key: 'accent', label: 'Color Acento / Dorado' },
                    { key: 'surface', label: 'Fondo Editorial' },
                  ].map((c) => (
                    <label key={c.key} className="space-y-1.5 block">
                      <span className="text-xs font-medium text-[#52647B] block">{c.label}</span>
                      <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-[#0C1E35]/10">
                        <input
                          type="color"
                          value={(content.brand.colors as any)[c.key]}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              brand: {
                                ...content.brand,
                                colors: { ...content.brand.colors, [c.key]: e.target.value },
                              },
                            })
                          }
                          className="w-8 h-8 rounded cursor-pointer border-0"
                        />
                        <span className="text-xs font-mono text-[#0C1E35]">
                          {(content.brand.colors as any)[c.key]}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Logo & Hero Banner Uploads */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl border border-[#0C1E35]/10 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0C1E35]">Logotipo Oficial</p>
                  <p className="text-xs text-[#52647B]">
                    Deja vacío para usar el escudo institucional SVG o sube tu propio logotipo PNG/SVG.
                  </p>
                  {content.brand.logoUrl && (
                    <img src={content.brand.logoUrl} alt="Logo" className="h-14 object-contain" />
                  )}
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0C1E35] text-white text-xs font-semibold cursor-pointer hover:bg-[#17355A]">
                    <Upload className="w-3.5 h-3.5 text-[#E6C77B]" />
                    <span>{uploadingKey === 'logo' ? 'Subiendo...' : 'Subir Logotipo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) {
                          uploadFile(f, 'image', 'logo', (url) =>
                            setContent((prev) => ({ ...prev, brand: { ...prev.brand, logoUrl: url } }))
                          );
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="p-5 rounded-2xl border border-[#0C1E35]/10 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0C1E35]">Imagen Principal (Banner)</p>
                  <img
                    src={content.home.heroImage}
                    alt="Banner principal"
                    className="w-full h-28 object-cover rounded-xl"
                  />
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0C1E35] text-white text-xs font-semibold cursor-pointer hover:bg-[#17355A]">
                    <Upload className="w-3.5 h-3.5 text-[#E6C77B]" />
                    <span>{uploadingKey === 'hero' ? 'Subiendo...' : 'Cambiar Banner'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) {
                          uploadFile(f, 'image', 'hero', (url) =>
                            setContent((prev) => ({ ...prev, home: { ...prev.home, heroImage: url } }))
                          );
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HOME & UNIVERSITY */}
          {activeTab === 'university' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-3xl font-bold">Portada y La Universidad</h2>
                <p className="text-sm text-[#52647B]">Edita los textos de inicio, ¿Quiénes somos?, Misión, Visión y Objetivo.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Aviso destacado en portada (Badge)</label>
                  <input
                    className={inputCls}
                    value={content.home.heroBadge}
                    onChange={(e) => setContent({ ...content, home: { ...content.home, heroBadge: e.target.value } })}
                  />
                </div>
                <div>
                  <label className={labelCls}>Título principal de portada</label>
                  <input
                    className={inputCls}
                    value={content.home.heroTitle}
                    onChange={(e) => setContent({ ...content, home: { ...content.home, heroTitle: e.target.value } })}
                  />
                </div>
                <div>
                  <label className={labelCls}>Subtítulo de portada</label>
                  <textarea
                    rows={2}
                    className={inputCls}
                    value={content.home.heroSubtitle}
                    onChange={(e) => setContent({ ...content, home: { ...content.home, heroSubtitle: e.target.value } })}
                  />
                </div>
                <div>
                  <label className={labelCls}>Breve descripción institucional (Inicio)</label>
                  <textarea
                    rows={3}
                    className={inputCls}
                    value={content.home.introDescription}
                    onChange={(e) =>
                      setContent({ ...content, home: { ...content.home, introDescription: e.target.value } })
                    }
                  />
                </div>
              </div>

              <hr className="border-[#0C1E35]/10" />

              <div className="space-y-4">
                <div>
                  <label className={labelCls}>Título ¿Quiénes somos?</label>
                  <input
                    className={inputCls}
                    value={content.university.whoWeAreTitle}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        university: { ...content.university, whoWeAreTitle: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Misión</label>
                  <textarea
                    rows={3}
                    className={inputCls}
                    value={content.university.mission}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        university: { ...content.university, mission: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Visión</label>
                  <textarea
                    rows={3}
                    className={inputCls}
                    value={content.university.vision}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        university: { ...content.university, vision: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Objetivo Institucional</label>
                  <textarea
                    rows={3}
                    className={inputCls}
                    value={content.university.institutionalObjective}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        university: { ...content.university, institutionalObjective: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EDUCATIONAL OFFERING */}
          {activeTab === 'program' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-3xl font-bold">Oferta Educativa</h2>
                <p className="text-sm text-[#52647B]">Actualiza la información completa de la licenciatura.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Nombre de la Licenciatura</label>
                  <input
                    className={inputCls}
                    value={content.program.name}
                    onChange={(e) =>
                      setContent({ ...content, program: { ...content.program, name: e.target.value } })
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Grado académico que se obtiene</label>
                  <input
                    className={inputCls}
                    value={content.program.academicDegree}
                    onChange={(e) =>
                      setContent({ ...content, program: { ...content.program, academicDegree: e.target.value } })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Duración</label>
                  <input
                    className={inputCls}
                    value={content.program.duration}
                    onChange={(e) =>
                      setContent({ ...content, program: { ...content.program, duration: e.target.value } })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Modalidad</label>
                  <input
                    className={inputCls}
                    value={content.program.modality}
                    onChange={(e) =>
                      setContent({ ...content, program: { ...content.program, modality: e.target.value } })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Horario</label>
                  <input
                    className={inputCls}
                    value={content.program.schedule}
                    onChange={(e) =>
                      setContent({ ...content, program: { ...content.program, schedule: e.target.value } })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Referencia RVOE</label>
                  <input
                    className={inputCls}
                    value={content.program.rvoe}
                    onChange={(e) =>
                      setContent({ ...content, program: { ...content.program, rvoe: e.target.value } })
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Descripción general</label>
                  <textarea
                    rows={3}
                    className={inputCls}
                    value={content.program.generalDescription}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        program: { ...content.program, generalDescription: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Objetivo del programa educativo</label>
                  <textarea
                    rows={3}
                    className={inputCls}
                    value={content.program.objective}
                    onChange={(e) =>
                      setContent({ ...content, program: { ...content.program, objective: e.target.value } })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ADMISSIONS */}
          {activeTab === 'admissions' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-3xl font-bold">Admisiones y Convocatoria Vigente</h2>
                <p className="text-sm text-[#52647B]">
                  Actualiza las fechas, estado de la convocatoria, archivo PDF y visibilidad de costos.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Título de la Convocatoria Vigente</label>
                  <input
                    className={inputCls}
                    value={content.admissions.announcementTitle}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        admissions: { ...content.admissions, announcementTitle: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Estado actual</label>
                  <input
                    className={inputCls}
                    value={content.admissions.announcementStatus}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        admissions: { ...content.admissions, announcementStatus: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Periodo de ingreso</label>
                  <input
                    className={inputCls}
                    value={content.admissions.announcementPeriod}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        admissions: { ...content.admissions, announcementPeriod: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Resumen de convocatoria</label>
                  <textarea
                    rows={3}
                    className={inputCls}
                    value={content.admissions.announcementSummary}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        admissions: { ...content.admissions, announcementSummary: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#0C1E35]/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0C1E35]">PDF de Convocatoria</p>
                  <p className="text-xs text-[#52647B] mt-0.5">{content.admissions.announcementPdfUrl}</p>
                </div>
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0C1E35] text-white text-xs font-semibold cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-[#E6C77B]" />
                  <span>{uploadingKey === 'convocatoria' ? 'Subiendo...' : 'Subir nuevo PDF'}</span>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        uploadFile(f, 'pdf', 'convocatoria', (url) =>
                          setContent((prev) => ({
                            ...prev,
                            admissions: { ...prev.admissions, announcementPdfUrl: url },
                          }))
                        );
                      }
                    }}
                  />
                </label>
              </div>

              <div className="p-5 rounded-2xl border border-[#0C1E35]/10 space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={content.admissions.costsAvailable}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        admissions: { ...content.admissions, costsAvailable: e.target.checked },
                      })
                    }
                    className="w-4 h-4 accent-[#0C1E35]"
                  />
                  <span className="text-sm font-semibold text-[#0C1E35]">
                    Mostrar tabla de costos en la página de Admisiones
                  </span>
                </label>
                <div>
                  <label className={labelCls}>Nota sobre costos y becas</label>
                  <textarea
                    rows={2}
                    className={inputCls}
                    value={content.admissions.costsNote}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        admissions: { ...content.admissions, costsNote: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PDFS & ACADEMIC EVENTS */}
          {activeTab === 'docs-events' && (
            <div className="space-y-8">
              {/* PDFs Manager */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display text-3xl font-bold">Documentos PDF Oficiales</h2>
                    <p className="text-sm text-[#52647B]">
                      Sube o reemplaza el reglamento, calendario escolar, plan de estudios y documentos complementarios.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newDoc: AcademicDocument = {
                        id: `doc-${Date.now()}`,
                        category: 'Complementario',
                        title: 'Nuevo Documento Institucional',
                        description: 'Descripción breve del documento PDF.',
                        fileUrl: '/docs/reglamento-institucional.pdf',
                        updatedAt: 'Noviembre 2026',
                        fileSize: 'PDF Oficial',
                      };
                      setContent({
                        ...content,
                        academicLife: {
                          ...content.academicLife,
                          documents: [...content.academicLife.documents, newDoc],
                        },
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0C1E35] text-white text-xs font-semibold cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#E6C77B]" />
                    <span>Agregar PDF</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {content.academicLife.documents.map((doc, idx) => (
                    <div key={doc.id} className="p-5 rounded-2xl bg-[#FAF8F4] border border-[#0C1E35]/10 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className={labelCls}>Título</label>
                          <input
                            className={inputCls}
                            value={doc.title}
                            onChange={(e) => {
                              const next = [...content.academicLife.documents];
                              next[idx] = { ...doc, title: e.target.value };
                              setContent({ ...content, academicLife: { ...content.academicLife, documents: next } });
                            }}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Categoría</label>
                          <select
                            className={inputCls}
                            value={doc.category}
                            onChange={(e) => {
                              const next = [...content.academicLife.documents];
                              next[idx] = { ...doc, category: e.target.value as AcademicDocument['category'] };
                              setContent({ ...content, academicLife: { ...content.academicLife, documents: next } });
                            }}
                          >
                            <option value="Reglamento">Reglamento</option>
                            <option value="Calendario">Calendario</option>
                            <option value="Plan de Estudios">Plan de Estudios</option>
                            <option value="Complementario">Complementario</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className={labelCls}>Descripción</label>
                        <input
                          className={inputCls}
                          value={doc.description}
                          onChange={(e) => {
                            const next = [...content.academicLife.documents];
                            next[idx] = { ...doc, description: e.target.value };
                            setContent({ ...content, academicLife: { ...content.academicLife, documents: next } });
                          }}
                        />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <span className="text-xs text-[#52647B] truncate max-w-xs">Archivo: {doc.fileUrl}</span>
                        <div className="flex items-center gap-2">
                          <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#0C1E35]/15 text-xs font-semibold cursor-pointer hover:border-[#C69D48]">
                            <Upload className="w-3.5 h-3.5 text-[#C69D48]" />
                            <span>{uploadingKey === doc.id ? 'Subiendo...' : 'Subir archivo PDF'}</span>
                            <input
                              type="file"
                              accept="application/pdf"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) {
                                  uploadFile(f, 'pdf', doc.id, (url, sizeLabel) => {
                                    setContent((prev) => {
                                      const next = [...prev.academicLife.documents];
                                      next[idx] = { ...next[idx], fileUrl: url, fileSize: sizeLabel };
                                      return {
                                        ...prev,
                                        academicLife: { ...prev.academicLife, documents: next },
                                      };
                                    });
                                  });
                                }
                              }}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const next = content.academicLife.documents.filter((_, i) => i !== idx);
                              setContent({ ...content, academicLife: { ...content.academicLife, documents: next } });
                            }}
                            className="p-2 rounded-xl text-red-600 hover:bg-red-50 cursor-pointer"
                            title="Eliminar documento"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-[#0C1E35]/10" />

              {/* Academic Events Manager */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl font-bold">Cartelera de Eventos Académicos</h3>
                    <p className="text-xs text-[#52647B]">Agrega conferencias, talleres o jornadas de puertas abiertas.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newEv: AcademicEvent = {
                        id: `ev-${Date.now()}`,
                        date: '2027-02-15',
                        monthLabel: 'FEB',
                        dayLabel: '15',
                        time: '10:00 – 12:00 h',
                        title: 'Nuevo Evento Académico',
                        location: 'Auditorio Principal',
                        category: 'Conferencia',
                        speaker: 'Dirección Académica',
                        description: 'Descripción del evento.',
                        featured: false,
                      };
                      setContent({
                        ...content,
                        academicLife: {
                          ...content.academicLife,
                          events: [newEv, ...content.academicLife.events],
                        },
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0C1E35] text-white text-xs font-semibold cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#E6C77B]" />
                    <span>Agregar Evento</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {content.academicLife.events.map((ev, idx) => (
                    <div key={ev.id} className="p-4 rounded-2xl bg-[#FAF8F4] border border-[#0C1E35]/10 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div className="sm:col-span-2">
                          <label className={labelCls}>Título del evento</label>
                          <input
                            className={inputCls}
                            value={ev.title}
                            onChange={(e) => {
                              const next = [...content.academicLife.events];
                              next[idx] = { ...ev, title: e.target.value };
                              setContent({ ...content, academicLife: { ...content.academicLife, events: next } });
                            }}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Mes (ej. DIC)</label>
                          <input
                            className={inputCls}
                            value={ev.monthLabel}
                            onChange={(e) => {
                              const next = [...content.academicLife.events];
                              next[idx] = { ...ev, monthLabel: e.target.value.toUpperCase() };
                              setContent({ ...content, academicLife: { ...content.academicLife, events: next } });
                            }}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Día (ej. 12)</label>
                          <input
                            className={inputCls}
                            value={ev.dayLabel}
                            onChange={(e) => {
                              const next = [...content.academicLife.events];
                              next[idx] = { ...ev, dayLabel: e.target.value };
                              setContent({ ...content, academicLife: { ...content.academicLife, events: next } });
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            const next = content.academicLife.events.filter((_, i) => i !== idx);
                            setContent({ ...content, academicLife: { ...content.academicLife, events: next } });
                          }}
                          className="inline-flex items-center gap-1 text-xs text-red-600 hover:underline cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Eliminar evento</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CONTACT & SOCIALS */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-3xl font-bold">Contacto, WhatsApp y Redes Sociales</h2>
                <p className="text-sm text-[#52647B]">Mantén actualizados los canales de comunicación institucional.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Dirección física</label>
                  <input
                    className={inputCls}
                    value={content.contact.address}
                    onChange={(e) =>
                      setContent({ ...content, contact: { ...content.contact, address: e.target.value } })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Ciudad y Estado</label>
                  <input
                    className={inputCls}
                    value={content.contact.cityState}
                    onChange={(e) =>
                      setContent({ ...content, contact: { ...content.contact, cityState: e.target.value } })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Teléfono</label>
                  <input
                    className={inputCls}
                    value={content.contact.phone}
                    onChange={(e) =>
                      setContent({ ...content, contact: { ...content.contact, phone: e.target.value } })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Correo institucional</label>
                  <input
                    className={inputCls}
                    value={content.contact.email}
                    onChange={(e) =>
                      setContent({ ...content, contact: { ...content.contact, email: e.target.value } })
                    }
                  />
                </div>
                <div>
                  <label className={labelCls}>Número WhatsApp (con lada, ej. 52951...)</label>
                  <input
                    className={inputCls}
                    value={content.contact.whatsappNumber}
                    onChange={(e) =>
                      setContent({ ...content, contact: { ...content.contact, whatsappNumber: e.target.value } })
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Horarios de atención</label>
                  <input
                    className={inputCls}
                    value={content.contact.officeHours}
                    onChange={(e) =>
                      setContent({ ...content, contact: { ...content.contact, officeHours: e.target.value } })
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>URL embebida de Google Maps</label>
                  <input
                    className={inputCls}
                    value={content.contact.mapsEmbedUrl}
                    onChange={(e) =>
                      setContent({ ...content, contact: { ...content.contact, mapsEmbedUrl: e.target.value } })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: CONTACT INBOX */}
          {activeTab === 'inbox' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-3xl font-bold">Buzón de Solicitudes de Información</h2>
                <p className="text-sm text-[#52647B]">
                  Mensajes enviados por aspirantes y público general desde el formulario de contacto.
                </p>
              </div>

              {messages.length === 0 ? (
                <div className="p-10 rounded-2xl bg-[#FAF8F4] border border-[#0C1E35]/8 text-center text-sm text-[#52647B]">
                  Aún no hay solicitudes recibidas. Cuando un aspirante envíe el formulario en /contacto aparecerá aquí.
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-5 rounded-2xl border space-y-2 ${
                        msg.read ? 'bg-[#FAF8F4]/60 border-[#0C1E35]/8' : 'bg-white border-[#C69D48] shadow-sm'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {!msg.read && <span className="w-2.5 h-2.5 rounded-full bg-[#C69D48]"></span>}
                          <p className="font-bold text-sm text-[#0C1E35]">{msg.name}</p>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#0C1E35]/8 text-[#0C1E35]">
                            {msg.topic}
                          </span>
                        </div>
                        <span className="text-xs text-[#52647B]">
                          {new Date(msg.createdAt).toLocaleString('es-MX')}
                        </span>
                      </div>
                      <p className="text-xs text-[#52647B]">
                        Correo: <strong className="text-[#0C1E35]">{msg.email}</strong>
                        {msg.phone ? ` · Tel: ${msg.phone}` : ''}
                      </p>
                      <p className="text-sm text-[#132238] pt-1">{msg.message}</p>
                      {!msg.read && (
                        <button
                          type="button"
                          onClick={() => markRead(msg.id)}
                          className="text-xs font-semibold text-[#C69D48] hover:underline cursor-pointer pt-1"
                        >
                          Marcar como leído
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
