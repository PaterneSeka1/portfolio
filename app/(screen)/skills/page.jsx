"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { FaGitAlt, FaFigma, FaLinux, FaGithub, FaNodeJs } from "react-icons/fa";
import { SiPostman, SiMysql, SiMongodb, SiPrisma } from "react-icons/si";
import { useThemeStore } from "../../store/themeStore";

function SkillBar({ skill, theme }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{
        scale: 1.03,
        boxShadow:
          theme === "dark"
            ? "0 0 20px rgba(147, 51, 234, 0.7)"
            : "0 0 20px rgba(59, 130, 246, 0.7)",
      }}
      transition={{ duration: 0.3 }}
      className="cursor-pointer p-1 rounded-md"
    >
      <div className="flex justify-between mb-1">
        <span className="font-medium">{skill.name}</span>
        <span className="text-sm opacity-75">{skill.level}%</span>
      </div>

      <div className="relative w-full h-3 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className={`h-3 rounded-full relative overflow-hidden ${
            theme === "dark"
              ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400"
          }`}
        >
          {hovered && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "linear",
              }}
              className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 opacity-70 mix-blend-screen"
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

function SkillSection({ title, skills, theme, color }) {
  const textColor =
    color === "blue"
      ? "text-blue-500 dark:text-blue-400"
      : "text-green-500 dark:text-green-400";

  return (
    <motion.div
      initial={{ opacity: 0, x: color === "blue" ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="space-y-6"
    >
      <h2 className={`text-2xl font-semibold ${textColor}`}>{title}</h2>
      {skills.map((skill, index) => (
        <SkillBar key={index} skill={skill} theme={theme} />
      ))}
    </motion.div>
  );
}

export default function Skills() {
  const { theme, toggleTheme } = useThemeStore();
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
      {name : "React Native", level: 60},
    ],
  });

  const [tools] = useState([
    { name: "GitHub", icon: <FaGithub />, color: "text-gray-800 dark:text-gray-200" },
    { name: "Figma", icon: <FaFigma />, color: "text-pink-500" },
    { name: "Linux", icon: <FaLinux />, color: "text-yellow-500" },
    { name: "Git", icon: <FaGitAlt />, color: "text-orange-500" },
    { name: "Postman", icon: <SiPostman />, color: "text-orange-400" },
    { name: "MongoDB", icon: <SiMongodb />, color: "text-green-600" },
    { name: "Node.js", icon: <FaNodeJs />, color: "text-green-500" },
    { name: "Prisma", icon: <SiPrisma />, color: "text-blue-600" },
    { name: "MySQL", icon: <SiMysql />, color: "text-blue-600" },
  ]);

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12 transition-colors duration-700 
        ${theme === "dark"
          ? "bg-gradient-to-b from-gray-900 to-black text-white"
          : "bg-gradient-to-b from-gray-100 to-white text-gray-900"
        }`}
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div
          className={`absolute top-1/2 left-1/2 w-[1200px] h-[1200px] rounded-full blur-[180px] opacity-25 animate-pulse -translate-x-1/2 -translate-y-1/2 
          ${theme === "dark" ? "bg-indigo-600" : "bg-blue-300"}`}
        />
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-5xl mt-16 space-y-20"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">My Skills</h1>
          <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            Explore my technical skills and favorite tools
          </p>
        </div>

        <SkillSection title="Mobile" skills={skills.mobile} theme={theme} color="blue" />
        <SkillSection title="Frontend" skills={skills.frontend} theme={theme} color="blue" />
        <SkillSection title="Backend" skills={skills.backend} theme={theme} color="green" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold mb-8 text-pink-500 dark:text-pink-400">
            Tools & Technologies
          </h2>

          <div className="flex flex-wrap justify-center gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.2,
                  rotate: 10,
                  textShadow:
                    theme === "dark"
                      ? "0 0 15px rgba(236, 72, 153, 0.8)"
                      : "0 0 15px rgba(59, 130, 246, 0.8)",
                }}
                transition={{ duration: 0.3 }}
                className={`flex flex-col items-center ${tool.color}`}
              >
                <div className="text-5xl mb-2">{tool.icon}</div>
                <span className="text-sm font-medium">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
}
