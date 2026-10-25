"use client";

import React, { useState } from "react";
import { playTactileClick } from "@/utils/audio";
import { Cpu, Terminal, Shield, Network } from "lucide-react";

interface TopologyNode {
  id: string;
  type: "core" | "agent" | "worker";
  title: string;
  role: string;
  ipc: string;
  faultIsolation: string;
}

const NODES: TopologyNode[] = [
  {
    id: "core",
    type: "core",
    title: "CORE PROCESS (PARENT)",
    role: "Central coordinator maintaining probe schedules, target URL queues, and aggregating microsecond TTFB telemetry.",
    ipc: "TCP stream sockets over loopback / LAN with 32-byte packed binary headers.",
    faultIsolation: "Monitors agent heartbeats; redistributes URLs if an agent fails.",
  },
  {
    id: "agent-1",
    type: "agent",
    title: "AGENT SERVER 1",
    role: "Event-driven daemon using poll() to multiplex Core socket commands and up to 5 concurrent isolated worker IPC channels.",
    ipc: "Unix-domain socketpair() providing full-duplex non-blocking byte streams to workers.",
    faultIsolation: "Catches SIGCHLD signals asynchronously using non-blocking waitpid().",
  },
  {
    id: "agent-2",
    type: "agent",
    title: "AGENT SERVER 2",
    role: "Independent agent process executing synthetic probe batches across distinct network routing boundaries.",
    ipc: "Unix-domain socketpair() with fixed-size struct serialization.",
    faultIsolation: "Restarts crashed workers without dropping Core communication.",
  },
  {
    id: "agent-3",
    type: "agent",
    title: "AGENT SERVER 3",
    role: "Parallel agent daemon handling TLS handshake timing, DNS lookup benchmarking, and HTTP status verification.",
    ipc: "Unix-domain socketpair() with kernel buffer pooling.",
    faultIsolation: "Guarantees agent memory space remains clean across prolonged runs.",
  },
  {
    id: "worker",
    type: "worker",
    title: "ISOLATED WORKER PROCESS",
    role: "Sandboxed child process spawned via fork() to execute a single untrusted network probe and return TTFB timings.",
    ipc: "Bidirectional socketpair() returning packed binary probe results.",
    faultIsolation: "100% crash isolation: if a worker segfaults or hangs, only the child process dies. The agent core remains unharmed.",
  },
];

export function SyntheticMonitoringDiagram() {
  const [selectedNode, setSelectedNode] = useState<TopologyNode>(NODES[1]); // Default to Agent 1

  return (
    <div className="rounded border border-[#292D28] bg-[#0E100E] p-4 sm:p-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#292D28] pb-3 mb-5 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C5FF4A] animate-led" />
          <span className="text-[#F1F0E8] font-bold">
            PROCESS TOPOLOGY & IPC MATRIX
          </span>
          <span className="text-[#61655D] text-[10px]">POSIX FORK / POLL()</span>
        </div>
        <span className="text-[#969A92] text-[11px]">
          CLICK PROCESS TO INSPECT IPC PRIMITIVES
        </span>
      </div>

      {/* Process Hierarchy Diagram */}
      <div className="space-y-4 font-mono text-xs">
        {/* Tier 1: Core Process */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              playTactileClick();
              setSelectedNode(NODES[0]);
            }}
            data-cursor="pointer"
            className={`w-full max-w-md p-3 rounded border text-left transition-all cursor-pointer ${
              selectedNode.id === "core"
                ? "border-[#C5FF4A] bg-[#161915] shadow-md shadow-[#C5FF4A]/10"
                : "border-[#292D28] bg-[#121412] hover:border-[#969A92]"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-[#C5FF4A] font-bold flex items-center gap-1.5">
                <Cpu size={12} />
                SCHEDULER & AGGREGATOR
              </span>
              <span className="text-[10px] text-[#61655D]">PID: 40120</span>
            </div>
            <div className="font-bold text-[#F1F0E8] text-sm">
              CORE PROCESS (PARENT DAEMON)
            </div>
            <div className="text-[10px] text-[#969A92] mt-0.5">
              Distributes test batches & tracks millisecond TTFB metrics
            </div>
          </button>
        </div>

        {/* Connecting Lines */}
        <div className="flex justify-center items-center gap-8 text-[#61655D] text-[10px]">
          <span>↓ TCP SOCKET 1</span>
          <span>↓ TCP SOCKET 2</span>
          <span>↓ TCP SOCKET 3</span>
        </div>

        {/* Tier 2: Three Agent Servers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[NODES[1], NODES[2], NODES[3]].map((agent) => {
            const isSelected = selectedNode.id === agent.id;
            return (
              <button
                key={agent.id}
                type="button"
                onClick={() => {
                  playTactileClick();
                  setSelectedNode(agent);
                }}
                data-cursor="pointer"
                className={`p-3 rounded border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#C5FF4A] bg-[#161915] shadow-md shadow-[#C5FF4A]/10 scale-[1.02]"
                    : "border-[#292D28] bg-[#121412] hover:border-[#969A92]"
                }`}
              >
                <div className="flex items-center justify-between mb-1 text-[10px]">
                  <span className="text-[#E5A93C] font-semibold flex items-center gap-1">
                    <Network size={11} />
                    POLL() MULTIPLEXER
                  </span>
                  <span className="text-[#61655D]">EVENT LOOP</span>
                </div>
                <div
                  className={`font-bold ${
                    isSelected ? "text-[#C5FF4A]" : "text-[#F1F0E8]"
                  }`}
                >
                  {agent.title}
                </div>
                <div className="text-[10px] text-[#969A92] mt-1">
                  Non-blocking I/O multiplexing
                </div>
              </button>
            );
          })}
        </div>

        {/* Connecting Lines to Isolated Workers */}
        <div className="flex justify-center items-center text-[#61655D] text-[10px]">
          <span>↓ Unix-domain socketpair() + fork()</span>
        </div>

        {/* Tier 3: Isolated Sandboxed Workers */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              playTactileClick();
              setSelectedNode(NODES[4]);
            }}
            data-cursor="pointer"
            className={`w-full max-w-lg p-3 rounded border text-left transition-all cursor-pointer ${
              selectedNode.id === "worker"
                ? "border-[#C5FF4A] bg-[#161915] shadow-md shadow-[#C5FF4A]/10"
                : "border-[#292D28] bg-[#121412] hover:border-[#969A92]"
            }`}
          >
            <div className="flex items-center justify-between mb-1 text-[10px]">
              <span className="text-[#C5FF4A] font-semibold flex items-center gap-1.5">
                <Shield size={12} />
                FAULT ISOLATION ENCLAVE
              </span>
              <span className="text-[#61655D]">UP TO 5 WORKERS / AGENT</span>
            </div>
            <div className="font-bold text-[#F1F0E8]">
              SANDBOXED WORKER PROCESSES (CHILDREN)
            </div>
            <div className="text-[10px] text-[#969A92] mt-0.5">
              Isolated POSIX process memory space; segfaults cannot crash parent
            </div>
          </button>
        </div>
      </div>

      {/* Selected Process Inspector Details */}
      <div className="mt-5 rounded border border-[#1E221E] bg-[#121412] p-4 font-mono text-xs">
        <div className="flex flex-wrap items-center justify-between border-b border-[#1E221E] pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[#C5FF4A] font-bold">
              {selectedNode.title}
            </span>
          </div>
          <div className="text-[11px] text-[#E5A93C]">
            COMMUNICATION: {selectedNode.ipc}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
          <div>
            <span className="font-mono text-[10px] text-[#61655D] uppercase tracking-wider block mb-1">
              // ROLE & EXECUTION MODEL
            </span>
            <p className="text-[#F1F0E8] leading-relaxed">
              {selectedNode.role}
            </p>
          </div>
          <div>
            <span className="font-mono text-[10px] text-[#61655D] uppercase tracking-wider block mb-1">
              // FAULT ISOLATION & KERNEL SIGNALS
            </span>
            <p className="text-[#969A92] leading-relaxed">
              {selectedNode.faultIsolation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
