"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  magneticIntensity?: number;
}

export function MagneticButton({
  children,
  className,
  magneticIntensity = 0.3,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    const button = buttonRef.current;
    const text = textRef.current;
    if (!button || !text) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      const rect = button.getBoundingClientRect();
      const h = rect.width / 2;
      const v = rect.height / 2;
      
      const cx = rect.left + h;
      const cy = rect.top + v;
      
      const dx = (e.clientX - cx) * magneticIntensity;
      const dy = (e.clientY - cy) * magneticIntensity;

      gsap.to(button, {
        x: dx,
        y: dy,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(text, {
        x: dx * 0.5,
        y: dy * 0.5,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)",
      });
      gsap.to(text, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)",
      });
    };

    const handleMouseEnter = () => setIsHovered(true);

    window.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isHovered, magneticIntensity]);

  return (
    <button
      ref={buttonRef}
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full font-medium tracking-tight text-primary-foreground bg-primary border border-transparent hover:border-primary/50 transition-colors cursor-pointer",
        className
      )}
      {...props}
    >
      <div ref={textRef} className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">
        {children}
      </div>
    </button>
  );
}
