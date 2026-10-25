"use client";

import React, { useState } from "react";
import { playTactileClick } from "@/utils/audio";

interface SystemNode {
  id: string;
  name: string;
  sublabel: string;
  icon: string;
  latencyBudget: string;
  protocol: string;
  role: string;
  failureMode: string;
}

const NODES: SystemNode[] = [
  {
    id: "client",
    name: "CLIENT",
    sublabel: "Edge Browser / User Device",
    icon: "💻",
    latencyBudget: "0ms base",
    protocol: "HTTPS / TLS 1.3 / HTTP/2",
    role: "Originates encrypted application request with JWT token headers.",
    failureMode: "Handled via exponential backoff and jittered retry policies.",
  },
  {
    id: "api",
    name: "API GATEWAY",
    sublabel: "Reverse Proxy & Router",
    icon: "⚡",
    latencyBudget: "1 - 3 ms",
    protocol: "POSIX TCP / Nginx Epoll",
    role: "TLS termination, token validation, rate-limiting, and microservice routing.",
    failureMode: "Circuit breakers isolate downstream service latency spikes.",
  },
  {
    id: "cache",
    name: "CACHE (REDIS)",
    sublabel: "Distributed Key-Value",
    icon: "⚡",
    latencyBudget: "< 1 ms",
    protocol: "RESP (REdis Serialization)",
    role: "In-memory LRU cache holding hot keys, short URLs, and session schemas.",
    failureMode: "Cache-aside pattern gracefully falls back to persistent DB on miss.",
  },
  {
    id: "db",
    name: "DATABASE",
    sublabel: "PostgreSQL / MongoDB Replica",
    icon: "🗄️",
    latencyBudget: "4 - 15 ms",
    protocol: "Binary Wire Protocol / GiST Index",
    role: "ACID durable transactions, index bitmap intersections, and replica sync.",
    failureMode: "Automated replica failover with zero write loss during primary elections.",
  },
  {
    id: "response",
    name: "RESPONSE",
    sublabel: "Synthesized Output / 200 OK",
    icon: "📦",
    latencyBudget: "Total: 18 - 25 ms",
    protocol: "Streaming JSON / Gzip Encoded",
    role: "Packets assembled and returned to client with telemetry trace IDs.",
    failureMode: "Fallback to stale-while-revalidate cached responses if origin fails.",
  },
];

export function SystemsIllustration() {
  const [activeNode, setActiveNode] = useState<SystemNode>(NODES[1]); // Default to API Gateway

  return (
    <div className="w-full rounded border border-[#292D28] bg-[#121412] p-5 shadow-2xl relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 systems-grid-fine opacity-40 pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between border-b border-[#292D28] pb-3 mb-5 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#C5FF4A] animate-led" />
          <span className="text-[#F1F0E8] font-bold">SYSTEMS ARCHITECTURE TRACE</span>
          <span className="text-[#61655D] text-[10px]">REQ_FLOW // E2E</span>
        </div>
        <div className="text-[11px] text-[#969A92]">
          HOVER NODES TO INSPECT PROTOCOLS
        </div>
      </div>

      {/* Interactive Request Pipeline Diagram */}
      <div className="relative z-10 grid grid-cols-5 gap-2 sm:gap-3 py-4">
        {NODES.map((node, idx) => {
          const isSelected = activeNode.id === node.id;
          return (
            <div key={node.id} className="relative flex flex-col items-center">
              {/* Node Card */}
              <button
                type="button"
                onClick={() => {
                  playTactileClick();
                  setActiveNode(node);
                }}
                onMouseEnter={() => {
                  playTactileClick();
                  setActiveNode(node);
                }}
                data-cursor="inspect"
                className={`w-full text-left p-2.5 sm:p-3 rounded border transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#C5FF4A] bg-[#161915] shadow-lg shadow-[#C5FF4A]/10 scale-[1.03]"
                    : "border-[#292D28] bg-[#0B0C0B]/80 hover:border-[#969A92]/60 hover:bg-[#161915]/60"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] text-[#61655D]">
                    0{idx + 1}
                  </span>
                  <span className="text-xs">{node.icon}</span>
                </div>
                <div
                  className={`font-mono text-xs font-bold truncate ${
                    isSelected ? "text-[#C5FF4A]" : "text-[#F1F0E8]"
                  }`}
                >
                  {node.name}
                </div>
                <div className="hidden sm:block text-[10px] text-[#969A92] truncate mt-0.5">
                  {node.sublabel}
                </div>
                <div className="mt-2 flex items-center gap-1 font-mono text-[9px] text-[#E5A93C]">
                  <span>⏱ {node.latencyBudget}</span>
                </div>
              </button>

              {/* Connecting Line with Animated Packet Pulse */}
              {idx < NODES.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                  <div className="w-4 h-[2px] bg-[#292D28] relative">
                    <div className="absolute top-[-2px] left-0 h-1.5 w-1.5 rounded-full bg-[#C5FF4A] animate-ping" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Node Telemetry & Technical Detail Panel */}
      <div className="relative z-10 mt-4 rounded border border-[#292D28] bg-[#0B0C0B] p-4 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E221E] pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[#C5FF4A] font-bold">NODE: {activeNode.name}</span>
            <span className="text-[#61655D]">|</span>
            <span className="text-[#969A92]">{activeNode.sublabel}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-[#61655D]">PROTOCOL:</span>
            <span className="text-[#E5A93C]">{activeNode.protocol}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[10px] text-[#61655D] uppercase tracking-wider block mb-1">
              // ROLE & EXECUTION PATH
            </span>
            <p className="text-[#F1F0E8] leading-relaxed">{activeNode.role}</p>
          </div>
          <div>
            <span className="text-[10px] text-[#61655D] uppercase tracking-wider block mb-1">
              // RESILIENCE & FAILURE RECOVERY
            </span>
            <p className="text-[#969A92] leading-relaxed">
              {activeNode.failureMode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
