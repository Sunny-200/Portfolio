"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { playTactileClick } from "@/utils/audio";
import { Layers, ArrowRight, Code, Database, Sparkles, Server } from "lucide-react";

export function SkillsMap() {
  const { skillsData } = PORTFOLIO_DATA;
  const [selectedSkill, setSelectedSkill] = useState(skillsData[0].skills[0]); // C++ by default

  return (
    <section id="skills" className="py-20 sm:py-28 border-b border-[#292D28] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#292D28] pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#C5FF4A] mb-2">
              <span className="font-bold">04 //</span>
              <span className="uppercase tracking-widest">TECHNICAL TAXONOMY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#F1F0E8] tracking-tight">
              Interactive Systems Skills Map
            </h2>
          </div>
          <p className="font-mono text-xs text-[#969A92] max-w-md">
            Click any technology to inspect the specific distributed system, database, or IPC project where it was implemented. Zero arbitrary percentages.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((cat, catIdx) => (
            <div
              key={catIdx}
              className="border border-[#292D28] bg-[#121412] p-5 rounded-sm space-y-3 font-mono text-xs"
            >
              <div className="flex items-center justify-between border-b border-[#1E221E] pb-2 text-[#969A92]">
                <span className="text-[#C5FF4A] font-bold uppercase tracking-wider">
                  {cat.category}
                </span>
                <span className="text-[10px] text-[#61655D]">
                  {cat.skills.length} PRIMITIVES
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {cat.skills.map((skill, sIdx) => {
                  const isSelected = selectedSkill.name === skill.name;
                  return (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => {
                        playTactileClick();
                        setSelectedSkill(skill);
                      }}
                      className={`px-2.5 py-1.5 rounded-sm border transition-all text-[11px] cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? "border-[#C5FF4A] bg-[#C5FF4A] text-[#0B0C0B] font-bold shadow-md shadow-[#C5FF4A]/20 scale-[1.03]"
                          : "border-[#292D28] bg-[#161915] text-[#F1F0E8] hover:border-[#969A92] hover:text-[#C5FF4A]"
                      }`}
                      data-cursor="pointer"
                    >
                      <span>{skill.name}</span>
                      {skill.featuredIn && (
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isSelected ? "bg-[#0B0C0B]" : "bg-[#C5FF4A]"
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Skill Applied Implementation Card */}
        <div className="border border-[#292D28] bg-[#0E100E] p-6 rounded-sm font-mono text-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E221E] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-[#61655D]">INSPECTING TECHNOLOGY:</span>
              <span className="text-[#C5FF4A] font-bold text-base">
                {selectedSkill.name}
              </span>
            </div>

            {selectedSkill.featuredIn && (
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  playTactileClick();
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-1 text-[#E5A93C] hover:text-[#C5FF4A] transition-colors"
              >
                <span>FEATURED IN CASE STUDY</span>
                <ArrowRight size={13} />
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
            <div>
              <span className="font-mono text-[10px] text-[#61655D] uppercase block mb-1">
                // SYSTEM DETAILS & ARCHITECTURAL UTILITY
              </span>
              <p className="text-[#F1F0E8] text-sm leading-relaxed">
                {selectedSkill.details}
              </p>
            </div>

            <div>
              <span className="font-mono text-[10px] text-[#61655D] uppercase block mb-1">
                // ENGINEERING CONTEXT
              </span>
              <p className="text-[#969A92] leading-relaxed">
                Integrated into production-style architectures to guarantee bounded latency, zero memory leaks, and resilient state synchronization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
