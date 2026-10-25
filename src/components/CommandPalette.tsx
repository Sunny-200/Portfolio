"use client";

import React, { useEffect, useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { playTactileClick } from "@/utils/audio";
import {
  Search,
  Command,
  ArrowRight,
  GitPullRequest,
  Terminal,
  FolderGit2,
  Copy,
  ExternalLink,
  X,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (id: string) => void;
}

interface PaletteAction {
  id: string;
  category: "NAVIGATION" | "CASE STUDY" | "ACTION";
  title: string;
  sublabel: string;
  icon: React.ReactNode;
  handler: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onSelectProject,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const actions: PaletteAction[] = [
    {
      id: "nav-hero",
      category: "NAVIGATION",
      title: "Index // Hero Section",
      sublabel: "Overview & request flow trace",
      icon: <Terminal size={14} className="text-[#C5FF4A]" />,
      handler: () => {
        navigateToSection("hero");
      },
    },
    {
      id: "cs-intellifile",
      category: "CASE STUDY",
      title: "IntelliFile — Agentic AI File Search",
      sublabel: "BM25 + LanceDB RRF retrieval pipeline",
      icon: <FolderGit2 size={14} className="text-[#C5FF4A]" />,
      handler: () => {
        window.location.href = "/work/intellifile";
      },
    },
    {
      id: "cs-url-shortener",
      category: "CASE STUDY",
      title: "Distributed URL Shortener",
      sublabel: "Redis caching & Kubernetes replica sets",
      icon: <FolderGit2 size={14} className="text-[#C5FF4A]" />,
      handler: () => {
        window.location.href = "/work/url-shortener";
      },
    },
    {
      id: "cs-synthetic",
      category: "CASE STUDY",
      title: "Synthetic Web Monitoring",
      sublabel: "C++, POSIX sockets, IPC & poll() multiplexing",
      icon: <FolderGit2 size={14} className="text-[#C5FF4A]" />,
      handler: () => {
        window.location.href = "/work/synthetic-web-monitoring";
      },
    },
    {
      id: "cs-paradedb",
      category: "CASE STUDY",
      title: "ParadeDB — Upstream PostgreSQL Engine",
      sublabel: "PR #6877: GiST bitmap intersection & 100k benchmarks",
      icon: <GitPullRequest size={14} className="text-[#C5FF4A]" />,
      handler: () => {
        window.location.href = "/work/paradedb";
      },
    },
    {
      id: "nav-opensource",
      category: "NAVIGATION",
      title: "ParadeDB Merged PR #6877 (Overview)",
      sublabel: "PostgreSQL GiST bitmap intersection & benchmarks",
      icon: <GitPullRequest size={14} className="text-[#E5A93C]" />,
      handler: () => {
        navigateToSection("open-source");
      },
    },
    {
      id: "nav-principles",
      category: "NAVIGATION",
      title: "Engineering Principles",
      sublabel: "The Details Are the System",
      icon: <Terminal size={14} className="text-[#F1F0E8]" />,
      handler: () => {
        navigateToSection("principles");
      },
    },
    {
      id: "nav-skills",
      category: "NAVIGATION",
      title: "Skills & Primitives Map",
      sublabel: "Interactive systems taxonomy",
      icon: <Terminal size={14} className="text-[#F1F0E8]" />,
      handler: () => {
        navigateToSection("skills");
      },
    },
    {
      id: "nav-about",
      category: "NAVIGATION",
      title: "About & Resume",
      sublabel: "Engineering philosophy & Drive resume link",
      icon: <Terminal size={14} className="text-[#F1F0E8]" />,
      handler: () => {
        navigateToSection("about");
      },
    },
    {
      id: "nav-contact",
      category: "NAVIGATION",
      title: "Contact & Transmission Link",
      sublabel: "Direct email and verified profiles",
      icon: <Terminal size={14} className="text-[#F1F0E8]" />,
      handler: () => {
        navigateToSection("contact");
      },
    },
    {
      id: "action-resume",
      category: "ACTION",
      title: "Open Official Resume",
      sublabel: "Google Drive PDF document",
      icon: <ExternalLink size={14} className="text-[#C5FF4A]" />,
      handler: () => {
        window.open(PORTFOLIO_DATA.personal.contact.resume, "_blank");
      },
    },
    {
      id: "action-copy-email",
      category: "ACTION",
      title: "Copy Email Address",
      sublabel: "maheshyeruva2005@gmail.com",
      icon: <Copy size={14} className="text-[#C5FF4A]" />,
      handler: () => {
        navigator.clipboard.writeText(PORTFOLIO_DATA.personal.contact.email);
      },
    },
    {
      id: "action-github",
      category: "ACTION",
      title: "Open GitHub Profile",
      sublabel: "github.com/Sunny-200",
      icon: <ExternalLink size={14} className="text-[#969A92]" />,
      handler: () => {
        window.open(PORTFOLIO_DATA.personal.contact.github, "_blank");
      },
    },
  ];

  const filteredActions = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.sublabel.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        playTactileClick();
        if (isOpen) onClose();
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      } else if (e.key === "ArrowDown" && isOpen) {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredActions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp" && isOpen) {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredActions.length - 1
        );
      } else if (e.key === "Enter" && isOpen) {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          playTactileClick();
          filteredActions[selectedIndex].handler();
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, filteredActions, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[#0B0C0B]/80 backdrop-blur-md">
      {/* Backdrop */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl rounded border border-[#292D28] bg-[#121412] shadow-2xl overflow-hidden font-mono text-xs">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-[#292D28] px-4 py-3 bg-[#161915]">
          <Search size={16} className="text-[#C5FF4A]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a section, case study, or command..."
            className="w-full bg-transparent text-sm text-[#F1F0E8] placeholder:text-[#61655D] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-[#61655D] hover:text-[#F1F0E8] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-[#1E221E]/60">
          {filteredActions.length === 0 ? (
            <div className="p-6 text-center text-[#61655D]">
              NO MATCHING ARCHITECTURAL COMMAND
            </div>
          ) : (
            filteredActions.map((action, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={action.id}
                  onClick={() => {
                    playTactileClick();
                    action.handler();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-[#C5FF4A]/10 border-l-2 border-[#C5FF4A] text-[#F1F0E8]"
                      : "hover:bg-[#161915] text-[#969A92]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {action.icon}
                    <div>
                      <div className="font-bold text-[#F1F0E8]">
                        {action.title}
                      </div>
                      <div className="text-[10px] text-[#61655D]">
                        {action.sublabel}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded border border-[#292D28] text-[#61655D]">
                      {action.category}
                    </span>
                    <ArrowRight
                      size={12}
                      className={
                        isSelected ? "text-[#C5FF4A]" : "text-transparent"
                      }
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-[#292D28] bg-[#0E100E] px-4 py-2 text-[10px] text-[#61655D]">
          <div className="flex items-center gap-3">
            <span>↑↓ NAVIGATE</span>
            <span>↵ SELECT</span>
            <span>ESC CLOSE</span>
          </div>
          <span>YERUVA MAHESH REDDY // 2027</span>
        </div>
      </div>
    </div>
  );
}
