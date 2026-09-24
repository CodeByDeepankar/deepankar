"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AIQuoteForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData, 
          source: "ai_chat",
          service_interest: "custom-web-app"
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="mt-4 p-6 rounded-xl bg-primary/10 border border-primary/30 max-w-md animate-in fade-in slide-in-from-bottom-4">
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <CheckCircle2 className="w-12 h-12 text-primary" />
          <h3 className="text-xl font-bold text-primary">Brief Received!</h3>
          <p className="text-sm text-neutral-300">
            Thanks for reaching out, {formData.name}. Deepankar will review your project requirements and get back to you at {formData.email} shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 p-6 rounded-xl bg-card border border-primary/30 max-w-md animate-in fade-in slide-in-from-bottom-4 relative overflow-hidden group">
      <div className="relative z-10 flex flex-col items-start gap-4">
        <div className="flex items-center gap-2 text-primary font-bold">
          <Sparkles className="w-5 h-5" />
          <span>Start a Custom Project</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Ready to build something unique? Fill out a quick brief and I'll notify Deepankar immediately.
        </p>
        
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 mt-2">
          <input 
            type="text" 
            placeholder="Your Name" 
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-sm outline-none focus:border-primary transition-colors text-white"
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-sm outline-none focus:border-primary transition-colors text-white"
          />
          <textarea 
            placeholder="Tell us about your project requirements, goals, and budget..." 
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-3 text-sm outline-none focus:border-primary transition-colors resize-none text-white"
          />
          
          {status === "error" && (
            <p className="text-red-500 text-xs text-center">Failed to send. Please try again.</p>
          )}
          
          <button 
            type="submit" 
            disabled={status === "loading"}
            className="flex items-center justify-center gap-2 bg-primary text-black w-full py-3 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 mt-2"
          >
            {status === "loading" ? "Submitting..." : "Submit Project Brief"}
            {status !== "loading" && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}
