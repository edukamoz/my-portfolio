import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS, FONTS } from "../constants/theme";
import { useWindowWidth } from "../hooks/useWindowWidth";

export function HomeSection() {
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isSmallMobile = width < 480;

  const [typed, setTyped] = useState("");
  const textToType = "FULL-STACK & MOBILE DEVELOPER";

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const flickerAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setTyped(textToType.slice(0, i));
      i++;
      if (i > textToType.length) clearInterval(timer);
    }, 60);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -12,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(flickerAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(flickerAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(flickerAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    return () => clearInterval(timer);
  }, []);

  const handleScrollTo = (id: string) => {
    if (Platform.OS === "web") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <View
      nativeID="home"
      style={[
        styles.container,
        {
          paddingHorizontal: isMobile ? 24 : 60,
          paddingTop: isMobile ? 120 : 0,
          paddingBottom: isMobile ? 60 : 0,
        },
      ]}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Text style={styles.sectionLabel}>◈ Disponível para Projetos ◈</Text>

        {/* Título Principal com efeito Float */}
        <Animated.View style={{ transform: [{ translateY: floatAnim }] }}>
          {(() => {
            const titleSize = isSmallMobile ? 42 : isMobile ? 58 : 88;
            return (
              <Text
                style={[
                  styles.mainTitle,
                  {
                    fontSize: titleSize,
                    lineHeight: titleSize * 1.1, // Calcula a altura exata em pixels!
                  },
                ]}
              >
                EDUARDO{"\n"}KAMO
              </Text>
            );
          })()}
        </Animated.View>

        {/* Subtítulo a ser digitado */}
        <View style={styles.typewriterContainer}>
          <Text
            style={[
              styles.typewriterText,
              { fontSize: isSmallMobile ? 12 : 15 },
            ]}
          >
            {typed}
          </Text>
          <Animated.Text style={[styles.cursor, { opacity: flickerAnim }]}>
            _
          </Animated.Text>
        </View>

        <Text style={[styles.description, { fontSize: isMobile ? 15 : 17 }]}>
          Construindo experiências digitais de alto impacto na interseção entre
          design e tecnologia. Especializado em React Native, sistemas
          distribuídos e interfaces do futuro.
        </Text>

        {/* Botões de Ação */}
        <View style={styles.actionsContainer}>
          <Pressable
            onPress={() => handleScrollTo("projetos")}
            style={({ pressed }) => [
              styles.btnCta,
              pressed && { backgroundColor: "rgba(0,240,255,0.2)" },
            ]}
          >
            <Text style={styles.btnCtaText}>Ver Projetos</Text>
          </Pressable>

          <Pressable
            onPress={() => handleScrollTo("contato")}
            style={({ pressed }) => [
              styles.btnSecondary,
              pressed && { backgroundColor: "rgba(168,85,247,0.15)" },
            ]}
          >
            <Text style={styles.btnSecondaryText}>Entre em Contato</Text>
          </Pressable>
        </View>

        {/* Estatísticas */}
        <View style={[styles.statsContainer, { gap: isSmallMobile ? 24 : 48 }]}>
          {[
            ["1", "Ano Exp."],
            ["10+", "Projetos"],
          ].map(([n, l]) => (
            <View key={l} style={styles.statItem}>
              <Text
                style={[
                  styles.statNumber,
                  { fontSize: isSmallMobile ? 28 : 36 },
                ]}
              >
                {n}
              </Text>
              <Text style={styles.statLabel}>{l}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      {/* Indicador de Scroll */}
      <Animated.View
        style={[
          styles.scrollIndicator,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={styles.scrollText}>SCROLL</Text>
        <View style={styles.scrollLine} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: (Platform.OS === "web" ? "100vh" : 800) as any,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    width: "100%",
  },
  sectionLabel: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    letterSpacing: 4,
    color: COLORS.primary,
    textTransform: "uppercase",
    opacity: 0.7,
    marginBottom: 24,
  },
  mainTitle: {
    fontFamily: FONTS.orbitron,
    fontWeight: "900",
    textAlign: "center",
    color: COLORS.primary,
    textShadowColor: "rgba(0,240,255,0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
    marginBottom: 16,
  },
  typewriterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    minHeight: 24,
  },
  typewriterText: {
    fontFamily: FONTS.mono,
    color: COLORS.primary,
    letterSpacing: 4,
  },
  cursor: {
    fontFamily: FONTS.mono,
    fontSize: 15,
    color: COLORS.primary,
    textShadowColor: COLORS.primary,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  description: {
    maxWidth: 520,
    textAlign: "center",
    color: COLORS.textMuted,
    lineHeight: 28,
    marginBottom: 48,
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  btnCta: {
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: "transparent",
  },
  btnCtaText: {
    fontFamily: FONTS.orbitron,
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  btnSecondary: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderWidth: 1,
    borderColor: "rgba(168,85,247,0.5)",
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  btnSecondaryText: {
    fontFamily: FONTS.orbitron,
    color: COLORS.secondary,
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 64,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontFamily: FONTS.orbitron,
    fontWeight: "700",
    color: COLORS.primary,
    textShadowColor: "rgba(0,240,255,0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  statLabel: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: COLORS.textDark,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginTop: 4,
  },
  scrollIndicator: {
    position: "absolute",
    bottom: 40,
    alignItems: "center",
    gap: 8,
  },
  scrollText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    letterSpacing: 3,
    color: COLORS.textDark,
  },
  scrollLine: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.primary,
    opacity: 0.5,
  },
});
