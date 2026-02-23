import { useEffect, useRef } from "react";
import { Platform } from "react-native";

export function useCursor() {
  const outer = useRef<any>(null);
  const inner = useRef<any>(null);

  useEffect(() => {
    if (Platform.OS !== "web") return;

    const move = (e: MouseEvent) => {
      if (outer.current) {
        outer.current.style.left = e.clientX + "px";
        outer.current.style.top = e.clientY + "px";
      }
      if (inner.current) {
        inner.current.style.left = e.clientX + "px";
        inner.current.style.top = e.clientY + "px";
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return { outer, inner };
}
