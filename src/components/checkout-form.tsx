"use client";

import { useState } from "react";
import { CheckCircle2, User, Mail, Building, MapPin } from "lucide-react";

export default function CheckoutForm({ service }: { service: any }) {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    company_name: "",
    billing_address: ""
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData,
          service_slug: service.slug,
          amount: service.price,
          currency: "INR" // Hardcoded for phase 7 mock
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
      <div className="p-6 text-center animate-in fade-in zoom-in-95 duration-500">
        <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-primary mb-4">Order Received!</h3>
        <p className="text-neutral-300 text-sm">
          Thanks for choosing me to build your {service.name}, {formData.name}.
          I have received your request and will send the official invoice & onboarding questionnaire to {formData.email} shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      
      <div className="flex flex-col gap-4">
        <div className="relative">
          <User className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Full Name" 
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-background border border-border/50 rounded-xl p-4 pl-12 outline-none focus:border-primary transition-colors text-sm"
          />
        </div>
        
        <div className="relative">
          <Mail className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
          <input 
            type="email" 
            placeholder="Email Address" 
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full bg-background border border-border/50 rounded-xl p-4 pl-12 outline-none focus:border-primary transition-colors text-sm"
          />
        </div>

        <div className="relative">
          <Building className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Company Name (Optional)" 
            value={formData.company_name}
            onChange={(e) => setFormData({...formData, company_name: e.target.value})}
            className="w-full bg-background border border-border/50 rounded-xl p-4 pl-12 outline-none focus:border-primary transition-colors text-sm"
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Billing Address (Optional)" 
            value={formData.billing_address}
            onChange={(e) => setFormData({...formData, billing_address: e.target.value})}
            className="w-full bg-background border border-border/50 rounded-xl p-4 pl-12 outline-none focus:border-primary transition-colors text-sm"
          />
        </div>
      </div>

      {/* Summary Box */}
      <div className="bg-background p-4 rounded-xl border border-border/50 mt-2">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold">{service.name}</span>
          <span className="text-sm font-bold text-primary">{service.currency}{service.price.toLocaleString()}</span>
        </div>
        <p className="text-xs text-muted-foreground">This is a request to purchase. No payment is taken right now. An invoice will be sent via email.</p>
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
      )}

      <button 
        type="submit" 
        disabled={status === "loading"}
        className="w-full bg-primary text-black font-bold p-5 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 text-lg shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)]"
      >
        {status === "loading" ? "Processing..." : "Complete Request"}
      </button>
    </form>
  );
}
