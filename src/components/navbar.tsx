"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import Magnetic from "@/components/animations/magnetic";
import { FloatingDock } from "@/components/ui/floating-dock";
import { 
  IconHome,
  IconUser,
  IconBriefcase,
  IconPhoto,
  IconFlask,
  IconMail
} from "@tabler/icons-react";

const NAV_LINKS = [
  { name: "Home", href: "/", icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  { name: "About", href: "#about", icon: <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  { name: "Work", href: "#work", icon: <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  { name: "Gallery", href: "#gallery", icon: <IconPhoto className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  { name: "Lab", href: "#lab", icon: <IconFlask className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  { name: "Contact", href: "#contact", icon: <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/edit")) return null;

  const dockItems = NAV_LINKS.map(link => ({
    title: link.name,
    href: link.href,
    icon: link.icon,
  }));

  return (
    <>
      {/* Desktop Original Navbar - Hides when scrolled */}
      <header 
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500 pointer-events-none hidden md:block",
          scrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        )}
      >
        <div className="container mx-auto px-6 max-w-7xl pointer-events-auto py-8">
          <nav className="flex items-center justify-between bg-transparent">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              D<span className="text-primary">.</span>
            </Link>

            {/* Desktop Links */}
            <div className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA */}
            <Magnetic>
              <Link 
                href="#contact"
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest border border-border/50 px-4 py-2 rounded-full hover:bg-muted/20 transition-colors"
              >
                Let's Talk <Icons.arrowRight className="size-3 -rotate-45" />
              </Link>
            </Magnetic>
          </nav>
        </div>
      </header>

      {/* Floating Dock */}
      <FloatingDock
        items={dockItems}
        desktopClassName={cn(
          "fixed bottom-8 left-1/2 -translate-x-1/2 transition-all duration-500 z-[9999]",
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24 pointer-events-none"
        )}
        mobileClassName="fixed bottom-6 right-6 z-[9999]"
      />
    </>
  );
}
