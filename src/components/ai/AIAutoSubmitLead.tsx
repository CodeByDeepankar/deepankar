"use client";

import { useEffect, useState, useRef } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function AIAutoSubmitLead({ data }: { data: { name: string, email: string, message: string } }) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const hasSubmitted = useRef(false);

  useEffect(() => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;
    
    async function submit() {
      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            ...data, 
            source: "ai_chat_auto",
            service_interest: "custom"
          }),
        });
        if (!res.ok) throw new Error("Failed");
        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    }
    submit();
  }, [data]);

  if (status === "loading") {
    return (
      <div className="mt-4 p-4 rounded-xl bg-primary/10 border border-primary/30 max-w-sm animate-in fade-in flex items-center gap-3">
        <Loader2 className="w-5 h-5 text-primary animate-spin" />
        <span className="text-sm text-primary font-medium">Submitting your brief to Deepankar...</span>
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
    <div className="mt-4 p-6 rounded-xl bg-primary/10 border border-primary/30 max-w-md animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col items-center text-center gap-4 py-4">
        <CheckCircle2 className="w-12 h-12 text-primary" />
        <h3 className="text-xl font-bold text-primary">Brief Received!</h3>
        <p className="text-sm text-neutral-300">
          Thanks, {data.name}! Your request has been securely logged. Deepankar will email you at {data.email} shortly.
        </p>
      </div>
    </div>
  );
}
