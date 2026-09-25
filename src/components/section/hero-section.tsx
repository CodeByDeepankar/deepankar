
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
    <section id="hero" className="w-full relative min-h-[65vh] sm:min-h-[75vh] md:min-h-screen pt-20 md:pt-32 pb-8 md:pb-12 px-4 md:px-6 flex items-center bg-background z-10 overflow-hidden border-b border-border/50">
      <div className="container mx-auto max-w-7xl h-full flex flex-row items-center justify-between gap-2 md:gap-12 relative">
        
        {/* Left Column: Text */}
        <div className="flex flex-col w-[65%] sm:w-[50%] md:w-1/2 z-10 relative">
          <FadeUp>
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
              <span className="w-1 md:w-1.5 h-4 md:h-6 bg-primary" />
              <span className="text-[9px] md:text-xs font-mono tracking-widest text-muted-foreground uppercase">FULL STACK DEVELOPER</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-[1.8rem] leading-[1.1] sm:text-4xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter md:leading-[0.95] mb-4 md:mb-6">
              <SquigglyText>
                I build websites<br/>
                that work for<br/>
                <span className="text-primary">your business.</span>
              </SquigglyText>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="max-w-lg mb-6 md:mb-12 hidden sm:block">
              <TypewriterEffect 
                words={DATA.description.split(" ").map(word => ({ 
                  text: word,
                  className: "text-muted-foreground dark:text-muted-foreground text-[0.9rem] md:text-[22px] font-light tracking-wide"
                }))} 
                className="text-left font-normal text-sm leading-snug md:leading-[1.4]"
                cursorClassName="hidden"
              />
            </div>
            <div className="max-w-lg mb-6 sm:hidden">
              <p className="text-muted-foreground text-[11px] font-light leading-relaxed">
                {DATA.description}
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 md:gap-6">
              <Magnetic>
                <Link href="#work" className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2.5 md:px-8 md:py-4 rounded-full text-[10px] md:text-sm font-mono tracking-widest uppercase transition-colors">
                  View My Work <Icons.arrowRight className="size-3 md:size-4 -rotate-45" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="/Resume/Resume.pdf" target="_blank" className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-2 py-2 md:px-4 md:py-4 text-[10px] md:text-sm font-mono tracking-widest uppercase transition-colors">
                  Download Resume <Icons.download className="size-3 md:size-4" />
                </Link>
              </Magnetic>
            </div>
          </FadeUp>
          
          <FadeUp delay={0.5} className="hidden md:block">
            <div className="mt-16 md:mt-24 flex items-center gap-4 text-xs font-mono tracking-widest text-muted-foreground uppercase">
               <span className="w-px h-12 bg-border block relative overflow-hidden">
                 <span className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-scroll-down" />
               </span>
               SCROLL TO EXPLORE
            </div>
          </FadeUp>
        </div>

        {/* Right Column: Portrait */}
        <div className="absolute right-0 top-[10%] bottom-0 w-[90%] sm:w-[60%] md:relative md:w-1/2 md:h-[90vh] md:top-auto md:bottom-auto flex justify-end items-end md:items-center z-0 ">
          <FadeUp delay={0.2} className="w-full h-full relative flex items-end md:items-center justify-end">
            <div className="absolute inset-0 md:-right-24 md:-top-16 md:bottom-0 md:left-0 scale-[1.1] md:scale-110 origin-bottom right-[-10%] md:origin-center">
               <ChromaticImage 
                 src="/images/hero/hero_bg.png"
                 alt="Deepankar"
                 className="w-full h-full opacity-70 md:opacity-90 !bg-transparent object-contain object-bottom md:object-center"
                 displacement={0.01}
                 chromaticShift={0.002}
                 zoom={0.05}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
               <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10 pointer-events-none" />
            </div>

            <div className="absolute bottom-4 right-10 md:bottom-12 md:-left-12 z-20 flex flex-col gap-4 md:gap-8 opacity-0 md:opacity-100">
               <div className="text-[10px] md:text-xs font-mono tracking-widest text-muted-foreground max-w-[100px] md:max-w-[150px]">
                 Currently building cool stuff...
               </div>
               <div className="flex items-center gap-2 md:gap-3">
                 <Icons.globe className="size-3 md:size-5 text-muted-foreground" />
                 <div className="text-[9px] md:text-xs font-mono tracking-widest text-muted-foreground uppercase">
                   INDIA<br/>Bhubaneswar
                 </div>
               </div>
            </div>
            
            {/* Background decorative text */}
            <div className="absolute top-12 right-0 pointer-events-none opacity-[0.03] rotate-12 select-none hidden md:block">
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

