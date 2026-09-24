import { FadeUp } from "@/components/animations/reveal";
import { PRICING_PACKAGES } from "@/data/pricing";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PricingSection() {
  return (
    <section id="pricing" className="w-full relative py-24 px-6 border-b border-border/50 bg-neutral-950/50">
      <div className="container mx-auto max-w-7xl">
        <FadeUp>
          <div className="flex items-center gap-3 mb-12">
            <span className="w-1.5 h-6 bg-primary" />
            <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">PRICING</span>
          </div>
        </FadeUp>

        <div className="flex flex-col mb-16">
          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Simple & Transparent<br />
              <span className="text-primary">Pricing Packages.</span>
            </h2>
            <p className="text-muted-foreground max-w-lg">
              Choose a package or request a custom quote based on your specific requirements.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_PACKAGES.map((pkg, idx) => (
            <FadeUp key={pkg.id} delay={0.1 * (idx + 2)}>
              <div className={cn(
                "relative flex flex-col justify-between p-8 rounded-2xl border transition-all h-full bg-card",
                pkg.popular ? "border-primary shadow-[0_0_30px_-10px_rgba(212,248,112,0.3)]" : "border-border hover:border-border/80"
              )}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-medium text-muted-foreground mb-4">{pkg.name}</h3>
                  <div className="mb-6">
                    {typeof pkg.price === 'number' ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">{pkg.currency}{pkg.price.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground">starting</span>
                      </div>
                    ) : (
                      <span className="text-3xl font-bold">{pkg.price}</span>
                    )}
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    {pkg.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-neutral-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Link 
                  href={`/services/${pkg.serviceSlug}`} 
                  className={cn(
                    "flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm font-medium transition-colors",
                    pkg.popular ? "bg-primary text-black hover:bg-primary/90" : "bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-800"
                  )}
                >
                  {pkg.ctaText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
