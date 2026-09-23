import { FadeUp } from "@/components/animations/reveal";
import { DATA } from "@/data/resume";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/components/icons";
import Magnetic from "@/components/animations/magnetic";
import { ChromaticImage } from "@/components/ui/chromatic-image";
import { SquigglyText } from "@/components/ui/squiggly-text";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

export default function HeroSection() {
  return (
    <section id="hero" className="w-full relative min-h-screen pt-32 pb-12 px-6 flex items-center bg-background z-10 overflow-hidden border-b border-border/50">
      <div className="container mx-auto max-w-7xl h-full flex flex-col md:flex-row items-center justify-between gap-12">
        
        <div className="flex flex-col md:w-1/2 z-10 relative">
          <FadeUp>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-6 bg-primary" />
              <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">FULL STACK DEVELOPER</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase leading-[0.85] mb-6">
              <SquigglyText>
                I'M<br/>
                <span className="text-primary">DEEPANKAR</span>
              </SquigglyText>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="max-w-md mb-12">
              <TypewriterEffect 
                words={DATA.description.split(" ").map(word => ({ 
                  text: word,
                  className: "text-muted-foreground dark:text-muted-foreground text-lg md:text-xl font-light leading-relaxed"
                }))} 
                className="text-left font-normal text-base sm:text-lg md:text-xl"
                cursorClassName="bg-primary h-5 md:h-6"
              />
            </div>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-wrap items-center gap-6">
              <Magnetic>
                <Link href="#work" className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-full text-sm font-mono tracking-widest uppercase transition-colors">
                  View My Work <Icons.arrowRight className="size-4 -rotate-45" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/Resume/Resume.pdf" target="_blank" className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-4 py-4 text-sm font-mono tracking-widest uppercase transition-colors">
                  Download Resume <Icons.download className="size-4" />
                </Link>
              </Magnetic>
            </div>
          </FadeUp>
          
          <FadeUp delay={0.5}>
            <div className="mt-24 flex items-center gap-4 text-xs font-mono tracking-widest text-muted-foreground uppercase">
               <span className="w-px h-12 bg-border block relative overflow-hidden">
                 <span className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-scroll-down" />
               </span>
               SCROLL TO EXPLORE
            </div>
          </FadeUp>
        </div>

        <div className="relative md:w-1/2 h-[65vh] md:h-[90vh] w-full mt-12 md:-mt-8 flex justify-end">
          <FadeUp delay={0.2} className="w-full h-full relative">
            <div className="absolute -top-8 md:-top-16 right-0 md:-right-24 bottom-0 left-0 scale-105 md:scale-110 origin-bottom">
               <ChromaticImage 
                 src="/images/hero/hero_bg.png"
                 alt="Deepankar"
                 className="w-full h-full opacity-90 !bg-transparent"
                 displacement={0.01}
                 chromaticShift={0.002}
                 zoom={0.05}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
               <div className="absolute inset-0 bg-gradient-to-l from-background/50 via-transparent to-background z-10 pointer-events-none" />
            </div>

            <div className="absolute bottom-12 left-0 md:-left-12 z-20 flex flex-col gap-8">
               <div className="text-xs font-mono tracking-widest text-muted-foreground max-w-[150px]">
                 Currently building cool stuff...
               </div>
               <div className="flex items-center gap-3">
                 <Icons.globe className="size-5 text-muted-foreground" />
                 <div className="text-xs font-mono tracking-widest text-muted-foreground uppercase">
                   INDIA<br/>Bhubaneswar
                 </div>
               </div>
            </div>
            
            {/* Background decorative text */}
            <div className="absolute top-12 right-0 pointer-events-none opacity-[0.03] rotate-12 select-none">
              <span className="text-8xl font-bold italic leading-none whitespace-pre">
                Build<br/>Solve<br/>Improve<br/>Repeat
              </span>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
