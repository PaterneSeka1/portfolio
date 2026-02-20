"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import {
  FaGitAlt, FaFigma, FaLinux, FaGithub, FaNodeJs
} from "react-icons/fa";

import {
  SiPostman, SiMysql, SiMongodb, SiPrisma
} from "react-icons/si";

import { useThemeStore } from "../../store/themeStore";

function SkillBar({ skill, theme }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{
        scale: 1.03,
        rotate: 0.3,
        boxShadow:
          theme === "dark"
            ? "0 0 25px rgba(139,92,246,0.45)"
            : "0 0 25px rgba(59,130,246,0.35)",
      }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer p-3 rounded-xl
      bg-white/10 dark:bg-black/20
      border border-gray-200/20 dark:border-gray-700/30
      backdrop-blur-md
      "
    >
      <div className="flex justify-between mb-2">
        <span className="font-semibold tracking-wide">{skill.name}</span>
        <span className="text-sm opacity-75">{skill.level}%</span>
      </div>

      <div className="relative w-full h-3 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`h-3 rounded-full relative overflow-hidden
            ${
              theme === "dark"
                ? "bg-gradient-to-r from-sky-500 via-sky-500 to-sky-600"
                : "bg-gradient-to-r from-sky-500 via-sky-500 to-sky-600"
            }
          `}
        >
          {hovered && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-white/30 opacity-90"
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

function SkillSection({ title, skills, theme }) {
  const textColor = "text-sky-600 dark:text-sky-300";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: true }}
      className="space-y-6 p-4 rounded-xl"
    >
      <h2 className={`text-3xl font-extrabold tracking-tight ${textColor}`}>
        {title}
      </h2>

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <SkillBar key={index} skill={skill} theme={theme} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const { theme } = useThemeStore();

  const [skills] = useState({
    frontend: [
      { name: "Vue.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "React.js", level: 88 },
    ],
    backend: [
      { name: "Laravel", level: 80 },
      { name: "NestJS", level: 78 },
      { name: "Flask", level: 70 },
      { name: "Express", level: 82 },
    ],
    mobile: [
      { name: "React Native", level: 60 },
    ],
  });

  const [tools] = useState([
    { name: "GitHub", icon: <FaGithub />, color: "text-slate-700 dark:text-slate-200" },
    { name: "Figma", icon: <FaFigma />, color: "text-slate-700 dark:text-slate-200" },
    { name: "Linux", icon: <FaLinux />, color: "text-slate-700 dark:text-slate-200" },
    { name: "Git", icon: <FaGitAlt />, color: "text-slate-700 dark:text-slate-200" },
    { name: "Postman", icon: <SiPostman />, color: "text-slate-700 dark:text-slate-200" },
    { name: "MongoDB", icon: <SiMongodb />, color: "text-slate-700 dark:text-slate-200" },
    { name: "Node.js", icon: <FaNodeJs />, color: "text-slate-700 dark:text-slate-200" },
    { name: "Prisma", icon: <SiPrisma />, color: "text-slate-700 dark:text-slate-200" },
    { name: "MySQL", icon: <SiMysql />, color: "text-slate-700 dark:text-slate-200" },
  ]);

  return (
    <main
      className={`relative transition-colors duration-700
        ${
          theme === "dark"
            ? "bg-gradient-to-b from-gray-900 to-black text-white"
            : "bg-gradient-to-b from-slate-200 via-slate-100 to-slate-200 text-slate-900"
        }`}
    >
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8 }}
      >
        <div
          className={`absolute top-1/2 left-1/2 w-[1300px] h-[1300px] rounded-full blur-[200px] opacity-25 animate-pulse -translate-x-1/2 -translate-y-1/2
          ${
            theme === "dark"
              ? "bg-purple-700/40"
              : "bg-blue-300/50"
          }`}
        />
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="section-wrap mt-2 space-y-12"
      >
        <div className="soft-card rounded-3xl px-6 py-8 text-center md:px-10">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            Mes compétences
          </h1>
          <p className="text-lg mt-3 opacity-80">
            Un aperçu structuré de mes expertises et technologies maîtrisées.
          </p>
        </div>

        <SkillSection title="Mobile" skills={skills.mobile} theme={theme} />
        <SkillSection title="Frontend" skills={skills.frontend} theme={theme} />
        <SkillSection title="Backend" skills={skills.backend} theme={theme} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="soft-card mt-4 rounded-3xl p-8 text-center"
        >
          <h2 className="text-4xl font-bold mb-10 text-sky-600 dark:text-sky-300">
            Outils et technologies
          </h2>

          <div className="flex flex-wrap justify-center gap-10">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.25,
                  rotate: 6,
                  y: -5,
                  transition: { duration: 0.3 },
                }}
                className={`flex flex-col items-center ${tool.color}`}
              >
                <div className="text-6xl mb-2">{tool.icon}</div>
                <span className="text-sm font-semibold tracking-wide">
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
}
