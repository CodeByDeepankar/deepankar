import { FadeUp } from "@/components/animations/reveal";
import Image from "next/image";
import { TextRevealCard } from "@/components/ui/text-reveal-card";

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="w-full relative z-10 bg-background border-t border-border/50 py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start">
          
          <div className="flex flex-col">
            <FadeUp>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-primary font-mono text-sm">02</span>
                <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase">MY PHILOSOPHY</span>
              </div>
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-[0.9]">
                I DON'T JUST<br/>WRITE CODE.
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="w-full mt-8">
                <TextRevealCard
                  text="You know the business."
                  revealText="I build the solutions."
                  className="bg-muted/10 border border-border/50 w-full rounded-2xl"
                />
              </div>
            </FadeUp>
          </div>

          <div className="flex flex-col gap-12 mt-12 md:mt-0">
            <FadeUp delay={0.3}>
              <p className="text-muted-foreground text-lg md:text-xl font-light leading-relaxed max-w-md">
                From ideas to impact — I enjoy working on products that solve real problems and create value for people.
              </p>
            </FadeUp>
            
            <FadeUp delay={0.4}>
              <div className="relative w-full md:w-4/5 aspect-[16/9] border border-border/50 bg-muted/20 p-6 flex flex-col justify-end overflow-hidden group">
                <Image 
                  src="/images/philosophy/philosophy.png"
                  alt="Philosophy"
                  fill
                  className="object-cover opacity-50 grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                <h3 className="relative z-10 text-xl font-bold uppercase tracking-widest mt-auto leading-tight w-2/3">
                  GOOD<br/>IDEAS<br/>BUILD<br/>BETTER<br/>TOMORROWS.
                </h3>
              </div>
            </FadeUp>
          </div>
          
        </div>
      </div>
    </section>
  );
}
