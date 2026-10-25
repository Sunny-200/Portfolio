"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { SystemsIllustration } from "./SystemsIllustration";
import { playTactileClick } from "@/utils/audio";
import { ArrowDown, Terminal, ShieldCheck, MapPin } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";

export function HeroSection() {
  const { personal, technicalIdentityStrip } = PORTFOLIO_DATA;

  const scrollToWork = () => {
    playTactileClick();
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-[#292D28]"
    >
      {/* Background Dot Matrix & Soft Grid */}
      <div className="absolute inset-0 dot-matrix opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Meta Header: System Coordinate & Availability */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 text-xs font-mono">
          <div className="inline-flex items-center gap-2 border border-[#292D28] bg-[#121412] px-3 py-1.5 rounded-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C5FF4A] animate-led" />
            <span className="text-[#C5FF4A] font-semibold tracking-wider uppercase">
              {personal.role}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#969A92] text-[11px]">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-[#C5FF4A]" />
              IIIT Dharwad (2027)
            </span>
            <span className="hidden sm:inline text-[#61655D]">•</span>
            <span className="hidden sm:flex items-center gap-1.5 text-[#E5A93C]">
              <ShieldCheck size={12} />
              Minor: Cybersecurity
            </span>
          </div>
        </div>

        {/* Main Headline & Identity Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Editorial Typography & Copy */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#F1F0E8] leading-[1.08]">
              I build the systems{" "}
              <span className="text-[#C5FF4A] inline-block relative underline decoration-[#C5FF4A]/40 decoration-wavy underline-offset-8">
                beneath the interface.
              </span>
            </h1>

            <p className="font-mono text-lg sm:text-2xl text-[#C5FF4A] font-bold tracking-tight leading-snug max-w-2xl">
              {personal.heroSupporting}
            </p>

            {/* Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToWork}
                data-cursor-text="EXPLORE WORK"
                className="group flex items-center gap-2.5 bg-[#C5FF4A] text-[#0B0C0B] px-6 py-3.5 font-mono text-xs font-bold tracking-wider uppercase transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg shadow-[#C5FF4A]/10"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowDown
                  size={14}
                  className="transition-transform group-hover:translate-y-0.5"
                />
              </button>

              <a
                href={personal.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="VIEW GITHUB"
                className="flex items-center gap-2 border border-[#292D28] bg-[#121412] px-6 py-3.5 font-mono text-xs font-semibold text-[#F1F0E8] hover:border-[#C5FF4A] hover:text-[#C5FF4A] transition-colors"
              >
                <GithubIcon size={14} />
                <span>GITHUB // @Sunny-200</span>
              </a>
            </div>
          </div>

          {/* Right Column: Live Interactive Request-Flow Architecture */}
          <div className="lg:col-span-5 w-full">
            <SystemsIllustration />
          </div>
        </div>
      </div>

      {/* Horizontally arranged Technical Identity Strip */}
      <div className="mt-14 border-t border-b border-[#292D28] bg-[#121412]/70 py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap font-mono text-xs text-[#969A92] flex items-center gap-8">
          {[...technicalIdentityStrip, ...technicalIdentityStrip].map(
            (label, idx) => (
              <span key={idx} className="flex items-center gap-8">
                <span className="text-[#F1F0E8] font-bold tracking-widest">
                  {label}
                </span>
                <span className="text-[#C5FF4A]">///</span>
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
