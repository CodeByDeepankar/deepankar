import { SERVICES } from "@/data/services";
import { notFound } from "next/navigation";
import { FadeUp } from "@/components/animations/reveal";
import Link from "next/link";
import { Icons } from "@/components/icons";
import CheckoutForm from "@/components/checkout-form";

// Static generation
export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = SERVICES.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container max-w-6xl mx-auto px-6">
        
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12 font-mono uppercase tracking-widest">
          <Icons.arrowRight className="w-4 h-4 rotate-180" /> Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Details Column */}
          <div className="flex flex-col">
            <FadeUp>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-primary font-mono text-sm">##</span>
                <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase">Service</span>
              </div>
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-[0.9] mb-8">
                {service.name}
              </h1>
            </FadeUp>
            
            <FadeUp delay={0.2}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-xl">
                {service.description}
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex flex-col gap-4 mb-12">
                <h3 className="font-bold text-lg uppercase tracking-wide">What's Included:</h3>
                <ul className="flex flex-col gap-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-neutral-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="flex items-center gap-12 border-t border-border/50 pt-8">
                <div>
                  <p className="text-xs text-muted-foreground font-mono uppercase mb-1">Timeline</p>
                  <p className="font-bold text-lg">{service.deliveryTime}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono uppercase mb-1">Investment</p>
                  <p className="font-bold text-lg text-primary">
                    {service.priceType === 'custom' ? 'Custom Quote' : `From ${service.currency}${service.price.toLocaleString()}`}
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Checkout/Action Column */}
          <div className="relative">
            <FadeUp delay={0.5} className="sticky top-32">
              {service.supportsPurchase ? (
                <div className="bg-muted/5 border border-border/50 rounded-3xl p-8 shadow-2xl">
                  <h3 className="text-2xl font-bold mb-2">Secure your spot</h3>
                  <p className="text-muted-foreground text-sm mb-8">Fill out the details below and I'll send you an invoice to get started.</p>
                  <CheckoutForm service={service} />
                </div>
              ) : (
                <div className="bg-muted/5 border border-border/50 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center">
                  <h3 className="text-2xl font-bold mb-4">Custom Project</h3>
                  <p className="text-muted-foreground mb-8">
                    This service requires a custom quote tailored to your specific architecture and requirements.
                  </p>
                  <Link href="/book" className="bg-primary text-black font-bold px-8 py-4 rounded-xl hover:scale-105 transition-transform w-full text-lg">
                    Book Discovery Call
                  </Link>
                </div>
              )}
            </FadeUp>
          </div>

        </div>
      </div>
    </div>
  );
}
