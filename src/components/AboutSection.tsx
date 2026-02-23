import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TIMELINE } from "../constants/data";
import { COLORS, FONTS } from "../constants/theme";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useWindowWidth } from "../hooks/useWindowWidth";

export function AboutSection() {
  const sectionRef = useRef<any>(null);
  const visible = useIntersectionObserver(sectionRef);
  const width = useWindowWidth();
  const isMobile = width < 768;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleHoverIn = () => {
    if (Platform.OS === "web") {
      Animated.spring(scaleAnim, {
        toValue: 1.08, // Aumenta 8%
        friction: 4, // Deixa o efeito "bouncy" (elástico)
        useNativeDriver: true,
      }).start();
    }
  };

  const handleHoverOut = () => {
    if (Platform.OS === "web") {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <View
      nativeID="sobre"
      ref={Platform.OS === "web" ? sectionRef : null}
      style={[
        styles.sectionContainer,
        {
          paddingHorizontal: isMobile ? 24 : 60,
          paddingVertical: isMobile ? 80 : 120,
        },
      ]}
    >
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <Text style={styles.sectionLabel}>// 01. SOBRE MIM</Text>

        <Text style={[styles.title, { fontSize: isMobile ? 28 : 42 }]}>
          Quem sou <Text style={styles.titleHighlight}>eu?</Text>
        </Text>

        <View
          style={[styles.contentGrid, isMobile && { flexDirection: "column" }]}
        >
          {/* Avatar / Visual */}
          {/* Avatar / Visual */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarWrapper}>
              {/* Anéis de Órbita */}
              {[120, 145, 170].map((r, i) => (
                <View
                  key={i}
                  style={[
                    styles.orbitRing,
                    {
                      width: r * 2,
                      height: r * 2,
                      borderColor: `rgba(${
                        i === 0
                          ? "0,240,255"
                          : i === 1
                            ? "168,85,247"
                            : "192,192,208"
                      }, 0.15)`,
                    },
                  ]}
                />
              ))}

              {/* Core (Centro com a sua foto) */}
              <Pressable
                // @ts-ignore - onHoverIn/Out são suportados no RN Web
                onHoverIn={handleHoverIn}
                onHoverOut={handleHoverOut}
                style={styles.avatarCore}
              >
                <Animated.View
                  style={[
                    styles.imageContainer,
                    { transform: [{ scale: scaleAnim }] },
                  ]}
                >
                  {/* O Círculo de Fundo (A "janela" de onde você sai) */}
                  {/* <View style={styles.circleBackground} /> */}

                  {/* A Sua Foto PNG com fundo transparente */}
                  <Image
                    source={require("../../assets/minha-foto.png")} // Caminho da sua imagem
                    style={styles.myImage}
                    resizeMode="contain"
                  />
                </Animated.View>
              </Pressable>
            </View>
          </View>

          {/* Conteúdo Texto e Timeline */}
          <View style={styles.textContent}>
            <Text style={styles.description}>
              Sou um desenvolvedor apaixonado por criar soluções que vivem na
              interseção entre{" "}
              <Text style={{ color: COLORS.primary }}>design futurista</Text> e{" "}
              <Text style={{ color: COLORS.secondary }}>
                engenharia de software
              </Text>
              . Contemplando um aprendizado contínuo em solucionar problemas e
              trazendo inovação com produtos elegantes, escaláveis e seguros.
            </Text>

            {/* Timeline */}
            <View style={styles.timelineContainer}>
              {/* Linha vertical à esquerda */}
              <View style={styles.timelineLine} />

              {TIMELINE.map((item, i) => (
                <View key={i} style={styles.timelineItem}>
                  {/* Ponto / Diamante */}
                  <View style={styles.timelineDot} />

                  <View style={styles.timelineHeader}>
                    <Text style={styles.timelineYear}>{item.year}</Text>
                    <Text style={styles.timelineTitle}>{item.title}</Text>
                  </View>

                  <Text style={styles.timelineCompany}>{item.company}</Text>
                  <Text style={styles.timelineDesc}>{item.desc}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
  },
  sectionLabel: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    letterSpacing: 4,
    color: COLORS.primary,
    textTransform: "uppercase",
    opacity: 0.7,
    marginBottom: 12,
  },
  title: {
    fontFamily: FONTS.orbitron,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 60,
  },
  titleHighlight: {
    color: COLORS.primary,
    textShadowColor: "rgba(0,240,255,0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  contentGrid: {
    flexDirection: "row",
    gap: 48,
    alignItems: "flex-start",
  },
  avatarContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarWrapper: {
    width: 260,
    height: 260,
    alignItems: "center",
    justifyContent: "center",
  },
  orbitRing: {
    position: "absolute",
    borderWidth: 1,
    borderRadius: 999,
  },
  avatarCore: {
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    // O Brilho Neon (Shadow) fica no Pressable externo para não ser cortado
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 10,
    borderRadius: 110,
  },
  //   avatarCore: {
  //   width: 220, // Aumentei um pouco para a foto respirar
  //   height: 220,
  //   alignItems: "center",
  //   justifyContent: "flex-end", // Alinha a imagem na base
  //   position: "relative",
  // },
  textContent: {
    flex: 1.4,
  },
  description: {
    color: COLORS.textMuted,
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 32,
  },
  timelineContainer: {
    position: "relative",
  },
  timelineLine: {
    position: "absolute",
    left: 10,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: COLORS.primary,
  },
  timelineItem: {
    paddingLeft: 36,
    marginBottom: 28,
    position: "relative",
  },
  timelineDot: {
    position: "absolute",
    left: 4,
    top: 6,
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.background,
    transform: [{ rotate: "45deg" }],
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 3,
  },
  timelineHeader: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    marginBottom: 4,
  },
  timelineYear: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: COLORS.primary,
  },
  timelineTitle: {
    fontFamily: FONTS.orbitron,
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.text,
  },
  timelineCompany: {
    fontSize: 11,
    color: COLORS.secondary,
    marginBottom: 4,
    letterSpacing: 1,
  },
  timelineDesc: {
    fontSize: 14,
    color: COLORS.textDark,
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 110, // Deixa perfeitamente redondo (metade da largura)
    overflow: "hidden", // ✂️ ISSO AQUI CORTA A BASE QUADRADA DA FOTO
    backgroundColor: "rgba(0,240,255,0.15)", // A cor de fundo do círculo
    alignItems: "center",
    justifyContent: "flex-end", // Alinha a sua foto lá na base do círculo
  },
  circleBackground: {
    position: "absolute",
    bottom: 0,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.primary, // Cor característica do site
    opacity: 0.15, // Um brilho suave de fundo
    // Efeito glow neon
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 10,
  },
  myImage: {
    width: 200,
    height: 250,
  },
});
