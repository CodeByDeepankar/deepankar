
import { FadeUp } from "@/components/animations/reveal";
import { SquigglyText } from "@/components/ui/squiggly-text";
import Magnetic from "@/components/animations/magnetic";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { ChromaticImage } from "@/components/ui/chromatic-image";

export default function PortfolioHeroSection() {
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
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.95] mb-6">
              <SquigglyText>
                A developer<br/>
                who turns ideas<br/>
                <span className="text-primary">into real products.</span>
              </SquigglyText>
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              Full-stack developer building scalable web applications, AI-powered products and digital experiences.
            </p>
          </FadeUp>

          <FadeUp delay={0.3} className="flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link 
                href="#work" 
                className="flex items-center gap-2 bg-primary text-black px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                View My Work <Icons.arrowRight className="size-4" />
              </Link>
            </Magnetic>
            <Magnetic>
              <a 
                href="/resume.pdf" 
                target="_blank"
                className="flex items-center gap-2 border border-border px-8 py-4 rounded-full font-medium hover:bg-muted transition-colors"
              >
                Download Resume <Icons.download className="size-4" />
              </a>
            </Magnetic>
          </FadeUp>

          {/* Credentials Strip */}
          <FadeUp delay={0.4} className="mt-16 pt-8 border-t border-border/50 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { stat: "20+", label: "Technologies" },
              { stat: "4+", label: "Projects" },
              { stat: "3+", label: "Hackathons" },
              { stat: "2023+", label: "Development" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-3xl font-bold text-foreground">{item.stat}</span>
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mt-1">{item.label}</span>
              </div>
            ))}
          </FadeUp>
        </div>

        <div className="relative md:w-1/2 h-[65vh] md:h-[90vh] w-full mt-12 md:-mt-8 flex justify-end">
          <FadeUp delay={0.2} className="w-full h-full relative">
            <div className="absolute -top-8 md:-top-16 right-0 bottom-0 left-0 scale-105 md:scale-110 origin-bottom">
               <ChromaticImage 
                 src="/images/hero/portfolio_hero_bg.png"
                 alt="Deepankar Portfolio"
                 className="w-full h-full opacity-90 !bg-transparent"
                 displacement={0.01}
                 chromaticShift={0.002}
                 zoom={0.05}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
               <div className="absolute inset-0 bg-gradient-to-l from-background/50 via-transparent to-background z-10 pointer-events-none" />
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

