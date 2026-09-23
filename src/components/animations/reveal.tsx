"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

export function RevealText({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    // Use a simple split-like effect by animating lines or chars if needed, 
    // but for now, we'll just do a nice fade-up with blur
    gsap.fromTo(
      containerRef.current,
      { y: 40, opacity: 0, filter: "blur(8px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      }
    );
  }, [delay]);

  return (
    <div ref={containerRef} className={cn("will-change-transform opacity-0", className)}>
      {children}
    </div>
  );
}

export function FadeUp({ children, className, delay = 0, yOffset = 40 }: { children: React.ReactNode, className?: string, delay?: number, yOffset?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { y: yOffset, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      }
    );
  }, [delay, yOffset]);

  return (
    <div ref={containerRef} className={cn("will-change-transform opacity-0", className)}>
      {children}
    </div>
  );
}

export function ImageReveal({ children, className }: { children: React.ReactNode, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !imageRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });

    tl.fromTo(
      containerRef.current,
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.2,
        ease: "power4.inOut",
      }
    ).fromTo(
      imageRef.current,
      { scale: 1.2 },
      {
        scale: 1,
        duration: 1.2,
        ease: "power4.inOut",
      },
      "-=1.2"
    );
  }, []);

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <div ref={imageRef} className="w-full h-full">
        {children}
      </div>
    </div>
  );
}
