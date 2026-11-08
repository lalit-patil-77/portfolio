import React, { useState } from 'react';
import {
  BarChart3,
  Database,
  Code,
  LineChart,
  GitBranch,
  FileSpreadsheet,
  Layout,
  Terminal,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { Github } from './SocialIcons';
import ContentRow from './ContentRow';

const iconMap = {
  Tableau: BarChart3,
  'Power BI': BarChart3,
  'Looker Studio': BarChart3,
  'Microsoft Excel': FileSpreadsheet,
  'Pivot Tables': FileSpreadsheet,
  'VLOOKUP/XLOOKUP': FileSpreadsheet,
  'Power Query': FileSpreadsheet,
  MySQL: Database,
  PostgreSQL: Database,
  SQLite: Database,
  Python: Terminal,
  C: Terminal,
  JavaScript: Code,
  HTML5: Layout,
  CSS3: Layout,
  'Data Analysis': LineChart,
  ETL: LineChart,
  'KPI Dashboards': LineChart,
  'Data Cleaning': LineChart,
  Reporting: LineChart,
  Git: GitBranch,
  GitHub: Github,
  'MS Office': Wrench,
};

const categories = [
  {
    name: 'Analytics',
    color: '#F97316',
    skills: [
      'Tableau',
      'Power BI',
      'Looker Studio',
      'Microsoft Excel',
      'Pivot Tables',
      'VLOOKUP/XLOOKUP',
      'Power Query',
    ],
  },
  {
    name: 'Databases',
    color: '#06B6D4',
    skills: ['MySQL', 'PostgreSQL', 'SQLite'],
  },
  {
    name: 'Programming',
    color: '#A855F7',
    skills: ['Python', 'C', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    name: 'BI & Data',
    color: '#22C55E',
    skills: ['Data Analysis', 'ETL', 'KPI Dashboards', 'Data Cleaning', 'Reporting'],
  },
  {
    name: 'Tools',
    color: '#3B82F6',
    skills: ['Git', 'GitHub', 'MS Office'],
  },
];

const allSkills = categories.flatMap((cat) =>
  cat.skills.map((skill) => ({
    name: skill,
    category: cat.name,
    color: cat.color,
  }))
);

const SkillCard = ({ skill }) => {
  const [hovered, setHovered] = useState(false);
  const IconComponent = iconMap[skill.name];

  return (
    <div
      className="relative min-w-[145px] sm:min-w-[165px] flex-shrink-0 rounded-xl p-4 flex flex-col items-center gap-3 cursor-default select-none group transition-all duration-300"
      style={{
        transform: hovered ? 'translateY(-6px) scale(1.05)' : 'translateY(0) scale(1)',
        backgroundColor: hovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? skill.color : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hovered
          ? `0 12px 25px -5px ${skill.color}35, 0 0 15px ${skill.color}20`
          : 'none',
        scrollSnapAlign: 'start',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Category tag */}
      <div className="flex items-center gap-1.5 self-start">
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{
            backgroundColor: skill.color,
            boxShadow: `0 0 8px ${skill.color}`,
          }}
        />
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          {skill.category}
        </span>
      </div>

      {/* Icon with glowing aura */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{
          backgroundColor: `${skill.color}18`,
          border: `1px solid ${skill.color}30`,
        }}
      >
        {IconComponent ? (
          <IconComponent
            className="w-6 h-6 transition-transform duration-300"
            style={{ color: skill.color }}
          />
        ) : (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ color: skill.color }}
          >
            {skill.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Skill name */}
      <span className="font-semibold text-white text-xs sm:text-sm text-center leading-snug group-hover:text-purple-200 transition-colors">
        {skill.name}
      </span>
    </div>
  );
};

const SkillsRow = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills =
    activeCategory === 'All'
      ? allSkills
      : allSkills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills">
      <ContentRow
        title="Trending Skills"
        subtitle="Technologies, platforms & analytics tools I work with"
        accentColor="#A855F7"
      >
        {/* Category quick filters */}
        <div className="col-span-full w-full flex items-center gap-2 mb-2 overflow-x-auto pb-1 scrollbar-none">
          {['All', ...categories.map((c) => c.name)].map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {filteredSkills.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </ContentRow>
    </section>
  );
};

export default SkillsRow;
