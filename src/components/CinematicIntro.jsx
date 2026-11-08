import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Volume2, VolumeX, FastForward, Sparkles } from 'lucide-react';

const playCinematicSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    // Deep cinematic bass boom (ta-dum feel) with harmonic resonance
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const osc3 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 2.0);

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(65, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 2.2);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(130, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(65, ctx.currentTime + 1.8);

    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(195, ctx.currentTime);
    osc3.frequency.exponentialRampToValueAtTime(97.5, ctx.currentTime + 1.5);

    gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.55, ctx.currentTime + 0.15);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.6);

    osc1.connect(filter);
    osc2.connect(filter);
    osc3.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc3.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 2.6);
    osc2.stop(ctx.currentTime + 2.6);
    osc3.stop(ctx.currentTime + 2.6);
  } catch (e) {
    // Audio autoplay restrictions or unsupported
  }
};

const CinematicIntro = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const name = 'LALIT PATIL';
  const letters = name.split('');

  useEffect(() => {
    const timer = setTimeout(() => {
      handleFinish();
    }, 3400);
    return () => clearTimeout(timer);
  }, []);

  const handleFinish = () => {
    try {
      sessionStorage.setItem('hasSeenIntro', 'true');
    } catch (e) {
      // Ignore if cookies/storage disabled
    }
    setVisible(false);
  };

  const toggleSound = () => {
    if (!soundEnabled) {
      setSoundEnabled(true);
      playCinematicSound();
    } else {
      setSoundEnabled(false);
    }
  };

  const handleExitComplete = () => {
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#090611' }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.85, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          {/* Top Controls: Sound & Skip */}
          <div className="absolute top-6 right-6 z-30 flex items-center gap-3">
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-xs text-gray-300 hover:text-white transition-all backdrop-blur-md cursor-pointer"
              title={soundEnabled ? 'Mute sound' : 'Enable cinematic sound'}
            >
              {soundEnabled ? (
                <>
                  <Volume2 size={14} className="text-red-500 animate-pulse" />
                  <span className="font-medium">Sound ON</span>
                </>
              ) : (
                <>
                  <VolumeX size={14} className="text-gray-400" />
                  <span>Sound OFF</span>
                </>
              )}
            </button>
            <button
              onClick={handleFinish}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600/30 hover:bg-red-600/50 border border-red-500/40 text-xs text-white transition-all backdrop-blur-md cursor-pointer hover:shadow-[0_0_15px_rgba(229,9,20,0.4)]"
            >
              <span>Skip Intro</span>
              <FastForward size={14} />
            </button>
          </div>

          {/* Dramatic Red Radial Glow */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 650,
              height: 650,
              background:
                'radial-gradient(circle, rgba(229,9,20,0.42) 0%, rgba(229,9,20,0.12) 40%, transparent 70%)',
            }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: [0, 0.75, 0.45, 0.85, 0.6],
              scale: [0.4, 1.05, 0.95, 1.12, 1],
            }}
            transition={{
              duration: 3.0,
              ease: 'easeInOut',
              times: [0, 0.3, 0.5, 0.75, 1],
            }}
          />

          {/* Dramatic Purple Secondary Light Sweep */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 500,
              height: 500,
              background:
                'radial-gradient(circle, rgba(168,85,247,0.35) 0%, rgba(124,58,237,0.1) 45%, transparent 70%)',
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: [0, 0.3, 0.65, 0.4, 0.7],
              scale: [0.6, 0.9, 1.15, 1.0, 1.2],
            }}
            transition={{
              duration: 3.2,
              ease: 'easeInOut',
              delay: 0.2,
            }}
          />

          {/* Cinematic Horizontal Light Streak */}
          <motion.div
            className="absolute h-[1px] w-full max-w-4xl bg-gradient-to-r from-transparent via-red-500 to-transparent pointer-events-none opacity-40"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: [0, 1.2, 1], opacity: [0, 0.8, 0.3] }}
            transition={{ duration: 1.5, delay: 0.4 }}
          />

          {/* Name Letters with Cinematic Zoom and Stagger */}
          <motion.div
            className="relative flex flex-wrap items-center justify-center px-4 z-10"
            initial={{ scale: 0.35, opacity: 0, letterSpacing: '0.05em' }}
            animate={{ scale: 1, opacity: 1, letterSpacing: '0.08em' }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                className="text-white font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl select-none"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 900,
                  textShadow:
                    '0 0 30px rgba(229,9,20,0.55), 0 0 70px rgba(168,85,247,0.35)',
                  display: 'inline-block',
                  whiteSpace: 'pre',
                }}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.45,
                  delay: 0.25 + i * 0.05,
                  ease: 'easeOut',
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Expanding Dual Gradient Line */}
          <motion.div
            className="mt-6 z-10"
            style={{
              height: 3,
              background: 'linear-gradient(90deg, #E50914, #A855F7, #E50914)',
              borderRadius: 2,
              boxShadow: '0 0 15px rgba(229,9,20,0.6)',
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.0, ease: 'easeOut' }}
          />

          {/* Subtitle with shimmer */}
          <motion.div
            className="mt-6 flex items-center gap-2 tracking-[0.4em] uppercase select-none text-gray-400 font-medium text-xs sm:text-sm z-10"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4, ease: 'easeOut' }}
          >
            <Sparkles size={14} className="text-purple-400" />
            <span>CINEMATIC PORTFOLIO</span>
            <Sparkles size={14} className="text-red-500" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicIntro;
