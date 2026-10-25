"use client";

import React, { useEffect, useState } from "react";
import { playTelemetryPulse } from "@/utils/audio";

interface BootIntroProps {
  onComplete: () => void;
}

const BOOT_STEPS = [
  "BOOTING PERSONAL SYSTEM...",
  "LOADING ENGINEERING LOG [YERUVA_MAHESH_REDDY]...",
  "ATTACHING DISTRIBUTED TRACE OBSERVER...",
  "INITIALIZING INTERACTIVE ENVIRONMENT...",
  "SYSTEM ONLINE.",
];

export function BootIntro({ onComplete }: BootIntroProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDismissing, setIsDismissing] = useState(false);

  useEffect(() => {
    // If user already visited in this session, skip immediately
    const hasSeenBoot = sessionStorage.getItem("has_seen_boot");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hasSeenBoot || prefersReducedMotion) {
      onComplete();
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        skipIntro();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Fast, crisp animation: total ~2.2 seconds
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < BOOT_STEPS.length - 1) {
          playTelemetryPulse();
          return prev + 1;
        }
        return prev;
      });
    }, 450);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 90);

    const finishTimeout = setTimeout(() => {
      skipIntro();
    }, 2400);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
      clearInterval(progressInterval);
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  const skipIntro = () => {
    sessionStorage.setItem("has_seen_boot", "true");
    setIsDismissing(true);
    setTimeout(() => {
      onComplete();
    }, 350);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0C0B] px-4 transition-all duration-300 ${
        isDismissing ? "opacity-0 pointer-events-none scale-98" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-md rounded border border-[#292D28] bg-[#121412] p-6 shadow-2xl">
        {/* Terminal Header */}
        <div className="mb-4 flex items-center justify-between border-b border-[#292D28] pb-3 text-xs font-mono text-[#969A92]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#C5FF4A] animate-pulse" />
            <span className="text-[#F1F0E8] font-semibold">SYS_INIT.OS</span>
          </div>
          <span className="text-[10px] text-[#61655D]">TRACE: 0x7E3F</span>
        </div>

        {/* Console Log Output */}
        <div className="space-y-2 font-mono text-xs">
          {BOOT_STEPS.slice(0, currentStep + 1).map((step, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 ${
                idx === BOOT_STEPS.length - 1
                  ? "text-[#C5FF4A] font-bold"
                  : idx === currentStep
                  ? "text-[#F1F0E8]"
                  : "text-[#969A92]"
              }`}
            >
              <span className="text-[10px] text-[#61655D]">{`0${idx + 1}`}</span>
              <span>{step}</span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between font-mono text-[10px] text-[#969A92] mb-1">
            <span>SYNCHRONIZING</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 w-full bg-[#1E221E] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C5FF4A] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Skip action hint */}
        <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-[#61655D]">
          <span>PRESS [ESC] OR [SPACE]</span>
          <button
            onClick={skipIntro}
            className="hover:text-[#C5FF4A] transition-colors underline underline-offset-2 cursor-pointer"
          >
            SKIP SEQUENCE →
          </button>
        </div>
      </div>
    </div>
  );
}
