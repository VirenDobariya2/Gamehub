"use client";
import { useEffect, useRef } from "react";

export default function TrafficRiderWrapper() {
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <iframe
      ref={ref}
      src="/traffic-rider/index.html"
      className="w-full h-full border-0 rounded-lg shadow-inner"
      allowFullScreen
      loading="lazy"
      title="stack game"
    />
  );
}
