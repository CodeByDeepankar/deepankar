"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "./ui/badge";
import { Code2, Database, Globe, Layers } from "lucide-react";
import { CircularButton } from "./ui/circular-button";

gsap.registerPlugin(ScrollTrigger);

const skills = {
  frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Vue.js",
    "Three.js",
    "GSAP",
  ],
  backend: [
    "Node.js",
    "Express",
    "Python",
    "Django",
    "PostgreSQL",
    "MongoDB",
    "Redis",
  ],
  devops: ["Docker", "AWS", "CI/CD", "Nginx", "GitHub Actions"],
  tools: ["Git", "Figma", "Postman", "Webpack", "Vite"],
};

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      const cards = gsap.utils.toArray<HTMLElement>(".skill-card");
      cards.forEach((card, index) => {
  const elements = card.querySelectorAll("svg, h3, .badge-wrapper");

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          card,
          {
            opacity: 0,
            y: 90,
            rotateX: -25,
            scale: 0.9,
            transformPerspective: 900,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.9,
            delay: index * 0.05,
          }
        );

        if (elements.length) {
          tl.from(
            elements,
            {
              y: 24,
              opacity: 0,
              stagger: 0.05,
              duration: 0.5,
            },
            "<20%"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="px-4 sm:px-6 md:px-12 py-10 sm:py-20 md:py-24 bg-zinc-900 relative"
    >
      <div className="max-w-[1600px] mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-7xl mb-5 sm:mb-12 md:mb-16"
        >
          About Me
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-12 md:gap-16 mb-5 sm:mb-12">
          <div className="space-y-3 sm:space-y-6">
            <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
              I&apos;m Deepankar, a fullstack developer based in New Delhi, India. I
              specialize in building modern web applications that combine
              beautiful design with robust functionality.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
              With expertise spanning both frontend and backend technologies, I
              create seamless digital experiences that solve real-world
              problems. I&apos;m passionate about clean code, user experience, and
              staying current with emerging technologies.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-6">
            <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
              My approach combines technical excellence with creative
              problem-solving. Whether it&apos;s building scalable APIs, crafting
              intuitive interfaces, or optimizing performance, I&apos;m committed to
              delivering high-quality solutions.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
              When I&apos;m not coding, you&apos;ll find me exploring new frameworks,
              contributing to open-source projects, or sharing knowledge with
              the developer community.
            </p>
          </div>
        </div>

        <div
          ref={contentRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
        >
          <div className="skill-card p-5 sm:p-6 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all duration-300">
            <Code2 className="mb-3 sm:mb-4 text-indigo-400" size={24} />
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg">Frontend</h3>
            <div className="badge-wrapper flex flex-wrap gap-2">
              {skills.frontend.map((skill, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-white/10 text-xs sm:text-sm"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="skill-card p-5 sm:p-6 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all duration-300">
            <Database className="mb-3 sm:mb-4 text-indigo-400" size={24} />
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg">Backend</h3>
            <div className="badge-wrapper flex flex-wrap gap-2">
              {skills.backend.map((skill, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-white/10 text-xs sm:text-sm"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="skill-card p-5 sm:p-6 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all duration-300">
            <Globe className="mb-3 sm:mb-4 text-indigo-400" size={24} />
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg">DevOps</h3>
            <div className="badge-wrapper flex flex-wrap gap-2">
              {skills.devops.map((skill, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-white/10 text-xs sm:text-sm"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="skill-card p-5 sm:p-6 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all duration-300">
            <Layers className="mb-3 sm:mb-4 text-indigo-400" size={24} />
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg">Tools</h3>
            <div className="badge-wrapper flex flex-wrap gap-2">
              {skills.tools.map((skill, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-white/10 text-xs sm:text-sm"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 sm:mt-12 flex items-center justify-center lg:justify-start">
          <CircularButton href="#contact" className="bg-indigo-600 border-indigo-400/40">
            Start a project
          </CircularButton>
        </div>
      </div>
    </section>
  );
}
