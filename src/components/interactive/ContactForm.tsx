import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface Props {
  recipientEmail: string;
}

const TOPICS = [
  'Información sobre la Licenciatura',
  'Proceso de Admisiones y Convocatoria',
  'Becas y Costos',
  'Agendar Visita al Campus',
  'Otros asuntos institucionales',
];

export default function ContactForm({ recipientEmail }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    topic: TOPICS[0],
    message: '',
    acceptPrivacy: true,
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.acceptPrivacy) {
      setStatus('error');
      setFeedback('Por favor acepta el Aviso de Privacidad para enviar tu solicitud.');
      return;
    }

    setStatus('submitting');
    setFeedback('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus('error');
        setFeedback(data.error || 'Ocurrió un error al enviar tu mensaje.');
        return;
      }

      setStatus('success');
      setFeedback(data.message);
      setForm({
        name: '',
        email: '',
        phone: '',
        topic: TOPICS[0],
        message: '',
        acceptPrivacy: true,
      });
    } catch {
      setStatus('error');
      setFeedback('No se pudo conectar con el servidor. Intenta de nuevo.');
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-[#0C1E35]/10 shadow-[0_24px_60px_-28px_rgba(12,30,53,0.18)] p-6 sm:p-9">
      <div className="mb-7 space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C69D48]">
          Solicitud de Información
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0C1E35]">
          Envíanos un mensaje
        </h2>
        <p className="text-sm text-[#52647B]">
          Tu consulta se registra y canaliza directamente a <span className="font-semibold text-[#0C1E35]">{recipientEmail}</span>.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-10 px-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="w-16 h-16 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg"
            >
              <CheckCircle2 className="w-9 h-9" />
            </motion.div>
            <h3 className="font-display text-3xl font-bold text-[#0C1E35]">¡Mensaje Enviado!</h3>
            <p className="text-sm text-[#52647B] max-w-md mx-auto leading-relaxed">{feedback}</p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-[#0C1E35] text-white hover:bg-[#17355A] transition-colors cursor-pointer"
            >
              Enviar otra consulta
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="cf-name" className="block text-xs font-semibold uppercase tracking-wider text-[#0C1E35]">
                  Nombre completo *
                </label>
                <input
                  id="cf-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ej. María Fernanda López"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#0C1E35]/15 text-sm text-[#0C1E35] focus:outline-none focus:border-[#C69D48] focus:bg-white focus:ring-2 focus:ring-[#C69D48]/20 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="cf-email" className="block text-xs font-semibold uppercase tracking-wider text-[#0C1E35]">
                  Correo electrónico *
                </label>
                <input
                  id="cf-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="tu.correo@ejemplo.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#0C1E35]/15 text-sm text-[#0C1E35] focus:outline-none focus:border-[#C69D48] focus:bg-white focus:ring-2 focus:ring-[#C69D48]/20 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="cf-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#0C1E35]">
                  Teléfono / WhatsApp
                </label>
                <input
                  id="cf-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Ej. 951 123 4567"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#0C1E35]/15 text-sm text-[#0C1E35] focus:outline-none focus:border-[#C69D48] focus:bg-white focus:ring-2 focus:ring-[#C69D48]/20 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="cf-topic" className="block text-xs font-semibold uppercase tracking-wider text-[#0C1E35]">
                  Motivo de consulta
                </label>
                <select
                  id="cf-topic"
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#0C1E35]/15 text-sm text-[#0C1E35] focus:outline-none focus:border-[#C69D48] focus:bg-white focus:ring-2 focus:ring-[#C69D48]/20 transition-all"
                >
                  {TOPICS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cf-message" className="block text-xs font-semibold uppercase tracking-wider text-[#0C1E35]">
                Mensaje o dudas *
              </label>
              <textarea
                id="cf-message"
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Cuéntanos en qué podemos orientarte (horarios, becas, requisitos, visita guiada...)"
                className="w-full px-4 py-3 rounded-xl bg-[#FAF8F4] border border-[#0C1E35]/15 text-sm text-[#0C1E35] focus:outline-none focus:border-[#C69D48] focus:bg-white focus:ring-2 focus:ring-[#C69D48]/20 transition-all resize-none"
              />
            </div>

            <label className="flex items-start gap-3 text-xs text-[#52647B] cursor-pointer">
              <input
                type="checkbox"
                checked={form.acceptPrivacy}
                onChange={(e) => setForm({ ...form, acceptPrivacy: e.target.checked })}
                className="mt-0.5 rounded border-[#0C1E35]/30 accent-[#0C1E35]"
              />
              <span>
                He leído y acepto el{' '}
                <a href="/aviso-de-privacidad" className="underline font-semibold text-[#0C1E35] hover:text-[#C69D48]">
                  Aviso de Privacidad
                </a>{' '}
                para el tratamiento de mis datos de contacto.
              </span>
            </label>

            {status === 'error' && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{feedback}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm uppercase tracking-[0.15em] btn-primary flex items-center justify-center gap-2.5 disabled:opacity-60 cursor-pointer"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Enviando solicitud...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#E6C77B]" />
                  <span>Enviar Solicitud de Información</span>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
