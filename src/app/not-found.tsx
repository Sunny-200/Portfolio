import Link from "next/link";
import { Terminal, ArrowLeft, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0C0B] text-[#F1F0E8] flex flex-col items-center justify-center p-4 font-mono">
      <div className="w-full max-w-lg border border-[#292D28] bg-[#121412] p-8 rounded shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#292D28] pb-3 text-xs text-[#969A92]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#E5A93C] animate-ping" />
            <span className="text-[#E5A93C] font-bold">STATUS 404 // NOT_FOUND</span>
          </div>
          <span className="text-[10px] text-[#61655D]">ERR_ROUTE_DISCONNECTED</span>
        </div>

        <div className="space-y-2">
          <div className="text-3xl font-display font-extrabold text-[#F1F0E8]">
            Resource Unreachable.
          </div>
          <p className="font-sans text-sm text-[#969A92] leading-relaxed">
            The requested protocol URI does not map to any active node or registered case study. The packet has been dropped by the reverse proxy.
          </p>
        </div>

        <div className="border border-[#1E221E] bg-[#0E100E] p-4 rounded text-xs space-y-1 text-[#61655D]">
          <div>TRACE_ID: 0x404_NULL_ROUTE</div>
          <div>HOPS_EXCEEDED: TTL=0</div>
          <div>ACTION: RE-ROUTING TO PRIMARY SYSTEM BUS</div>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#C5FF4A] text-[#0B0C0B] px-5 py-2.5 text-xs font-bold uppercase transition-transform hover:scale-[1.02]"
          >
            <ArrowLeft size={14} />
            <span>RETURN TO PRIMARY INDEX</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
