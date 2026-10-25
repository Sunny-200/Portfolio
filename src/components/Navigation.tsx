"use client";

import React, { useEffect, useState, useRef } from "react";
import { playTactileClick, toggleSound, isSoundEnabled } from "@/utils/audio";
import { Volume2, VolumeX, Command, Menu, X, ArrowUpRight, Radio } from "lucide-react";

interface NavigationProps {
  onOpenCommandPalette: () => void;
}

const NAV_ITEMS = [
  { label: "INDEX", href: "#hero", number: "00" },
  { label: "WORK", href: "#work", number: "01" },
  { label: "OPEN SOURCE", href: "#open-source", number: "02" },
  { label: "PRINCIPLES", href: "#principles", number: "03" },
  { label: "SKILLS", href: "#skills", number: "04" },
  { label: "ABOUT", href: "#about", number: "05" },
  { label: "CONTACT", href: "#contact", number: "06" },
];

export function Navigation({ onOpenCommandPalette }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [soundOn, setSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Live High-Precision Clock State (HH:MM:SS + Milliseconds)
  const [time, setTime] = useState({
    main: "00:00:00",
    ms: "000",
  });

  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    setSoundOn(isSoundEnabled());

    // 60FPS Smooth Millisecond Clock
    const updatePrecisionTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      const ms = String(now.getMilliseconds()).padStart(3, "0");

      setTime({
        main: `${h}:${m}:${s}`,
        ms,
      });

      requestRef.current = requestAnimationFrame(updatePrecisionTime);
    };

    requestRef.current = requestAnimationFrame(updatePrecisionTime);

    // Scroll Position Tracking
    const onScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = [
        "hero",
        "work",
        "open-source",
        "principles",
        "skills",
        "about",
        "contact",
      ];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) playTactileClick();
  };

  const handleNavClick = (href: string) => {
    playTactileClick();
    setMobileMenuOpen(false);
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/${href}`;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0B0C0B]/95 backdrop-blur-xl border-b border-[#292D28] py-2.5 shadow-xl"
            : "bg-[#0B0C0B]/80 backdrop-blur-md py-4 border-b border-[#292D28]/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* BIG LIVE HIGH-PRECISION MISSION CLOCK (Seconds & Milliseconds) */}
          <div
            onClick={() => handleNavClick("#hero")}
            data-cursor="pointer"
            className="flex items-center gap-3 select-none cursor-pointer group"
            title="System Mission Telemetry // Click to scroll to top"
          >
            <div className="flex items-center gap-3 border border-[#292D28] bg-[#121412] px-3.5 py-2 rounded-sm shadow-inner group-hover:border-[#C5FF4A] transition-all">
              {/* Pulsing Neon LED Indicator */}
              <div className="relative flex items-center justify-center">
                <span className="h-2.5 w-2.5 rounded-full bg-[#C5FF4A] animate-ping opacity-75 absolute" />
                <span className="h-2 w-2 rounded-full bg-[#C5FF4A] shadow-[0_0_10px_#C5FF4A]" />
              </div>

              <div className="flex flex-col font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-[#61655D] font-extrabold tracking-widest uppercase group-hover:text-[#C5FF4A] transition-colors">
                    SYS_TIME // LIVE TELEMETRY
                  </span>
                  <span className="text-[8px] bg-[#C5FF4A]/10 text-[#C5FF4A] px-1 py-0.2 rounded font-semibold border border-[#C5FF4A]/30">
                    60 FPS
                  </span>
                </div>

                {/* Big Digital Readout with Seconds & Milliseconds */}
                <div className="text-base sm:text-lg md:text-xl font-extrabold text-[#F1F0E8] tracking-wider tabular-nums flex items-baseline">
                  <span>{time.main}</span>
                  <span className="text-[#C5FF4A] font-extrabold text-xs sm:text-sm ml-1">
                    .{time.ms}
                  </span>
                  <span className="text-[10px] text-[#969A92] font-bold ml-2 tracking-widest">
                    IST
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* DETAILED & MOTIVATING BIG NAVIGATION BUTTONS */}
          <nav className="hidden xl:flex items-center gap-2 font-mono">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleNavClick(item.href)}
                  data-cursor="pointer"
                  className={`group relative flex flex-col items-start px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-sm border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "border-[#C5FF4A] bg-[#C5FF4A]/10 shadow-[0_0_15px_rgba(197,255,74,0.25)] text-[#C5FF4A] scale-[1.03]"
                      : "border-[#292D28] bg-[#121412] text-[#969A92] hover:border-[#969A92] hover:text-[#F1F0E8] hover:bg-[#161915] hover:scale-[1.02]"
                  }`}
                >
                  {/* Detailed technical indicator prefix */}
                  <span
                    className={`text-[9px] font-mono font-bold leading-none ${
                      isActive ? "text-[#C5FF4A]" : "text-[#61655D] group-hover:text-[#C5FF4A]"
                    }`}
                  >
                    /{item.number}
                  </span>

                  {/* Main bold button label */}
                  <span
                    className={`font-mono text-xs font-extrabold tracking-wider mt-0.5 ${
                      isActive ? "text-[#F1F0E8]" : "text-[#F1F0E8] group-hover:text-[#C5FF4A]"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Active bottom accent line */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-[#C5FF4A] rounded-full shadow-[0_0_8px_#C5FF4A]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* UTILITY ACTIONS: COMMAND PALETTE & AUDIO */}
          <div className="flex items-center gap-2.5 font-mono text-xs">
            {/* Tactile Command Palette Button */}
            <button
              type="button"
              onClick={() => {
                playTactileClick();
                onOpenCommandPalette();
              }}
              title="Open Command Palette (Ctrl+K or ⌘K)"
              className="hidden sm:flex items-center gap-2 border border-[#292D28] bg-[#121412] px-3.5 py-2 rounded-sm text-[#969A92] hover:text-[#F1F0E8] hover:border-[#C5FF4A] hover:bg-[#161915] transition-all cursor-pointer shadow-sm group"
              data-cursor="pointer"
            >
              <Command
                size={14}
                className="text-[#C5FF4A] group-hover:rotate-12 transition-transform"
              />
              <span className="font-extrabold text-xs text-[#F1F0E8]">COMMAND</span>
              <kbd className="rounded bg-[#1E221E] px-1.5 py-0.5 text-[10px] text-[#C5FF4A] border border-[#292D28] font-bold">
                ⌘K
              </kbd>
            </button>

            {/* Audio Toggle Button */}
            <button
              type="button"
              onClick={handleSoundToggle}
              title={soundOn ? "Mute interactive audio" : "Enable tactile sound"}
              className={`flex h-9 w-9 items-center justify-center border rounded-sm transition-all cursor-pointer ${
                soundOn
                  ? "border-[#292D28] bg-[#121412] text-[#C5FF4A] hover:border-[#C5FF4A]"
                  : "border-[#292D28] bg-[#121412] text-[#61655D] hover:text-[#969A92]"
              }`}
              aria-label="Toggle sound"
              data-cursor="pointer"
            >
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Mobile Navigation Drawer Trigger */}
            <button
              type="button"
              onClick={() => {
                playTactileClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="xl:hidden flex h-9 w-9 items-center justify-center border border-[#292D28] bg-[#121412] text-[#969A92] hover:text-[#C5FF4A] rounded-sm cursor-pointer"
              aria-label="Toggle Navigation Menu"
              data-cursor="pointer"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 xl:hidden bg-[#0B0C0B]/98 backdrop-blur-2xl pt-28 px-6 flex flex-col justify-between pb-8">
          <div className="space-y-3">
            <div className="text-[10px] font-mono text-[#61655D] tracking-widest uppercase mb-3 flex items-center justify-between">
              <span>// SYSTEM NAVIGATION INDEX</span>
              <span className="text-[#C5FF4A]">SELECT DESTINATION</span>
            </div>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleNavClick(item.href)}
                  className={`w-full flex items-center justify-between border p-3.5 rounded-sm font-mono text-left transition-all ${
                    isActive
                      ? "border-[#C5FF4A] bg-[#C5FF4A]/10 text-[#C5FF4A]"
                      : "border-[#292D28] bg-[#121412] text-[#F1F0E8] hover:border-[#969A92]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#C5FF4A] font-bold">
                      /{item.number}
                    </span>
                    <span className="text-base font-extrabold">{item.label}</span>
                  </div>
                  <ArrowUpRight size={16} className="text-[#61655D]" />
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-[#292D28] font-mono text-xs text-[#969A92] space-y-2">
            <div className="flex items-center justify-between">
              <span>LIVE CLOCK TELEMETRY</span>
              <span className="text-[#C5FF4A] font-bold">
                {time.main}.{time.ms} IST
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>SYSTEM KERNEL STATE</span>
              <span className="text-[#C5FF4A] font-semibold">ALL NOMINAL</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
