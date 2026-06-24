import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { X, ChevronLeft, ChevronRight, Play, Eye, Clock, User, Calendar, Tag } from 'lucide-react';

interface ProjectLightboxProps {
  project: Project | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  id?: string;
}

export default function ProjectLightbox({ project, onClose, onPrev, onNext, id }: ProjectLightboxProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, onPrev, onNext]);

  if (!project) return null;

  const isGraphic = project.category === 'graphic';
  const isShortForm = project.category === 'short-form';
  const isLongForm = project.category === 'long-form';

  return (
    <AnimatePresence>
      <div id={id || "lightbox-overlay"} className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#060608]/95 backdrop-blur-md overflow-y-auto">
        {/* Background Click Close */}
        <div className="absolute inset-0 cursor-default" onClick={onClose} />

        {/* Navigation Buttons for desktop */}
        {onPrev && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full border border-[#27272a]/80 bg-[#121215]/80 hover:bg-accent hover:text-[#0a0a0c] hover:border-accent flex items-center justify-center text-zinc-400 transition-all duration-300 hidden md:flex"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        {onNext && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full border border-[#27272a]/80 bg-[#121215]/80 hover:bg-accent hover:text-[#0a0a0c] hover:border-accent flex items-center justify-center text-zinc-400 transition-all duration-300 hidden md:flex"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Modal Window Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#121215] border border-[#27272a]/60 rounded-xs overflow-hidden shadow-2xl z-40 max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close button inside modal (or floating corner) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-[#0a0a0c]/80 hover:bg-accent hover:text-[#0a0a0c] border border-zinc-800 hover:border-accent flex items-center justify-center text-zinc-300 transition-all duration-300"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left / Top Side: Media Canvas */}
          <div className="flex-1 bg-[#0a0a0c] flex items-center justify-center p-4 min-h-[300px] md:min-h-[450px]">
            {isGraphic ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[70vh] object-contain rounded-xs"
              />
            ) : (
              <div className={`w-full max-w-full h-full flex items-center justify-center ${isShortForm ? 'max-w-[320px]' : 'w-full'}`}>
                {project.videoUrl ? (
                  <video
                    src={project.videoUrl}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className={`rounded-xs max-h-[70vh] shadow-xl border border-zinc-800/80 bg-zinc-950 ${isShortForm ? 'aspect-[9/16]' : 'aspect-[16/9] w-full'}`}
                  />
                ) : (
                  <div className="text-zinc-500 font-mono text-sm">Video media unavailable</div>
                )}
              </div>
            )}
          </div>

          {/* Right / Bottom Side: Narrative Details Panel */}
          <div className="w-full md:w-[380px] border-t md:border-t-0 md:border-l border-[#27272a]/60 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-[#121215]">
            <div className="space-y-6">
              {/* Category tag */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono tracking-widest text-accent border border-accent/20 uppercase rounded-xs bg-accent/5">
                {project.category.replace('-', ' ')}
              </div>

              {/* Title & Desc */}
              <div className="space-y-3">
                <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-[#f4f4f6]">
                  {project.title}
                </h2>
                <p className="text-zinc-300 text-sm leading-relaxed font-sans">
                  {project.description}
                </p>
              </div>

              {/* Metadata details table */}
              <div className="border-t border-[#1d1d22] pt-5 space-y-3.5">
                {project.client && (
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500 flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-zinc-600" /> CLIENT</span>
                    <span className="text-zinc-300 font-sans font-medium">{project.client}</span>
                  </div>
                )}
                {project.year && (
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-zinc-600" /> YEAR</span>
                    <span className="text-zinc-300">{project.year}</span>
                  </div>
                )}
                {isShortForm && project.views && (
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500 flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-zinc-600" /> VIEWS</span>
                    <span className="text-accent font-sans font-semibold">{project.views}</span>
                  </div>
                )}
                {isLongForm && project.views && (
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500 flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-zinc-600" /> AUDIENCE</span>
                    <span className="text-zinc-300">{project.views} VIEWS</span>
                  </div>
                )}
                {isLongForm && project.role && (
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500 flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-zinc-600" /> ROLE</span>
                    <span className="text-zinc-300 font-sans font-medium text-right">{project.role}</span>
                  </div>
                )}
                {project.duration && (
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-zinc-600" /> DURATION</span>
                    <span className="text-zinc-300">{project.duration}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tags footer */}
            <div className="border-t border-[#1d1d22] pt-6 mt-6">
              <div className="flex items-center gap-1.5 mb-2.5 text-[10px] font-mono tracking-wider text-zinc-500">
                <Tag className="w-3 h-3" /> TECHNOLOGIES USED
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800/80 rounded-xs px-2.5 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile Navigation controls */}
            <div className="flex items-center justify-between gap-4 pt-6 mt-6 border-t border-[#1d1d22] md:hidden">
              <button
                onClick={onPrev}
                className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-accent transition-colors py-2"
              >
                <ChevronLeft className="w-4 h-4" /> PREVIOUS
              </button>
              <button
                onClick={onNext}
                className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-accent transition-colors py-2"
              >
                NEXT <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
