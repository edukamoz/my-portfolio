import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "pt" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.work": "Work",
    "nav.contact": "Contact",
    "home.role": "Software Developer",
    "home.explore": "Explore",
    "about.title": "About\nMe",
    "about.p1":
      "I am a Software Developer dedicated to bridging the gap between robust backend logic and fluid mobile experiences.",
    "about.p2":
      "My passion lies in creating clean, efficient code and scalable architectures within the JavaScript ecosystem, Python, and C#.",
    "about.p3":
      "Core philosophy: Building software that is not only functional but also maintainable and pleasant to use.",
    "about.focus": "Current Focus",
    "about.focus.text":
      "Deepening expertise in React Native for cross-platform mobile development and developing the 'Verdin' project.",
    "about.tech": "Tech Stack",
    "work.title": "Selected\nWork",
    "work.desc1":
      "Modern Game Hub SPA built with React, Vite & TailwindCSS. Implements custom Canvas game engines, global state management with Zustand, and seamless JWT authentication integration.",
    "work.desc2":
      "A cross-platform mobile application currently in development, focusing on fluid user experiences and robust backend integration.",
    "contact.title": "Let's\nConnect",
    "contact.subtitle":
      "Open to collaboration on innovative mobile apps and Python/C# backend systems.",
  },
  pt: {
    "nav.home": "Início",
    "nav.about": "Sobre",
    "nav.work": "Projetos",
    "nav.contact": "Contato",
    "home.role": "Desenvolvedor de Software",
    "home.explore": "Explorar",
    "about.title": "Sobre\nMim",
    "about.p1":
      "Sou um Desenvolvedor de Software dedicado a preencher a lacuna entre uma lógica de backend robusta e experiências móveis fluidas.",
    "about.p2":
      "Minha paixão é criar código limpo e eficiente, além de arquiteturas escaláveis no ecossistema JavaScript, Python e C#.",
    "about.p3":
      "Filosofia principal: Construir software que não seja apenas funcional, mas também sustentável e agradável de usar.",
    "about.focus": "Foco Atual",
    "about.focus.text":
      "Aprofundando conhecimentos em React Native para desenvolvimento mobile multiplataforma e desenvolvendo o projeto 'Verdin'.",
    "about.tech": "Tecnologias",
    "work.title": "Projetos em\nDestaque",
    "work.desc1":
      "Modern Game Hub SPA construído com React, Vite e TailwindCSS. Implementa motores de jogos personalizados em Canvas, gerenciamento de estado global com Zustand e integração perfeita de autenticação JWT.",
    "work.desc2":
      "Um aplicativo móvel multiplataforma atualmente em desenvolvimento, com foco em experiências de usuário fluidas e integração robusta de backend.",
    "contact.title": "Vamos\nConectar",
    "contact.subtitle":
      "Aberto a colaborações em aplicativos móveis inovadores e sistemas backend em Python/C#.",
  },
  es: {
    "nav.home": "Inicio",
    "nav.about": "Sobre mí",
    "nav.work": "Proyectos",
    "nav.contact": "Contacto",
    "home.role": "Desarrollador de Software",
    "home.explore": "Explorar",
    "about.title": "Sobre\nMí",
    "about.p1":
      "Soy un Desarrollador de Software dedicado a cerrar la brecha entre una lógica de backend robusta y experiencias móviles fluidas.",
    "about.p2":
      "Mi pasión es crear código limpio y eficiente, y arquitecturas escalables dentro del ecosistema JavaScript, Python y C#.",
    "about.p3":
      "Filosofía principal: Construir software que no solo sea funcional, sino también mantenible y agradable de usar.",
    "about.focus": "Enfoque Actual",
    "about.focus.text":
      "Profundizando conocimientos en React Native para desarrollo móvil multiplataforma y desarrollando el proyecto 'Verdin'.",
    "about.tech": "Tecnologías",
    "work.title": "Proyectos\nDestacados",
    "work.desc1":
      "Modern Game Hub SPA construido con React, Vite y TailwindCSS. Implementa motores de juegos personalizados en Canvas, gestión de estado global con Zustand e integración perfecta de autenticación JWT.",
    "work.desc2":
      "Una aplicación móvil multiplataforma actualmente en desarrollo, centrada en experiencias de usuario fluidas e integración robusta de backend.",
    "contact.title": "Vamos a\nConectar",
    "contact.subtitle":
      "Abierto a colaborar en aplicaciones móviles innovadoras y sistemas backend en Python/C#.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt"); // Default to PT as requested

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
