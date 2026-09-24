"use client";

import { FadeUp } from "@/components/animations/reveal";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { Icons } from "@/components/icons";
import Image from "next/image";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "contact_form" }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="w-full relative z-10 bg-background border-t border-border/50 pt-24 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 mb-24">
          
          <div className="flex flex-col">
            <FadeUp>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-primary font-mono text-sm">09</span>
                <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase">CONTACT</span>
              </div>
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-[0.9] mb-8 text-primary">
                LET'S BUILD<br/>SOMETHING<br/>AMAZING.
              </h2>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <p className="text-muted-foreground text-lg font-light leading-relaxed mb-12 max-w-sm">
                Want to collaborate, discuss a project, or just say hi? Feel free to reach out!
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-muted/5 border border-border/50 p-4 outline-none focus:border-primary transition-colors text-sm"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-muted/5 border border-border/50 p-4 outline-none focus:border-primary transition-colors text-sm"
                />
                <textarea 
                  placeholder="Tell me about your project..." 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="bg-muted/5 border border-border/50 p-4 outline-none focus:border-primary transition-colors text-sm resize-none"
                />
                <button 
                  type="submit" 
                  disabled={status === "loading" || status === "success"}
                  className="bg-primary text-black font-bold p-4 hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
                </button>
                {status === "error" && <p className="text-red-500 text-xs mt-2">Failed to send message. Please try again.</p>}
              </form>
            </FadeUp>
          </div>

          <div className="relative flex justify-center md:justify-end mt-12 md:mt-0">
             <FadeUp delay={0.4} className="relative z-10 w-[300px] aspect-[3/4] border border-border/50 p-2 pb-12 bg-muted/10 -rotate-3 hover:rotate-0 transition-transform duration-500 group">
                <div className="relative w-full h-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                    <Image 
                        src="/images/contact/moon.png"
                        alt="Moon"
                        fill sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                </div>
                
                <div className="absolute top-1/2 -right-12 z-20 pointer-events-none -rotate-12">
                  <span className="text-4xl font-serif italic text-primary/80 leading-none whitespace-pre">
                    Same<br/>Dreams<br/>Different<br/>People
                  </span>
                </div>
             </FadeUp>
          </div>
        </div>

        {/* Footer section inside contact */}
        <div className="border-t border-border/50 pt-16 pb-8">
            <FadeUp>
                <div className="w-full text-center overflow-hidden mb-16">
                    <h1 className="text-[10vw] font-black tracking-wide leading-none uppercase text-border/30 hover:text-border/60 transition-colors">
                        DEEPANKAR<span className="text-primary/50 text-[3vw]">.TECH</span>
                    </h1>
                </div>
            </FadeUp>
            
            <FadeUp delay={0.1}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                    <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                        <Link href="#about" className="hover:text-foreground transition-colors">About</Link>
                        <Link href="#work" className="hover:text-foreground transition-colors">Work</Link>
                        <Link href="#gallery" className="hover:text-foreground transition-colors">Gallery</Link>
                        <Link href="#lab" className="hover:text-foreground transition-colors">Lab</Link>
                        <Link href="#contact" className="hover:text-foreground transition-colors">Contact</Link>
                    </div>
                    
                    <Link 
                        href="#hero"
                        className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Keep Building <Icons.arrowUp className="size-4" />
                    </Link>
                </div>
            </FadeUp>
            
            <FadeUp delay={0.2}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground border-t border-border/50 pt-8">
                    <div>
                        c {new Date().getFullYear()} Deepankar<br/>
                        Designed & Built with <span className="text-red-500"> </span> by Deepankar
                    </div>
                    <div className="text-right">
                        Be a little better<br/>every day.
                    </div>
                </div>
            </FadeUp>
        </div>
      </div>
    </section>
  );
}
