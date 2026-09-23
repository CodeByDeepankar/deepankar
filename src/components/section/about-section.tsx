import { FadeUp } from "@/components/animations/reveal";
import { DATA } from "@/data/resume";
import { ParallaxImage } from "@/components/animations/parallax-image";
import { CometCard } from "@/components/ui/comet-card";

export default function AboutSection() {
  return (
    <section id="about" className="w-full relative z-10 bg-background py-24 px-6 border-b border-border/50">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-center">
          
          <div className="flex flex-col">
            <FadeUp>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-primary font-mono text-sm">01</span>
                <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase">ABOUT ME</span>
              </div>
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-[0.9] mb-8">
                A DEVELOPER<br/>
                WHO TURNS IDEAS<br/>
                INTO <span className="text-primary">REAL PRODUCTS.</span>
              </h2>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <p className="text-muted-foreground text-lg font-light leading-relaxed mb-16 max-w-md">
                Motivated Computer Science undergraduate with hands-on experience in full stack web and cloud application development. I love building scalable, secure, and user-centric software using modern technologies.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="grid grid-cols-3 gap-8 border-t border-border/50 pt-8">
                <div className="flex flex-col gap-2">
                  <span className="text-4xl font-bold">20+</span>
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Projects</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-4xl font-bold">3+</span>
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Hackathons</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-4xl font-bold">∞</span>
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Learning</span>
                </div>
              </div>
            </FadeUp>
          </div>

          <div className="relative mt-12 md:mt-0 flex justify-center md:justify-end">
             <FadeUp delay={0.4} className="relative z-10">
                <CometCard className="rotate-3">
                  <div className="relative w-[300px] md:w-[400px] aspect-[3/4] bg-muted/20 border border-border/50 p-4 pb-16 shadow-2xl">
                      <div className="relative w-full h-full overflow-hidden">
                          <ParallaxImage 
                              src="/images/about/about-portrait.png"
                              alt="Deepankar"
                          />
                      </div>
                  </div>
                </CometCard>

                <div className="absolute -bottom-8 -left-12 z-20 flex items-center gap-4">
                    <span className="w-8 h-px bg-primary" />
                    <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">
                        Based in Bhubaneswar, India<br/>
                        Open to opportunities worldwide.
                    </span>
                </div>

                {/* Decorative text */}
                <div className="absolute top-12 -right-12 pointer-events-none opacity-[0.05] -rotate-12 select-none z-0">
                  <span className="text-7xl font-bold italic leading-none whitespace-pre font-serif">
                    Better<br/>Software<br/>Brighter<br/>Tomorrow
                  </span>
                </div>
             </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}
