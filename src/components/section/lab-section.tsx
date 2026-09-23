import { FadeUp } from "@/components/animations/reveal";
import { DATA } from "@/data/resume";
import Image from "next/image";

export default function LabSection() {
  return (
    <section id="lab" className="w-full relative z-10 bg-background border-t border-border/50 py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <FadeUp>
                <div className="flex items-center gap-4">
                    <span className="text-primary font-mono text-sm">07</span>
                    <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase">LAB / EXPERIMENTS</span>
                </div>
            </FadeUp>
            <FadeUp delay={0.1}>
                <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase border-b border-border/50 pb-2">SMALL IDEAS. BIG LEARNINGS.</span>
            </FadeUp>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DATA.lab.map((experiment, index) => (
            <FadeUp key={experiment.title} delay={0.1 * index}>
              <div className="flex flex-col group cursor-crosshair h-full">
                <div className="relative aspect-video w-full overflow-hidden bg-muted/20 border border-border/50 mb-4">
                  <Image 
                    src={experiment.image}
                    alt={experiment.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 mix-blend-overlay transition-colors duration-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight mb-1">{experiment.title}</h4>
                  <p className="text-xs font-mono text-muted-foreground">{experiment.description}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
