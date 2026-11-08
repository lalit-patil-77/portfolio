import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

import CustomCursor from './components/CustomCursor';
import CinematicIntro from './components/CinematicIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SkillsRow from './components/SkillsRow';
import ProjectsRow, { projectsData } from './components/ProjectsRow';
import ProjectModal from './components/ProjectModal';
import EducationRow from './components/EducationRow';
import CertificationsRow from './components/CertificationsRow';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  // Play intro only once per browser session
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem('hasSeenIntro');
    } catch (e) {
      return true;
    }
  });

  const [selectedProject, setSelectedProject] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 450);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="relative min-h-screen bg-[#090611] text-white overflow-x-hidden selection:bg-red-600/30 selection:text-white">
      {/* Custom Animated Desktop Cursor */}
      <CustomCursor />

      {/* Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 h-[3px] z-[60]"
        style={{
          width: progressWidth,
          background: 'linear-gradient(90deg, #E50914, #A855F7, #3B82F6, #06B6D4)',
        }}
      />

      {/* Full-Screen Cinematic Intro */}
      {showIntro && <CinematicIntro onComplete={handleIntroComplete} />}

      {/* Main Streaming Platform Layout */}
      {!showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.85 }}
        >
          <Navbar />

          <main className="relative">
            {/* 1. Hero / Home */}
            <Hero />

            <div className="section-divider" />

            {/* 2. About Me */}
            <About />

            <div className="section-divider" />

            {/* 3. Technical Skills */}
            <SkillsRow />

            <div className="section-divider" />

            {/* 4. Featured Projects – 3 Real Projects */}
            <ProjectsRow
              projects={projectsData}
              onViewDetails={(project) => setSelectedProject(project)}
            />

            <div className="section-divider" />

            {/* 5. Education */}
            <EducationRow />

            <div className="section-divider" />

            {/* 6. Certifications */}
            <CertificationsRow />

            <div className="section-divider" />

            {/* 7. Contact */}
            <Contact />
          </main>

          {/* 8. Footer */}
          <Footer />

          {/* Interactive Project Details Modal */}
          <ProjectModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />

          {/* Glowing Back-to-Top Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: showBackToTop ? 1 : 0,
              scale: showBackToTop ? 1 : 0.8,
              pointerEvents: showBackToTop ? 'auto' : 'none',
            }}
            transition={{ duration: 0.25 }}
            onClick={scrollToTop}
            className="fixed bottom-7 right-7 z-40 w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-purple-600 text-white flex items-center justify-center shadow-lg hover:shadow-[0_0_25px_rgba(229,9,20,0.65)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border border-white/20"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}

export default App;
