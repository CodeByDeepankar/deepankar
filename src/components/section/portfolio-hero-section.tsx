
import { FadeUp } from "@/components/animations/reveal";
import { SquigglyText } from "@/components/ui/squiggly-text";
import Magnetic from "@/components/animations/magnetic";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { ChromaticImage } from "@/components/ui/chromatic-image";

export default function PortfolioHeroSection() {
  return (
    <section id="hero" className="w-full relative min-h-[90vh] md:min-h-screen pt-32 md:pt-32 pb-12 px-4 md:px-6 flex items-center bg-background z-10 overflow-hidden border-b border-border/50">
      <div className="container mx-auto max-w-7xl h-full flex flex-row items-center justify-between gap-2 md:gap-12">
        
        {/* Left Column: Text */}
        <div className="flex flex-col w-[55%] md:w-1/2 z-10 relative">
          <FadeUp>
            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
              <span className="w-1 md:w-1.5 h-4 md:h-6 bg-primary" />
              <span className="text-[9px] md:text-xs font-mono tracking-widest text-muted-foreground uppercase">FULL STACK DEVELOPER</span>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-[2rem] leading-[1.1] sm:text-4xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter md:leading-[0.95] mb-4 md:mb-6">
              <SquigglyText>
                A developer<br/>
                who turns ideas<br/>
                <span className="text-primary">into real products.</span>
              </SquigglyText>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-xs sm:text-sm md:text-xl text-muted-foreground max-w-2xl mb-6 md:mb-8 leading-relaxed font-light">
              Full-stack developer building scalable web applications, AI-powered products and digital experiences.
            </p>
          </FadeUp>

          <FadeUp delay={0.3} className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 md:gap-4">
            <Magnetic>
              <Link 
                href="#projects" 
                className="flex items-center gap-2 bg-primary text-black px-5 py-3 md:px-8 md:py-4 rounded-full text-[10px] md:text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                View My Work <Icons.arrowRight className="size-3 md:size-4" />
              </Link>
            </Magnetic>
            <Magnetic>
              <a 
                href="/Resume/Resume.pdf" 
                target="_blank"
                className="flex items-center gap-2 border border-border px-3 py-3 md:px-8 md:py-4 rounded-full text-[10px] md:text-sm font-medium hover:bg-muted transition-colors"
              >
                Download Resume <Icons.download className="size-3 md:size-4" />
              </a>
            </Magnetic>
          </FadeUp>

          {/* Credentials Strip */}
          <FadeUp delay={0.4} className="mt-8 md:mt-16 pt-6 md:pt-8 border-t border-border/50 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { stat: "20+", label: "Technologies" },
              { stat: "4+", label: "Projects" },
              { stat: "3+", label: "Hackathons" },
              { stat: "2023+", label: "Development" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-xl md:text-3xl font-bold text-foreground">{item.stat}</span>
                <span className="text-[8px] md:text-xs font-mono uppercase tracking-widest text-muted-foreground mt-0.5 md:mt-1">{item.label}</span>
              </div>
            ))}
          </FadeUp>
        </div>

        {/* Right Column: Portrait */}
        <div className="relative w-[45%] md:w-1/2 h-[50vh] sm:h-[60vh] md:h-[90vh] mt-0 flex justify-end items-end md:items-center">
          <FadeUp delay={0.2} className="w-full h-full relative flex items-end md:items-center justify-end">
            <div className="absolute right-0 bottom-0 md:-top-16 md:bottom-0 left-0 scale-[1.15] md:scale-110 origin-bottom pointer-events-none">
               <ChromaticImage 
                 src="/images/hero/portfolio_hero_bg.png"
                 alt="Deepankar Portfolio"
                 className="w-full h-full opacity-90 !bg-transparent object-contain object-bottom md:object-center"
                 displacement={0.01}
                 chromaticShift={0.002}
                 zoom={0.05}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
               <div className="absolute inset-0 bg-gradient-to-l from-background/80 md:from-background/50 via-transparent to-background z-10 pointer-events-none" />
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

