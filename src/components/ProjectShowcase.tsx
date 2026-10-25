"use client";

import React from "react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { RetrievalPipelineDiagram } from "./diagrams/RetrievalPipelineDiagram";
import { UrlShortenerFlowDiagram } from "./diagrams/UrlShortenerFlowDiagram";
import { SyntheticMonitoringDiagram } from "./diagrams/SyntheticMonitoringDiagram";
import { playTactileClick } from "@/utils/audio";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { ArrowUpRight, Terminal, ArrowRight, ExternalLink } from "lucide-react";

export function ProjectShowcase() {
  // Present the 3 featured primary projects
  const featuredProjects = PORTFOLIO_DATA.projects.slice(0, 3);

  return (
    <section id="work" className="py-20 sm:py-28 border-b border-[#292D28] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#292D28] pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#C5FF4A] mb-2">
              <span className="font-bold">01 //</span>
              <span className="uppercase tracking-widest">SELECTED WORK</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#F1F0E8] tracking-tight">
              Engineering Case Studies
            </h2>
          </div>
          <p className="font-mono text-xs text-[#969A92] max-w-md">
            Inside the architecture, trade-offs, and engineering decisions behind my projects.
          </p>
        </div>

        {/* Curated Project Previews - Asymmetric & Distinct Layouts */}
        <div className="space-y-20">
          {featuredProjects.map((project, index) => (
            <article
              key={project.id}
              className="border border-[#292D28] bg-[#121412] p-6 sm:p-8 lg:p-10 rounded-sm relative overflow-hidden group hover:border-[#3D433C] transition-all"
            >
              {/* Giant Background Number Watermark */}
              <div className="absolute right-4 top-2 select-none pointer-events-none font-display font-extrabold text-7xl sm:text-9xl text-[#1E221E]/60 -z-0">
                {project.number}
              </div>

              <div className="relative z-10 space-y-6">
                {/* Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-[#969A92] border-b border-[#1E221E] pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[#C5FF4A] font-bold text-sm">
                      CASE {project.number}
                    </span>
                    <span className="text-[#61655D]">|</span>
                    <span className="text-[#F1F0E8] font-semibold">{project.category}</span>
                  </div>
                  <span className="text-[#61655D]">{project.timeline}</span>
                </div>

                {/* Grid Split: Curated Summary Left, Interactive Visual Preview Right */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Curated Info & Actions */}
                  <div className="lg:col-span-5 space-y-5">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F1F0E8] leading-tight">
                      {project.title}
                    </h3>

                    <p className="font-sans text-sm text-[#969A92] leading-relaxed">
                      {project.tagline}
                    </p>

                    {/* Highlights / Key Metric Pills */}
                    <div className="grid grid-cols-2 gap-2 font-mono">
                      {project.metrics.slice(0, 2).map((metric, idx) => (
                        <div
                          key={idx}
                          className="border border-[#1E221E] bg-[#0E100E] p-2.5 rounded-sm"
                        >
                          <div className="text-[10px] text-[#61655D] truncate">
                            {metric.label}
                          </div>
                          <div className="text-lg font-bold text-[#F1F0E8] mt-0.5">
                            {metric.value}
                          </div>
                          <div className="text-[9px] text-[#969A92] truncate mt-0.5">
                            {metric.description}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Technology Summary Tags */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] font-mono text-[#61655D] uppercase tracking-wider">
                        CORE STACK
                      </div>
                      <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                        {project.tech.slice(0, 6).map((t, idx) => (
                          <span
                            key={idx}
                            className="border border-[#292D28] bg-[#161915] px-2 py-0.5 text-[#F1F0E8] rounded-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Curated Actions */}
                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <Link
                        href={`/work/${project.slug}`}
                        onClick={() => playTactileClick()}
                        data-cursor-text="EXPLORE CASE STUDY"
                        className="flex items-center gap-2 bg-[#C5FF4A] text-[#0B0C0B] px-5 py-2.5 font-mono text-xs font-bold uppercase transition-transform hover:scale-[1.02] cursor-pointer"
                      >
                        <span>EXPLORE CASE STUDY</span>
                        <ArrowRight size={14} />
                      </Link>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor-text="VIEW SOURCE"
                          className="flex items-center gap-2 border border-[#292D28] bg-[#161915] px-4 py-2.5 font-mono text-xs text-[#F1F0E8] hover:border-[#C5FF4A] hover:text-[#C5FF4A] transition-colors"
                        >
                          <GithubIcon size={14} />
                          <span>SOURCE REPOSITORY</span>
                          <ExternalLink size={11} className="text-[#61655D]" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Distinctive Interactive Visual Preview */}
                  <div className="lg:col-span-7 w-full">
                    {project.id === "intellifile" && <RetrievalPipelineDiagram />}
                    {project.id === "url-shortener" && <UrlShortenerFlowDiagram />}
                    {project.id === "synthetic-monitoring" && (
                      <SyntheticMonitoringDiagram />
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
