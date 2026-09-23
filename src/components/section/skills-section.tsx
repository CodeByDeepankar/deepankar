import { FadeUp } from "@/components/animations/reveal";
import { DATA } from "@/data/resume";
import { EvervaultCard } from "@/components/ui/evervault-card";

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full relative z-10 bg-background border-t border-border/50 pt-24 pb-0 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <FadeUp>
                <div className="flex items-center gap-4">
                    <span className="text-primary font-mono text-sm">03</span>
                    <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase">SKILLS & TECHNOLOGIES</span>
                </div>
            </FadeUp>
            <FadeUp delay={0.1}>
                <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">TOOLS I TURN IDEAS INTO REALITY</span>
            </FadeUp>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0 border border-border/50">
          {DATA.skills.map((skill, index) => (
            <FadeUp key={skill.name} delay={0.05 * index} className="border-b border-r border-border/50">
              <EvervaultCard className="aspect-square">
                <skill.icon className="w-8 h-8 md:w-10 md:h-10 text-foreground" />
                <span className="text-[10px] md:text-xs font-mono tracking-widest uppercase text-foreground text-center">
                  {skill.name}
                </span>
              </EvervaultCard>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Marquee Banner */}
      <div className="w-full border-t border-border/50 py-3 overflow-hidden bg-muted/5 flex">
         <div className="whitespace-nowrap animate-marquee flex items-center">
            {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className="text-[10px] font-mono tracking-widest uppercase text-muted-foreground mx-4">
                    BUILD // LEARN // IMPROVE // REPEAT //
                </span>
            ))}
         </div>
      </div>
    </section>
  );
}
