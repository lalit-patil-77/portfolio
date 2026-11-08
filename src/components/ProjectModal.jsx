import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ExternalLink, Sparkles, ShieldAlert, Layers } from 'lucide-react';
import { Github } from './SocialIcons';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', damping: 25, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    y: 30,
    scale: 0.96,
    transition: { duration: 0.2 },
  },
};

const ProjectModal = ({ project, isOpen, onClose }) => {
  // Escape key handler
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKey);
    }
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!project) return null;

  const IconComponent = project.icon || Layers;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-2xl bg-gradient-to-b from-[#181126] via-[#100b1a] to-[#090611] rounded-2xl border border-white/15 overflow-hidden relative max-h-[90vh] overflow-y-auto shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: `${project.accent}80 transparent`,
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/60 hover:bg-white/20 border border-white/10 transition-colors text-white/80 hover:text-white cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / Hero Graphic */}
            <div
              className="relative h-48 sm:h-56 flex flex-col items-center justify-center overflow-hidden border-b border-white/10"
              style={{
                background: `linear-gradient(180deg, ${project.accent}30 0%, ${project.accent}08 80%, transparent 100%)`,
              }}
            >
              {/* Radial backdrop */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${project.accent}35 0%, transparent 70%)`,
                }}
              />

              {/* Central Graphic */}
              <div
                className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl"
                style={{
                  backgroundColor: `${project.accent}20`,
                  boxShadow: `0 0 40px ${project.accent}50`,
                }}
              >
                <IconComponent
                  className="w-10 h-10"
                  style={{ color: project.accent }}
                />
              </div>

              {/* Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/15 text-xs font-semibold text-white">
                <Sparkles size={12} style={{ color: project.accent }} />
                <span>Project {project.number} • {project.badge}</span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                {project.title}
              </h2>

              {/* Description */}
              <p className="text-gray-300 text-sm sm:text-base mt-3 leading-relaxed">
                {project.description}
              </p>

              {/* Note for Project 1 (Mobile Shop POS) */}
              {project.number === '01' && (
                <div className="mt-4 p-3.5 rounded-xl bg-purple-900/20 border border-purple-500/30 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-purple-200 leading-relaxed">
                    <strong>Architecture Note:</strong> This is a secure PHP + MySQL commercial Point of Sale & Inventory Management System. It features role-based access control, transaction invoicing, and live stock tracking designed for retail operations.
                  </p>
                </div>
              )}

              {/* Key Features */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Key System Features
                </h3>
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features?.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: project.accent }}
                      />
                      <span className="text-gray-300 text-xs sm:text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology Stack */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tech?.map((t) => (
                    <span
                      key={t}
                      className="bg-white/10 border border-white/10 rounded-lg px-3.5 py-1.5 text-xs font-medium text-gray-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-white/10">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-all shadow-lg hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
                  style={{
                    backgroundColor: project.accent,
                    boxShadow: `0 0 25px ${project.accent}50`,
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Demo</span>
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-gray-200 border border-white/20 hover:border-white/60 hover:bg-white/10 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
