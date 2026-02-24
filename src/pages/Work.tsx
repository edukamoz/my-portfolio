import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export function Work() {
  const { t } = useLanguage();

  const projects = [
    {
      title: "Arcaderank",
      description: t("work.desc1"),
      tech: ["React", "Vite", "TailwindCSS", "TypeScript", "Zustand"],
      link: "https://github.com/edukamoz/arcaderank-frontend",
    },
    {
      title: "DelBicos",
      description: t("work.desc2"),
      tech: ["React Native", "TypeScript", "Node", "Docker", "PostgreeSQL"],
      link: "https://www.delbicos.com.br/",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="min-h-screen flex flex-col justify-center relative z-10 text-white px-8 md:px-24 pt-32 pb-16"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl md:text-8xl uppercase tracking-tighter mb-16 mix-blend-difference whitespace-pre-line"
        >
          {t("work.title")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              key={project.title}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.4 + index * 0.2,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group block relative p-8 border border-white/10 hover:border-white/50 transition-colors rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              <div className="relative z-10">
                <h3 className="text-3xl font-bold uppercase tracking-tight mb-4">
                  {project.title}
                </h3>
                <p className="text-lg font-light opacity-80 mb-8 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium uppercase tracking-wider border border-white/20 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
