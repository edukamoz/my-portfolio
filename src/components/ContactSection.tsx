import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { COLORS, FONTS } from "../constants/theme";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useWindowWidth } from "../hooks/useWindowWidth";

export function ContactSection() {
  const sectionRef = useRef<any>(null);
  const visible = useIntersectionObserver(sectionRef);
  const width = useWindowWidth();
  const isMobile = width < 768;

  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
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

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const sanitize = (str: string) =>
    str.replace(
      /[<>'"]/g,
      (c) =>
        ({ "<": "&lt;", ">": "&gt;", "'": "&#x27;", '"': "&quot;" })[c] || c,
    );

  const handleChange = useCallback(
    (field: keyof typeof form) => (text: string) => {
      const safeText = sanitize(text);
      setForm((prev) => ({ ...prev, [field]: safeText }));
    },
    [],
  );

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.msg) return;
    setStatus("sending");

    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", msg: "" });

      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  const socials = [
    { label: "GitHub", icon: "⌥", url: "https://github.com/edukamoz" },
    {
      label: "LinkedIn",
      icon: "◈",
      url: "https://linkedin.com/in/eduardo-kamo/",
    },
    {
      label: "Instagram",
      icon: "◎",
      url: "https://instagram.com/kamo_moveis/",
    },
    { label: "Email", icon: "✉", url: "mailto:eduardokamoz@gmail.com" },
  ];

  return (
    <View
      nativeID="contato"
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
        <Text style={styles.sectionLabel}>// 04. CONTATO</Text>
        <Text style={[styles.title, { fontSize: isMobile ? 28 : 42 }]}>
          Vamos <Text style={styles.titleHighlight}>construir</Text> algo?
        </Text>
        <Text style={styles.subtitle}>
          Aberto para freelance, colaborações e oportunidades full-time.
          Respondo em até 24h.
        </Text>

        <View style={[styles.grid, isMobile && { flexDirection: "column" }]}>
          {/* Formulário */}
          <View style={[styles.cardForm, { flex: 1 }]}>
            {status === "sent" ? (
              <View style={styles.successState}>
                <Text style={styles.successIcon}>✦</Text>
                <Text style={styles.successTitle}>Mensagem Enviada!</Text>
                <Text style={styles.successText}>Retorno em breve.</Text>
              </View>
            ) : (
              <View style={{ gap: 16 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Seu nome"
                  placeholderTextColor={COLORS.textDark}
                  value={form.name}
                  onChangeText={handleChange("name")}
                  maxLength={100}
                />
                <TextInput
                  style={styles.input}
                  placeholder="seu@email.com"
                  placeholderTextColor={COLORS.textDark}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={form.email}
                  onChangeText={handleChange("email")}
                  maxLength={200}
                />
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Conta-me sobre seu projeto..."
                  placeholderTextColor={COLORS.textDark}
                  multiline={true}
                  numberOfLines={5}
                  value={form.msg}
                  onChangeText={handleChange("msg")}
                  maxLength={2000}
                />

                <Pressable
                  onPress={handleSubmit}
                  disabled={status === "sending"}
                  style={({ pressed }) => [
                    styles.btnCta,
                    status === "sending" && { opacity: 0.7 },
                    pressed && { backgroundColor: "rgba(0,240,255,0.2)" },
                  ]}
                >
                  <Text
                    style={[
                      styles.btnCtaText,
                      status === "sending" && { color: COLORS.primary },
                    ]}
                  >
                    {status === "sending" ? "Enviando..." : "Enviar Mensagem"}
                  </Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* Socials & Info */}
          <View style={{ flex: 1, gap: 32 }}>
            <View>
              <Text style={styles.blockTitle}>REDES SOCIAIS</Text>
              <View style={{ gap: 12 }}>
                {socials.map((s) => (
                  <Pressable
                    key={s.label}
                    onPress={() => Linking.openURL(s.url)}
                    style={({ pressed, hovered }: any) => [
                      styles.socialCard,
                      (pressed || hovered) && {
                        borderColor: "rgba(0,240,255,0.4)",
                        transform: [{ translateX: 4 }],
                      },
                    ]}
                  >
                    <Text style={styles.socialIcon}>{s.icon}</Text>
                    <Text style={styles.socialLabel}>{s.label}</Text>
                    <Text style={styles.socialArrow}>↗</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Localização */}
            <View style={styles.locationCard}>
              <Text style={styles.blockTitle}>LOCALIZAÇÃO</Text>
              <Text style={styles.locationCity}>Votorantim, SP - Brasil</Text>
              <Text style={styles.locationDesc}>
                Disponível para remote global
              </Text>

              <View style={styles.statusRow}>
                <View style={styles.pulseContainer}>
                  {/* Anel animado pulsante */}
                  <Animated.View
                    style={[
                      styles.pulseRing,
                      {
                        transform: [
                          {
                            scale: pulseAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0.8, 2.2],
                            }),
                          },
                        ],
                        opacity: pulseAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 0],
                        }),
                      },
                    ]}
                  />
                  {/* Ponto sólido verde */}
                  <View style={styles.statusDot} />
                </View>
                <Text style={styles.statusText}>Disponível agora</Text>
              </View>
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
    marginBottom: 16,
  },
  titleHighlight: {
    color: COLORS.primary,
    textShadowColor: "rgba(0,240,255,0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  subtitle: {
    color: COLORS.textDark,
    marginBottom: 48,
    maxWidth: 440,
    lineHeight: 24,
    fontSize: 15,
  },
  grid: {
    flexDirection: "row",
    gap: 48,
  },
  cardForm: {
    backgroundColor: COLORS.glass,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 32,
  },
  input: {
    backgroundColor: "rgba(0,240,255,0.03)",
    borderWidth: 1,
    borderColor: "rgba(0,240,255,0.15)",
    color: COLORS.text,
    fontFamily: FONTS.rajdhani,
    fontSize: 15,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 4,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  btnCta: {
    marginTop: 8,
    paddingVertical: 14,
    paddingHorizontal: 36,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  btnCtaText: {
    fontFamily: FONTS.orbitron,
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  successState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  successIcon: {
    fontSize: 48,
    color: COLORS.primary,
    marginBottom: 16,
  },
  successTitle: {
    fontFamily: FONTS.orbitron,
    color: COLORS.primary,
    fontSize: 16,
    marginBottom: 8,
  },
  successText: {
    color: COLORS.textDark,
    fontSize: 14,
  },
  blockTitle: {
    fontFamily: FONTS.mono,
    fontSize: 12,
    color: COLORS.textDark,
    letterSpacing: 2,
    marginBottom: 16,
  },
  socialCard: {
    backgroundColor: COLORS.glass,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
  socialIcon: {
    color: COLORS.primary,
    fontSize: 18,
    width: 24,
    textAlign: "center",
  },
  socialLabel: {
    fontFamily: FONTS.orbitron,
    fontSize: 11,
    letterSpacing: 2,
    color: COLORS.textMuted,
  },
  socialArrow: {
    marginLeft: "auto",
    color: COLORS.textDark,
    fontSize: 12,
  },
  locationCard: {
    backgroundColor: COLORS.glass,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 20,
  },
  locationCity: {
    fontFamily: FONTS.orbitron,
    fontSize: 13,
    color: COLORS.primary,
  },
  locationDesc: {
    fontSize: 13,
    color: COLORS.textDark,
    marginTop: 4,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  pulseContainer: {
    width: 8,
    height: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
    shadowColor: COLORS.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 3,
  },
  pulseRing: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.success,
  },
  statusText: {
    fontSize: 12,
    color: COLORS.success,
  },
});
