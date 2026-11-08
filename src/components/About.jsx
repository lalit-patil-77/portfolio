import { motion } from 'framer-motion';
import { User, GraduationCap, BarChart3, Globe } from 'lucide-react';

const paragraphs = [
  {
    text: 'I am an aspiring Data Analyst and Web Developer currently pursuing B.Tech in Computer Engineering & Data Science.',
    borderColor: 'border-red-500',
  },
  {
    text: 'I have practical experience working with Excel, SQL, Tableau, Looker Studio, and dashboard development.',
    borderColor: 'border-purple-500',
  },
  {
    text: 'I am passionate about transforming raw data into meaningful insights through data analysis and visualization.',
    borderColor: 'border-blue-500',
  },
  {
    text: 'I also enjoy developing responsive websites and full-stack web applications.',
    borderColor: 'border-cyan-500',
  },
  {
    text: 'I have strong analytical, problem-solving, teamwork, and communication skills.',
    borderColor: 'border-pink-500',
  },
];

const quickStats = [
  { icon: GraduationCap, label: 'B.Tech 4th Year', color: 'text-red-500' },
  { icon: BarChart3, label: 'Data Analytics', color: 'text-purple-500' },
  { icon: Globe, label: 'Web Development', color: 'text-blue-500' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const About = () => {
  return (
    <section id="about" className="py-20 px-4 md:px-8 lg:px-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
          About Me
        </h2>
        <div className="w-16 h-1 bg-red-600 rounded-full mt-2" />
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-12">
        {/* Left Column - Profile Image */}
        <motion.div
          className="lg:col-span-2 flex justify-center lg:justify-start"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-full max-w-sm">
            {/* Decorative glow behind image */}
            <div className="absolute -inset-2 bg-gradient-to-br from-red-500/20 via-purple-500/10 to-cyan-500/20 rounded-2xl blur-xl opacity-60" />

            {/* Cinematic framed portrait */}
            <div className="relative aspect-[3/4] bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/15 rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src="/profile.jpg"
                alt="Lalit Patil - Data Analyst & Web Developer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Cinematic bottom gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Bottom tag / badge on photo */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-base font-display">Lalit Patil</p>
                  <p className="text-purple-400 text-xs font-medium">Aspiring Data Analyst</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Bio */}
        <motion.div
          className="lg:col-span-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {paragraphs.map((para, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`border-l-2 ${para.borderColor} pl-4 py-2 mb-4`}
            >
              <p className="text-gray-300 leading-relaxed">{para.text}</p>
            </motion.div>
          ))}

          {/* Quick Stats */}
          <motion.div
            className="mt-8 flex flex-wrap gap-6"
            variants={itemVariants}
          >
            {quickStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="flex items-center gap-2">
                  <IconComponent className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-gray-300 text-sm">{stat.label}</span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
