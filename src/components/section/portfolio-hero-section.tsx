
import { FadeUp } from "@/components/animations/reveal";
import { SquigglyText } from "@/components/ui/squiggly-text";
import Magnetic from "@/components/animations/magnetic";
import Link from "next/link";
import { Icons } from "@/components/icons";

export default function PortfolioHeroSection() {
  return (
    <section id="hero" className="w-full relative min-h-screen pt-32 pb-12 px-6 flex items-center bg-background z-10 overflow-hidden border-b border-border/50">
      <div className="container mx-auto max-w-7xl h-full flex flex-col md:flex-row items-center justify-between gap-12">
        
        <div className="flex flex-col md:w-3/4 z-10 relative">
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
              <Link 
                href="/portfolio/resume" 
                className="flex items-center gap-2 border border-border px-8 py-4 rounded-full font-medium hover:bg-muted transition-colors"
              >
                Download Resume <Icons.download className="size-4" />
              </Link>
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
      </div>
    </section>
  );
}

