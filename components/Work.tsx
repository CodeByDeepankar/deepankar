"use client";

import { useEffect, useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CircularButton } from "./ui/circular-button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  title: string;
  category: string;
  tag?: string;
  image: string;
  link?: string;
};

const projects: Project[] = [
  {
    title: "GYANARATNA",
    category: "Full-Stack Development",
    tag: "Hackathon-winning",
    image:
      "/images/gyanaratna.png",
    link: "https://gyanaratna.vercel.app/",
  },
  {
    title: "NAGARAMITRA",
    category: "Full-Stack Development",
    image:
      "/images/nagaramitra.png",
    link: "https://nagarmitra-eight.vercel.app/",
  },
];

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewHideTweenRef = useRef<gsap.core.Tween | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro section animation
      if (introRef.current) {
        const introElements =
          introRef.current.querySelectorAll(".intro-element");
        gsap.from(introElements, {
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 80%",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        });
      }

      // Label animation
      gsap.from(labelRef.current, {
        scrollTrigger: {
          trigger: labelRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Projects stagger animation
      const projectElements =
        projectsRef.current?.querySelectorAll(".project-item");
      if (projectElements) {
        projectElements.forEach((project) => {
          gsap.from(project, {
            scrollTrigger: {
              trigger: project,
              start: "top 85%",
            },
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (previewRef.current) {
      gsap.set(previewRef.current, {
        autoAlpha: 0,
        scale: 0.85,
        xPercent: -50,
        yPercent: -50,
      });
    }
  }, []);

  const shouldUsePreview = () =>
    typeof window !== "undefined" && window.innerWidth >= 768;

  const openProjectLink = (project: Project) => {
    if (project.link) {
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  const isPointInsidePreview = (x: number, y: number) => {
    const preview = previewRef.current;
    if (!preview) {
      return false;
    }

    const rect = preview.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };

  const handleProjectEnter = (project: Project, event: ReactMouseEvent) => {
    if (!shouldUsePreview()) {
      return;
    }

    if (previewHideTweenRef.current) {
      previewHideTweenRef.current.kill();
      previewHideTweenRef.current = null;
    }

    setActiveProject(project);

    const preview = previewRef.current;
    if (!preview) {
      return;
    }

    gsap.set(preview, {
      x: event.clientX,
      y: event.clientY,
    });

    gsap.to(preview, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.35,
      ease: "power3.out",
    });

    const viewBadge = preview.querySelector(".view-badge");
    if (viewBadge instanceof HTMLElement) {
      gsap.set(viewBadge, {
        x: 0,
        y: 0,
      });
    }
  };

  const handleProjectMove = (event: ReactMouseEvent) => {
    if (!shouldUsePreview() || !previewRef.current || !activeProject) {
      return;
    }

    const preview = previewRef.current;
    const currentX = Number(gsap.getProperty(preview, "x")) || 0;
    const currentY = Number(gsap.getProperty(preview, "y")) || 0;
    const nextX = event.clientX;
    const nextY = event.clientY;

    gsap.to(preview, {
      x: nextX,
      y: nextY,
      duration: 0.3,
      ease: "power3.out",
    });

    const viewBadge = preview.querySelector(".view-badge");
    if (viewBadge instanceof HTMLElement) {
      const offsetX = Math.max(-60, Math.min(60, (nextX - currentX) * 0.2));
      const offsetY = Math.max(-60, Math.min(60, (nextY - currentY) * 0.2));
      gsap.to(viewBadge, {
        x: offsetX,
        y: offsetY,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  const handleProjectLeave = () => {
    if (!shouldUsePreview() || !previewRef.current) {
      setActiveProject(null);
      return;
    }

    const preview = previewRef.current;
    const viewBadge = preview.querySelector(".view-badge");
    if (viewBadge instanceof HTMLElement) {
      gsap.to(viewBadge, {
        x: 0,
        y: 0,
        duration: 0.25,
        ease: "power2.inOut",
      });
    }

    previewHideTweenRef.current = gsap.to(preview, {
      autoAlpha: 0,
      scale: 0.85,
      duration: 0.25,
      ease: "power3.inOut",
      onComplete: () => {
        previewHideTweenRef.current = null;
        setActiveProject(null);
      },
    });
  };

  const handleProjectClick = (
    event: ReactMouseEvent<HTMLDivElement>,
    project: Project,
  ) => {
    const { clientX, clientY } = event.nativeEvent;
    if (
      activeProject?.title === project.title &&
      isPointInsidePreview(clientX, clientY)
    ) {
      event.preventDefault();
      return;
    }

    openProjectLink(project);
  };

  useEffect(() => {
    if (!activeProject || !previewRef.current) {
      return;
    }

    const image = previewRef.current.querySelector<HTMLImageElement>("img");
    if (!image) {
      return;
    }

    gsap.killTweensOf(image);
    gsap.fromTo(
      image,
      {
        yPercent: 40,
      },
      {
        yPercent: 0,
        duration: 0.6,
        ease: "power3.out",
      },
    );
  }, [activeProject]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!activeProject?.link || !previewRef.current) {
        return;
      }

      const rect = previewRef.current.getBoundingClientRect();
      const { clientX, clientY } = event;
      const isInsidePreview =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (!isInsidePreview) {
        return;
      }

      event.preventDefault();
      window.open(activeProject.link, "_blank", "noopener,noreferrer");
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [activeProject]);

  const handleProjectKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>,
    project: Project,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProjectLink(project);
    }
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="bg-zinc-950 text-white relative py-16 sm:py-20 md:py-24 scroll-mt-28 sm:scroll-mt-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-16 lg:px-24">
        {/* Intro Section */}
        <div ref={introRef} className="mb-16 sm:mb-20 md:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-8">
            {/* Left - Main Heading */}
            <div className="intro-element">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-zinc-300">
                Helping brands to stand out in the digital era. Together we will
                set the new status quo. No nonsense, always on the cutting edge.
              </h2>
            </div>

            {/* Right - Description */}
            <div className="intro-element lg:pt-8 space-y-6">
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
                The combination of my passion for design, code & interaction
                positions me in a unique place in the web design world.
              </p>

              {/* About Me Button */}
              <div className="intro-element">
                <CircularButton href="#about">About me</CircularButton>
              </div>
            </div>
          </div>
        </div>

        {/* Label */}
        <p
          ref={labelRef}
          className="text-xs sm:text-sm tracking-[0.2em] uppercase text-zinc-500 mb-16 sm:mb-20 md:mb-24"
        >
          Recent work
        </p>

        {/* Projects List */}
        <div ref={projectsRef} className="space-y-0">
          {projects.map((project, index) => (
            <div
              key={index}
              role={project.link ? "link" : undefined}
              tabIndex={project.link ? 0 : -1}
              onClick={(event) => handleProjectClick(event, project)}
              onKeyDown={(event) => handleProjectKeyDown(event, project)}
              onMouseEnter={(event) => handleProjectEnter(project, event)}
              onMouseMove={handleProjectMove}
              onMouseLeave={handleProjectLeave}
              className="project-item group cursor-pointer border-t border-white/10 py-8 sm:py-10 md:py-12 lg:py-16 transition-all duration-500 hover:bg-white/5"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 sm:gap-8">
                {/* Project Title */}
                <h3
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight group-hover:translate-x-2 transition-transform duration-500"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {project.title}
                </h3>

                {/* Category */}
                <div className="flex items-center gap-3">
                  {project.tag && (
                    <span className="rounded-full border border-indigo-400/40 bg-indigo-600/20 px-3 py-1 text-xs sm:text-sm uppercase tracking-wide text-indigo-200">
                      {project.tag}
                    </span>
                  )}
                  <p className="text-sm sm:text-base md:text-lg text-zinc-400 whitespace-nowrap shrink-0">
                    {project.category}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Bottom border */}
          <div className="border-t border-white/10" />
        </div>
      </div>

      <div
        ref={previewRef}
        className="pointer-events-none fixed top-0 left-0 z-40 hidden h-56 w-72 overflow-hidden border border-white/10 bg-zinc-950/90 shadow-2xl md:flex"
      >
        {activeProject && (
          <div className="relative h-full w-full">
            <ImageWithFallback
              src={activeProject.image}
              alt={`${activeProject.title} preview`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-br from-black/10 to-black/60" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span
                className="view-badge flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-xs font-semibold uppercase tracking-[0.35em] text-zinc-900 shadow-lg"
                aria-hidden
              >
                View
              </span>
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
