import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS } from "../constants/theme";
import { useWindowWidth } from "../hooks/useWindowWidth";

export function Footer() {
  const width = useWindowWidth();
  const isMobile = width < 768;

  return (
    <View style={[styles.container, { paddingHorizontal: isMobile ? 24 : 60 }]}>
      <Text style={styles.logo}>
        EDUARDO<Text style={styles.dot}>.</Text>KAMO
      </Text>

      <Text style={styles.copyright}>
        © 2026 Eduardo Kamo · Built with React Native + Expo
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
  },
  logo: {
    fontFamily: FONTS.orbitron,
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "900",
    letterSpacing: 3,
  },
  dot: {
    color: COLORS.secondary,
  },
  copyright: {
    fontFamily: FONTS.mono,
    fontSize: 11,
    color: "#334155",
    letterSpacing: 1,
  },
});
