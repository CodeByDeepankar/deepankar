"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { VintageSeparator } from "./VintageSeparator";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const largeTextRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const locationBadgeRef = useRef<HTMLDivElement>(null);
  const scrollDirection = useRef(1);
  const lastScrollY = useRef(0);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      
      if (overlayRef.current) {
        tl.from(overlayRef.current, {
          opacity: 0,
          duration: 1.5,
          ease: 'power2.out'
        });
      }

      if (titleRef.current) {
        tl.from(titleRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out'
        }, '-=1');
      }

      if (largeTextRef.current) {
        tl.from(largeTextRef.current, {
          x: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out'
        }, '-=0.8');
      }

      // Floating animation for arrow
      const arrow = heroRef.current?.querySelector('.scroll-arrow');
      if (arrow) {
        gsap.to(arrow, {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      }

      // Marquee animation
      let marqueeAnimation: gsap.core.Tween | null = null;
      let scrollHandler: (() => void) | null = null;

      if (marqueeRef.current) {
        const marquee = marqueeRef.current;
        const marqueeContent = marquee.querySelector('.marquee-content') as HTMLElement;
        
        if (marqueeContent) {
          // Clone the content for seamless loop
          const clone = marqueeContent.cloneNode(true) as HTMLElement;
          marquee.appendChild(clone);

          // Initial animation
          marqueeAnimation = gsap.to([marqueeContent, clone], {
            xPercent: -100,
            repeat: -1,
            duration: 20,
            ease: 'linear',
            modifiers: {
              xPercent: gsap.utils.wrap(-100, 0)
            }
          });

          // Update animation based on scroll direction
          scrollHandler = () => {
            const currentScrollY = window.scrollY;
            const newDirection = currentScrollY > lastScrollY.current ? 1 : -1;

            if (newDirection !== scrollDirection.current) {
              scrollDirection.current = newDirection;
              
              // Reverse animation direction
              if (marqueeAnimation) {
                gsap.to(marqueeAnimation, {
                  timeScale: newDirection * 1,
                  duration: 0.5,
                  ease: 'power2.out'
                });
              }
            }

            lastScrollY.current = currentScrollY;
          };

          window.addEventListener('scroll', scrollHandler, { passive: true });
        }
      }

      // Mouse move parallax effect
      const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current) return;
        
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Normalize mouse position (-1 to 1)
        const xPos = (clientX / innerWidth - 0.5) * 2;
        const yPos = (clientY / innerHeight - 0.5) * 2;
        
        // Update custom cursor position directly to avoid frequent React re-renders
        if (cursorRef.current) {
          // Position the cursor using left/top for smooth updates without React state
          cursorRef.current.style.left = `${clientX}px`;
          cursorRef.current.style.top = `${clientY}px`;
        }
        
        // Parallax on large text
        if (largeTextRef.current) {
          gsap.to(largeTextRef.current, {
            x: xPos * 20,
            y: yPos * 20,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
        
        // Subtle tilt on title
        if (titleRef.current) {
          gsap.to(titleRef.current, {
            x: xPos * 10,
            y: yPos * 10,
            duration: 0.5,
            ease: 'power2.out'
          });
        }

        // Magnetic effect on location badge
        if (locationBadgeRef.current) {
          const badge = locationBadgeRef.current;
          const rect = badge.getBoundingClientRect();
          const badgeCenterX = rect.left + rect.width / 2;
          const badgeCenterY = rect.top + rect.height / 2;
          
          const distance = Math.sqrt(
            Math.pow(clientX - badgeCenterX, 2) + 
            Math.pow(clientY - badgeCenterY, 2)
          );
          
          // Magnetic pull when within 150px
          if (distance < 150) {
            const pullStrength = (150 - distance) / 150;
            const deltaX = (clientX - badgeCenterX) * pullStrength * 0.3;
            const deltaY = (clientY - badgeCenterY) * pullStrength * 0.3;
            
            gsap.to(badge, {
              x: deltaX,
              y: deltaY,
              duration: 0.3,
              ease: 'power2.out'
            });
          } else {
            gsap.to(badge, {
              x: 0,
              y: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
          }
        }
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        if (scrollHandler) {
          window.removeEventListener('scroll', scrollHandler);
        }
        if (marqueeAnimation) {
          marqueeAnimation.kill();
        }
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="/images/hero.jpg"
          alt="Developer workspace"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-linear-to-br from-slate-900/70 via-slate-800/60 to-slate-900/80"
        />
      </div>

      {/* Brand Marker */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 md:left-12 z-30 text-xs sm:text-sm uppercase tracking-[0.2em] text-white/80">
        <p className="mb-1">© Deepankar</p>
        <p className="opacity-70">— Software Engineer</p>
      </div>

      {/* Marquee Text - Overlaid on hero */}
      <div className="absolute bottom-[12vw] sm:bottom-[9vw] md:bottom-[7.5vw] lg:bottom-[6vw] left-0 right-0 z-20 overflow-hidden pointer-events-none">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          <div className="marquee-content flex items-center">
            {[...Array(3)].map((_, i) => (
              <span 
                key={i}
                className="text-[20vw] sm:text-[18vw] md:text-[15vw] lg:text-[12vw] mx-4 sm:mx-8 md:mx-16 tracking-tighter opacity-30 select-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Deepankar
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 max-w-[1600px] mx-auto h-full flex items-start pt-20 sm:pt-24 md:pt-28 pb-12 lg:pb-16">
        <div className="w-full flex justify-center sm:justify-end">
          {/* Right side content */}
          <div className="text-center sm:text-right">
            <div ref={titleRef} className="mb-6 sm:mb-8 md:mb-12">
              <p className="text-sm sm:text-base md:text-lg mb-2 opacity-80 tracking-wider uppercase" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.15em' }}>Freelance</p>
              <p className="text-sm sm:text-base md:text-lg opacity-80 tracking-wider uppercase" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.15em' }}>fullstack Developer</p>
            </div>
            
            {/* Large Text */}
            <div ref={largeTextRef} className="overflow-hidden">
              <h1 className="text-[22vw] sm:text-[20vw] md:text-[15vw] lg:text-[12vw] leading-none tracking-tight opacity-30" style={{ fontFamily: "'Playfair Display', serif" }}>
                Sahoo
              </h1>
            </div>
          </div>
        </div>

        {/* Location Badge - Bottom Left */}
        <div className="absolute bottom-8 sm:bottom-12 left-4 sm:left-6 md:left-12">
          <div 
            ref={locationBadgeRef}
            className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-full border border-white/30 bg-black/40 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-black/60 hover:border-white/50 cursor-pointer"
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
              });
            }}
          >
            <div className="text-left">
              <p className="text-[10px] sm:text-xs opacity-70 mb-0.5 sm:mb-1">Based in</p>
              <p className="text-xs sm:text-sm">Odisha, India</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Globe size={16} className="opacity-80 sm:hidden" />
              <Globe size={18} className="opacity-80 hidden sm:block" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="scroll-arrow absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1.2,
            opacity: 0.8,
            duration: 0.3,
            ease: 'power2.out'
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1,
            opacity: 0.5,
            duration: 0.3,
            ease: 'power2.out'
          });
        }}
      >
        <ChevronDown size={24} className="opacity-50 sm:hidden" />
        <ChevronDown size={32} className="opacity-50 hidden sm:block" />
      </div>

      {/* Custom Cursor Follower - Hidden on mobile */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-50 mix-blend-difference hidden md:block"
        style={{
          left: '0px',
          top: '0px',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="w-8 h-8 rounded-full border-2 border-white/40 transition-all duration-300" />
      </div>

      {/* Vintage Separator at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 w-screen">
        <VintageSeparator />
      </div>
    </section>
  );
}
