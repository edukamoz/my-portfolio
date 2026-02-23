import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AboutSection } from "./src/components/AboutSection";
import { ContactSection } from "./src/components/ContactSection";
import { Footer } from "./src/components/Footer";
import { HomeSection } from "./src/components/HomeSection";
import { Nav } from "./src/components/Nav";
import { ProjectsSection } from "./src/components/ProjectsSection";
import { SkillsSection } from "./src/components/SkillsSection";
import { StarField } from "./src/components/StarField";
import { COLORS, FONTS } from "./src/constants/theme";
import { TRANSLATIONS } from "./src/constants/translations";
import { useCursor } from "./src/hooks/useCursor";
export default function App() {
  const [active, setActive] = React.useState("Home");
  const { outer, inner } = useCursor();
  const scrollRef = useRef<ScrollView>(null);
  const [scrolled, setScrolled] = useState(false); // Fundo da Nav
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [currentLang, setCurrentLang] = useState<"PT" | "EN" | "ES">("PT");
  const navItems = TRANSLATIONS[currentLang].nav;

  // Mantemos o CSS global mínimo apensa para aplicar no `body` da Web,
  // como a font-family global, o background escuro e o esconder o cursor nativo
  useEffect(() => {
    if (Platform.OS === "web") {
      const style = document.createElement("style");
      style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600&family=Share+Tech+Mono&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #050505; color: #e2e8f0; font-family: 'Rajdhani', sans-serif; overflow-x: hidden; cursor: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #00f0ff44; border-radius: 2px; }
        ::selection { background: rgba(0,240,255,0.3); color: #fff; }
        .cursor-outer { position: fixed; width: 32px; height: 32px; border: 1px solid rgba(0,240,255,0.6); border-radius: 50%; pointer-events: none; z-index: 9999; transition: transform 0.15s ease, opacity 0.15s ease; transform: translate(-50%, -50%); }
        .cursor-inner { position: fixed; width: 6px; height: 6px; background: #00f0ff; border-radius: 50%; pointer-events: none; z-index: 9999; transform: translate(-50%, -50%); box-shadow: 0 0 8px #00f0ff; }
        @media (max-width: 768px) { body { cursor: auto; } .cursor-outer, .cursor-inner { display: none; } }
      `;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    }
  }, []);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    setScrolled(offsetY > 40);
    setShowTopBtn(offsetY > 400);

    if (offsetY < 500) {
      setActive("Home");
    } else if (offsetY >= 500 && offsetY < 1300) {
      setActive("Sobre");
    } else if (offsetY >= 1300 && offsetY < 2300) {
      setActive("Projetos");
    } else if (offsetY >= 2300 && offsetY < 3100) {
      setActive("Skills");
    } else if (offsetY >= 3100) {
      setActive("Contato");
    }
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={styles.root}>
      {Platform.OS === "web" && (
        <>
          <div ref={outer} className="cursor-outer" />
          <div ref={inner} className="cursor-inner" />
        </>
      )}

      <StarField />
      <Nav
        active={active}
        onNav={setActive}
        scrolled={scrolled}
        currentLang={currentLang}
        onLangChange={(lang) => setCurrentLang(lang as any)}
        navItems={navItems}
      />

      {/* No React Native o <main> torna-se numa ScrollView se quisermos rolagem nativa,
          mas na Web o body já rola nativamente. */}
      <ScrollView
        ref={scrollRef}
        style={{ zIndex: 1 }}
        onScroll={handleScroll}
        scrollEventThrottle={16} // ⚠️ OBRIGATÓRIO: garante que o onScroll seja lido a 60fps
      >
        <HomeSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
        <Footer />
      </ScrollView>

      {showTopBtn && (
        <Pressable onPress={scrollToTop} style={styles.scrollTopBtn}>
          <Text style={styles.scrollTopText}>↑</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollTopBtn: {
    position: "absolute",
    bottom: 40,
    right: 40,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(10, 10, 22, 0.8)",
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
    // Efeito de sombra cyberpunk
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  scrollTopText: {
    color: COLORS.primary,
    fontSize: 20,
    fontFamily: FONTS.orbitron,
    fontWeight: "bold",
  },
});
