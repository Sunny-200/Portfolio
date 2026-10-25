"use client";

import React, { useState } from "react";
import { playTactileClick } from "@/utils/audio";

interface PipelineStage {
  id: string;
  name: string;
  sublabel: string;
  algorithm: string;
  latency: string;
  details: string;
  guardrail: string;
}

const STAGES: PipelineStage[] = [
  {
    id: "query",
    name: "01. USER QUERY",
    sublabel: "Natural Language Input",
    algorithm: "Tokenizer & Spellcheck",
    latency: "< 1 ms",
    details:
      "Raw natural language string parsed from local desktop UI. Strip out control characters and extract intent tokens.",
    guardrail: "Local memory only; zero network telemetry emitted.",
  },
  {
    id: "planner",
    name: "02. QUERY PLANNER",
    sublabel: "Adaptive Search Routing",
    algorithm: "Heuristic Classifier",
    latency: "1 - 2 ms",
    details:
      "Evaluates query structure. Unambiguous exact matches (file names, code symbols, hash prefixes) route exclusively to FTS5 BM25, reducing dense model invocation from 97% to 43% of queries.",
    guardrail: "Prevents unnecessary GPU/CPU VRAM churn on trivial lookups.",
  },
  {
    id: "hybrid",
    name: "03. DUAL RETRIEVAL",
    sublabel: "BM25 + Vector Search",
    algorithm: "SQLite FTS5 + LanceDB",
    latency: "8 - 12 ms",
    details:
      "Parallel dispatch: SQLite FTS5 executes BM25 keyword matching on lexical tokens; LanceDB executes ANN cosine similarity search across 384-dimensional dense embeddings.",
    guardrail: "Arrow zero-copy columnar buffers avoid memory bloat.",
  },
  {
    id: "rrf",
    name: "04. RECIPROCAL RANK FUSION",
    sublabel: "Rank Merging",
    algorithm: "RRF(d) = ∑ 1 / (k + r_i)",
    latency: "< 1 ms",
    details:
      "Merges rank lists from keyword and vector spaces using smoothing constant k=60. Ensures documents with high semantic relevance or exact identifier matches both surface into candidate pool.",
    guardrail: "Score normalization prevents vector distance scale drift.",
  },
  {
    id: "rerank",
    name: "05. RERANKING",
    sublabel: "Cross-Encoder Scorer",
    algorithm: "Cross-Encoder / MiniLM",
    latency: "6 - 8 ms",
    details:
      "Re-scores top 20 candidate passages by jointly attending over query and text chunks, eliminating false positives from vector cosine space.",
    guardrail: "Capped to 20 candidate chunks to guarantee sub-25ms P95.",
  },
  {
    id: "grounded",
    name: "06. SOURCE GROUNDING",
    sublabel: "Answer Synthesis",
    algorithm: "Qwen2.5 (Quantized)",
    latency: "Streamed",
    details:
      "Local offline LLM extracts citations, highlights exact file line numbers, and presents answers grounded strictly in retrieved documents.",
    guardrail: "Temperature=0.1 with strict citation checks prevents hallucination.",
  },
];

export function RetrievalPipelineDiagram() {
  const [activeStage, setActiveStage] = useState<PipelineStage>(STAGES[3]); // RRF by default

  return (
    <div className="rounded border border-[#292D28] bg-[#0E100E] p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between border-b border-[#292D28] pb-3 mb-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C5FF4A] animate-led" />
          <span className="text-[#F1F0E8] font-bold">
            INTELLIFILE RETRIEVAL PIPELINE
          </span>
          <span className="text-[#61655D] text-[10px]">CONCEPTUAL TRACE</span>
        </div>
        <span className="text-[#969A92] text-[11px]">
          CLICK ANY STAGE TO INSPECT ALGORITHM
        </span>
      </div>

      {/* Horizontal Stages Flow */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {STAGES.map((stage) => {
          const isSelected = activeStage.id === stage.id;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => {
                playTactileClick();
                setActiveStage(stage);
              }}
              data-cursor="pointer"
              className={`p-2.5 rounded border text-left transition-all cursor-pointer ${
                isSelected
                  ? "border-[#C5FF4A] bg-[#161915] shadow-md shadow-[#C5FF4A]/10 scale-[1.02]"
                  : "border-[#292D28] bg-[#121412] hover:border-[#969A92]/60"
              }`}
            >
              <div className="font-mono text-[9px] text-[#61655D] mb-1">
                {stage.latency}
              </div>
              <div
                className={`font-mono text-xs font-bold truncate ${
                  isSelected ? "text-[#C5FF4A]" : "text-[#F1F0E8]"
                }`}
              >
                {stage.name}
              </div>
              <div className="text-[10px] text-[#969A92] truncate mt-0.5">
                {stage.sublabel}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Deep-Dive */}
      <div className="mt-4 rounded border border-[#1E221E] bg-[#121412] p-4 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between border-b border-[#1E221E] pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[#C5FF4A] font-bold">{activeStage.name}</span>
            <span className="text-[#61655D]">/</span>
            <span className="text-[#F1F0E8]">{activeStage.sublabel}</span>
          </div>
          <div className="text-[11px] text-[#E5A93C]">
            ALGORITHM: {activeStage.algorithm}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div>
            <span className="font-mono text-[10px] text-[#61655D] uppercase tracking-wider block mb-1">
              // STAGE LOGIC & MATHEMATICS
            </span>
            <p className="text-[#F1F0E8] leading-relaxed">
              {activeStage.details}
            </p>
          </div>
          <div>
            <span className="font-mono text-[10px] text-[#61655D] uppercase tracking-wider block mb-1">
              // PRIVACY & EFFICIENCY GUARD
            </span>
            <p className="text-[#969A92] leading-relaxed">
              {activeStage.guardrail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
