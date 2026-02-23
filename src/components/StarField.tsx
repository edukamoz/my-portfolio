import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Platform, StyleSheet, View } from "react-native";

interface StarProps {
  x: number;
  y: number;
  size: number;
  delay: number;
  dur: number;
}

const Star = React.memo(({ x, y, size, delay, dur }: StarProps) => {
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 0.2,
            duration: (dur * 1000) / 2,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: (dur * 1000) / 2,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [dur, delay]);

  const isLarge = size > 1.5;

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: isLarge ? "#00f0ff" : "#c0c0d0",
        opacity: opacityAnim,
        transform: [
          {
            scale: opacityAnim.interpolate({
              inputRange: [0.2, 1],
              outputRange: [0.5, 1],
            }),
          },
        ],
        ...(isLarge && {
          shadowColor: "#00f0ff",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: size * 3,
          elevation: 2,
        }),
      }}
    />
  );
});

export const StarField = React.memo(() => {
  const stars = useMemo(
    () =>
      Array.from({ length: 150 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 4,
        dur: Math.random() * 3 + 2,
      })),
    [],
  );

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Estrelas */}
      {stars.map((s) => (
        <Star key={s.id} {...s} />
      ))}

      {/* Nebulosa Roxa (Topo Esquerda)
        Simulada com borderRadius gigante e opacidade 
      */}
      <View style={[styles.nebula, styles.nebulaPurple]} />

      {/* Nebulosa Ciano (Fundo Direita)
       */}
      <View style={[styles.nebula, styles.nebulaCyan]} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
    zIndex: 0,
    backgroundColor: "#050505",
  },
  nebula: {
    position: "absolute",
    borderRadius: 9999,
    ...(Platform.OS === "web" ? ({ filter: "blur(80px)" } as any) : {}),
  },
  nebulaPurple: {
    top: "-10%",
    left: "-10%",
    width: 600,
    height: 600,
    backgroundColor: "rgba(168,85,247,0.06)",
  },
  nebulaCyan: {
    bottom: "-10%",
    right: "-10%",
    width: 500,
    height: 500,
    backgroundColor: "rgba(0,240,255,0.05)",
  },
});
