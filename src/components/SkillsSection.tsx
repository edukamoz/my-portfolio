import React, { useEffect, useRef } from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import { ORBIT_SKILLS, SKILLS } from "../constants/data";
import { COLORS, FONTS } from "../constants/theme";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useWindowWidth } from "../hooks/useWindowWidth";

interface Skill {
  name: string;
  level: number;
  color: string;
}

function SkillBar({
  skill,
  index,
  visible,
}: {
  skill: Skill;
  index: number;
  visible: boolean;
}) {
  const slideAnim = useRef(new Animated.Value(-20)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 600,
          delay: index * 80,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          delay: index * 80,
          useNativeDriver: true,
        }),
        Animated.timing(widthAnim, {
          toValue: skill.level,
          duration: 1200,
          delay: index * 100,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Animated.View
      style={{
        opacity: opacityAnim,
        transform: [{ translateX: slideAnim }],
        marginBottom: 20,
      }}
    >
      <View style={styles.skillHeader}>
        <Text style={styles.skillName}>{skill.name}</Text>
        <Text style={[styles.skillLevel, { color: skill.color }]}>
          {skill.level}%
        </Text>
      </View>

      <View style={styles.progressBarBg}>
        <Animated.View
          style={[
            styles.progressBarFill,
            {
              backgroundColor: skill.color,
              width: widthAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
              shadowColor: skill.color,
            },
          ]}
        />
      </View>
    </Animated.View>
  );
}

export function SkillsSection() {
  const sectionRef = useRef<any>(null);
  const visible = useIntersectionObserver(sectionRef);
  const width = useWindowWidth();
  const isMobile = width < 768;

  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <View
      nativeID="skills"
      ref={Platform.OS === "web" ? sectionRef : null}
      style={[
        styles.sectionContainer,
        {
          paddingHorizontal: isMobile ? 24 : 60,
          paddingVertical: isMobile ? 80 : 120,
        },
      ]}
    >
      <Animated.View style={{ opacity: opacityAnim, marginBottom: 60 }}>
        <Text style={styles.sectionLabel}>// 03. SKILLS</Text>
        <Text style={[styles.title, { fontSize: isMobile ? 28 : 42 }]}>
          Meu <Text style={styles.titleHighlight}>arsenal</Text> técnico
        </Text>
      </Animated.View>

      <View
        style={[styles.contentGrid, isMobile && { flexDirection: "column" }]}
      >
        {/* Órbita de Tecnologias (Escondido no mobile assim como o original) */}
        {!isMobile && (
          <View style={styles.orbitContainer}>
            <View style={styles.orbitWrapper}>
              {/* Núcleo (CODE CORE) */}
              <View style={styles.orbitCore}>
                <Text style={styles.orbitCoreText}>CODE{"\n"}CORE</Text>
              </View>

              {/* Anel Externo */}
              <View style={styles.orbitRing} />

              {/* Nodos ao redor da órbita */}
              {ORBIT_SKILLS.map((s, i) => {
                const rad = (s.angle * Math.PI) / 180;
                const r = 120;
                const x = Math.cos(rad) * r;
                const y = Math.sin(rad) * r;

                return (
                  <Animated.View
                    key={s.label}
                    style={[
                      styles.orbitNodeWrapper,
                      {
                        transform: [{ translateX: x }, { translateY: y }],
                        opacity: opacityAnim,
                      },
                    ]}
                  >
                    <View style={styles.orbitNode}>
                      <Text style={styles.orbitNodeText}>{s.label}</Text>
                    </View>
                  </Animated.View>
                );
              })}
            </View>
          </View>
        )}

        {/* Barras de Progresso */}
        <View style={styles.skillsList}>
          {SKILLS.map((s, i) => (
            <SkillBar key={s.name} skill={s} index={i} visible={visible} />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(0,240,255,0.03)",
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
  },
  titleHighlight: {
    color: COLORS.primary,
    textShadowColor: "rgba(0,240,255,0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  contentGrid: {
    flexDirection: "row",
    gap: 60,
    alignItems: "center",
  },
  orbitContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  orbitWrapper: {
    width: 280,
    height: 280,
    alignItems: "center",
    justifyContent: "center",
  },
  orbitCore: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "rgba(0,240,255,0.5)",
    backgroundColor: "rgba(0,240,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 5,
  },
  orbitCoreText: {
    fontFamily: FONTS.orbitron,
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 12,
  },
  orbitRing: {
    position: "absolute",
    width: 240,
    height: 240,
    borderWidth: 1,
    borderColor: "rgba(0,240,255,0.15)",
    borderRadius: 120,
  },
  orbitNodeWrapper: {
    position: "absolute",
  },
  orbitNode: {
    backgroundColor: "rgba(0,240,255,0.1)",
    borderWidth: 1,
    borderColor: "rgba(0,240,255,0.3)",
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  orbitNodeText: {
    fontFamily: FONTS.mono,
    fontSize: 9,
    color: COLORS.primary,
  },
  skillsList: {
    flex: 1,
  },
  skillHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  skillName: {
    fontFamily: FONTS.rajdhani,
    fontWeight: "600",
    fontSize: 14,
    color: "#c0c0d0",
  },
  skillLevel: {
    fontFamily: FONTS.mono,
    fontSize: 12,
  },
  progressBarBg: {
    height: 3,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 3,
  },
});
