"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Markdown from "react-markdown";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

export type Project = {
  title: string;
  href?: string;
  dates: string;
  description: string;
  image: string;
  technologies: readonly string[];
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
};

export const AnimatedProjects = ({
  projects,
  autoplay = false,
}: {
  projects: readonly Project[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const getDeterministicRotation = (index: number) => {
    const ROTATIONS = [-5, 8, -10, 6, -3, 9, -7, 4, -9, 2, -4, 10, -8, 5, -2, 7, -6, 3, -1, 1, 0];
    return ROTATIONS[index % ROTATIONS.length];
  };

  return (
    <div className="mx-auto max-w-sm px-4 py-10 font-sans antialiased md:max-w-5xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <div className="relative h-[400px] w-full">
            <AnimatePresence>
              {projects.map((project, index) => (
                <motion.div
                  key={project.image + index}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: getDeterministicRotation(index),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : getDeterministicRotation(index),
                    zIndex: isActive(index)
                      ? 40
                      : projects.length + 2 - index,
                    y: isActive(index) ? [0, -40, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: getDeterministicRotation(index),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <CardContainer className="w-full h-full p-0 m-0">
                    <CardBody className="w-full h-full p-0 m-0">
                      <CardItem translateZ="50" className="w-full h-full">
                        <img
                          src={project.image}
                          alt={project.title}
                          draggable={false}
                          className="h-full w-full rounded-3xl object-cover object-top border border-border/50 shadow-xl"
                        />
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-3xl font-bold text-black dark:text-white">
                {projects[active].title}
              </h3>
              <p className="text-sm font-mono text-primary">
                {projects[active].dates}
              </p>
            </div>
            
            <div className="mt-6 text-base text-gray-500 dark:text-neutral-300 prose prose-sm dark:prose-invert">
              <Markdown>{projects[active].description}</Markdown>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {projects[active].technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs font-medium">
                  {tech}
                </Badge>
              ))}
            </div>

            {projects[active].links && projects[active].links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {projects[active].links.map((link, idx) => (
                  <Link key={idx} href={link.href} target="_blank">
                    <Badge className="flex items-center gap-2 px-3 py-1.5 text-xs bg-black text-white hover:bg-black/90">
                      {link.icon}
                      {link.type}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0 mt-8">
            <button
              onClick={handlePrev}
              className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-translate-x-1 dark:text-neutral-300" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:translate-x-1 dark:text-neutral-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
