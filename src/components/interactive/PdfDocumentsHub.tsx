import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Eye, Download, X, ExternalLink, Calendar } from 'lucide-react';
import type { AcademicDocument } from '../../types/content';

interface Props {
  documents: AcademicDocument[];
}

const CATEGORIES = ['Todos', 'Reglamento', 'Calendario', 'Plan de Estudios', 'Complementario'] as const;

export default function PdfDocumentsHub({ documents }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [previewDoc, setPreviewDoc] = useState<AcademicDocument | null>(null);

  const filtered =
    selectedCategory === 'Todos'
      ? documents
      : documents.filter((d) => d.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Animated Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white border border-[#0C1E35]/10 shadow-sm w-fit">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                isActive ? 'text-white' : 'text-[#52647B] hover:text-[#0C1E35]'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="pdf-cat-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-xl bg-[#0C1E35]"
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Document Cards Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((doc) => (
            <motion.article
              layout
              key={doc.id}
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
              className="group relative rounded-3xl bg-white p-6 sm:p-7 border border-[#0C1E35]/10 hover:border-[#C69D48]/60 shadow-sm hover:shadow-[0_22px_50px_-22px_rgba(12,30,53,0.2)] transition-all flex flex-col justify-between gap-6"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0C1E35] text-[#E6C77B] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#C69D48]/15 text-[#8A6620]">
                    {doc.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-[#0C1E35] leading-snug mb-2">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-[#52647B] leading-relaxed">{doc.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#52647B] pt-4 border-t border-[#0C1E35]/8">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C69D48]" />
                    Actualizado: {doc.updatedAt}
                  </span>
                  <span className="font-semibold text-[#0C1E35]">{doc.fileSize}</span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPreviewDoc(doc)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#0C1E35] text-white hover:bg-[#17355A] transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-[#E6C77B]" />
                    <span>Visualizar PDF</span>
                  </button>
                  <a
                    href={doc.fileUrl}
                    download
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border border-[#0C1E35]/15 text-[#0C1E35] hover:border-[#C69D48] hover:bg-[#FAF8F4] transition-colors"
                  >
                    <Download className="w-4 h-4 text-[#C69D48]" />
                    <span>Descargar</span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Interactive PDF Viewer Modal */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewDoc(null)}
            className="fixed inset-0 z-[100] bg-[#071323]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl h-[86vh] rounded-3xl bg-white shadow-2xl border border-[#C69D48]/40 overflow-hidden flex flex-col"
            >
              {/* Modal Toolbar */}
              <div className="px-5 sm:px-6 py-4 bg-[#0C1E35] text-white flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#E6C77B] font-semibold">
                    Visor de Documentos Oficiales · {previewDoc.category}
                  </p>
                  <h4 className="font-display text-xl font-bold truncate">{previewDoc.title}</h4>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={previewDoc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Nueva pestaña</span>
                  </a>
                  <a
                    href={previewDoc.fileUrl}
                    download
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#C69D48] text-[#071323] hover:brightness-105 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setPreviewDoc(null)}
                    aria-label="Cerrar visor"
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Embedded PDF Viewer */}
              <div className="flex-1 bg-[#E8E4DB]">
                <iframe
                  src={`${previewDoc.fileUrl}#view=FitH`}
                  title={previewDoc.title}
                  className="w-full h-full border-0"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
