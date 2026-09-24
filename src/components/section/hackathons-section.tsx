import { FadeUp } from "@/components/animations/reveal";
import { DATA } from "@/data/resume";
import Image from "next/image";

export default function HackathonsSection() {
  return (
    <section id="hackathons" className="w-full relative z-10 bg-background border-t border-border/50 py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <FadeUp>
                <div className="flex items-center gap-4">
                    <span className="text-primary font-mono text-sm">05</span>
                    <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase">HACKATHON JOURNEY</span>
                </div>
            </FadeUp>
            <FadeUp delay={0.1}>
                <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase border-b border-border/50 pb-2">BUILDING UNDER PRESSURE</span>
            </FadeUp>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Timeline */}
          <div className="relative pl-12">
            {/* Vertical Line */}
            <div className="absolute top-0 bottom-0 left-4 w-px bg-border/50" />
            
            <div className="flex flex-col gap-16">
              {DATA.hackathons.map((hackathon, index) => (
                <FadeUp key={hackathon.title} delay={0.1 * index}>
                  <div className="relative">
                    {/* Node */}
                    <div className="absolute -left-[45px] top-1 w-8 h-8 rounded-full border border-primary bg-background flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{hackathon.dates}</span>
                      <h3 className="text-2xl font-bold tracking-tight">{hackathon.title}</h3>
                      <span className="text-xs font-mono text-muted-foreground">{hackathon.location}</span>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-md">
                        {hackathon.description}
                      </p>
                      <div>
                        <span className="inline-block px-3 py-1 border border-primary/50 text-primary text-[10px] font-mono uppercase tracking-widest bg-primary/5">
                          {hackathon.win}
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Graphic/Image side */}
          <div className="hidden lg:flex flex-col items-center justify-center relative min-h-[500px]">
            <FadeUp delay={0.3} className="w-full h-full relative">
              <div className="absolute inset-0 bg-muted/10 border border-border/50 overflow-hidden group">
                <Image 
                  src="/images/hackathons/hackathon-feature.png" 
                  alt="Hackathons" 
                  fill sizes="(max-width: 768px) 100vw, 50vw" 
                  className="object-cover opacity-30 grayscale mix-blend-screen transition-all duration-700 group-hover:scale-105 group-hover:opacity-50"
                />
                
                <div className="absolute bottom-12 right-12 z-20 flex flex-col items-end text-right">
                  <span className="text-5xl font-serif italic text-primary/40 leading-none">Ideas</span>
                  <span className="text-5xl font-serif italic text-primary/60 leading-none">Teams</span>
                  <span className="text-5xl font-serif italic text-primary/80 leading-none">Late Nights</span>
                  <span className="text-5xl font-serif italic text-primary leading-none">Big Dreams</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
