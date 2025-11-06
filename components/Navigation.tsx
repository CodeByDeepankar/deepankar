"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const offset = window.pageYOffset + rect.top - 24;

    gsap.to(window, {
      scrollTo: {
        y: offset,
        autoKill: true,
      },
      duration: 1,
      ease: "power2.out",
      onComplete: () => setIsMenuOpen(false),
    });
  };

  return (
  <nav ref={navRef} className="relative z-50 px-6 md:px-12 py-6 md:py-8">
      <div className="flex items-center justify-between max-w-[1600px] mx-auto">
        {/* Left side - Brand */}
        <div className="flex items-center gap-2">
          <span className="text-sm md:text-base">© Deepankar</span>
          <span className="hidden md:inline text-sm opacity-70">— Software Engineer</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          <button 
            onClick={() => scrollToSection('work')}
            className="text-sm md:text-base hover:opacity-60 transition-opacity"
          >
            Work
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-sm md:text-base hover:opacity-60 transition-opacity"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-sm md:text-base hover:opacity-60 transition-opacity"
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-50 relative"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-zinc-950 flex items-center justify-center">
          <div className="flex flex-col items-center gap-8">
            <button 
              onClick={() => scrollToSection('work')}
              className="text-2xl hover:opacity-60 transition-opacity"
            >
              Work
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-2xl hover:opacity-60 transition-opacity"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-2xl hover:opacity-60 transition-opacity"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
