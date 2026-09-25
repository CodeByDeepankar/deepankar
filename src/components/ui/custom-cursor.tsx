
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const followerRef = useRef<HTMLImageElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device is touch
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const follower = followerRef.current;
    const label = cursorLabelRef.current;
    
    if (!follower || !label) return;

    if (isTouch || prefersReducedMotion) {
      follower.style.display = "none";
      label.style.display = "none";
      return;
    }

    // Hide native cursor
    document.body.classList.add("has-custom-cursor");

    // Initialize position off-screen or hide until first move
    gsap.set(follower, { x: -100, y: -100, xPercent: -50, yPercent: -50 });
    gsap.set(label, { x: -100, y: -100, xPercent: -50, yPercent: -50 });

    // Use a very short duration so it feels responsive like a real cursor
    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.15, ease: "power3.out" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.15, ease: "power3.out" });

    const xToLabel = gsap.quickTo(label, "x", { duration: 0.1, ease: "power2.out" });
    const yToLabel = gsap.quickTo(label, "y", { duration: 0.1, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      xToFollower(e.clientX);
      yToFollower(e.clientY);
      xToLabel(e.clientX);
      yToLabel(e.clientY);
    };

    // Hide cursor when leaving window
    const onMouseLeaveDoc = () => {
      gsap.to(follower, { opacity: 0, duration: 0.2 });
    };
    
    const onMouseEnterDoc = () => {
      gsap.to(follower, { opacity: 1, duration: 0.2 });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isLink = target.tagName.toLowerCase() === "a" || 
                     target.tagName.toLowerCase() === "button" ||
                     target.closest("a") || 
                     target.closest("button");
                     
      const hasDataCursor = target.getAttribute("data-cursor") || target.closest("[data-cursor]")?.getAttribute("data-cursor");

      if (hasDataCursor) {
        label.innerText = hasDataCursor;
        gsap.to(follower, { scale: 0, duration: 0.2 });
        gsap.to(label, { scale: 1, opacity: 1, duration: 0.2 });
      } else if (isLink) {
        gsap.to(follower, { scale: 1.5, opacity: 1, duration: 0.3 });
        gsap.to(label, { scale: 0, opacity: 0, duration: 0.2 });
      } else {
        gsap.to(follower, { scale: 1, opacity: 0.9, duration: 0.3 });
        gsap.to(label, { scale: 0, opacity: 0, duration: 0.2 });
      }
    };

    const onMouseOut = () => {
      gsap.to(follower, { scale: 1, opacity: 0.9, duration: 0.3 });
      gsap.to(label, { scale: 0, opacity: 0, duration: 0.2 });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.body.addEventListener("mouseleave", onMouseLeaveDoc);
    document.body.addEventListener("mouseenter", onMouseEnterDoc);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.body.removeEventListener("mouseleave", onMouseLeaveDoc);
      document.body.removeEventListener("mouseenter", onMouseEnterDoc);
    };
  }, []);

  return (
    <>
      <img 
        ref={followerRef} 
        src="/images/logo/logo-icon.png"
        alt="cursor"
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ 
          transformOrigin: "center center",
          opacity: 0.9
        }}
      />
      <div
        ref={cursorLabelRef}
        className="fixed top-0 left-0 flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground text-[10px] font-bold rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 hidden md:flex"
        style={{ transformOrigin: "center center" }}
      />
    </>
  );
}

