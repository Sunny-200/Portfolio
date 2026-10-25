"use client";

import React from "react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { playTactileClick } from "@/utils/audio";
import {
  GitPullRequest,
  ExternalLink,
  CheckCircle2,
  Database,
  ArrowRight,
  Terminal,
  Layers,
  Code2,
} from "lucide-react";

export function OpenSourceShowcase() {
  const { openSource } = PORTFOLIO_DATA;

  return (
    <section
      id="open-source"
      className="py-20 sm:py-28 border-b border-[#292D28] bg-[#0E100E] relative overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 systems-grid-fine opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#292D28] pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#C5FF4A] mb-2">
              <span className="font-bold">02 //</span>
              <span className="uppercase tracking-widest">
                OPEN-SOURCE ENGINEERING
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#F1F0E8] tracking-tight">
              Upstream Database Internals
            </h2>
          </div>
          <p className="font-mono text-xs text-[#969A92] max-w-md">
            Production contributions to database engines built on PostgreSQL and Rust.
          </p>
        </div>

        {/* Curated Showcase Card */}
        <article className="border border-[#292D28] bg-[#121412] p-6 sm:p-8 lg:p-10 rounded-sm relative overflow-hidden group hover:border-[#3D433C] transition-all">
          {/* Watermark Tag */}
          <div className="absolute right-4 top-2 select-none pointer-events-none font-display font-extrabold text-7xl sm:text-9xl text-[#1E221E]/50 -z-0">
            PR #6877
          </div>

          <div className="relative z-10 space-y-8">
            {/* Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-[#969A92] border-b border-[#1E221E] pb-4">
              <div className="flex items-center gap-3">
                <span className="text-[#C5FF4A] font-bold text-sm">
                  PARADEDB // UPSTREAM
                </span>
                <span className="text-[#61655D]">|</span>
                <span className="text-[#F1F0E8] font-semibold">
                  PostgreSQL & Rust Engine
                </span>
              </div>

              {/* Merged upstream badge */}
              <div className="flex items-center gap-2 border border-[#C5FF4A]/40 bg-[#C5FF4A]/10 px-3 py-1 rounded text-xs font-mono text-[#C5FF4A] font-bold">
                <CheckCircle2 size={13} />
                <span>{openSource.status}</span>
              </div>
            </div>

            {/* Asymmetric Grid: Curated Overview Left, Visual Architecture Summary Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Curated Info & Actions */}
              <div className="lg:col-span-6 space-y-5">
                <div className="font-mono text-xs text-[#E5A93C] flex items-center gap-2">
                  <Database size={14} />
                  <span>
                    REPO: {openSource.repo} // BRANCH: {openSource.branch}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F1F0E8] leading-tight">
                  {openSource.prTitle}
                </h3>

                <p className="font-sans text-sm text-[#969A92] leading-relaxed">
                  Established a deprecation path for ParadeDB&apos;s custom in-index ltree facet pushdown in favor of standard PostgreSQL GiST indexing combined with bitmap index intersection, significantly expanding hierarchical query operator capabilities and preserving native PostgreSQL semantics.
                </p>

                {/* Verified PR Metrics */}
                <div className="grid grid-cols-3 gap-2 font-mono">
                  <div className="border border-[#1E221E] bg-[#0E100E] p-3 rounded-sm">
                    <div className="text-[10px] text-[#61655D]">FILES</div>
                    <div className="text-lg font-bold text-[#F1F0E8] mt-0.5">
                      {openSource.stats.files}
                    </div>
                    <div className="text-[9px] text-[#969A92]">Changed files</div>
                  </div>
                  <div className="border border-[#1E221E] bg-[#0E100E] p-3 rounded-sm">
                    <div className="text-[10px] text-[#61655D]">DIFF STATS</div>
                    <div className="text-lg font-bold text-[#C5FF4A] mt-0.5">
                      +{openSource.stats.additions}
                    </div>
                    <div className="text-[9px] text-[#E5A93C]">-{openSource.stats.deletions} lines</div>
                  </div>
                  <div className="border border-[#1E221E] bg-[#0E100E] p-3 rounded-sm">
                    <div className="text-[10px] text-[#61655D]">TARGET</div>
                    <div className="text-lg font-bold text-[#F1F0E8] mt-0.5">
                      main
                    </div>
                    <div className="text-[9px] text-[#969A92]">Merged upstream</div>
                  </div>
                </div>

                {/* Primary Curated Actions */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <Link
                    href="/work/paradedb"
                    onClick={() => playTactileClick()}
                    data-cursor-text="EXPLORE CASE STUDY"
                    className="flex items-center gap-2 bg-[#C5FF4A] text-[#0B0C0B] px-5 py-2.5 font-mono text-xs font-bold uppercase transition-transform hover:scale-[1.02] cursor-pointer"
                  >
                    <span>EXPLORE CASE STUDY & BENCHMARKS</span>
                    <ArrowRight size={14} />
                  </Link>

                  <a
                    href={openSource.prUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-text="VIEW MERGED PR"
                    className="flex items-center gap-2 border border-[#292D28] bg-[#161915] px-4 py-2.5 font-mono text-xs text-[#F1F0E8] hover:border-[#C5FF4A] hover:text-[#C5FF4A] transition-colors"
                  >
                    <GitPullRequest size={14} className="text-[#C5FF4A]" />
                    <span>VIEW PR #{openSource.prNumber}</span>
                    <ExternalLink size={11} className="text-[#61655D]" />
                  </a>
                </div>
              </div>

              {/* Right Column: Architectural Teaser & Before-After Summary */}
              <div className="lg:col-span-6 space-y-4">
                <div className="border border-[#1E221E] bg-[#0E100E] p-5 rounded font-mono text-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1E221E] pb-3">
                    <div className="flex items-center gap-2 text-[#C5FF4A] font-bold">
                      <Layers size={14} />
                      <span>ARCHITECTURAL TRANSITION SUMMARY</span>
                    </div>
                    <span className="text-[10px] text-[#61655D]">GiST INTERSECTION</span>
                  </div>

                  {/* Transition Step Comparison */}
                  <div className="space-y-3">
                    <div className="p-3 border border-[#E5A93C]/30 bg-[#1A1612]/40 rounded space-y-1.5">
                      <div className="flex items-center justify-between text-[#E5A93C] font-bold text-[11px]">
                        <span>BEFORE: PROPRIETARY IN-INDEX FACET</span>
                        <span className="text-[10px]">DEPRECATED</span>
                      </div>
                      <p className="font-sans text-xs text-[#969A92] leading-relaxed">
                        Tantivy facet pushdown engine supported only the descendant operator <code className="text-[#E5A93C]">&lt;@</code>. Ancestor queries, lquery regex, and ltxtquery text searches failed.
                      </p>
                    </div>

                    <div className="p-3 border border-[#C5FF4A]/30 bg-[#161915]/60 rounded space-y-1.5">
                      <div className="flex items-center justify-between text-[#C5FF4A] font-bold text-[11px]">
                        <span>AFTER: NATIVE GiST + BitmapAnd INTERSECTION</span>
                        <span className="text-[#C5FF4A] text-[10px]">PRODUCTION STANDARD</span>
                      </div>
                      <p className="font-sans text-xs text-[#F1F0E8] leading-relaxed">
                        PostgreSQL planner intersects GiST index bitmaps with ParadeDB search index bitmaps, unlocking all 8 PostgreSQL ltree operators with zero engine duplication.
                      </p>
                    </div>
                  </div>

                  {/* Four Core Code Contribution Teaser */}
                  <div className="pt-2 border-t border-[#1E221E]">
                    <div className="text-[10px] text-[#61655D] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Code2 size={12} className="text-[#C5FF4A]" />
                      <span>CONTRIBUTION SCOPE (12 FILES)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="border border-[#1E221E] bg-[#121412] px-2.5 py-1.5 rounded truncate text-[#969A92]">
                        <span className="text-[#C5FF4A] font-mono mr-1">01.</span>
                        <span>crates/bench</span>
                      </div>
                      <div className="border border-[#1E221E] bg-[#121412] px-2.5 py-1.5 rounded truncate text-[#969A92]">
                        <span className="text-[#C5FF4A] font-mono mr-1">02.</span>
                        <span>crates/index</span>
                      </div>
                      <div className="border border-[#1E221E] bg-[#121412] px-2.5 py-1.5 rounded truncate text-[#969A92]">
                        <span className="text-[#C5FF4A] font-mono mr-1">03.</span>
                        <span>crates/search</span>
                      </div>
                      <div className="border border-[#1E221E] bg-[#121412] px-2.5 py-1.5 rounded truncate text-[#969A92]">
                        <span className="text-[#C5FF4A] font-mono mr-1">04.</span>
                        <span>docs/ltree.md</span>
                      </div>
                    </div>
                  </div>

                  {/* Teaser CTA */}
                  <div className="pt-2 text-right">
                    <Link
                      href="/work/paradedb"
                      onClick={() => playTactileClick()}
                      className="inline-flex items-center gap-1.5 text-xs text-[#C5FF4A] hover:underline"
                    >
                      <span>View full implementation, operator matrix & 100k benchmarks</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
