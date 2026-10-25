"use client";

import React, { useState, useEffect } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { BootIntro } from "@/components/BootIntro";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { OpenSourceShowcase } from "@/components/OpenSourceShowcase";
import { EngineeringPrinciples } from "@/components/EngineeringPrinciples";
import { SkillsMap } from "@/components/SkillsMap";
import { AboutAndCredentials } from "@/components/AboutAndCredentials";
import { ContactSection } from "@/components/ContactSection";
import { CommandPalette } from "@/components/CommandPalette";
import { playTactileClick } from "@/utils/audio";

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Number key shortcuts for instant navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if typing inside inputs
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (e.key === "1") {
        playTactileClick();
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "2") {
        playTactileClick();
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "3") {
        playTactileClick();
        document
          .getElementById("open-source")
          ?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "4") {
        playTactileClick();
        document
          .getElementById("principles")
          ?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "5") {
        playTactileClick();
        document
          .getElementById("skills")
          ?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "6") {
        playTactileClick();
        document
          .getElementById("about")
          ?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "7") {
        playTactileClick();
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Engineered Custom Cursor System */}
      <CustomCursor />

      {/* Boot Intro Sequence (Skippable & Non-blocking) */}
      {!bootComplete && (
        <BootIntro onComplete={() => setBootComplete(true)} />
      )}

      {/* Main Content Layout */}
      <div className="relative min-h-screen bg-[#0B0C0B] text-[#F1F0E8] overflow-x-hidden selection:bg-[#C5FF4A] selection:text-[#0B0C0B]">
        {/* Navigation Bar */}
        <Navigation
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        />

        {/* Global Coordinate / System ID Tag in Margin */}
        <div className="hidden 2xl:flex fixed left-4 top-1/2 -translate-y-1/2 flex-col items-center gap-6 font-mono text-[9px] text-[#61655D] tracking-widest uppercase select-none pointer-events-none z-20">
          <span className="rotate-90">SYS_OBSERVER // YMR_2027</span>
          <div className="h-16 w-[1px] bg-[#292D28]" />
          <span className="rotate-90">NODE_STATUS: NOMINAL</span>
        </div>

        <div className="hidden 2xl:flex fixed right-4 top-1/2 -translate-y-1/2 flex-col items-center gap-6 font-mono text-[9px] text-[#61655D] tracking-widest uppercase select-none pointer-events-none z-20">
          <span className="-rotate-90">IIIT_DHARWAD // CS</span>
          <div className="h-16 w-[1px] bg-[#292D28]" />
          <span className="-rotate-90">PARADEDB_PR_6877</span>
        </div>

        {/* Main Sections */}
        <main>
          <HeroSection />
          <ProjectShowcase />
          <OpenSourceShowcase />
          <EngineeringPrinciples />
          <SkillsMap />
          <AboutAndCredentials />
          <ContactSection />
        </main>

        {/* Interactive Command Palette */}
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
        />
      </div>
    </>
  );
}
