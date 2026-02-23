import { RefObject, useEffect, useState } from "react";
import { Platform } from "react-native";

export function useIntersectionObserver(
  ref: RefObject<any>,
  threshold: number = 0.15,
): boolean {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (Platform.OS !== "web") {
      setVisible(true);
      return;
    }

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const obs = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        },
        { threshold },
      );

      if (ref.current) {
        obs.observe(ref.current as Element);
      }
      return () => obs.disconnect();
    }
  }, [ref, threshold]);

  return visible;
}
