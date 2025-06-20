"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    const loadScript = async () => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js";
      script.async = true;
      script.onload = () => {
        if (window.VANTA && window.VANTA.NET && vantaRef.current && !vantaEffect) {
          setVantaEffect(
            window.VANTA.NET({
              el: vantaRef.current,
              THREE,
              mouseControls: true,
              touchControls: true,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 1.0,
              scaleMobile: 1.0,

              // 🔹 Light blue theme
              color: 0x3ABEF9,            // net color
              backgroundColor: 0xB0E0E6,  // background light blue

              points: 12.0,
              maxDistance: 22.0,
              spacing: 18.0,
            })
          );
        }
      };
      document.body.appendChild(script);
    };

    loadScript();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className="absolute inset-0 -z-10" />;
}
