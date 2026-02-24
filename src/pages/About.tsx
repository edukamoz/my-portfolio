import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export function About() {
  const { t } = useLanguage();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const skills = [
    "React Native",
    "TypeScript",
    "Python",
    "C#",
    "React",
    "Vite",
    "TailwindCSS",
    "Zustand",
    "Clean Code",
    "Software Architecture",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="min-h-screen flex flex-col justify-center relative z-10 text-white px-8 md:px-24 pt-32 pb-16"
    >
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 md:order-1"
        >
          <h2 className="font-display text-6xl md:text-8xl uppercase tracking-tighter mb-8 mix-blend-difference whitespace-pre-line">
            {t("about.title")}
          </h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-80 mb-6">
            {t("about.p1")}
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-80 mb-6">
            {t("about.p2")}
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-80">
            {t("about.p3")}
          </p>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8 order-1 md:order-2"
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-sm mx-auto aspect-square rounded-2xl overflow-hidden cursor-none shadow-2xl"
          >
            <motion.div
              style={{ transform: "translateZ(50px)" }}
              className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent z-10 pointer-events-none"
            />
            <img
              src="https://avatars.githubusercontent.com/u/106561111?v=4"
              alt="Eduardo Kamo"
              className="w-auto h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <div className="mt-8">
            <h3 className="text-sm uppercase tracking-[0.2em] opacity-50 mb-4">
              {t("about.focus")}
            </h3>
            <p className="text-xl font-medium">{t("about.focus.text")}</p>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] opacity-50 mb-4">
              {t("about.tech")}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05, duration: 0.5 }}
                  className="px-4 py-2 border border-white/20 rounded-full text-sm font-medium tracking-wider uppercase hover:bg-white hover:text-black transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
