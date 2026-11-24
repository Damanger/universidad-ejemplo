import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Download, Sparkles, GraduationCap } from 'lucide-react';
import type { SemesterItem } from '../../types/content';

interface Props {
  curriculum: SemesterItem[];
  pdfUrl?: string;
}

export default function CurriculumExplorer({ curriculum, pdfUrl = '/docs/plan-de-estudios-lige.pdf' }: Props) {
  const [activeSemester, setActiveSemester] = useState<number>(curriculum[0]?.semester ?? 1);
  const current = curriculum.find((s) => s.semester === activeSemester) ?? curriculum[0];

  const totalCredits = current
    ? current.subjects.reduce((acc, sub) => acc + (Number(sub.credits) || 0), 0)
    : 0;

  return (
    <div className="space-y-8">
      {/* Semester Pills Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div
          className="inline-flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-white border border-[#0C1E35]/10 shadow-sm"
          role="tablist"
          aria-label="Semestres del plan de estudios"
        >
          {curriculum.map((sem) => {
            const isSelected = sem.semester === activeSemester;
            return (
              <button
                key={sem.semester}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveSemester(sem.semester)}
                className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  isSelected ? 'text-[#071323]' : 'text-[#52647B] hover:text-[#0C1E35]'
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="semester-active-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-xl shadow-sm"
                    style={{ background: 'linear-gradient(135deg, #D5B263, #C69D48)' }}
                  />
                )}
                <span className="relative z-10">{sem.semester}° Semestre</span>
              </button>
            );
          })}
        </div>

        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.14em] font-semibold bg-[#0C1E35] text-white hover:bg-[#152E4F] transition-all shadow-sm hover:-translate-y-0.5"
        >
          <Download className="w-4 h-4 text-[#C69D48]" />
          <span>Descargar Plan PDF</span>
        </a>
      </div>

      {/* Animated Semester Panel */}
      {current && (
        <AnimatePresence mode="wait">
          <motion.div
            key={current.semester}
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl bg-white border border-[#0C1E35]/10 shadow-[0_24px_60px_-30px_rgba(12,30,53,0.18)] overflow-hidden"
          >
            {/* Header Bar */}
            <div className="px-6 sm:px-8 py-6 bg-[#0C1E35] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#E6C77B] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Bloque Formativo · Semestre {current.semester}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold">{current.title}</h3>
              </div>
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/8 border border-white/15 shrink-0">
                <GraduationCap className="w-5 h-5 text-[#E6C77B]" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-white/65">Carga Curricular</p>
                  <p className="text-sm font-bold text-white">
                    {current.subjects.length} Materias · {totalCredits} Créditos
                  </p>
                </div>
              </div>
            </div>

            {/* Subject Cards Grid */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {current.subjects.map((sub, idx) => (
                <motion.div
                  key={sub.code + idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.35 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group p-5 rounded-2xl bg-[#FAF8F4] border border-[#0C1E35]/8 hover:border-[#C69D48]/55 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between gap-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wider uppercase bg-[#0C1E35]/8 text-[#0C1E35] group-hover:bg-[#0C1E35] group-hover:text-[#E6C77B] transition-colors">
                      {sub.code}
                    </span>
                    <BookOpen className="w-4 h-4 text-[#C69D48] opacity-75 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="font-semibold text-[#0C1E35] text-[15px] leading-snug">
                    {sub.name}
                  </h4>
                  <div className="pt-3 border-t border-[#0C1E35]/8 flex items-center justify-between text-xs text-[#52647B]">
                    <span>Asignatura obligatoria</span>
                    <span className="font-semibold text-[#0C1E35]">{sub.credits} créditos</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
