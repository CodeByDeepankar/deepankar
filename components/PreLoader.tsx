"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const greetings = [
  "Hello",
  "Hola",
  "Bonjour",
  "Ciao",
  "Hallo",
  "Olá",
  "Привет",
  "こんにちは",
  "안녕하세요",
  "Namaste",
  "Merhaba",
  "Salaam",
  "Hej",
  "Salam",
  "Sawubona",
];

interface PreLoaderProps {
  onComplete: () => void;
}

export function PreLoader({ onComplete }: PreLoaderProps) {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cycle through greetings
    const greetingInterval = setInterval(() => {
      setCurrentGreeting((prev) => {
        if (prev < greetings.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 150); // Fast cycling

    // After all greetings, start circle reveal
    const circleTimeout = setTimeout(() => {
      clearInterval(greetingInterval);
      
      if (circleRef.current && loaderRef.current) {
        const circle = circleRef.current;
        
        // Animate circle from bottom
        gsap.fromTo(circle,
          {
            scale: 0,
            transformOrigin: 'center bottom',
          },
          {
            scale: 15,
            duration: 1.2,
            ease: 'power3.inOut',
            onComplete: () => {
              // Fade out entire loader
              gsap.to(loaderRef.current, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                  onComplete();
                }
              });
            }
          }
        );
      }
    }, greetings.length * 150 + 300); // Wait for all greetings + small pause

    return () => {
      clearInterval(greetingInterval);
      clearTimeout(circleTimeout);
    };
  }, [onComplete]);

  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-zinc-950 flex items-center justify-center overflow-hidden"
    >
      {/* Greeting Text */}
      <div className="relative z-10 px-4">
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white text-center">
          {greetings[currentGreeting]}
        </h2>
      </div>

      {/* Circle Reveal */}
      <div 
        ref={circleRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150vw] h-[150vw] sm:w-[100vw] sm:h-[100vw] rounded-full bg-white"
        style={{ transform: 'translateX(-50%) scale(0)' }}
      />
    </div>
  );
}
