import { motion } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function Contact() {
  const { t } = useLanguage();

  const links = [
    {
      name: "GitHub",
      url: "https://github.com/edukamoz",
      icon: <Github className="w-8 h-8" />,
      handle: "@edukamoz",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/eduardo-kamo/",
      icon: <Linkedin className="w-8 h-8" />,
      handle: "Eduardo Kamo",
    },
    {
      name: "Email",
      url: "mailto:eduardo.kamo@example.com", // Placeholder, user didn't provide email
      icon: <Mail className="w-8 h-8" />,
      handle: "Get in touch",
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
      <div className="max-w-4xl mx-auto w-full text-center">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl md:text-8xl uppercase tracking-tighter mb-8 mix-blend-difference whitespace-pre-line"
        >
          {t("contact.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl font-light opacity-80 mb-16 max-w-2xl mx-auto"
        >
          {t("contact.subtitle")}
        </motion.p>

        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
          {links.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.6 + index * 0.2,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col items-center gap-4 p-8 border border-white/10 hover:border-white/50 rounded-2xl bg-black/20 backdrop-blur-sm transition-all hover:-translate-y-2"
            >
              <div className="p-4 bg-white text-black rounded-full group-hover:scale-110 transition-transform">
                {link.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight">
                  {link.name}
                </h3>
                <p className="text-sm font-light opacity-60 mt-1">
                  {link.handle}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
