"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { CaseStudyClientWrapper } from "@/components/CaseStudyClientWrapper";
import { playTactileClick } from "@/utils/audio";
import { GithubIcon } from "@/components/icons/BrandIcons";
import {
  ArrowLeft,
  GitPullRequest,
  ExternalLink,
  CheckCircle2,
  FileCode,
  Terminal,
  Database,
  ArrowRight,
  ShieldAlert,
  Code2,
  Layers,
  Cpu,
  BarChart3,
  BookOpen,
} from "lucide-react";

export default function ParadeDbCaseStudyPage() {
  const { openSource } = PORTFOLIO_DATA;
  const [archMode, setArchMode] = useState<"before" | "after">("after");
  const [activeOperator, setActiveOperator] = useState(openSource.operators[0]);
  const [selectedRegime, setSelectedRegime] = useState(
    openSource.benchmarkMethodology.selectivityRegimes[0]
  );

  return (
    <CaseStudyClientWrapper>
      <div className="min-h-screen bg-[#0B0C0B] text-[#F1F0E8] overflow-x-hidden">
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-16">
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs border-b border-[#292D28] pb-4">
            <Link
              href="/#open-source"
              className="flex items-center gap-2 text-[#969A92] hover:text-[#C5FF4A] transition-colors"
              data-cursor="pointer"
            >
              <ArrowLeft size={14} />
              <span>RETURN TO PORTFOLIO // OPEN-SOURCE</span>
            </Link>

            <div className="flex items-center gap-3 text-[#61655D]">
              <span>UPSTREAM PR #{openSource.prNumber}</span>
              <span>/</span>
              <span className="text-[#C5FF4A] font-semibold">{openSource.organization}</span>
            </div>
          </div>

          {/* Header Section */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-[#C5FF4A]">
                <Database size={14} />
                <span className="font-bold uppercase tracking-wider">
                  FEATURED OPEN-SOURCE DATABASE ENGINE CONTRIBUTION
                </span>
              </div>
              <div className="flex items-center gap-2 border border-[#C5FF4A]/40 bg-[#C5FF4A]/10 px-3 py-1 rounded text-xs text-[#C5FF4A] font-bold">
                <CheckCircle2 size={13} />
                <span>{openSource.status}</span>
              </div>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#F1F0E8] tracking-tight leading-tight">
              {openSource.prTitle}
            </h1>

            <p className="font-mono text-base sm:text-lg text-[#C5FF4A] leading-relaxed max-w-3xl">
              PostgreSQL GiST indexing and bitmap index intersection for hierarchical ltree data, establishing a deprecation path for ParadeDB custom facets.
            </p>

            {/* Quick Actions & Upstream Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
              <a
                href={openSource.prUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="VIEW MERGED PR"
                className="flex items-center gap-2 bg-[#C5FF4A] text-[#0B0C0B] px-5 py-2.5 font-bold uppercase transition-transform hover:scale-[1.02]"
              >
                <GitPullRequest size={14} />
                <span>VIEW PR #{openSource.prNumber} ON GITHUB</span>
                <ExternalLink size={12} />
              </a>

              <a
                href={openSource.issueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-[#292D28] bg-[#121412] px-4 py-2.5 text-[#F1F0E8] hover:border-[#969A92] transition-colors"
              >
                <Terminal size={13} className="text-[#E5A93C]" />
                <span>ISSUE #{openSource.issueNumber}</span>
                <ExternalLink size={11} className="text-[#61655D]" />
              </a>

              <div className="border border-[#292D28] bg-[#121412] px-3 py-2 text-[#969A92]">
                BRANCH: <code className="text-[#F1F0E8]">{openSource.branch}</code>
              </div>
            </div>
          </div>

          {/* Verified PR Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="border border-[#292D28] bg-[#121412] p-4 rounded space-y-1">
              <div className="text-[10px] text-[#61655D] uppercase">FILES CHANGED</div>
              <div className="text-2xl font-bold text-[#F1F0E8]">{openSource.stats.files}</div>
              <div className="text-[11px] text-[#969A92] font-sans">Across index, search, bench & docs</div>
            </div>
            <div className="border border-[#292D28] bg-[#121412] p-4 rounded space-y-1">
              <div className="text-[10px] text-[#61655D] uppercase">ADDITIONS</div>
              <div className="text-2xl font-bold text-[#C5FF4A]">+{openSource.stats.additions}</div>
              <div className="text-[11px] text-[#969A92] font-sans">Lines of Rust, tests & SQL benchmarks</div>
            </div>
            <div className="border border-[#292D28] bg-[#121412] p-4 rounded space-y-1">
              <div className="text-[10px] text-[#61655D] uppercase">DELETIONS</div>
              <div className="text-2xl font-bold text-[#E5A93C]">-{openSource.stats.deletions}</div>
              <div className="text-[11px] text-[#969A92] font-sans">Deprecated code removed</div>
            </div>
            <div className="border border-[#292D28] bg-[#121412] p-4 rounded space-y-1">
              <div className="text-[10px] text-[#61655D] uppercase">UPSTREAM TARGET</div>
              <div className="text-2xl font-bold text-[#F1F0E8]">main</div>
              <div className="text-[11px] text-[#969A92] font-sans">Merged directly into production release</div>
            </div>
          </div>

          {/* Problem & Architectural Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="border border-[#292D28] bg-[#121412] p-6 rounded space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#E5A93C] font-bold">
                <ShieldAlert size={14} />
                <span>THE ARCHITECTURAL PROBLEM</span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#969A92] leading-relaxed">
                {openSource.theProblem}
              </p>
            </section>

            <section className="border border-[#292D28] bg-[#121412] p-6 rounded space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#C5FF4A] font-bold">
                <CheckCircle2 size={14} />
                <span>THE ARCHITECTURAL SOLUTION</span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#F1F0E8] leading-relaxed">
                {openSource.theSolution}
              </p>
            </section>
          </div>

          {/* Interactive Before & After Architecture Diagram */}
          <section className="border border-[#292D28] bg-[#121412] p-6 sm:p-8 rounded space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#292D28] pb-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Layers size={14} className="text-[#C5FF4A]" />
                <span className="text-[#F1F0E8] font-bold">
                  BEFORE & AFTER ARCHITECTURE COMPARISON
                </span>
              </div>

              {/* Toggle Switch */}
              <div className="flex items-center gap-1 border border-[#292D28] bg-[#0E100E] p-1 rounded">
                <button
                  type="button"
                  onClick={() => {
                    playTactileClick();
                    setArchMode("before");
                  }}
                  className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                    archMode === "before"
                      ? "bg-[#E5A93C] text-[#0B0C0B] font-bold"
                      : "text-[#969A92] hover:text-[#F1F0E8]"
                  }`}
                >
                  BEFORE: IN-INDEX FACETS
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playTactileClick();
                    setArchMode("after");
                  }}
                  className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                    archMode === "after"
                      ? "bg-[#C5FF4A] text-[#0B0C0B] font-bold"
                      : "text-[#969A92] hover:text-[#F1F0E8]"
                  }`}
                >
                  AFTER: NATIVE GiST + BITMAP INTERSECTION
                </button>
              </div>
            </div>

            {archMode === "before" ? (
              <div className="p-5 border border-[#E5A93C]/40 bg-[#1A1612]/50 rounded space-y-4 font-mono text-xs">
                <div className="flex items-center gap-2 text-[#E5A93C] font-bold text-sm">
                  <span>BEFORE: IN-INDEX FACET RESTRICTION</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="border border-[#292D28] bg-[#0B0C0B] p-3.5 rounded">
                    <div className="text-[#61655D] text-[10px]">STEP 01</div>
                    <div className="text-[#F1F0E8] font-bold mt-1">PostgreSQL ltree Column</div>
                    <div className="text-[10px] text-[#969A92] mt-1 font-sans">
                      Hierarchical path string stored in database table.
                    </div>
                  </div>
                  <div className="border border-[#292D28] bg-[#0B0C0B] p-3.5 rounded">
                    <div className="text-[#61655D] text-[10px]">STEP 02</div>
                    <div className="text-[#E5A93C] font-bold mt-1">ParadeDB In-Index Facet</div>
                    <div className="text-[10px] text-[#969A92] mt-1 font-sans">
                      Custom Tantivy facet pushdown engine maintained within search indexes.
                    </div>
                  </div>
                  <div className="border border-[#292D28] bg-[#0B0C0B] p-3.5 rounded">
                    <div className="text-[#61655D] text-[10px]">STEP 03</div>
                    <div className="text-[#E5A93C] font-bold mt-1">Limited Operator Coverage</div>
                    <div className="text-[10px] text-[#969A92] mt-1 font-sans">
                      Only descendant operator &lt;@ supported. Ancestor (@&gt;), regex (~), and text search failed.
                    </div>
                  </div>
                </div>
                <div className="text-[#969A92] text-[11px] font-sans">
                  Notice: Query planner decisions rely on custom facet structures, increasing maintenance debt without full PostgreSQL operator compatibility.
                </div>
              </div>
            ) : (
              <div className="p-5 border border-[#C5FF4A]/40 bg-[#161915]/80 rounded space-y-4 font-mono text-xs">
                <div className="flex items-center gap-2 text-[#C5FF4A] font-bold text-sm">
                  <span>AFTER: STANDARD POSTGRESQL GiST BITMAP INTERSECTION</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="border border-[#292D28] bg-[#0B0C0B] p-3.5 rounded">
                    <div className="text-[#61655D] text-[10px]">STEP 01</div>
                    <div className="text-[#F1F0E8] font-bold mt-1">PostgreSQL ltree Column</div>
                    <div className="text-[10px] text-[#969A92] mt-1 font-sans">
                      Standard hierarchical data representation.
                    </div>
                  </div>
                  <div className="border border-[#292D28] bg-[#0B0C0B] p-3.5 rounded">
                    <div className="text-[#61655D] text-[10px]">STEP 02</div>
                    <div className="text-[#C5FF4A] font-bold mt-1">Native GiST Index</div>
                    <div className="text-[10px] text-[#969A92] mt-1 font-sans">
                      CREATE INDEX USING gist (path); natively handles &lt;@, @&gt;, ~, ?.
                    </div>
                  </div>
                  <div className="border border-[#292D28] bg-[#0B0C0B] p-3.5 rounded">
                    <div className="text-[#61655D] text-[10px]">STEP 03</div>
                    <div className="text-[#C5FF4A] font-bold mt-1">BitmapAnd Intersection</div>
                    <div className="text-[10px] text-[#969A92] mt-1 font-sans">
                      PostgreSQL query planner combines GiST bitmap with ParadeDB search index bitmap.
                    </div>
                  </div>
                  <div className="border border-[#292D28] bg-[#0B0C0B] p-3.5 rounded">
                    <div className="text-[#61655D] text-[10px]">STEP 04</div>
                    <div className="text-[#C5FF4A] font-bold mt-1">Full Operator Coverage</div>
                    <div className="text-[10px] text-[#969A92] mt-1 font-sans">
                      Native PostgreSQL semantics, zero custom engine duplication.
                    </div>
                  </div>
                </div>
                <div className="text-[#969A92] text-[11px] font-sans">
                  Note: Query plans depend on actual queries, statistics, and planner cost estimates.
                </div>
              </div>
            )}
          </section>

          {/* 4 Core Contribution Areas Grid */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-[#F1F0E8] uppercase tracking-wider">
              <Code2 size={14} className="text-[#C5FF4A]" />
              <span>FOUR CORE CONTRIBUTION AREAS IN PR #6877</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {openSource.keyContributions.map((contrib, idx) => (
                <div
                  key={idx}
                  className="border border-[#292D28] bg-[#121412] p-5 rounded space-y-3 font-mono text-xs"
                >
                  <div className="flex items-center justify-between border-b border-[#1E221E] pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[#C5FF4A] font-bold">{`0${idx + 1}.`}</span>
                      <span className="text-[#F1F0E8] font-bold">{contrib.area}</span>
                    </div>
                    <FileCode size={13} className="text-[#61655D]" />
                  </div>

                  <div className="text-[11px] text-[#E5A93C] truncate">
                    FILE: {contrib.file}
                  </div>

                  <p className="font-sans text-xs text-[#F1F0E8] leading-relaxed">
                    {contrib.summary}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#1E221E]">
                    {contrib.details.map((d, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-start gap-2 text-[11px] font-sans text-[#969A92]"
                      >
                        <span className="text-[#C5FF4A] font-mono">•</span>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive PostgreSQL ltree Operator Explorer */}
          <section className="border border-[#292D28] bg-[#121412] p-6 sm:p-8 rounded space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#292D28] pb-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[#C5FF4A]" />
                <span className="text-[#F1F0E8] font-bold">
                  POSTGRESQL LTREE OPERATOR EXPLORER
                </span>
              </div>
              <span className="text-[#969A92] text-[11px]">
                CLICK OPERATOR TO COMPARE BEFORE VS AFTER
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {openSource.operators.map((op) => {
                const isSelected = activeOperator.symbol === op.symbol;
                return (
                  <button
                    key={op.symbol}
                    type="button"
                    onClick={() => {
                      playTactileClick();
                      setActiveOperator(op);
                    }}
                    className={`p-3 rounded border text-left font-mono transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#C5FF4A] bg-[#161915] shadow-md shadow-[#C5FF4A]/10 scale-[1.02]"
                        : "border-[#292D28] bg-[#0E100E] hover:border-[#969A92]"
                    }`}
                  >
                    <div className="text-xl font-bold text-[#C5FF4A]">{op.symbol}</div>
                    <div className="text-xs text-[#F1F0E8] mt-1 truncate">{op.name}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Operator Details Box */}
            <div className="border border-[#1E221E] bg-[#0B0C0B] p-5 rounded font-mono text-xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#1E221E] pb-2">
                <span className="text-[#C5FF4A] font-bold text-sm">
                  OPERATOR: {activeOperator.symbol} — {activeOperator.name}
                </span>
                <span className="text-[#61655D] text-[11px]">HIERARCHICAL FILTER</span>
              </div>

              <div className="text-xs font-sans text-[#F1F0E8] leading-relaxed">
                {activeOperator.purpose}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="border border-[#1E221E] bg-[#121412] p-3 rounded">
                  <span className="text-[10px] text-[#E5A93C] uppercase block mb-1">
                    // PARADEDB IN-INDEX BEFORE:
                  </span>
                  <p className="font-sans text-[11px] text-[#969A92]">
                    {activeOperator.paradeDbBefore}
                  </p>
                </div>

                <div className="border border-[#1E221E] bg-[#121412] p-3 rounded">
                  <span className="text-[10px] text-[#C5FF4A] uppercase block mb-1">
                    // NATIVE GiST AFTER:
                  </span>
                  <p className="font-sans text-[11px] text-[#F1F0E8]">
                    {activeOperator.paradeDbAfter}
                  </p>
                </div>
              </div>

              <div className="border border-[#1E221E] bg-[#161915] p-3 rounded font-mono text-[11px]">
                <span className="text-[#61655D] block mb-1">SQL QUERY EXAMPLE:</span>
                <code className="text-[#C5FF4A]">{activeOperator.postgresSqlExample}</code>
              </div>
            </div>
          </section>

          {/* Benchmark Methodology Explorer */}
          <section className="border border-[#292D28] bg-[#121412] p-6 sm:p-8 rounded space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#292D28] pb-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <BarChart3 size={14} className="text-[#C5FF4A]" />
                <span className="text-[#F1F0E8] font-bold">
                  BENCHMARK METHODOLOGY EXPLORER (100,000 ROWS)
                </span>
              </div>
              <span className="text-[#E5A93C] text-[11px]">
                HONEST METHODOLOGY // ZERO FABRICATED TIMINGS
              </span>
            </div>

            <p className="font-sans text-xs text-[#969A92] leading-relaxed">
              {openSource.benchmarkMethodology.methodologyNote}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 font-mono text-xs">
              {openSource.benchmarkMethodology.selectivityRegimes.map((regime, idx) => {
                const isSelected = selectedRegime.regime === regime.regime;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      playTactileClick();
                      setSelectedRegime(regime);
                    }}
                    className={`p-3 rounded border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#C5FF4A] bg-[#161915] shadow-md shadow-[#C5FF4A]/10 scale-[1.02]"
                        : "border-[#292D28] bg-[#0E100E] hover:border-[#969A92]"
                    }`}
                  >
                    <div className="text-[10px] text-[#61655D]">REGIME 0{idx + 1}</div>
                    <div
                      className={`font-bold mt-1 truncate ${
                        isSelected ? "text-[#C5FF4A]" : "text-[#F1F0E8]"
                      }`}
                    >
                      {regime.regime}
                    </div>
                    <div className="text-[10px] text-[#E5A93C] mt-1">{regime.percentage}</div>
                  </button>
                );
              })}
            </div>

            {/* Active Regime Methodology Box */}
            <div className="border border-[#1E221E] bg-[#0B0C0B] p-5 rounded font-mono text-xs space-y-3">
              <div className="flex flex-wrap items-center justify-between border-b border-[#1E221E] pb-2">
                <span className="text-[#C5FF4A] font-bold">
                  TARGET REGIME: {selectedRegime.regime}
                </span>
                <span className="text-[#969A92]">{selectedRegime.queryType}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <span className="font-mono text-[10px] text-[#61655D] uppercase block mb-1">
                    // SELECTIVITY PROFILE
                  </span>
                  <p className="text-[#F1F0E8] leading-relaxed">
                    {selectedRegime.description}
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[10px] text-[#61655D] uppercase block mb-1">
                    // BENCHMARK FILTER PATTERN
                  </span>
                  <code className="text-[#C5FF4A] font-mono text-[11px] block bg-[#161915] p-2 rounded border border-[#1E221E]">
                    {selectedRegime.filterPattern}
                  </code>
                </div>
              </div>

              <div className="border-t border-[#1E221E] pt-2 text-[11px] text-[#61655D] font-mono">
                Benchmark script location: <code>{openSource.benchmarkMethodology.benchmarkFile}</code>
              </div>
            </div>
          </section>

          {/* Bottom Pagination / Cross-Case Study Navigation */}
          <div className="pt-8 border-t border-[#292D28] grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <Link
              href="/work/synthetic-web-monitoring"
              className="border border-[#292D28] bg-[#121412] p-4 rounded hover:border-[#C5FF4A] transition-colors group flex items-center justify-between"
            >
              <div>
                <div className="text-[10px] text-[#61655D]">← SYSTEMS CASE STUDY 03</div>
                <div className="font-bold text-[#F1F0E8] group-hover:text-[#C5FF4A] mt-1">
                  Synthetic Web Monitoring
                </div>
              </div>
            </Link>

            <Link
              href="/work/intellifile"
              className="border border-[#292D28] bg-[#121412] p-4 rounded hover:border-[#C5FF4A] transition-colors group flex items-center justify-between text-right sm:col-start-2"
            >
              <div className="w-full">
                <div className="text-[10px] text-[#61655D]">SYSTEMS CASE STUDY 01 →</div>
                <div className="font-bold text-[#F1F0E8] group-hover:text-[#C5FF4A] mt-1">
                  IntelliFile — AI File Search
                </div>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </CaseStudyClientWrapper>
  );
}
