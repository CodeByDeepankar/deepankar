"use client";

import { useState } from "react";
import { FadeUp } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";
import { FocusCards } from "@/components/ui/focus-cards";
import { DATA } from "@/data/resume";

const FILTERS = ["All", "Hackathons", "Events", "Building", "Campus", "Life"];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <section id="gallery" className="w-full relative z-10 bg-background border-t border-border/50 py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <FadeUp>
                <div className="flex items-center gap-4">
                    <span className="text-primary font-mono text-sm">06</span>
                    <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase">GALLERY</span>
                </div>
            </FadeUp>
            <FadeUp delay={0.1}>
                <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase border-b border-border/50 pb-2">MOMENTS THAT MATTER</span>
            </FadeUp>
        </div>

        {/* Filters */}
        <FadeUp delay={0.2}>
          <div className="flex flex-wrap items-center gap-4 mb-12">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "px-6 py-2 text-xs font-mono tracking-widest uppercase transition-colors rounded-full border",
                  activeFilter === filter 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-transparent text-muted-foreground border-border/50 hover:border-foreground"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Aceternity Focus Cards */}
        <div className="w-full">
          <FocusCards cards={DATA.gallery} />
        </div>
      </div>
    </section>
  );
}
