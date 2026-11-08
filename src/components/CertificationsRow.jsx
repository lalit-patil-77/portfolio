import { motion } from 'framer-motion';
import { Award, Shield, ShieldCheck, Brain, Briefcase, Cpu, Trophy } from 'lucide-react';
import ContentRow from './ContentRow';

const certifications = [
  {
    title: 'JavaScript Training Completion Certificate',
    category: 'Development',
    icon: Award,
  },
  {
    title: 'SQL Injection Defense: Secure Apps Like A Pro',
    category: 'Security',
    icon: Shield,
  },
  {
    title: 'Gen AI Tools – NASSCOM',
    category: 'AI & Innovation',
    icon: Brain,
  },
  {
    title: 'Data Analytics – NASSCOM',
    category: 'Data Science',
    icon: ShieldCheck,
  },
  {
    title: 'SWAYAM-NPTEL – E-Business Certification',
    category: 'Business',
    icon: Briefcase,
  },
  {
    title: 'Internet of Things (IoT) Workshop Participation',
    category: 'IoT',
    icon: Cpu,
  },
  {
    title: 'Smart India Hackathon – Inter College Participation',
    category: 'Hackathon',
    icon: Trophy,
  },
];

const CertificationsRow = () => {
  return (
    <section id="certifications">
      <ContentRow
        title="Certifications & Achievements"
        subtitle="Professional development"
        accentColor="#EAB308"
      >
        {certifications.map((cert, index) => {
          const IconComponent = cert.icon;
          return (
            <motion.div
              key={index}
              className="min-w-[240px] md:min-w-[280px] group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-[#EAB308]/0 to-[#EAB308]/0 group-hover:from-[#EAB308]/20 group-hover:to-[#EAB308]/5 transition-all duration-500 blur-sm opacity-0 group-hover:opacity-100" />

              <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-5 group-hover:border-[#EAB308]/30 group-hover:bg-white/10 transition-all duration-500 h-full flex flex-col">
                <IconComponent className="w-8 h-8 text-[#EAB308]" />

                <h3 className="text-base font-semibold text-white mt-3">
                  {cert.title}
                </h3>

                {/* Thin gradient line */}
                <div className="h-0.5 bg-gradient-to-r from-[#EAB308]/50 to-transparent mt-2" />

                <div className="mt-auto pt-3">
                  <span className="text-xs bg-white/5 text-gray-400 rounded-full px-3 py-1">
                    {cert.category}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </ContentRow>
    </section>
  );
};

export default CertificationsRow;
