import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award, Calendar, TrendingUp } from 'lucide-react';
import ContentRow from './ContentRow';

const educationData = [
  {
    icon: GraduationCap,
    degree: 'B.Tech in Computer Engineering & Data Science',
    institution: 'G. H. Raisoni Institute of Business Management & Engineering, Jalgaon',
    stats: [
      { icon: BookOpen, label: '4th Year' },
      { icon: Award, label: 'CGPA: 7.19' },
    ],
    footer: 'Expected Graduation: 2027',
  },
  {
    icon: BookOpen,
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Maharashtra State Board',
    stats: [
      { icon: Calendar, label: '2023' },
      { icon: TrendingUp, label: '79.33%' },
    ],
    footer: null,
  },
];

const EducationRow = () => {
  return (
    <section id="education">
      <ContentRow
        title="Education"
        subtitle="Academic background"
        accentColor="#06B6D4"
      >
        {educationData.map((edu, index) => {
          const IconComponent = edu.icon;
          return (
            <motion.div
              key={index}
              className="min-w-[300px] md:min-w-[380px] group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#06B6D4]/0 to-[#06B6D4]/0 group-hover:from-[#06B6D4]/20 group-hover:to-[#06B6D4]/5 transition-all duration-500 blur-sm opacity-0 group-hover:opacity-100" />

              <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-6 group-hover:border-[#06B6D4]/30 transition-all duration-500 h-full">
                <IconComponent className="w-10 h-10 text-[#06B6D4]" />

                <h3 className="text-lg md:text-xl font-display font-bold text-white mt-3">
                  {edu.degree}
                </h3>

                <p className="text-gray-400 text-sm mt-1">{edu.institution}</p>

                <div className="mt-4 flex gap-4">
                  {edu.stats.map((stat, sIndex) => {
                    const StatIcon = stat.icon;
                    return (
                      <span
                        key={sIndex}
                        className="flex items-center gap-1.5 text-sm text-gray-300 bg-white/5 rounded-full px-3 py-1"
                      >
                        <StatIcon className="w-3.5 h-3.5 text-[#06B6D4]" />
                        {stat.label}
                      </span>
                    );
                  })}
                </div>

                {edu.footer && (
                  <p className="text-xs text-gray-500 mt-3">{edu.footer}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </ContentRow>
    </section>
  );
};

export default EducationRow;
