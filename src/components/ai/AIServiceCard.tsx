import { SERVICES } from "@/data/services";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import * as Icons from "lucide-react";

export default function AIServiceCard({ slug }: { slug: string }) {
  const service = SERVICES.find(s => s.slug === slug);
  
  if (!service) return null;
  
  const Icon = Icons[service.icon as keyof typeof Icons] as any;

  return (
    <div className="mt-4 p-6 rounded-xl bg-card border border-primary/30 max-w-sm animate-in fade-in slide-in-from-bottom-4 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 mb-4 text-primary">
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        
        <h3 className="text-xl font-bold mb-2">{service.name}</h3>
        <p className="text-sm text-muted-foreground mb-6">
          {service.shortDescription}
        </p>
      </div>
      
      <div className="relative z-10 flex items-center justify-between border-t border-border/50 pt-4 mt-2">
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
        <Link href={`/services/${service.slug}`} className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-full text-xs font-bold hover:scale-105 transition-transform">
          View Details
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
