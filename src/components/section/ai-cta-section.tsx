import { FadeUp } from "@/components/animations/reveal";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Magnetic from "@/components/animations/magnetic";

export default function AiCtaSection() {
  return (
    <section className="w-full relative py-32 px-6 border-b border-border/50 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto max-w-5xl relative z-10 flex flex-col items-center text-center">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>AI Project Consultant</span>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Ask <span className="text-primary">Deepankar AI.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Explore my work, understand my services, check my skills, or start a project conversation directly with my personalized AI assistant.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <Magnetic>
            <Link 
              href="/ai" 
              className="group flex items-center gap-4 bg-primary text-black px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform"
            >
              Start Conversation
              <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </Link>
          </Magnetic>
        </FadeUp>

        {/* Decorative elements representing AI capabilities */}
        <div className="w-full max-w-4xl mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-60">
          {["Show my best projects", "I need a business website", "What's your tech stack?", "How much does a website cost?"].map((prompt, i) => (
            <FadeUp key={i} delay={0.3 + (i * 0.1)}>
              <div className="p-4 rounded-xl border border-border/50 bg-card/50 text-xs text-muted-foreground text-left flex items-center gap-3">
                <Sparkles className="w-3 h-3 text-primary shrink-0" />
                <span className="truncate">{prompt}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
