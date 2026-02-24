import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../utils/cn";
import { useLanguage } from "../contexts/LanguageContext";
import { Globe, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.work"), path: "/work" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  const languages = [
    { code: "pt", label: "Português", flag: "🇧🇷" },
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "es", label: "Español", flag: "🇪🇸" },
  ] as const;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-6 md:p-8 z-50 flex justify-between items-center mix-blend-difference text-white">
        <Link
          to="/"
          className="font-display text-2xl tracking-widest uppercase"
        >
          Eduardo Kamo
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "text-sm font-medium uppercase tracking-widest relative overflow-hidden group",
                location.pathname === link.path
                  ? "opacity-100"
                  : "opacity-50 hover:opacity-100 transition-opacity",
              )}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 bottom-0 w-full h-[1px] bg-white"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}

          <div className="relative ml-4">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-sm font-medium uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity"
            >
              <Globe className="w-4 h-4" />
              {languages.find((l) => l.code === language)?.flag}
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-4 py-2 w-32 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as any);
                      setIsLangOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm font-medium uppercase tracking-widest hover:bg-white/10 transition-colors flex items-center gap-2",
                      language === lang.code ? "opacity-100" : "opacity-50",
                    )}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 opacity-70 hover:opacity-100 transition-opacity"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 text-white"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "font-display text-4xl uppercase tracking-widest",
                  location.pathname === link.path
                    ? "opacity-100"
                    : "opacity-50",
                )}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex gap-4 mt-8">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border border-white/10",
                    language === lang.code ? "bg-white/10" : "opacity-50",
                  )}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-xs uppercase tracking-widest">
                    {lang.code}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
