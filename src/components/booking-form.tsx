"use client";

import { useState } from "react";
import { CheckCircle2, Calendar, Clock, User, Mail, MessageSquare } from "lucide-react";

export default function BookingForm() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    date: "",
    time: "",
    topic: "" 
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const scheduled_at = new Date(`${formData.date}T${formData.time}:00`).toISOString();
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: formData.name,
          email: formData.email,
          topic: formData.topic,
          scheduled_at 
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
      <div className="p-8 md:p-12 rounded-2xl bg-primary/10 border border-primary/20 text-center animate-in fade-in zoom-in-95 duration-500">
        <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
        <h3 className="text-3xl font-bold text-primary mb-4">Request Sent!</h3>
        <p className="text-neutral-300 max-w-md mx-auto">
          Thanks for booking, {formData.name}. I've received your request for a consultation. 
          I will email you shortly at {formData.email} to confirm the meeting link.
        </p>
      </div>
    );
  }

  // Generate some upcoming dates for the selector (Next 5 weekdays)
  const availableDates = [];
  let d = new Date();
  d.setDate(d.getDate() + 1); // Start tomorrow
  while(availableDates.length < 5) {
    if (d.getDay() !== 0 && d.getDay() !== 6) { // Skip weekends
      availableDates.push(new Date(d));
    }
    d.setDate(d.getDate() + 1);
  }

  const availableTimes = ["10:00", "11:30", "14:00", "15:30", "17:00"];

  return (
    <div className="bg-muted/5 border border-border/50 rounded-2xl p-6 md:p-10">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        
        {/* Date & Time Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <label className="text-sm font-mono tracking-widest text-muted-foreground uppercase flex items-center gap-2">
              <Calendar className="w-4 h-4" /> 1. Select Date
            </label>
            <div className="grid grid-cols-2 gap-3">
              {availableDates.map((date, i) => {
                const dateStr = date.toISOString().split('T')[0];
                const isSelected = formData.date === dateStr;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFormData({...formData, date: dateStr})}
                    className={`p-3 rounded-xl border text-sm text-left transition-all ${isSelected ? 'border-primary bg-primary/10 text-primary font-bold' : 'border-border/50 hover:border-primary/50 text-neutral-300'}`}
                  >
                    <div className="font-medium">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    <div className="text-xs opacity-70">{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="text-sm font-mono tracking-widest text-muted-foreground uppercase flex items-center gap-2">
              <Clock className="w-4 h-4" /> 2. Select Time (IST)
            </label>
            <div className="grid grid-cols-2 gap-3">
              {availableTimes.map((time, i) => {
                const isSelected = formData.time === time;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={!formData.date}
                    onClick={() => setFormData({...formData, time})}
                    className={`p-3 rounded-xl border text-sm transition-all text-center ${isSelected ? 'border-primary bg-primary/10 text-primary font-bold' : !formData.date ? 'border-border/10 opacity-50 cursor-not-allowed' : 'border-border/50 hover:border-primary/50 text-neutral-300'}`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="flex flex-col gap-4 mt-4">
          <label className="text-sm font-mono tracking-widest text-muted-foreground uppercase flex items-center gap-2">
            <User className="w-4 h-4" /> 3. Your Details
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
          <div className="relative mt-2">
            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
            <textarea 
              placeholder="What would you like to discuss?" 
              required
              rows={3}
              value={formData.topic}
              onChange={(e) => setFormData({...formData, topic: e.target.value})}
              className="w-full bg-background border border-border/50 rounded-xl p-4 pl-12 outline-none focus:border-primary transition-colors text-sm resize-none"
            />
          </div>
        </div>

        {status === "error" && (
          <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
        )}

        <button 
          type="submit" 
          disabled={status === "loading" || !formData.date || !formData.time}
          className="w-full bg-primary text-black font-bold p-5 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 mt-4 text-lg"
        >
          {status === "loading" ? "Confirming..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}
