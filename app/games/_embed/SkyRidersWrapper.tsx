"use client";
import { useEffect, useRef } from "react";

export default function SkyRidersWrapper() {
  const ref = useRef<HTMLIFrameElement>(null);

  // Autofocus game so space/arrow keys work immediately
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <iframe
      ref={ref}
      src="/unity/sky-riders/index.html" 
      className="w-full h-full border-0 rounded-lg shadow-inner"
      allowFullScreen
      loading="lazy"
      title="Sky Riders Game"
    />
  )
}