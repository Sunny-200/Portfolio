"use client";

import React, { useState } from "react";
import { playTactileClick } from "@/utils/audio";
import {
  FileText,
  ExternalLink,
  Copy,
  Check,
  Download,
  GraduationCap,
  Terminal,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function AboutAndCredentials() {
  const [copied, setCopied] = useState(false);
  const resumeUrl =
    "https://drive.google.com/file/d/1WewPOhDFJlpPkdNUHSk1GRq2__JNMAuI/view?usp=drive_link";

  const handleCopyLink = () => {
    playTactileClick();
    navigator.clipboard.writeText(resumeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-20 sm:py-28 border-b border-[#292D28] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#292D28] pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#C5FF4A] mb-2">
              <span className="font-bold">05 //</span>
              <span className="uppercase tracking-widest">ENGINEER PROFILE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#F1F0E8] tracking-tight">
              About & Resume
            </h2>
          </div>
          <p className="font-mono text-xs text-[#969A92] max-w-md">
            Engineering philosophy, technical focus, and official curriculum vitae.
          </p>
        </div>

        {/* Main Content Grid: Narrative Left, Resume Card Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Focused Narrative with Highlighted Name */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 border border-[#292D28] bg-[#121412] px-3 py-1.5 rounded-sm font-mono text-xs text-[#C5FF4A]">
                <Terminal size={13} />
                <span className="tracking-wide uppercase font-semibold">
                  Systems & Infrastructure Mindset
                </span>
              </div>

              {/* Exact User Copy with Name Highlighting */}
              <div className="space-y-4 font-sans text-base sm:text-lg leading-relaxed text-[#969A92]">
                <p className="text-[#F1F0E8] font-medium leading-relaxed">
                  I’m{" "}
                  <span className="text-[#C5FF4A] font-bold inline-block relative underline decoration-[#C5FF4A]/40 decoration-2 underline-offset-4">
                    Yeruva Mahesh Reddy
                  </span>{" "}
                  — a Computer Science undergraduate at{" "}
                  <span className="text-[#F1F0E8] font-semibold">
                    IIIT Dharwad
                  </span>{" "}
                  who loves exploring what happens beneath the surface of software.
                </p>

                <p className="text-sm sm:text-base leading-relaxed">
                  From distributed systems and database internals to low-level
                  networking and AI-powered search, I’m fascinated by the engineering
                  decisions that make software fast, reliable, and scalable. I build
                  to understand, experiment to improve, and contribute to solve
                  problems beyond the boundaries of my own projects — including
                  contributing to{" "}
                  <a
                    href="/work/paradedb"
                    onClick={() => playTactileClick()}
                    className="text-[#C5FF4A] hover:underline font-medium"
                  >
                    ParadeDB
                  </a>
                  , an open-source database project.
                </p>

                <p className="text-sm sm:text-base leading-relaxed text-[#F1F0E8] border-l-2 border-[#C5FF4A] pl-4 italic">
                  I believe great engineering isn’t just about making things work; it’s
                  about understanding why they work, knowing where they break, and
                  making them work better.
                </p>
              </div>
            </div>

            {/* Micro Highlights Pill Bar */}
            <div className="pt-4 border-t border-[#1E221E] flex flex-wrap items-center gap-3 font-mono text-xs text-[#61655D]">
              <span className="flex items-center gap-1.5 text-[#969A92]">
                <GraduationCap size={14} className="text-[#C5FF4A]" />
                IIIT Dharwad (2027)
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[#969A92]">
                <ShieldCheck size={14} className="text-[#E5A93C]" />
                Minor: Cybersecurity
              </span>
              <span>•</span>
              <span className="text-[#969A92]">ParadeDB Contributor</span>
            </div>
          </div>

          {/* Right Column: High-Impact Resume Drive Card */}
          <div className="lg:col-span-5 flex">
            <div className="w-full border border-[#292D28] bg-[#121412] p-6 sm:p-8 rounded-sm flex flex-col justify-between relative overflow-hidden group hover:border-[#3D433C] transition-all">
              {/* Background Watermark */}
              <div className="absolute right-4 top-2 select-none pointer-events-none font-display font-extrabold text-7xl text-[#1E221E]/60 -z-0">
                CV
              </div>

              <div className="relative z-10 space-y-6">
                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-[#1E221E] pb-4 font-mono text-xs">
                  <div className="flex items-center gap-2 text-[#C5FF4A]">
                    <FileText size={16} />
                    <span className="font-bold uppercase tracking-wider">
                      CURRICULUM VITAE
                    </span>
                  </div>
                  <span className="border border-[#292D28] bg-[#0E100E] px-2.5 py-0.5 rounded text-[10px] text-[#969A92]">
                    PDF FORMAT
                  </span>
                </div>

                {/* Document Information */}
                <div className="space-y-3 font-mono">
                  <div className="text-xl font-bold text-[#F1F0E8] font-display">
                    Yeruva Mahesh Reddy
                  </div>
                  <div className="text-xs text-[#C5FF4A]">
                    Software Engineer / Systems & Infrastructure
                  </div>

                  <div className="border border-[#1E221E] bg-[#0E100E] p-4 rounded text-xs space-y-2 font-mono">
                    <div className="flex items-center justify-between text-[#969A92] text-[11px]">
                      <span>DOCUMENT HOST:</span>
                      <span className="text-[#F1F0E8] font-semibold">Google Drive</span>
                    </div>
                    <div className="flex items-center justify-between text-[#969A92] text-[11px]">
                      <span>ACCESS LEVEL:</span>
                      <span className="text-[#C5FF4A] font-semibold">Public View</span>
                    </div>
                    <div className="flex items-center justify-between text-[#969A92] text-[11px]">
                      <span>CONTENTS:</span>
                      <span className="text-[#F1F0E8]">Systems, Distributed, AI</span>
                    </div>
                    <div className="flex items-center justify-between text-[#969A92] text-[11px]">
                      <span>STATUS:</span>
                      <span className="text-[#E5A93C] font-semibold">Verified</span>
                    </div>
                  </div>
                </div>

                {/* Primary & Secondary Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTactileClick()}
                    data-cursor-text="VIEW RESUME"
                    className="w-full flex items-center justify-center gap-2.5 bg-[#C5FF4A] text-[#0B0C0B] py-3.5 px-5 font-mono text-xs font-bold tracking-wider uppercase transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg shadow-[#C5FF4A]/10"
                  >
                    <FileText size={15} />
                    <span>OPEN RESUME (GOOGLE DRIVE)</span>
                    <ExternalLink size={13} />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    data-cursor="pointer"
                    className="w-full flex items-center justify-center gap-2 border border-[#292D28] bg-[#161915] py-2.5 px-4 font-mono text-xs text-[#969A92] hover:text-[#F1F0E8] hover:border-[#969A92] transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-[#C5FF4A]" />
                        <span className="text-[#C5FF4A]">LINK COPIED TO CLIPBOARD</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>COPY DIRECT DRIVE LINK</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
