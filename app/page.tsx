"use client";

import { useEffect, useState } from "react";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { PreLoader } from "@/components/PreLoader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <>
      {isLoading && <PreLoader onComplete={() => setIsLoading(false)} />}
      
      <div className={`relative bg-zinc-950 text-white overflow-x-hidden ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <main className="relative">
          <Hero />
          <Work />
          <About />
          <Contact />
        </main>
      </div>
    </>
  );
}
