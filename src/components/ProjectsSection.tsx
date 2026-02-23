import React, { useEffect, useRef } from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PROJECTS, Project } from "../constants/data";
import { COLORS, FONTS } from "../constants/theme";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useWindowWidth } from "../hooks/useWindowWidth";

interface ProjectCardProps {
  project: Project;
  index: number;
  visible: boolean;
  isMobile: boolean;
}

const ProjectCard = React.memo(
  ({ project, index, visible, isMobile }: ProjectCardProps) => {
    const slideAnim = useRef(new Animated.Value(40)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (visible) {
        Animated.parallel([
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 700,
            delay: index * 120,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 700,
            delay: index * 120,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }, [visible]);

    return (
      <Animated.View
        style={[
          styles.card,
          {
            width: isMobile ? "100%" : "48%",
            opacity: opacityAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Linha de sotaque (Accent line) no topo */}
        <View
          style={[
            styles.accentLine,
            { backgroundColor: project.color, shadowColor: project.color },
          ]}
        />

        <View style={styles.cardHeader}>
          <View
            style={[
              styles.iconBox,
              {
                backgroundColor: `${project.color}15`,
                borderColor: `${project.color}40`,
              },
            ]}
          >
            <Text style={[styles.iconText, { color: project.color }]}>
              {project.icon}
            </Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <Text style={styles.projectDesc}>{project.desc}</Text>
          </View>
        </View>

        {/* Tags de Tecnologia */}
        <View style={styles.techList}>
          {project.tech.map((t) => (
            <View
              key={t}
              style={[
                styles.techBadge,
                {
                  backgroundColor: `${project.color}10`,
                  borderColor: `${project.color}30`,
                },
              ]}
            >
              <Text style={[styles.techText, { color: project.color }]}>
                {t}
              </Text>
            </View>
          ))}
        </View>

        {/* Botões */}
        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.btnSecondary,
              pressed && { backgroundColor: "rgba(168,85,247,0.15)" },
            ]}
          >
            <Text style={styles.btnSecondaryText}>GitHub</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.btnSecondary,
              { borderColor: `${project.color}50` },
              pressed && { backgroundColor: `${project.color}15` },
            ]}
          >
            <Text style={[styles.btnSecondaryText, { color: project.color }]}>
              Demo →
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    );
  },
);

export function ProjectsSection() {
  const sectionRef = useRef<any>(null);
  const visible = useIntersectionObserver(sectionRef);
  const width = useWindowWidth();
  const isMobile = width < 768;

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <View
      nativeID="projetos"
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
          opacity: opacityAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <Text style={styles.sectionLabel}>// 02. PROJETOS</Text>
        <Text style={[styles.title, { fontSize: isMobile ? 28 : 42 }]}>
          O que eu <Text style={styles.titleHighlight}>construí</Text>
        </Text>
        <Text style={styles.subtitle}>
          Seleção de projetos que demonstram profundidade técnica e atenção ao
          detalhe.
        </Text>
      </Animated.View>

      {/* Grid simulado com Flex Wrap */}
      <View style={styles.grid}>
        {PROJECTS.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            visible={visible}
            isMobile={isMobile}
          />
        ))}
      </View>
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
    marginBottom: 16,
  },
  titleHighlight: {
    color: COLORS.secondary,
    textShadowColor: "rgba(168,85,247,0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  subtitle: {
    color: COLORS.textDark,
    marginBottom: 48,
    maxWidth: 500,
    lineHeight: 24,
    fontSize: 15,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 20,
  },
  card: {
    backgroundColor: COLORS.glass,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 28,
    position: "relative",
    overflow: "hidden",
  },
  accentLine: {
    position: "absolute",
    top: 0,
    left: 20,
    right: 20,
    height: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 22,
  },
  headerText: {
    flex: 1,
  },
  projectTitle: {
    fontFamily: FONTS.orbitron,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  projectDesc: {
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 20,
  },
  techList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  techBadge: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 3,
  },
  techText: {
    fontFamily: FONTS.mono,
    fontSize: 10,
    letterSpacing: 1,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  btnSecondary: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(168,85,247,0.5)",
    borderRadius: 4,
  },
  btnSecondaryText: {
    fontFamily: FONTS.orbitron,
    fontSize: 9,
    letterSpacing: 2,
    color: COLORS.secondary,
    textTransform: "uppercase",
  },
});
