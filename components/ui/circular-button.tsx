"use client";

import { useCallback, useRef, useState } from "react";
import { motion } from "motion/react";

interface CircularButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

type ButtonElement = HTMLButtonElement | HTMLAnchorElement;

export function CircularButton({ children, href, onClick, className = "" }: CircularButtonProps) {
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<ButtonElement | null>(null);
  const setButtonRef = useCallback((node: ButtonElement | null) => {
    buttonRef.current = node;
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setCursorOffset({ x, y });
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
  if (href?.startsWith("#")) {
      e.preventDefault();
      const element = document.getElementById(href.slice(1));
      if (element) {
  element.scrollIntoView({ behavior: "smooth" });
      }
    }
    onClick?.();
  };

  const Component = href ? motion.a : motion.button;
  const linkProps = href && !href.startsWith("#") ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const props = href ? { href, ...linkProps } : { onClick };

  return (
    <Component
      ref={setButtonRef}
      {...props}
      onClick={handleClick}
      className={`relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border border-white/15 flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        backgroundColor: isHovered ? "rgba(37, 99, 235, 1)" : "rgba(10, 10, 12, 1)",
        borderColor: isHovered ? "rgba(129, 140, 248, 0.6)" : "rgba(255, 255, 255, 0.15)",
        boxShadow: isHovered
          ? "0 25px 45px rgba(30, 64, 175, 0.45)"
          : "0 15px 30px rgba(0, 0, 0, 0.35)",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* 3D inner sphere */}
      <motion.div
        className="pointer-events-none absolute inset-[0.4rem] rounded-full bg-gradient-to-br from-white/18 via-indigo-400/35 to-blue-900/75 shadow-[inset_0_12px_25px_rgba(255,255,255,0.25),0_20px_40px_rgba(29,78,216,0.35)]"
        animate={{
          x: isHovered ? cursorOffset.x * 0.2 : 0,
          y: isHovered ? cursorOffset.y * 0.2 : 0,
          scale: isHovered ? 1 : 0.98,
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <motion.span
          className="absolute left-1/2 top-1/5 h-6 w-12 -translate-x-1/2 rounded-full bg-white/35 blur-xl"
          animate={{
            x: isHovered ? cursorOffset.x * 0.25 : 0,
            y: isHovered ? cursorOffset.y * 0.15 : 0,
            opacity: isHovered ? 1 : 0.7,
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </motion.div>

      {/* Text that subtly follows cursor */}
      <motion.span
        className="relative z-10 text-white text-xs sm:text-sm md:text-base pointer-events-none text-center px-3 sm:px-4"
        animate={{
          x: isHovered ? cursorOffset.x * 0.15 : 0,
          y: isHovered ? cursorOffset.y * 0.15 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {children}
      </motion.span>
    </Component>
  );
}
