import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, Download, Mail, User, ChevronDown, Sparkles, Terminal, BarChart2 } from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';

// Floating background particle component
const FloatingParticles = () => {
  const particles = Array.from({ length: 24 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((_, i) => {
        const size = (i % 4) + 2;
        const colors = [
          'rgba(229, 9, 20, 0.4)',
          'rgba(168, 85, 247, 0.4)',
          'rgba(59, 130, 246, 0.4)',
          'rgba(6, 182, 212, 0.4)',
          'rgba(236, 72, 153, 0.4)',
        ];
        const color = colors[i % colors.length];
        const startX = (i * 4.2) % 100;
        const duration = 14 + (i % 10);
        const delay = (i * 0.7) % 6;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${startX}%`,
              backgroundColor: color,
              boxShadow: `0 0 ${size * 3}px ${color}`,
            }}
            initial={{ y: '105vh', opacity: 0 }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.8, 0.8, 0],
              x: [0, (i % 2 === 0 ? 30 : -30), 0],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: 'linear',
            }}
          />
        );
      })}
    </div>
  );
};

// 3D Tilt Card for profile picture
const TiltProfileCard = () => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-14deg', '14deg']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative w-64 h-80 sm:w-72 sm:h-[360px] lg:w-[320px] lg:h-[400px] cursor-pointer group"
    >
      {/* Outer Multi-Color Neon Halo */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-60 group-hover:opacity-100 blur-2xl transition-all duration-700 pointer-events-none -z-10"
        style={{
          background:
            'conic-gradient(from 180deg at 50% 50%, #E50914 0deg, #A855F7 120deg, #3B82F6 240deg, #E50914 360deg)',
        }}
      />

      {/* Frame Border with Animated Gradient */}
      <div
        className="absolute -inset-[2px] rounded-2xl p-[2px] -z-5"
        style={{
          background:
            'linear-gradient(135deg, rgba(229,9,20,0.8), rgba(168,85,247,0.8), rgba(59,130,246,0.8))',
        }}
      />

      {/* Main Glass Card Face */}
      <div
        className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#181126] via-[#100b1a] to-[#090611] border border-white/10 flex flex-col items-center justify-center overflow-hidden p-6 shadow-2xl"
        style={{ transform: 'translateZ(30px)' }}
      >
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(229,9,20,0.3) 0%, transparent 60%)',
          }}
        />

        {/* Profile Avatar Container */}
        <div
          className="relative"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-2 border-purple-500/40 group-hover:border-red-500/70 transition-all duration-500 shadow-[0_0_25px_rgba(168,85,247,0.35)] overflow-hidden p-0.5 bg-gradient-to-tr from-red-600 via-purple-600 to-blue-600">
            <img
              src="/profile.jpg"
              alt="Lalit Patil"
              className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Floating Online / Active Badge */}
          <span className="absolute bottom-1 right-2 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#100b1a]" />
          </span>
        </div>

        {/* Card Details */}
        <div
          className="mt-6 text-center"
          style={{ transform: 'translateZ(50px)' }}
        >
          <h3 className="text-xl font-bold font-display text-white tracking-wide">
            LALIT PATIL
          </h3>
          <p className="text-xs uppercase tracking-widest text-purple-400 font-semibold mt-1">
            Data & Web Developer
          </p>
          <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            B.Tech Computer Science & DS
          </p>
        </div>

        {/* Floating Mini Badges */}
        <div
          className="absolute top-4 left-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] text-gray-300 backdrop-blur-md"
          style={{ transform: 'translateZ(45px)' }}
        >
          <BarChart2 size={12} className="text-red-400" />
          <span>Analytics</span>
        </div>

        <div
          className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] text-gray-300 backdrop-blur-md"
          style={{ transform: 'translateZ(45px)' }}
        >
          <Terminal size={12} className="text-blue-400" />
          <span>Code</span>
        </div>
      </div>
    </motion.div>
  );
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const Hero = () => {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ backgroundColor: '#090611' }}
    >
      {/* Floating Ambient Particles */}
      <FloatingParticles />

      {/* ---- Animated Gradient Blobs ---- */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          top: '-5%',
          right: '-5%',
          background:
            'radial-gradient(circle, rgba(229,9,20,0.22) 0%, rgba(249,115,22,0.12) 50%, transparent 70%)',
          filter: 'blur(110px)',
          borderRadius: '50%',
        }}
        animate={{ x: [0, 40, -30, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 460,
          height: 460,
          bottom: '5%',
          left: '-6%',
          background:
            'radial-gradient(circle, rgba(168,85,247,0.22) 0%, rgba(59,130,246,0.14) 50%, transparent 70%)',
          filter: 'blur(110px)',
          borderRadius: '50%',
        }}
        animate={{ x: [0, -30, 30, 0], y: [0, 30, -35, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 380,
          height: 380,
          bottom: '15%',
          left: '42%',
          background:
            'radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(236,72,153,0.14) 50%, transparent 70%)',
          filter: 'blur(100px)',
          borderRadius: '50%',
        }}
        animate={{ scale: [1, 1.15, 0.95, 1], opacity: [0.18, 0.28, 0.15, 0.18] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ---- Main Content ---- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-16">
        {/* Left: Text Content */}
        <div className="flex-[0.6] flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Welcome Tag */}
          <motion.div
            {...fadeUp(0.1)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/15 border border-red-500/30 text-xs uppercase tracking-[0.22em] font-semibold mb-5 text-red-400"
          >
            <Sparkles size={12} className="text-red-400 animate-pulse" />
            <span>WELCOME TO MY WORLD</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            {...fadeUp(0.2)}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-4 text-white font-display tracking-tight"
            style={{
              textShadow:
                '0 0 40px rgba(229,9,20,0.35), 0 0 80px rgba(168,85,247,0.2)',
            }}
          >
            LALIT PATIL
          </motion.h1>

          {/* Role - gradient text */}
          <motion.p
            {...fadeUp(0.3)}
            className="text-xl sm:text-2xl font-bold mb-4 bg-gradient-to-r from-red-500 via-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            Aspiring Data Analyst | Web Developer
          </motion.p>

          {/* Tagline */}
          <motion.p
            {...fadeUp(0.4)}
            className="text-gray-300 text-base sm:text-lg max-w-xl italic mb-8 leading-relaxed"
          >
            "Turning Data Into Insights. Turning Ideas Into Digital Experiences."
          </motion.p>

          {/* Buttons */}
          <motion.div
            {...fadeUp(0.5)}
            className="flex flex-col sm:flex-row flex-wrap gap-3.5 mb-8 w-full sm:w-auto"
          >
            {/* Explore My Portfolio */}
            <button
              onClick={() => scrollTo('#projects')}
              className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm text-white overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.45)] hover:shadow-[0_0_35px_rgba(229,9,20,0.7)] cursor-pointer"
              style={{ backgroundColor: '#E50914' }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Play size={16} className="relative z-10 fill-white group-hover:scale-110 transition-transform" />
              <span className="relative z-10">Explore My Portfolio</span>
            </button>

            {/* Download Resume */}
            <a
              href="resume.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-white border border-white/25 hover:border-white/80 transition-all duration-300 hover:bg-white/10 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] cursor-pointer"
            >
              <Download size={16} />
              <span>Download Resume</span>
            </a>

            {/* Contact Me */}
            <button
              onClick={() => scrollTo('#contact')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm text-white border border-purple-500/40 hover:border-purple-400 transition-all duration-300 hover:bg-purple-600/15 backdrop-blur-sm hover:shadow-[0_0_20px_rgba(168,85,247,0.35)] cursor-pointer"
            >
              <Mail size={16} />
              <span>Contact Me</span>
            </button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            {...fadeUp(0.6)}
            className="flex items-center gap-3.5"
          >
            <span className="text-xs uppercase tracking-wider text-gray-500 mr-1 font-semibold">
              Connect:
            </span>
            {[
              { icon: Github, href: 'https://github.com/lalit-patil-77', label: 'GitHub' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:patillalit215@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full border border-white/15 bg-white/[0.03] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-red-500/50 hover:shadow-[0_0_15px_rgba(229,9,20,0.3)] transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D Tilt Profile Card */}
        <motion.div
          {...fadeUp(0.5)}
          className="flex-[0.4] flex items-center justify-center perspective-[1000px]"
        >
          <TiltProfileCard />
        </motion.div>
      </div>

      {/* ---- Scroll Down Indicator ---- */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-400 hover:text-white cursor-pointer z-10 transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        onClick={() => scrollTo('#about')}
      >
        <span className="text-[11px] uppercase tracking-[0.25em] font-medium">
          Scroll Down
        </span>
        <ChevronDown size={18} className="text-red-500 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;
