import { FadeUp } from "@/components/animations/reveal";
import { SERVICES } from "@/data/services";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import * as Icons from "lucide-react";

export default function ServicesSection() {
  return (
    <section id="services" className="w-full relative py-24 px-6 border-b border-border/50">
      <div className="container mx-auto max-w-7xl">
        <FadeUp>
          <div className="flex items-center gap-3 mb-16">
            <span className="w-1.5 h-6 bg-primary" />
            <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">SERVICES</span>
          </div>
        </FadeUp>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-2xl">
              Services for your ideas.
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md">
              From business websites to custom web applications, I help you build fast, modern and scalable digital products.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => {
            const Icon = Icons[service.icon as keyof typeof Icons] as any;
            return (
              <FadeUp key={service.id} delay={0.1 * (idx + 2)}>
                <div className="group relative flex flex-col justify-between p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors h-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 mb-6 group-hover:border-primary/50 transition-colors text-primary">
                      {Icon && <Icon className="w-5 h-5" />}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                      {service.shortDescription}
                    </p>
                  </div>
                  
                  <div className="relative z-10 flex items-center justify-between mt-8 pt-6 border-t border-border/50">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        {service.priceType === "custom" ? "Custom Quote" : "From"}
                      </span>
                      {service.priceType !== "custom" && (
                        <span className="text-lg font-bold text-primary">
                          {service.currency}{service.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <Link href={`/services/${service.slug}`} className="flex items-center justify-center w-10 h-10 rounded-full border border-border group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
