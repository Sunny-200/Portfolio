"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA, EngineeringPrinciple } from "@/data/portfolioData";
import { playTactileClick } from "@/utils/audio";
import { Network, Cpu, Database, Sparkles, Server, ChevronRight } from "lucide-react";

const THEME_ICONS: Record<string, React.ReactNode> = {
  "distributed-systems": <Network size={16} />,
  "systems-programming": <Cpu size={16} />,
  "database-engineering": <Database size={16} />,
  "ai-search": <Sparkles size={16} />,
  "infrastructure-observability": <Server size={16} />,
};

export function EngineeringPrinciples() {
  const { principles } = PORTFOLIO_DATA;
  const [activePrinciple, setActivePrinciple] = useState<EngineeringPrinciple>(principles[0]);

  return (
    <section
      id="principles"
      className="py-20 sm:py-28 border-b border-[#292D28] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#292D28] pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#C5FF4A] mb-2">
              <span className="font-bold">03 //</span>
              <span className="uppercase tracking-widest">TECHNICAL PHILOSOPHY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#F1F0E8] tracking-tight">
              The Details Are the System.
            </h2>
          </div>
          <p className="font-mono text-xs text-[#969A92] max-w-md">
            Architectural principles grounded in actual engineering implementations rather than high-level platitudes.
          </p>
        </div>

        {/* Engineering Notebook Layout: 5 Theme Cards + Active Deep Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: 5 Selectable Theme Cards */}
          <div className="lg:col-span-5 space-y-2.5">
            {principles.map((principle) => {
              const isSelected = activePrinciple.id === principle.id;
              return (
                <button
                  key={principle.id}
                  type="button"
                  onClick={() => {
                    playTactileClick();
                    setActivePrinciple(principle);
                  }}
                  className={`w-full text-left p-4 rounded border font-mono text-xs transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "border-[#C5FF4A] bg-[#161915] shadow-lg shadow-[#C5FF4A]/10 scale-[1.01]"
                      : "border-[#292D28] bg-[#121412] hover:border-[#969A92]/60 hover:bg-[#161915]/60"
                  }`}
                  data-cursor="pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#61655D] text-[10px] font-bold">
                      {principle.number}
                    </span>
                    <span className={isSelected ? "text-[#C5FF4A]" : "text-[#969A92]"}>
                      {THEME_ICONS[principle.id]}
                    </span>
                    <span
                      className={`font-bold ${
                        isSelected ? "text-[#C5FF4A]" : "text-[#F1F0E8]"
                      }`}
                    >
                      {principle.title}
                    </span>
                  </div>
                  <ChevronRight
                    size={14}
                    className={`transition-transform ${
                      isSelected
                        ? "text-[#C5FF4A] translate-x-1"
                        : "text-[#61655D]"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Principle Deep-Dive (Engineering Notebook Style) */}
          <div className="lg:col-span-7 border border-[#292D28] bg-[#121412] p-6 sm:p-8 rounded-sm font-mono text-xs space-y-6 relative overflow-hidden">
            {/* Top Tag & Coordinate */}
            <div className="flex flex-wrap items-center justify-between border-b border-[#292D28] pb-3 text-[#969A92]">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C5FF4A] animate-led" />
                <span className="text-[#C5FF4A] font-bold uppercase">
                  SYSTEM THEME: {activePrinciple.title}
                </span>
              </div>
              <span className="text-[10px] text-[#61655D]">
                PILLAR: {activePrinciple.architecturalPillar}
              </span>
            </div>

            {/* Axiom / Tagline */}
            <blockquote className="border-l-2 border-[#C5FF4A] pl-4 font-display text-lg sm:text-xl font-bold text-[#F1F0E8] leading-snug">
              “{activePrinciple.tagline}”
            </blockquote>

            {/* Description & Technical Rationale */}
            <div className="space-y-2">
              <span className="text-[10px] text-[#61655D] uppercase tracking-wider block">
                // ARCHITECTURAL RATIONALE
              </span>
              <p className="font-sans text-sm text-[#969A92] leading-relaxed">
                {activePrinciple.description}
              </p>
            </div>

            {/* Concrete System Context */}
            <div className="border border-[#1E221E] bg-[#0E100E] p-4 rounded space-y-2">
              <span className="text-[10px] text-[#E5A93C] uppercase tracking-wider font-bold block">
                // APPLIED CONTEXT IN MY WORK
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#F1F0E8] leading-relaxed">
                {activePrinciple.systemContext}
              </p>
            </div>

            {/* Key Takeaway */}
            <div className="border-t border-[#1E221E] pt-4 flex items-center justify-between text-[11px]">
              <span className="text-[#61655D]">CORE TAKEAWAY:</span>
              <span className="text-[#C5FF4A] font-bold">
                {activePrinciple.keyTakeaway}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
