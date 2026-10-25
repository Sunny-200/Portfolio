import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PORTFOLIO_DATA, ProjectCaseStudy } from "@/data/portfolioData";
import { RetrievalPipelineDiagram } from "@/components/diagrams/RetrievalPipelineDiagram";
import { UrlShortenerFlowDiagram } from "@/components/diagrams/UrlShortenerFlowDiagram";
import { SyntheticMonitoringDiagram } from "@/components/diagrams/SyntheticMonitoringDiagram";
import { CaseStudyClientWrapper } from "@/components/CaseStudyClientWrapper";
import { GithubIcon } from "@/components/icons/BrandIcons";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Layers,
  AlertTriangle,
  CheckCircle2,
  FileCode,
  Terminal,
  Cpu,
  ShieldAlert,
  GitBranch,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [
    { slug: "intellifile" },
    { slug: "url-shortener" },
    { slug: "synthetic-web-monitoring" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PORTFOLIO_DATA.projects.find((p) => p.slug === slug);
  if (!project) return { title: "Case Study Not Found" };

  return {
    title: `${project.title} | Yeruva Mahesh Reddy`,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = PORTFOLIO_DATA.projects.findIndex((p) => p.slug === slug);
  if (projectIndex === -1) notFound();

  const project = PORTFOLIO_DATA.projects[projectIndex];
  const prevProject =
    projectIndex > 0 ? PORTFOLIO_DATA.projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < PORTFOLIO_DATA.projects.length - 1
      ? PORTFOLIO_DATA.projects[projectIndex + 1]
      : null;

  return (
    <CaseStudyClientWrapper>
      <div className="min-h-screen bg-[#0B0C0B] text-[#F1F0E8] overflow-x-hidden">

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-16">
          {/* Breadcrumb & Navigation Back */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs border-b border-[#292D28] pb-4">
            <Link
              href="/#work"
              className="flex items-center gap-2 text-[#969A92] hover:text-[#C5FF4A] transition-colors"
              data-cursor="pointer"
            >
              <ArrowLeft size={14} />
              <span>RETURN TO ENGINEERING CASE STUDIES</span>
            </Link>

            <div className="flex items-center gap-3 text-[#61655D]">
              <span>PROJECT {project.number}</span>
              <span>/</span>
              <span className="text-[#F1F0E8]">{project.category}</span>
            </div>
          </div>

          {/* Header Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 font-mono text-xs text-[#C5FF4A]">
              <span className="font-bold">SYSTEMS CASE STUDY {project.number}</span>
              <span className="text-[#61655D]">///</span>
              <span className="text-[#969A92]">{project.timeline}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#F1F0E8] tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="font-mono text-base sm:text-lg text-[#C5FF4A] leading-relaxed max-w-3xl">
              {project.tagline}
            </p>

            {/* Quick Actions & Repository Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-text="VIEW SOURCE"
                  className="flex items-center gap-2 bg-[#C5FF4A] text-[#0B0C0B] px-5 py-2.5 font-bold uppercase transition-transform hover:scale-[1.02]"
                >
                  <GithubIcon size={14} />
                  <span>VIEW REPOSITORY ON GITHUB</span>
                  <ExternalLink size={12} />
                </a>
              )}

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="border border-[#292D28] bg-[#121412] px-2.5 py-1 text-[#969A92] rounded-sm text-[11px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Metrics & Performance Dashboard */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className="rounded border border-[#292D28] bg-[#121412] p-4 space-y-1"
              >
                <div className="text-[10px] text-[#61655D] uppercase truncate">
                  {m.label}
                </div>
                <div className="text-2xl font-bold text-[#F1F0E8]">
                  {m.value}
                </div>
                <div className="text-[11px] text-[#969A92] font-sans leading-snug">
                  {m.description}
                </div>
              </div>
            ))}
          </div>

          {/* Section: Problem & Motivation */}
          <section className="border border-[#292D28] bg-[#121412] p-6 sm:p-8 rounded-sm space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#E5A93C] font-bold">
              <AlertTriangle size={15} />
              <span className="uppercase tracking-wider">
                THE PROBLEM & MOTIVATION
              </span>
            </div>
            <p className="font-sans text-sm sm:text-base text-[#F1F0E8] leading-relaxed">
              {project.problem}
            </p>
          </section>

          {/* Section: Interactive Architecture Simulation */}
          <section className="space-y-4">
            <div className="flex items-center justify-between font-mono text-xs text-[#969A92]">
              <div className="flex items-center gap-2 text-[#C5FF4A] font-bold">
                <Layers size={14} />
                <span>INTERACTIVE SYSTEM ARCHITECTURE & DATA FLOW</span>
              </div>
              <span className="text-[#61655D] text-[11px]">
                SELECT NODES TO INSPECT
              </span>
            </div>

            {project.slug === "intellifile" && <RetrievalPipelineDiagram />}
            {project.slug === "url-shortener" && <UrlShortenerFlowDiagram />}
            {project.slug === "synthetic-web-monitoring" && (
              <SyntheticMonitoringDiagram />
            )}
          </section>

          {/* Section: Architectural Specification Layers */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#F1F0E8] uppercase tracking-wider">
              <Terminal size={14} className="text-[#C5FF4A]" />
              <span>DETAILED COMPONENT RESPONSIBILITIES</span>
            </div>
            <div className="space-y-3 font-mono text-xs">
              {project.architecture.map((layer, idx) => (
                <div
                  key={idx}
                  className="border border-[#1E221E] bg-[#121412] p-4 rounded flex items-start gap-4 text-[#F1F0E8]"
                >
                  <span className="text-[#C5FF4A] font-bold text-sm">
                    {`0${idx + 1}`}
                  </span>
                  <p className="font-sans text-sm leading-relaxed text-[#969A92]">
                    {layer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Important Engineering Decisions & Trade-Offs */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#F1F0E8] uppercase tracking-wider">
              <Cpu size={14} className="text-[#C5FF4A]" />
              <span>IMPORTANT ENGINEERING DECISIONS & TRADE-OFFS</span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              {project.keyDecisions.map((decision, idx) => (
                <div
                  key={idx}
                  className="border border-[#292D28] bg-[#121412] p-5 rounded space-y-3"
                >
                  <div className="text-sm font-bold text-[#C5FF4A]">
                    {decision.title}
                  </div>
                  <div className="font-sans text-xs sm:text-sm text-[#F1F0E8] leading-relaxed">
                    <span className="font-mono text-[10px] text-[#61655D] block mb-1">
                      RATIONALE & ARCHITECTURAL MOTIVATION:
                    </span>
                    {decision.rationale}
                  </div>
                  <div className="font-sans text-xs sm:text-sm text-[#969A92] leading-relaxed border-t border-[#1E221E] pt-3">
                    <span className="font-mono text-[10px] text-[#E5A93C] block mb-1">
                      TRADE-OFF INCURRED & MITIGATION:
                    </span>
                    {decision.tradeOff}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Implementation Details & Code Structure */}
          <section className="border border-[#292D28] bg-[#121412] p-6 sm:p-8 rounded space-y-4 font-mono text-xs">
            <div className="flex items-center gap-2 text-[#C5FF4A] font-bold uppercase tracking-wider">
              <FileCode size={15} />
              <span>IMPLEMENTATION DETAILS & CODEBASE ARCHITECTURE</span>
            </div>

            <div className="space-y-3 font-sans text-sm text-[#969A92] leading-relaxed">
              {project.implementationDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-[#C5FF4A] font-mono">•</span>
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            {project.challengesAndTradeoffs && (
              <div className="mt-4 pt-4 border-t border-[#1E221E] font-sans text-xs text-[#969A92] leading-relaxed">
                <span className="font-mono text-[10px] text-[#E5A93C] uppercase block mb-1">
                  // CRITICAL CONCURRENCY & RESOURCE CHALLENGE:
                </span>
                {project.challengesAndTradeoffs}
              </div>
            )}
          </section>

          {/* Section: Testing, Verification & Measurements */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#C5FF4A] font-bold uppercase tracking-wider">
              <CheckCircle2 size={15} />
              <span>TESTING, MEASUREMENTS & VERIFICATION HARNESS</span>
            </div>

            <div className="border border-[#292D28] bg-[#0E100E] p-5 rounded font-mono text-xs space-y-3">
              <div className="text-[11px] text-[#61655D] border-b border-[#1E221E] pb-2">
                REPORTED TEST SUITE MEASUREMENTS
              </div>
              {project.testingAndVerification.map((test, idx) => (
                <div key={idx} className="flex items-start gap-3 text-[#F1F0E8]">
                  <span className="text-[#C5FF4A]">✓</span>
                  <span className="font-sans text-xs">{test}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Lessons Learned */}
          <section className="border border-[#1E221E] bg-[#121412] p-6 rounded space-y-3 font-mono text-xs">
            <span className="text-[10px] text-[#61655D] uppercase tracking-wider block">
              // ARCHITECTURAL LESSONS LEARNED
            </span>
            <div className="space-y-2 font-sans text-xs text-[#969A92] leading-relaxed">
              {project.lessonsLearned.map((lesson, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#C5FF4A] font-mono">→</span>
                  <span>{lesson}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Pagination / Cross-Case Study Navigation */}
          <div className="pt-8 border-t border-[#292D28] grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            {prevProject ? (
              <Link
                href={`/work/${prevProject.slug}`}
                className="border border-[#292D28] bg-[#121412] p-4 rounded hover:border-[#C5FF4A] transition-colors group flex items-center justify-between"
              >
                <div>
                  <div className="text-[10px] text-[#61655D]">← PREVIOUS CASE STUDY</div>
                  <div className="font-bold text-[#F1F0E8] group-hover:text-[#C5FF4A] mt-1">
                    {prevProject.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`/work/${nextProject.slug}`}
                className="border border-[#292D28] bg-[#121412] p-4 rounded hover:border-[#C5FF4A] transition-colors group flex items-center justify-between text-right sm:col-start-2"
              >
                <div className="w-full">
                  <div className="text-[10px] text-[#61655D]">NEXT CASE STUDY →</div>
                  <div className="font-bold text-[#F1F0E8] group-hover:text-[#C5FF4A] mt-1">
                    {nextProject.title}
                  </div>
                </div>
              </Link>
            ) : null}
          </div>
        </main>
      </div>
    </CaseStudyClientWrapper>
  );
}
