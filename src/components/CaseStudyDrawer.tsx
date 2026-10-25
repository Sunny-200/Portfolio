"use client";

import React, { useEffect } from "react";
import { ProjectCaseStudy } from "@/data/portfolioData";
import { playTactileClick } from "@/utils/audio";
import { X, ExternalLink, CheckCircle2, AlertTriangle, Layers, Award } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";

interface CaseStudyDrawerProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export function CaseStudyDrawer({ project, onClose }: CaseStudyDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#0B0C0B]/85 backdrop-blur-md transition-all">
      {/* Backdrop click to dismiss */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={() => {
          playTactileClick();
          onClose();
        }}
        data-cursor="pointer"
      />

      {/* Slide-over Drawer Content */}
      <div className="relative z-10 w-full max-w-3xl h-full bg-[#121412] border-l border-[#292D28] overflow-y-auto p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
        <div className="space-y-8">
          {/* Top Bar with Number, Category, and Close Button */}
          <div className="flex items-center justify-between border-b border-[#292D28] pb-4">
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-[#C5FF4A] font-bold text-sm">
                PROJECT {project.number}
              </span>
              <span className="text-[#61655D]">///</span>
              <span className="text-[#969A92]">{project.category}</span>
            </div>

            <button
              onClick={() => {
                playTactileClick();
                onClose();
              }}
              className="flex h-8 w-8 items-center justify-center border border-[#292D28] bg-[#161915] text-[#969A92] hover:text-[#C5FF4A] hover:border-[#C5FF4A] transition-colors cursor-pointer"
              aria-label="Close Case Study"
              data-cursor="pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Title and Tagline */}
          <div className="space-y-3">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#F1F0E8] leading-tight">
              {project.title}
            </h2>
            <p className="font-mono text-sm text-[#C5FF4A] leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Metrics Dashboard */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="rounded border border-[#292D28] bg-[#161915] p-3 font-mono"
              >
                <div className="text-[10px] text-[#61655D] uppercase truncate">
                  {m.label}
                </div>
                <div className="text-xl font-bold text-[#F1F0E8] mt-0.5">
                  {m.value}
                </div>
                <div className="text-[10px] text-[#969A92] mt-1 leading-snug">
                  {m.description}
                </div>
              </div>
            ))}
          </div>

          {/* Problem Statement */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-[#E5A93C]">
              <AlertTriangle size={13} />
              <span className="font-bold uppercase tracking-wider">
                THE ENGINEERING PROBLEM
              </span>
            </div>
            <p className="font-sans text-sm text-[#969A92] leading-relaxed pl-5 border-l-2 border-[#E5A93C]/40">
              {project.problem}
            </p>
          </div>

          {/* Architecture Specification */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[#C5FF4A]">
              <Layers size={13} />
              <span className="font-bold uppercase tracking-wider">
                SYSTEM ARCHITECTURE SPECIFICATION
              </span>
            </div>
            <div className="space-y-2">
              {project.architecture.map((layer, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded border border-[#1E221E] bg-[#161915]/60 p-3 font-sans text-xs text-[#F1F0E8]"
                >
                  <span className="font-mono text-[10px] text-[#C5FF4A] font-bold mt-0.5">
                    {`0${idx + 1}`}
                  </span>
                  <p className="leading-relaxed">{layer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Decisions & Technical Trade-offs */}
          <div className="space-y-3">
            <span className="font-mono text-xs font-bold text-[#F1F0E8] uppercase tracking-wider block">
              // ARCHITECTURAL DECISIONS & TRADE-OFFS
            </span>
            <div className="space-y-3">
              {project.keyDecisions.map((decision, idx) => (
                <div
                  key={idx}
                  className="rounded border border-[#292D28] bg-[#0E100E] p-4 text-xs font-mono space-y-2"
                >
                  <div className="text-[#C5FF4A] font-bold text-sm">
                    {decision.title}
                  </div>
                  <div className="text-[#F1F0E8] font-sans leading-relaxed">
                    <span className="font-mono text-[10px] text-[#61655D] block">
                      RATIONALE:
                    </span>
                    {decision.rationale}
                  </div>
                  <div className="text-[#969A92] font-sans leading-relaxed border-t border-[#1E221E] pt-2">
                    <span className="font-mono text-[10px] text-[#E5A93C] block">
                      TRADE-OFF INCURRED:
                    </span>
                    {decision.tradeOff}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testing, Verification & Measurements */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[#C5FF4A]">
              <CheckCircle2 size={13} />
              <span className="font-bold uppercase tracking-wider">
                TESTING, METRICS & BENCHMARKS
              </span>
            </div>
            <div className="space-y-2">
              {project.testingAndVerification.map((test, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 font-mono text-xs text-[#969A92]"
                >
                  <span className="text-[#C5FF4A]">✓</span>
                  <span>{test}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack Tags */}
          <div className="space-y-2 pt-2 border-t border-[#292D28]">
            <span className="font-mono text-[10px] text-[#61655D] uppercase tracking-wider block">
              TECHNOLOGIES UTILIZED
            </span>
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
              {project.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="border border-[#292D28] bg-[#161915] px-2.5 py-1 text-[#F1F0E8] rounded-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-4 border-t border-[#292D28] flex items-center justify-between font-mono text-xs">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#C5FF4A] text-[#0B0C0B] px-4 py-2 font-bold uppercase transition-transform hover:scale-[1.02]"
              data-cursor-text="VIEW GITHUB"
            >
              <GithubIcon size={14} />
              <span>EXPLORE REPOSITORY</span>
            </a>
          ) : (
            <span className="text-[#61655D]">REPOSITORY: RESTRICTED</span>
          )}

          <button
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            className="text-[#969A92] hover:text-[#F1F0E8] transition-colors"
          >
            [CLOSE DRAWER ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
