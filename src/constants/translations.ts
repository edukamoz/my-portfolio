// src/constants/translations.ts

export const TRANSLATIONS = {
  PT: {
    nav: ["Home", "Sobre", "Projetos", "Skills", "Contato"],
  },
  EN: {
    nav: ["Home", "About", "Projects", "Skills", "Contact"],
  },
  ES: {
    nav: ["Inicio", "Sobre mí", "Proyectos", "Habilidades", "Contacto"],
  },
};

export const LANGUAGES = [
  { code: "PT", name: "Português", flag: "🇧🇷" },
  { code: "EN", name: "English", flag: "🇺🇸" },
  { code: "ES", name: "Español", flag: "🇪🇸" },
];

// Nossos IDs das sections nunca mudam (para o scroll funcionar)
export const SECTION_IDS = ["home", "sobre", "projetos", "skills", "contato"];
