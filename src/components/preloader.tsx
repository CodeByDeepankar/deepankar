"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const GREETINGS = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olá",
  "Merhaba",
  "Namaste",
  "Hallo",
  "Hola"
];

export function PreLoader() {
  const [done, setDone] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";
    
    // Animate text changing
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index >= GREETINGS.length) {
        clearInterval(interval);
        
        // Slide up animation
        const tl = gsap.timeline({
          onComplete: () => {
            setDone(true);
            document.body.style.overflow = ""; // unlock scroll
          }
        });
        
        tl.to(wrapperRef.current, {
           opacity: 0,
           duration: 0.2
        }).to(loaderRef.current, {
           yPercent: -100,
           duration: 0.8,
           ease: "power4.inOut"
        }, "+=0.1");

      } else {
        setCurrentIndex(index);
      }
    }, 200); // speed of changing languages

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-[#000000] flex items-center justify-center text-white"
    >
      <div ref={wrapperRef} className="flex items-center text-3xl md:text-5xl font-medium tracking-tight">
         {GREETINGS[currentIndex]}
      </div>
    </div>
  );
}
