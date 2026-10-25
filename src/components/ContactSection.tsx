"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { playTactileClick } from "@/utils/audio";
import {
  Mail,
  Copy,
  Check,
  Send,
  Terminal,
  ArrowUp,
  Code2,
  ExternalLink,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

export function ContactSection() {
  const { personal } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [clientMessage, setClientMessage] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const copyEmail = () => {
    playTactileClick();
    navigator.clipboard.writeText(personal.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();
    if (!senderEmail || !clientMessage) return;

    setIsSending(true);
    // Real, working direct mailto fallback or clean dispatch
    setTimeout(() => {
      setIsSending(false);
      const subject = encodeURIComponent("Systems Engineering Discussion");
      const body = encodeURIComponent(
        `From: ${senderEmail}\n\nMessage:\n${clientMessage}`
      );
      window.location.href = `mailto:${personal.contact.email}?subject=${subject}&body=${body}`;
      setStatusNotice(
        "Mail client initiated. If your default handler didn't open, please email maheshyeruva2005@gmail.com directly!"
      );
    }, 600);
  };

  const scrollToTop = () => {
    playTactileClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Animated Signal Line flowing down into the contact section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-[#292D28] via-[#C5FF4A] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Contact Header */}
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[#C5FF4A]">
            <span className="font-bold">06 //</span>
            <span className="uppercase tracking-widest">TRANSMISSION LINK</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#F1F0E8] tracking-tight leading-tight">
            Have an interesting system to build?
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#969A92] leading-relaxed">
            Open to meaningful conversations about backend engineering, distributed
            systems, infrastructure, open-source software, and software engineering opportunities.
          </p>
        </div>

        {/* Contact Grid: Direct Dispatch & Verified Profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Quick Terminal Dispatch Form */}
          <div className="lg:col-span-7 border border-[#292D28] bg-[#121412] p-6 sm:p-8 rounded-sm font-mono text-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[#292D28] pb-3 text-[#969A92]">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[#C5FF4A]" />
                <span className="text-[#F1F0E8] font-bold">DIRECT TRANSMISSION</span>
              </div>
              <span className="text-[10px] text-[#61655D]">SECURE DISPATCH</span>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4 font-mono">
              <div>
                <label className="text-[10px] text-[#61655D] block mb-1 uppercase tracking-wider">
                  SENDER ADDRESS // YOUR EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="recruiter@team.com or engineer@company.com"
                  className="w-full bg-[#0B0C0B] border border-[#292D28] rounded p-3 text-sm text-[#F1F0E8] placeholder:text-[#61655D] focus:border-[#C5FF4A] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#61655D] block mb-1 uppercase tracking-wider">
                  PAYLOAD // MESSAGE & ARCHITECTURAL INQUIRY
                </label>
                <textarea
                  required
                  rows={4}
                  value={clientMessage}
                  onChange={(e) => setClientMessage(e.target.value)}
                  placeholder="Tell me about the engineering challenges your team is solving..."
                  className="w-full bg-[#0B0C0B] border border-[#292D28] rounded p-3 text-sm text-[#F1F0E8] placeholder:text-[#61655D] focus:border-[#C5FF4A] focus:outline-none transition-colors"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSending}
                  data-cursor-text="TRANSMIT"
                  className="flex items-center gap-2 bg-[#C5FF4A] text-[#0B0C0B] px-5 py-3 font-mono text-xs font-bold tracking-wider uppercase transition-transform hover:scale-[1.02] cursor-pointer disabled:opacity-50"
                >
                  <Send size={14} />
                  <span>{isSending ? "ENCRYPTING & DISPATCHING..." : "DISPATCH TRANSMISSION"}</span>
                </button>

                <button
                  type="button"
                  onClick={copyEmail}
                  data-cursor-text="COPY EMAIL"
                  className="flex items-center gap-2 border border-[#292D28] bg-[#161915] px-4 py-3 text-xs text-[#F1F0E8] hover:border-[#C5FF4A] hover:text-[#C5FF4A] transition-colors cursor-pointer"
                >
                  {copied ? <Check size={14} className="text-[#C5FF4A]" /> : <Copy size={14} />}
                  <span>{copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL ADDRESS"}</span>
                </button>
              </div>

              {statusNotice && (
                <div className="mt-3 p-3 border border-[#C5FF4A]/40 bg-[#C5FF4A]/10 text-xs text-[#C5FF4A] rounded">
                  {statusNotice}
                </div>
              )}
            </form>
          </div>

          {/* Right: Verified Directory Cards */}
          <div className="lg:col-span-5 space-y-3 font-mono text-xs">
            <span className="text-[#61655D] text-[10px] uppercase tracking-wider block">
              // VERIFIED EXTERNAL NETWORKS
            </span>

            {/* Email Direct */}
            <a
              href={`mailto:${personal.contact.email}`}
              className="flex items-center justify-between border border-[#292D28] bg-[#121412] p-4 rounded hover:border-[#C5FF4A] hover:bg-[#161915] transition-all group"
            >
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#C5FF4A]" />
                <div>
                  <div className="font-bold text-[#F1F0E8] group-hover:text-[#C5FF4A] transition-colors">
                    EMAIL INBOX
                  </div>
                  <div className="text-[11px] text-[#969A92]">{personal.contact.email}</div>
                </div>
              </div>
              <ExternalLink size={14} className="text-[#61655D] group-hover:text-[#C5FF4A]" />
            </a>

            {/* GitHub */}
            <a
              href={personal.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border border-[#292D28] bg-[#121412] p-4 rounded hover:border-[#C5FF4A] hover:bg-[#161915] transition-all group"
            >
              <div className="flex items-center gap-3">
                <GithubIcon size={16} className="text-[#C5FF4A]" />
                <div>
                  <div className="font-bold text-[#F1F0E8] group-hover:text-[#C5FF4A] transition-colors">
                    GITHUB REPOSITORIES
                  </div>
                  <div className="text-[11px] text-[#969A92]">github.com/Sunny-200</div>
                </div>
              </div>
              <ExternalLink size={14} className="text-[#61655D] group-hover:text-[#C5FF4A]" />
            </a>

            {/* LinkedIn */}
            <a
              href={personal.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border border-[#292D28] bg-[#121412] p-4 rounded hover:border-[#C5FF4A] hover:bg-[#161915] transition-all group"
            >
              <div className="flex items-center gap-3">
                <LinkedinIcon size={16} className="text-[#C5FF4A]" />
                <div>
                  <div className="font-bold text-[#F1F0E8] group-hover:text-[#C5FF4A] transition-colors">
                    LINKEDIN PROFILE
                  </div>
                  <div className="text-[11px] text-[#969A92]">linkedin.com/in/mahesh-reddy</div>
                </div>
              </div>
              <ExternalLink size={14} className="text-[#61655D] group-hover:text-[#C5FF4A]" />
            </a>

            {/* LeetCode */}
            <a
              href={personal.contact.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border border-[#292D28] bg-[#121412] p-4 rounded hover:border-[#C5FF4A] hover:bg-[#161915] transition-all group"
            >
              <div className="flex items-center gap-3">
                <Code2 size={16} className="text-[#E5A93C]" />
                <div>
                  <div className="font-bold text-[#F1F0E8] group-hover:text-[#C5FF4A] transition-colors">
                    LEETCODE PROFILE
                  </div>
                  <div className="text-[11px] text-[#969A92]">Rating: 1650 // 300+ Solved</div>
                </div>
              </div>
              <ExternalLink size={14} className="text-[#61655D] group-hover:text-[#C5FF4A]" />
            </a>

            {/* CodeChef */}
            <a
              href={personal.contact.codechef}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border border-[#292D28] bg-[#121412] p-4 rounded hover:border-[#C5FF4A] hover:bg-[#161915] transition-all group"
            >
              <div className="flex items-center gap-3">
                <Terminal size={16} className="text-[#E5A93C]" />
                <div>
                  <div className="font-bold text-[#F1F0E8] group-hover:text-[#C5FF4A] transition-colors">
                    CODECHEF PROFILE
                  </div>
                  <div className="text-[11px] text-[#969A92]">Rating: 1500 // sunny_200</div>
                </div>
              </div>
              <ExternalLink size={14} className="text-[#61655D] group-hover:text-[#C5FF4A]" />
            </a>
          </div>
        </div>

        {/* Footer Signature & Back to Top */}
        <div className="pt-16 border-t border-[#292D28] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#969A92]">
          <div className="space-y-1">
            <div className="text-[#F1F0E8] font-bold">
              ENGINEERING THE INVISIBLE // {personal.name}
            </div>
            <div className="text-[11px] text-[#61655D]">
              BUILT WITH NEXT.JS, TYPESCRIPT, TAILWIND CSS & LIGHTWEIGHT SVG
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] text-[#61655D]">
              LAT: 15.4589° N // LON: 75.0078° E (IIIT Dharwad)
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 border border-[#292D28] bg-[#121412] px-3 py-1.5 rounded hover:border-[#C5FF4A] hover:text-[#C5FF4A] transition-colors cursor-pointer"
              data-cursor="pointer"
            >
              <ArrowUp size={13} />
              <span>TOP</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
