"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export function ParallaxImage({ src, alt, className, imageClassName, priority }: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Only run on non-touch devices and respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const container = containerRef.current;
    const image = imageRef.current;

    if (!container || !image) return;

    // Create parallax effect: image moves slightly slower than container
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Start image slightly scaled and translated up
    timeline.fromTo(
      image,
      {
        yPercent: -15,
        scale: 1.1,
      },
      {
        yPercent: 15,
        scale: 1.1,
        ease: "none",
      }
    );

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden w-full h-full", className)}>
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        fill sizes="(max-width: 768px) 100vw, 50vw"
        className={cn("object-cover", imageClassName)}
        priority={priority}
      />
    </div>
  );
}
