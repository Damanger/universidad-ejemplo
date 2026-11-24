import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCircle2, ClipboardCheck, ArrowRight } from 'lucide-react';
import type { EnrollmentStep, RequiredDocument } from '../../types/content';

interface Props {
  steps: EnrollmentStep[];
  documents: RequiredDocument[];
}

export default function AdmissionsStepper({ steps, documents }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({});

  const toggleDoc = (idx: number) => {
    setCheckedDocs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const completedCount = Object.values(checkedDocs).filter(Boolean).length;
  const docProgress = documents.length > 0 ? Math.round((completedCount / documents.length) * 100) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Interactive 4-Step Enrollment Process */}
      <div className="lg:col-span-7 space-y-5">
        <div className="space-y-2 mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C69D48]">Paso a Paso</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0C1E35]">
            Proceso de Inscripción
          </h2>
          <p className="text-sm text-[#52647B]">
            Haz clic en cada etapa para consultar cómo avanzar de forma sencilla en tu ingreso.
          </p>
        </div>

        <div className="relative space-y-4">
          {steps.map((item, index) => {
            const isActive = activeStep === index;
            const isPast = index < activeStep;
            return (
              <motion.button
                key={item.step}
                type="button"
                onClick={() => setActiveStep(index)}
                whileHover={{ x: 4 }}
                className={`w-full text-left p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0C1E35] text-white border-[#C69D48] shadow-[0_20px_45px_-20px_rgba(12,30,53,0.45)]'
                    : 'bg-white text-[#0C1E35] border-[#0C1E35]/10 hover:border-[#C69D48]/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[#C69D48] text-[#071323]'
                        : isPast
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-[#FAF8F4] text-[#0C1E35] border border-[#0C1E35]/10'
                    }`}
                  >
                    {isPast ? <Check className="w-5 h-5" /> : item.step}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight">
                        {item.title}
                      </h3>
                      <ArrowRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive ? 'text-[#E6C77B] translate-x-1' : 'text-[#52647B]/40'
                        }`}
                      />
                    </div>
                    <p
                      className={`text-sm leading-relaxed ${
                        isActive ? 'text-white/80' : 'text-[#52647B]'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Interactive Document Checklist */}
      <div className="lg:col-span-5 rounded-3xl bg-white border border-[#0C1E35]/10 shadow-sm p-6 sm:p-7 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C69D48]">
              <ClipboardCheck className="w-3.5 h-3.5" />
              Lista Interactiva
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#0C1E35]">
              Documentación Necesaria
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FAF8F4] text-[#0C1E35] border border-[#0C1E35]/10">
            {completedCount}/{documents.length}
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-[#52647B]">
            <span>Marca los documentos que ya tienes listos</span>
            <span className="font-semibold text-[#0C1E35]">{docProgress}%</span>
          </div>
          <div className="h-2 rounded-full bg-[#FAF8F4] overflow-hidden border border-[#0C1E35]/8">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #0C1E35, #C69D48)' }}
              initial={{ width: 0 }}
              animate={{ width: `${docProgress}%` }}
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            />
          </div>
        </div>

        <ul className="space-y-3">
          {documents.map((doc, idx) => {
            const checked = Boolean(checkedDocs[idx]);
            return (
              <li key={idx}>
                <button
                  type="button"
                  onClick={() => toggleDoc(idx)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                    checked
                      ? 'bg-emerald-50/70 border-emerald-300/70'
                      : 'bg-[#FAF8F4]/70 border-[#0C1E35]/8 hover:border-[#C69D48]/50'
                  }`}
                >
                  <span
                    className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                      checked
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-[#0C1E35]/25'
                    }`}
                  >
                    {checked && <Check className="w-3.5 h-3.5" />}
                  </span>
                  <div className="space-y-0.5">
                    <p
                      className={`text-sm font-semibold transition-colors ${
                        checked ? 'text-emerald-900 line-through opacity-80' : 'text-[#0C1E35]'
                      }`}
                    >
                      {doc.name}
                    </p>
                    <p className="text-xs text-[#52647B] leading-relaxed">{doc.detail}</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>

        {docProgress === 100 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-emerald-600 text-white flex items-center gap-3 text-sm"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>¡Excelente! Ya tienes tu expediente completo para iniciar tu inscripción.</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
