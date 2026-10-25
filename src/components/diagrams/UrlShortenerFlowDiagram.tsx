"use client";

import React, { useState } from "react";
import { playTactileClick } from "@/utils/audio";
import { Zap, Database, Server, Globe, ArrowRight } from "lucide-react";

export function UrlShortenerFlowDiagram() {
  const [scenario, setScenario] = useState<"hit" | "miss">("hit");

  const toggleScenario = (mode: "hit" | "miss") => {
    playTactileClick();
    setScenario(mode);
  };

  return (
    <div className="rounded border border-[#292D28] bg-[#0E100E] p-4 sm:p-5">
      {/* Header and Scenario Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#292D28] pb-3 mb-5 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C5FF4A] animate-led" />
          <span className="text-[#F1F0E8] font-bold">
            REQUEST FLOW // CACHE-ASIDE ARCHITECTURE
          </span>
          <span className="text-[#61655D] text-[10px]">CONCEPTUAL MODEL</span>
        </div>

        {/* Toggle between Cache Hit and Cache Miss */}
        <div className="flex items-center gap-1 border border-[#292D28] bg-[#121412] p-1 rounded">
          <button
            type="button"
            onClick={() => toggleScenario("hit")}
            className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
              scenario === "hit"
                ? "bg-[#C5FF4A] text-[#0B0C0B] font-bold"
                : "text-[#969A92] hover:text-[#F1F0E8]"
            }`}
          >
            ⚡ CACHE HIT (HOT PATH)
          </button>
          <button
            type="button"
            onClick={() => toggleScenario("miss")}
            className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
              scenario === "miss"
                ? "bg-[#E5A93C] text-[#0B0C0B] font-bold"
                : "text-[#969A92] hover:text-[#F1F0E8]"
            }`}
          >
            🔄 CACHE MISS (COLD PATH)
          </button>
        </div>
      </div>

      {/* Visual Pipeline Nodes */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative py-2 font-mono text-xs">
        {/* Node 1: User Client */}
        <div className="border border-[#292D28] bg-[#121412] p-3 rounded flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#61655D] text-[10px] mb-2">
            <span>NODE 01</span>
            <Globe size={13} />
          </div>
          <div className="font-bold text-[#F1F0E8]">USER CLIENT</div>
          <div className="text-[10px] text-[#969A92] mt-1">GET /x8k9Fq</div>
          <div className="mt-3 text-[10px] text-[#61655D]">DNS + TLS 1.3</div>
        </div>

        {/* Node 2: Nginx Load Balancer */}
        <div className="border border-[#292D28] bg-[#121412] p-3 rounded flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#61655D] text-[10px] mb-2">
            <span>NODE 02</span>
            <Server size={13} />
          </div>
          <div className="font-bold text-[#F1F0E8]">NGINX EDGE</div>
          <div className="text-[10px] text-[#969A92] mt-1">Reverse Proxy</div>
          <div className="mt-3 text-[10px] text-[#C5FF4A]">Rate Limit Check</div>
        </div>

        {/* Node 3: Shortener Service */}
        <div className="border border-[#292D28] bg-[#121412] p-3 rounded flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#61655D] text-[10px] mb-2">
            <span>NODE 03</span>
            <Server size={13} />
          </div>
          <div className="font-bold text-[#F1F0E8]">REDIRECT SVC</div>
          <div className="text-[10px] text-[#969A92] mt-1">Express Node.js</div>
          <div className="mt-3 text-[10px] text-[#969A92]">K8s Pod HPA</div>
        </div>

        {/* Node 4: Redis Cache */}
        <div
          className={`border p-3 rounded flex flex-col justify-between transition-all ${
            scenario === "hit"
              ? "border-[#C5FF4A] bg-[#161915] shadow-md shadow-[#C5FF4A]/10"
              : "border-[#292D28] bg-[#121412]"
          }`}
        >
          <div className="flex items-center justify-between text-[#61655D] text-[10px] mb-2">
            <span>NODE 04</span>
            <Zap
              size={13}
              className={scenario === "hit" ? "text-[#C5FF4A]" : "text-[#969A92]"}
            />
          </div>
          <div
            className={`font-bold ${
              scenario === "hit" ? "text-[#C5FF4A]" : "text-[#F1F0E8]"
            }`}
          >
            REDIS CLUSTER
          </div>
          <div className="text-[10px] text-[#969A92] mt-1">Key: url:x8k9Fq</div>
          <div className="mt-3 text-[10px]">
            {scenario === "hit" ? (
              <span className="text-[#C5FF4A] font-bold">✓ CACHE HIT (~2ms)</span>
            ) : (
              <span className="text-[#E5A93C]">✗ KEY NOT FOUND</span>
            )}
          </div>
        </div>

        {/* Node 5: MongoDB Replica Set */}
        <div
          className={`border p-3 rounded flex flex-col justify-between transition-all ${
            scenario === "miss"
              ? "border-[#E5A93C] bg-[#1A1612] shadow-md shadow-[#E5A93C]/10"
              : "border-[#292D28] bg-[#121412] opacity-60"
          }`}
        >
          <div className="flex items-center justify-between text-[#61655D] text-[10px] mb-2">
            <span>NODE 05</span>
            <Database
              size={13}
              className={scenario === "miss" ? "text-[#E5A93C]" : "text-[#969A92]"}
            />
          </div>
          <div
            className={`font-bold ${
              scenario === "miss" ? "text-[#E5A93C]" : "text-[#969A92]"
            }`}
          >
            MONGODB REPLICA
          </div>
          <div className="text-[10px] text-[#969A92] mt-1">Durable B-Tree</div>
          <div className="mt-3 text-[10px]">
            {scenario === "miss" ? (
              <span className="text-[#E5A93C] font-bold">
                Read Replica (~15ms)
              </span>
            ) : (
              <span className="text-[#61655D]">BYPASSED (0 I/O)</span>
            )}
          </div>
        </div>
      </div>

      {/* Execution Path Analysis */}
      <div className="mt-4 rounded border border-[#1E221E] bg-[#121412] p-4 text-xs font-mono">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[#61655D]">EXECUTION PATH:</span>
          {scenario === "hit" ? (
            <span className="text-[#C5FF4A] font-semibold flex items-center gap-1">
              CLIENT → NGINX → REDIRECTION SVC → REDIS (HIT) → 302 REDIRECT
            </span>
          ) : (
            <span className="text-[#E5A93C] font-semibold flex items-center gap-1">
              CLIENT → NGINX → SVC → REDIS (MISS) → MONGODB READ → WRITE-BACK
              REDIS → 302 REDIRECT
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] font-sans text-[#969A92] pt-2 border-t border-[#1E221E]">
          <div>
            <span className="font-mono text-[#61655D] block">END-TO-END LATENCY</span>
            <span className="font-bold text-[#F1F0E8] text-sm font-mono">
              {scenario === "hit" ? "3 - 5 ms (40% lower)" : "16 - 22 ms"}
            </span>
          </div>
          <div>
            <span className="font-mono text-[#61655D] block">DATABASE IMPACT</span>
            <span className="text-[#F1F0E8]">
              {scenario === "hit"
                ? "Zero connection pool or disk consumption"
                : "Read query directed to secondary replica"}
            </span>
          </div>
          <div>
            <span className="font-mono text-[#61655D] block">CACHE POPULATION</span>
            <span className="text-[#F1F0E8]">
              {scenario === "hit"
                ? "TTL reset on access"
                : "Asynchronously populates Redis with 24hr TTL"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
