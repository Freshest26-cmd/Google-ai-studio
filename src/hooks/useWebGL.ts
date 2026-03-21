import { useState, useEffect } from "react";

export function useWebGL() {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setIsSupported(supported);
    } catch (e) {
      setIsSupported(false);
    }
  }, []);

  return { isSupported, setIsSupported };
}
