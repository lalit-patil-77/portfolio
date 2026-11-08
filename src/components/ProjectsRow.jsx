import React, { useState } from 'react';
import { ExternalLink, ShoppingCart, Car, Wrench, Shield, Sparkles, Layers } from 'lucide-react';
import { Github } from './SocialIcons';
import ContentRow from './ContentRow';

export const projectsData = [
  {
    number: '01',
    title: 'Mobile Shop Management & Point of Sale System',
    shortTitle: 'Mobile Shop Management & POS',
    description:
      'A clean, modern, secure and functional PHP + MySQL based Mobile Shop Management System designed for commercial inventory management, fast checkout, stock tracking and business analytics.',
    note: 'Commercial PHP + MySQL Point of Sale & Inventory Platform',
    tech: ['PHP', 'MySQL', 'Tailwind CSS', 'JavaScript', 'Chart.js'],
    features: [
      'Product and Inventory Management',
      'POS Billing and Invoicing',
      'Stock Tracking and Low Stock Alerts',
      'Customer Management',
      'Staff Management',
      'Sales Analytics and Dashboard',
      'Secure Authentication and Role-Based Access',
    ],
    accent: '#E50914',
    badge: 'Commercial POS System',
    liveUrl: 'https://mobileshop.freehosting.dev/login.php',
    githubUrl: 'https://github.com/lalit-patil-77/Mobile-Shop-Management-System',
    icon: ShoppingCart,
  },
  {
    number: '02',
    title: 'Car Showroom Website',
    shortTitle: 'Car Showroom Website',
    description:
      'Developed a modern and responsive car showroom website with attractive UI and interactive navigation.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    features: [
      'Car Search',
      'Price Filtering',
      'Featured Cars Section',
      'Responsive Layout',
      'Interactive Navigation',
    ],
    accent: '#06B6D4',
    badge: 'Modern Responsive Web',
    liveUrl: 'https://car-showroom-ten-fawn.vercel.app/',
    githubUrl: 'https://github.com/lalit-patil-77/Car-Showroom',
    icon: Car,
  },
  {
    number: '03',
    title: 'Online Plumbing Services – Booking & Management',
    shortTitle: 'Online Plumbing Services',
    description:
      'A full-stack web application designed to automate discovering and booking professional plumbing services through a centralized digital platform.',
    tech: ['JavaScript ES6+', 'Node.js', 'Express.js', 'HTML5', 'CSS3', 'MySQL'],
    features: [
      'Service Discovery',
      'Online Booking Management',
      'Admin Dashboard',
      'MySQL Database',
      'CRUD Operations',
      'REST API Integration',
    ],
    accent: '#A855F7',
    badge: 'Full-Stack Web App',
    liveUrl: 'https://plumbing-services-kappa.vercel.app/',
    githubUrl: 'https://github.com/lalit-patil-77/Plumbing-Services',
    icon: Wrench,
  },
];

const ProjectCard = ({ project, onViewDetails }) => {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 12, y: -y * 12 });
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHovered(true);

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  const IconComponent = project.icon || Layers;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative min-w-[320px] sm:min-w-[380px] md:min-w-[440px] lg:min-w-[480px] flex-shrink-0 rounded-2xl overflow-hidden cursor-default group perspective-[1000px]"
      style={{
        transform: hovered
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(1.025, 1.025, 1.025)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: hovered
          ? 'transform 0.12s ease-out, box-shadow 0.3s ease'
          : 'transform 0.5s ease-out, box-shadow 0.5s ease',
        boxShadow: hovered
          ? `0 20px 45px -10px ${project.accent}35, 0 0 25px ${project.accent}20`
          : '0 10px 30px -15px rgba(0,0,0,0.7)',
        scrollSnapAlign: 'start',
      }}
    >
      {/* Dynamic Cursor-Tracking Glow Border */}
      <div
        className="absolute -inset-[1.5px] rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          background: hovered
            ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${project.accent}, rgba(255,255,255,0.1) 40%, transparent 80%)`
            : 'rgba(255, 255, 255, 0.08)',
          zIndex: 0,
        }}
      />

      {/* Main Card Body */}
      <div className="relative z-10 w-full h-full bg-gradient-to-b from-[#161024] via-[#0e0918] to-[#090611] rounded-2xl overflow-hidden border border-white/10 flex flex-col">
        {/* Cinematic Preview Stage */}
        <div
          className="relative h-48 sm:h-52 w-full flex flex-col items-center justify-center overflow-hidden border-b border-white/10"
          style={{
            background: `linear-gradient(135deg, ${project.accent}25 0%, rgba(9,6,17,0.95) 70%)`,
          }}
        >
          {/* Radial Center Accent */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${project.accent}40 0%, transparent 70%)`,
            }}
          />

          {/* Grid lines background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Animated Central Graphic */}
          <div
            className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundColor: `${project.accent}20`,
              boxShadow: `0 0 35px ${project.accent}40`,
            }}
          >
            <IconComponent
              className="w-10 h-10 transition-transform duration-300"
              style={{ color: project.accent }}
            />
          </div>

          {/* Category Pill on top-left */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white">
            <Sparkles size={11} style={{ color: project.accent }} />
            <span>{project.badge}</span>
          </div>

          {/* Number on top-right */}
          <div
            className="absolute top-4 right-4 z-20 text-xs font-black tracking-widest px-2.5 py-0.5 rounded-full"
            style={{
              backgroundColor: `${project.accent}25`,
              color: project.accent,
              border: `1px solid ${project.accent}40`,
            }}
          >
            0{project.number}
          </div>

          {/* Live indicator dot */}
          <div className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px] text-gray-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active Deployment</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-display font-bold text-white group-hover:text-purple-200 transition-colors line-clamp-1">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-xs sm:text-sm mt-2.5 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/10 text-[11px] text-gray-300 font-medium"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
            {/* View Details */}
            <button
              onClick={() => onViewDetails?.(project)}
              className="flex-1 min-w-[100px] px-3.5 py-2 rounded-xl text-xs font-semibold text-white transition-all shadow-md hover:shadow-lg cursor-pointer"
              style={{
                backgroundColor: project.accent,
                boxShadow: `0 0 15px ${project.accent}40`,
              }}
            >
              Details
            </button>

            {/* Live Demo Link */}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[100px] px-3 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all flex items-center justify-center gap-1.5 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
            >
              <ExternalLink size={13} />
              <span>Live Demo</span>
            </a>

            {/* GitHub Link */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/15 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all hover:border-white/30"
              title="View Source on GitHub"
            >
              <Github size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsRow = ({ projects, onViewDetails }) => {
  const displayProjects = projects || projectsData;

  return (
    <section id="projects">
      <ContentRow
        title="Featured Projects"
        subtitle="Real-world applications with live demos and source code"
        accentColor="#E50914"
      >
        {displayProjects.map((project) => (
          <ProjectCard
            key={project.number}
            project={project}
            onViewDetails={onViewDetails}
          />
        ))}
      </ContentRow>
    </section>
  );
};

export default ProjectsRow;
