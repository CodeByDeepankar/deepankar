"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  
  const [currentTime, setCurrentTime] = useState('');
  const [ctaInteraction, setCtaInteraction] = useState({ x: 50, y: 50, isHover: false });

  useEffect(() => {
    // Update time every second
    const updateTime = () => {
      const now = new Date();
      const hours24 = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const period = hours24 >= 12 ? 'PM' : 'AM';
      const hours12 = (hours24 % 12 || 12).toString().padStart(2, '0');
      const timeString = `${hours12}:${minutes} ${period} GMT+5:30`;
      setCurrentTime(timeString);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const ctx = gsap.context((context) => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out'
        });
      }

      if (contentRef.current) {
        const contentElements = Array.from(contentRef.current.children);
        if (contentElements.length > 0) {
          gsap.from(contentElements, {
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out'
          });
        }

        const contactPills = gsap.utils.toArray<HTMLAnchorElement>('.contact-pill');
        contactPills.forEach((pill) => {
          gsap.set(pill, {
            transformOrigin: 'center',
            boxShadow: '0 0 0 rgba(0,0,0,0)',
          });

          const updateGradient = (event: MouseEvent) => {
            const rect = pill.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            pill.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, rgba(129,140,248,0.45), rgba(37,99,235,0.95))`;
          };

          const handleEnter = () => {
            pill.style.backgroundImage = 'radial-gradient(circle at 50% 50%, rgba(129,140,248,0.45), rgba(37,99,235,0.95))';
            gsap.to(pill, {
              scale: 1.05,
              boxShadow: '0 20px 45px rgba(37,99,235,0.35)',
              duration: 0.35,
              ease: 'power3.out',
            });
            pill.addEventListener('mousemove', updateGradient);
          };

          const handleLeave = () => {
            gsap.to(pill, {
              scale: 1,
              boxShadow: '0 0 0 rgba(0,0,0,0)',
              duration: 0.4,
              ease: 'power2.out',
              onComplete: () => {
                pill.style.backgroundImage = '';
              }
            });
            pill.removeEventListener('mousemove', updateGradient);
          };

          const handleFocus = () => handleEnter();
          const handleBlur = () => handleLeave();

          pill.addEventListener('mouseenter', handleEnter);
          pill.addEventListener('mouseleave', handleLeave);
          pill.addEventListener('focus', handleFocus);
          pill.addEventListener('blur', handleBlur);

          context.add(() => {
            pill.removeEventListener('mouseenter', handleEnter);
            pill.removeEventListener('mouseleave', handleLeave);
            pill.removeEventListener('mousemove', updateGradient);
            pill.removeEventListener('focus', handleFocus);
            pill.removeEventListener('blur', handleBlur);
          });
        });
      }

      if (footerRef.current) {
        gsap.from(footerRef.current, {
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);

  return (
    <section 
      id="contact"
      ref={sectionRef} 
      className="min-h-screen flex flex-col justify-between px-6 sm:px-8 md:px-16 lg:px-24 py-20 sm:py-24 md:py-32 bg-zinc-950"
    >
      <div className="max-w-[1400px] mx-auto w-full flex-1 flex flex-col justify-center">
        {/* Title with Avatar */}
        <div ref={titleRef} className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-start gap-4 sm:gap-6 mb-8 sm:mb-12">
            <ImageWithFallback
              src="/images/pfp.png"
              alt="Deepankar"
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover shrink-0"
            />
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9]">
              Let&apos;s work<br />together
            </h2>
          </div>
          
          {/* Separator Line */}
          <div className="w-full h-px bg-white/10" />
        </div>

        {/* Contact Info and Button */}
        <div ref={contentRef} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          {/* Contact Pills */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="mailto:deepankarsahoo68@gmail.com"
              className="contact-pill px-6 sm:px-8 py-3 sm:py-4 border border-white/20 rounded-full bg-white/5 text-sm sm:text-base text-center relative transition-all duration-300 hover:bg-indigo-600 hover:border-indigo-400/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              deepankarsahoo68@gmail.com
            </a>
            <a 
              href="tel:+917327007170"
              className="contact-pill px-6 sm:px-8 py-3 sm:py-4 border border-white/20 rounded-full bg-white/5 text-sm sm:text-base text-center relative transition-all duration-300 hover:bg-indigo-600 hover:border-indigo-400/70 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              +91 7327007170
            </a>
          </div>

          {/* Get in touch button */}
          <div className="flex justify-start lg:justify-end">
            <a 
              href="mailto:deepankarsahoo68@gmail.com"
              className="group relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-indigo-600 transition-all duration-500 flex items-center justify-center"
              onMouseEnter={() => setCtaInteraction((prev) => ({ ...prev, isHover: true }))}
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const x = ((event.clientX - rect.left) / rect.width) * 100;
                const y = ((event.clientY - rect.top) / rect.height) * 100;
                setCtaInteraction((prev) => ({ ...prev, x, y }));
              }}
              onMouseLeave={() => setCtaInteraction({ x: 50, y: 50, isHover: false })}
              style={{
                backgroundImage: ctaInteraction.isHover
                  ? `radial-gradient(circle at ${ctaInteraction.x}% ${ctaInteraction.y}%, rgba(196, 181, 253, 0.28), rgba(37, 99, 235, 0.92))`
                  : undefined,
                boxShadow: ctaInteraction.isHover
                  ? '0 28px 55px rgba(37, 99, 235, 0.45)'
                  : '0 14px 35px rgba(15, 23, 42, 0.35)',
                transform: ctaInteraction.isHover ? 'translateY(-4px)' : 'translateY(0)',
              }}
            >
              <span className="text-sm sm:text-base">Get in touch</span>
              <ArrowDownRight 
                className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300" 
                size={20}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div ref={footerRef} className="max-w-[1400px] mx-auto w-full mt-20 sm:mt-24 md:mt-32 pt-8 border-t border-white/10">
        <div className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-12 text-xs sm:text-sm text-white/60">
          {/* Left side - Version and Time */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
            <div>
              <p className="uppercase tracking-wider mb-1 text-white/40">Version</p>
              <p>2025 © Edition</p>
            </div>
            <div>
              <p className="uppercase tracking-wider mb-1 text-white/40">Local Time</p>
              <p>{currentTime}</p>
            </div>
          </div>

          {/* Right side - Socials */}
          <div>
            <p className="uppercase tracking-wider mb-3 text-white/40">Socials</p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <a 
                href="https://instagram.com/deepankarxyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a 
                href="https://twitter.com/codebydeepankar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a 
                href="https://linkedin.com/in/deepankarsahoo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="https://github.com/codebydeepankar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
