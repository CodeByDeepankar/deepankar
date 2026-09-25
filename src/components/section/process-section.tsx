
import { FadeUp } from "@/components/animations/reveal";

export default function ProcessSection() {
  return (
    <section id="process" className="w-full relative py-24 px-6 border-b border-border/50">
      <div className="container mx-auto max-w-7xl">
        <FadeUp>
          <div className="flex items-center gap-3 mb-16">
            <span className="w-1.5 h-6 bg-primary" />
            <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">PROCESS</span>
          </div>
        </FadeUp>

        <div className="mb-16">
          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">From idea to launch.</h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {[
            { step: "01", title: "Discover", desc: "Understand business goals and requirements." },
            { step: "02", title: "Plan", desc: "Define scope, features, content and timeline." },
            { step: "03", title: "Design", desc: "Create the visual experience and responsive structure." },
            { step: "04", title: "Build", desc: "Develop, integrate and test the product." },
            { step: "05", title: "Launch", desc: "Deploy, configure and hand over." }
          ].map((item, i) => (
            <FadeUp key={i} delay={0.1 * i} className="flex flex-col border-l border-primary/20 pl-4 py-2 relative">
              <span className="text-primary font-mono text-xs mb-2">STEP {item.step}</span>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

