"use client";

import { DATA } from "@/data/resume";
import { FadeUp } from "@/components/animations/reveal";

export default function ExperienceSection() {

  return (
    <section id="experience" className="relative z-10 bg-background w-full py-24 px-6 border-t border-border/50">
      <div className="container max-w-7xl mx-auto">
        <div className="mb-16">
          <FadeUp>
            <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase">Experience</span>
          </FadeUp>
        </div>
        
        <div className="flex flex-col gap-12 max-w-4xl">
          {DATA.work.map((work, index) => (
            <FadeUp key={work.company} delay={0.1 + index * 0.1}>
              <div className="flex flex-col md:flex-row gap-4 md:gap-12 md:items-baseline group cursor-default">
                <div className="w-48 text-sm font-mono text-muted-foreground tracking-widest uppercase flex-shrink-0">
                  {work.start} - {work.end ?? "Present"}
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase group-hover:text-primary transition-colors">
                    {work.company}
                  </h3>
                  <div className="text-sm font-mono uppercase tracking-widest text-foreground">
                    {work.title}
                  </div>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    {work.description}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
