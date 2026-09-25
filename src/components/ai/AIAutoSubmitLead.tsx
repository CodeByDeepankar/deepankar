
"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

export default function AIAutoSubmitLead({ data }: { data: { name: string, email: string, message: string } }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit() {
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...data, 
          source: "ai_chat",
          service_interest: "custom"
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  }

  if (status === "idle") {
    return (
      <div className="mt-4 p-5 rounded-2xl bg-neutral-900 border border-neutral-800 max-w-sm animate-in fade-in flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-white">Ready to send?</span>
          <span className="text-xs text-neutral-400">Name: {data.name}</span>
          <span className="text-xs text-neutral-400">Email: {data.email}</span>
        </div>
        <button 
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 bg-lime-500 text-black px-4 py-2 rounded-xl font-bold text-sm hover:bg-lime-400 transition-colors w-full"
        >
          Submit Request <Send className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className="mt-4 p-4 rounded-xl bg-lime-500/10 border border-lime-500/30 max-w-sm animate-in fade-in flex items-center gap-3">
        <Loader2 className="w-5 h-5 text-lime-500 animate-spin" />
        <span className="text-sm text-lime-500 font-medium">Submitting your brief...</span>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 max-w-sm animate-in fade-in flex items-center gap-3">
        <span className="text-sm text-red-500 font-medium">Failed to submit. Please use the contact page.</span>
      </div>
    );
  }

  return (
    <div className="mt-4 p-6 rounded-2xl bg-lime-500/10 border border-lime-500/30 max-w-sm animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col items-center text-center gap-3 py-2">
        <CheckCircle2 className="w-10 h-10 text-lime-500" />
        <h3 className="text-lg font-bold text-lime-500">Brief Received!</h3>
        <p className="text-xs text-neutral-300">
          Thanks, {data.name}! Your request has been securely logged. I will email you at {data.email} shortly.
        </p>
      </div>
    </div>
  );
}

