"use client";

import { DATA } from "@/data/resume";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";

export default function AIProjectCarousel() {
  const projects = DATA.projects;
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full mt-4 flex flex-col gap-4">
      
      {/* Carousel */}
      <div className="relative group w-full">
        {/* Controls */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/80 border border-neutral-700 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/80 border border-neutral-700 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Scroll Track */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 pb-6 pt-2 px-1 snap-x snap-mandatory no-scrollbar w-full"
        >
          {projects.map((project, idx) => (
            <Link 
              key={project.title} 
              href={project.href || "#"} 
              target="_blank"
              className="snap-start shrink-0 w-[300px] md:w-[320px] rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden group/card hover:border-lime-500/50 transition-colors flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-40 overflow-hidden bg-neutral-950">
                {project.image && (
                  <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-80" />
              </div>
              
              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg text-white">{project.title}</h3>
                  <div className="w-6 h-6 rounded-full border border-neutral-700 flex items-center justify-center group-hover/card:bg-lime-500 group-hover/card:border-lime-500 group-hover/card:text-black transition-colors">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
                
                <p className="text-neutral-400 text-xs leading-relaxed line-clamp-3 mb-4 flex-1">
                  {project.description}
                </p>
                
                {/* Tech badges */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="px-2 py-0.5 rounded-sm bg-neutral-950 border border-neutral-800 text-[10px] text-neutral-300">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-0.5 rounded-sm bg-neutral-950 border border-neutral-800 text-[10px] text-neutral-300">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Action Links */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
        <button className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
          More projects
        </button>
        <button className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
          Projects using AWS
        </button>
        <button className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
          Full project list
        </button>
      </div>
    </div>
  );
}
