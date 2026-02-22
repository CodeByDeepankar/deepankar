"use client";

import { useEffect, useRef, useState } from "react";

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

export function PreLoader() {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [done, setDone] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const greetingInterval = setInterval(() => {
      setCurrentGreeting((prev) => {
        if (prev < greetings.length - 1) return prev + 1;
        return prev;
      });
    }, 150);

    const fadeTimeout = setTimeout(() => {
      clearInterval(greetingInterval);

      if (loaderRef.current) {
        const fadeAnim = loaderRef.current.animate(
          [{ opacity: 1 }, { opacity: 0 }],
          { duration: 800, easing: "ease-out", fill: "forwards" }
        );

        fadeAnim.onfinish = () => {
          setDone(true);
          document.body.style.overflow = "";
        };
      }
    }, greetings.length * 150 + 300);

    return () => {
      clearInterval(greetingInterval);
      clearTimeout(fadeTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-zinc-950 flex items-center justify-center"
    >
      <div className="px-4">
        <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white text-center font-sans font-light tracking-tight">
          {greetings[currentGreeting]}
        </h2>
      </div>
    </div>
  );
}
