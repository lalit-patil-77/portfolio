import { motion } from 'framer-motion';
import { Heart, Mail, ArrowUp } from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/5">
      {/* Gradient accent line */}
      <div
        className="h-[2px] w-full"
        style={{
          background: 'linear-gradient(90deg, #E50914, #A855F7, #3B82F6, #06B6D4, #EC4899)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <span
              className="text-3xl font-display font-black"
              style={{
                background: 'linear-gradient(135deg, #E50914, #A855F7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              LP
            </span>
            <p className="text-gray-500 text-sm mt-2">
              Aspiring Data Analyst & Web Developer
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex justify-center gap-4"
          >
            {[
              { icon: Github, href: 'https://github.com/lalit-patil-77', label: 'GitHub' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:patillalit215@gmail.com', label: 'Email' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-right"
          >
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} <span className="text-white font-medium">LALIT PATIL</span>. All Rights Reserved.
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Designed & Developed by Lalit Patil
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
