import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/theme";
import { LANGUAGES, SECTION_IDS } from "../constants/translations";
import { useWindowWidth } from "../hooks/useWindowWidth";

interface NavProps {
  active: string;
  onNav: (item: string) => void;
  scrolled: boolean;
  currentLang: string;
  onLangChange: (lang: string) => void;
  navItems: string[];
}

export function Nav({
  active,
  onNav,
  scrolled,
  currentLang,
  onLangChange,
  navItems,
}: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const width = useWindowWidth();
  const isMobile = width < 768;

  const currentLangData =
    LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  const handleNavPress = (item: string, index: number) => {
    onNav(
      SECTION_IDS[index] === "sobre"
        ? "Sobre"
        : SECTION_IDS[index] === "projetos"
          ? "Projetos"
          : SECTION_IDS[index] === "contato"
            ? "Contato"
            : SECTION_IDS[index] === "skills"
              ? "Skills"
              : "Home",
    );
    setMobileOpen(false);

    if (Platform.OS === "web") {
      const targetId = SECTION_IDS[index];
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleLangSelect = (code: string) => {
    onLangChange(code);
    setLangMenuOpen(false);
  };

  return (
    <View
      style={[
        styles.navContainer,
        {
          paddingHorizontal: isMobile ? 20 : 60,
          paddingVertical: isMobile ? 16 : 20,
          backgroundColor: scrolled ? "rgba(5,5,5,0.95)" : "transparent",
          borderBottomWidth: scrolled ? 1 : 0,
          borderBottomColor: "rgba(0,240,255,0.08)",
          position: (Platform.OS === "web" ? "fixed" : "absolute") as any,
          ...(Platform.OS === "web"
            ? ({ backdropFilter: "blur(20px)" } as any)
            : {}),
        },
      ]}
    >
      {/* Logo */}
      <Pressable onPress={() => handleNavPress(navItems[0], 0)}>
        <Text style={styles.logo}>
          EDUARDO<Text style={{ color: COLORS.secondary }}>.</Text>KAMO
        </Text>
      </Pressable>

      <View style={styles.rightContainer}>
        {/* Menu Desktop */}
        {!isMobile && (
          <View style={styles.desktopMenu}>
            {navItems.map((item, index) => {
              const isActive =
                active.toLowerCase() === SECTION_IDS[index].toLowerCase();
              return (
                <Pressable
                  key={item}
                  onPress={() => handleNavPress(item, index)}
                >
                  {({ hovered }: any) => (
                    <View>
                      <Text
                        style={[
                          styles.navLinkText,
                          isActive && { color: COLORS.primary },
                          hovered && { color: COLORS.primary },
                        ]}
                      >
                        {item}
                      </Text>
                      <View
                        style={[
                          styles.navLinkUnderline,
                          (isActive || hovered) && { width: "100%" },
                        ]}
                      />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        )}

        {/* Botão Dropdown de Idiomas */}
        <View style={{ position: "relative", zIndex: 1000 }}>
          <Pressable
            onPress={() => setLangMenuOpen(!langMenuOpen)}
            style={({ pressed, hovered }: any) => [
              styles.langButton,
              (pressed || hovered || langMenuOpen) && {
                borderColor: COLORS.primary,
              },
            ]}
          >
            <Text style={styles.langText}>
              {currentLangData.flag} {currentLangData.code} ▼
            </Text>
          </Pressable>

          {/* Lista Flutuante de Idiomas */}
          {langMenuOpen && (
            <View style={styles.langDropdown}>
              {LANGUAGES.map((lang) => (
                <Pressable
                  key={lang.code}
                  onPress={() => handleLangSelect(lang.code)}
                  style={({ hovered, pressed }: any) => [
                    styles.langOption,
                    (hovered || pressed) && {
                      backgroundColor: "rgba(0,240,255,0.1)",
                    },
                    currentLang === lang.code && {
                      backgroundColor: "rgba(0,240,255,0.15)",
                    },
                  ]}
                >
                  <Text style={styles.langOptionText}>
                    {lang.flag} {lang.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        {/* Hamburguer Mobile */}
        {isMobile && (
          <Pressable
            onPress={() => setMobileOpen(!mobileOpen)}
            style={{ padding: 4, marginLeft: 16 }}
          >
            <View style={{ gap: 5 }}>
              {[0, 1, 2].map((i) => (
                <View
                  key={i}
                  style={[
                    styles.hamburgerLine,
                    mobileOpen &&
                      i === 0 && {
                        transform: [{ rotate: "45deg" }, { translateY: 6 }],
                      },
                    mobileOpen && i === 1 && { transform: [{ scaleX: 0 }] },
                    mobileOpen &&
                      i === 2 && {
                        transform: [{ rotate: "-45deg" }, { translateY: -6 }],
                      },
                  ]}
                />
              ))}
            </View>
          </Pressable>
        )}
      </View>

      {/* Menu Mobile Aberto */}
      {isMobile && mobileOpen && (
        <View style={styles.mobileMenu}>
          {navItems.map((item, index) => (
            <Pressable
              key={item}
              style={{ paddingVertical: 12 }}
              onPress={() => handleNavPress(item, index)}
            >
              <Text style={[styles.navLinkText, { fontSize: 13 }]}>{item}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 500,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontFamily: "Orbitron",
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.primary,
    letterSpacing: 4,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  desktopMenu: {
    flexDirection: "row",
    gap: 40,
    alignItems: "center",
    marginRight: 32,
  },
  langButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(0,240,255,0.3)",
    borderRadius: 6,
    backgroundColor: "rgba(0,240,255,0.05)",
  },
  langText: {
    fontFamily: "ShareTechMono",
    fontSize: 12,
    color: COLORS.text,
  },
  langDropdown: {
    position: "absolute",
    top: 40,
    right: 0,
    backgroundColor: "rgba(10, 10, 22, 0.95)",
    borderWidth: 1,
    borderColor: "rgba(0,240,255,0.2)",
    borderRadius: 6,
    minWidth: 140,
    paddingVertical: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  langOption: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  langOptionText: {
    fontFamily: "ShareTechMono",
    fontSize: 13,
    color: COLORS.text,
  },
  hamburgerLine: {
    width: 22,
    height: 1,
    backgroundColor: COLORS.primary,
  },
  navLinkText: {
    fontFamily: "Orbitron",
    fontSize: 10,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: COLORS.textMuted,
  },
  navLinkUnderline: {
    position: "absolute",
    bottom: -4,
    left: 0,
    height: 1,
    width: 0,
    backgroundColor: COLORS.primary,
  },
  mobileMenu: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: "rgba(5,5,5,0.98)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,240,255,0.1)",
    padding: 20,
    gap: 8,
  },
});
