import { FadeUp } from "@/components/animations/reveal";
import { DATA } from "@/data/resume";

export default function CurrentlyBuildingSection() {
  return (
    <section id="building" className="w-full relative z-10 bg-background border-t border-border/50 py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <FadeUp>
                <div className="flex items-center gap-4">
                    <span className="text-primary font-mono text-sm">08</span>
                    <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase">CURRENTLY BUILDING</span>
                </div>
            </FadeUp>
            <FadeUp delay={0.1}>
                <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase border-b border-border/50 pb-2">WORK IN PROGRESS</span>
            </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DATA.currentlyBuilding.map((item, index) => (
            <FadeUp key={item.title} delay={0.1 * index}>
              <div className="border border-border/50 bg-muted/10 p-8 flex flex-col gap-6 group hover:border-border transition-colors duration-300 h-full">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm font-light">{item.description}</p>
                </div>

                <div className="mt-auto pt-8">
                  <div className="flex justify-end mb-2">
                    <span className="text-xs font-mono text-muted-foreground">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {item.technologies.map(tech => (
                    <span key={tech} className="text-[10px] font-mono tracking-widest uppercase py-1 px-3 border border-border/50 bg-background text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
