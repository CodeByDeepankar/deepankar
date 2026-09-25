
import { FadeUp } from "@/components/animations/reveal";

export default function WhyDeepankarSection() {
  return (
    <section id="why" className="w-full relative py-24 px-6 border-b border-border/50 bg-neutral-950/50">
      <div className="container mx-auto max-w-7xl">
        <FadeUp>
          <div className="flex items-center gap-3 mb-16">
            <span className="w-1.5 h-6 bg-primary" />
            <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">WHY DEEPANKAR</span>
          </div>
        </FadeUp>

        <div className="mb-16">
          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">More than just a website.</h2>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Full-Stack Capability", desc: "Frontend, backend, APIs and databases." },
            { title: "Modern Technology", desc: "Modern web technologies and cloud infrastructure." },
            { title: "Direct Communication", desc: "Clients communicate directly with the developer." },
            { title: "Production Focus", desc: "Responsive, deployable and maintainable implementations." }
          ].map((item, i) => (
            <FadeUp key={i} delay={0.1 * i} className="p-8 border border-border/50 bg-background/50 backdrop-blur-sm rounded-xl">
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

