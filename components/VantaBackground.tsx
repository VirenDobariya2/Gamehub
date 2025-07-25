"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

declare global {
  interface Window {
    VANTA?: any;
  }
}

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (vantaEffect.current) return;

    const loadScript = async () => {
      if (!window.VANTA || !window.VANTA.NET) {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js";
        script.async = true;
        script.onload = () => {
          if (
            window.VANTA?.NET &&
            vantaRef.current &&
            !vantaEffect.current
          ) {
            vantaEffect.current = window.VANTA.NET({
              el: vantaRef.current,
              THREE,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              minWidth: 200.0,
              scale: 1.0,
              scaleMobile: 1.0,
              color: 0xff3cac,        // Pinkish-red
              backgroundColor: 0xADD8E6, // Deep dark background
              points: 15.0,
              maxDistance: 25.0,
              spacing: 18.0,
            });
          }
        };
        document.body.appendChild(script);
      }
    };

    loadScript();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return <div ref={vantaRef} className="absolute inset-0 -z-10" />;
}
