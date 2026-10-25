"use client";

import React, { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textLabelRef = useRef<HTMLSpanElement>(null);
  const lightGlowRef = useRef<HTMLDivElement>(null);

  const [hasPointer, setHasPointer] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for pointer precision and reduced motion
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReducedMotion) {
      setHasPointer(false);
      setReducedMotion(true);
      return;
    }

    setHasPointer(true);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHoveringInteractive = false;
    let cursorLabel = "";
    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
        if (lightGlowRef.current) lightGlowRef.current.style.opacity = "1";
      }

      // Check target element data attributes
      const target = e.target as HTMLElement | null;
      if (target) {
        const closestInteractive = target.closest(
          "button, a, input, select, textarea, [data-cursor], [data-cursor-text]"
        ) as HTMLElement | null;

        if (closestInteractive) {
          isHoveringInteractive = true;
          cursorLabel =
            closestInteractive.getAttribute("data-cursor-text") ||
            (closestInteractive.getAttribute("data-cursor") === "case-study"
              ? "EXPLORE CASE STUDY"
              : closestInteractive.getAttribute("data-cursor") === "source"
              ? "VIEW SOURCE"
              : closestInteractive.getAttribute("data-cursor") === "drag"
              ? "DRAG"
              : closestInteractive.getAttribute("data-cursor") === "inspect"
              ? "INSPECT"
              : "");
        } else {
          isHoveringInteractive = false;
          cursorLabel = "";
        }
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (lightGlowRef.current) lightGlowRef.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    let rafId: number;
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const render = () => {
      // Smooth interpolation for the ring
      ringX = lerp(ringX, mouseX, 0.18);
      ringY = lerp(ringY, mouseY, 0.18);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        const scale = cursorLabel ? 1 : isHoveringInteractive ? 1.6 : 1;
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;

        if (cursorLabel) {
          ringRef.current.classList.add("cursor-ring-expanded");
        } else {
          ringRef.current.classList.remove("cursor-ring-expanded");
        }
      }

      if (textLabelRef.current) {
        if (cursorLabel) {
          textLabelRef.current.textContent = cursorLabel;
          textLabelRef.current.style.opacity = "1";
        } else {
          textLabelRef.current.style.opacity = "0";
        }
      }

      if (lightGlowRef.current) {
        lightGlowRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!hasPointer || reducedMotion) return null;

  return (
    <>
      {/* Subtle localized grid illumination */}
      <div
        ref={lightGlowRef}
        className="pointer-events-none fixed top-0 left-0 z-0 h-96 w-96 rounded-full opacity-0 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle, rgba(197, 255, 74, 0.035) 0%, rgba(197, 255, 74, 0.01) 35%, transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* Central Cursor Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-50 h-2 w-2 rounded-full bg-[#C5FF4A] opacity-0 mix-blend-difference transition-opacity duration-200"
        style={{ willChange: "transform" }}
      />

      {/* Outer Following Ring with dynamic text label */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full border border-[#C5FF4A]/60 opacity-0 transition-all duration-150"
        style={{
          width: "36px",
          height: "36px",
          willChange: "transform, width, height",
        }}
      >
        <span
          ref={textLabelRef}
          className="whitespace-nowrap px-2 font-mono text-[9px] font-bold tracking-widest text-[#0B0C0B] uppercase opacity-0 transition-opacity duration-150"
        />
      </div>

      <style jsx global>{`
        .cursor-ring-expanded {
          width: auto !important;
          min-width: 120px !important;
          height: 32px !important;
          background-color: #c5ff4a !important;
          border-color: #c5ff4a !important;
          border-radius: 9999px !important;
          box-shadow: 0 0 20px rgba(197, 255, 74, 0.4) !important;
        }
      `}</style>
    </>
  );
}
