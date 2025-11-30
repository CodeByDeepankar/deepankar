"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CircularButton } from "./ui/circular-button";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { Badge } from "./ui/badge";
import { Code2, Database, Globe, Layers, type LucideIcon } from "lucide-react";

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

type SkillCard = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

const skillCards: SkillCard[] = [
  { title: "Frontend", icon: Code2, items: skills.frontend },
  { title: "Backend", icon: Database, items: skills.backend },
  { title: "DevOps", icon: Globe, items: skills.devops },
  { title: "Tools", icon: Layers, items: skills.tools },
];

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

      if (contentRef.current) {
        gsap.from(contentRef.current, {
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
          y: 60,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
        });
      }
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

        <div className="mt-10 sm:mt-14">
          <div className="rounded-3xl border border-white/10 bg-white/3 p-4 sm:p-6">
            <InfiniteMovingCards
              items={skillCards}
              direction="right"
              speed="slow"
              className="dark:mask-[linear-gradient(to_right,transparent,rgba(255,255,255,0.9)_20%,rgba(255,255,255,0.9)_80%,transparent)]"
              itemClassName="w-[280px] sm:w-[320px] md:w-[360px] border-none bg-transparent px-0 py-0"
              renderItem={(card) => {
                const Icon = card.icon;
                return (
                  <div className="skill-card h-full p-5 sm:p-6 border border-white/15 rounded-xl bg-[rgba(36,36,39,1)] text-white transition-all duration-300">
                    <Icon className="mb-3 sm:mb-4 text-indigo-300" size={24} />
                    <h3 className="mb-3 sm:mb-4 text-base sm:text-lg">{card.title}</h3>
                    <div className="badge-wrapper flex flex-wrap gap-2 text-white">
                      {card.items.map((skill, i) => (
                        <Badge
                          key={`${card.title}-${skill}-${i}`}
                          variant="secondary"
                          className="bg-white/20 text-white text-xs sm:text-sm"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              }}
            />
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
