
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import Magnetic from "@/components/animations/magnetic";
import { FloatingDock } from "@/components/ui/floating-dock";
import { 
  IconHome,
  IconUser,
  IconBriefcase,
  IconPhoto,
  IconMail,
  IconCpu,
  IconCalendarEvent,
  IconCode,
  IconTag,
  IconAward,
  IconFileText,
  IconBook
} from "@tabler/icons-react";

const BUSINESS_LINKS = [
  { name: "Home", href: "/", icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  { name: "Services", href: "/#services", icon: <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  { name: "Work", href: "/#work", icon: <IconCode className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  { name: "Process", href: "/#process", icon: <IconBook className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  { name: "Pricing", href: "/#pricing", icon: <IconTag className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  { name: "AI", href: "/ai", icon: <IconCpu className="h-full w-full text-lime-500" /> },
  { name: "Contact", href: "/#contact", icon: <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
];

const PORTFOLIO_LINKS = [
  { name: "Home", href: "/portfolio", icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  { name: "About", href: "/portfolio#about", icon: <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  { name: "Work", href: "/portfolio#projects", icon: <IconCode className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  { name: "Experience", href: "/portfolio#experience", icon: <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  { name: "Skills", href: "/portfolio#skills", icon: <IconTag className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  { name: "Gallery", href: "/portfolio#gallery", icon: <IconPhoto className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
  { name: "AI", href: "/ai", icon: <IconCpu className="h-full w-full text-lime-500" /> },
  { name: "Resume", href: "/Resume/Resume.pdf", icon: <IconFileText className="h-full w-full text-neutral-500 dark:text-neutral-300" /> },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isPortfolio = pathname.startsWith("/portfolio");
  const currentLinks = isPortfolio ? PORTFOLIO_LINKS : BUSINESS_LINKS;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dockItems = currentLinks.map(link => ({
    title: link.name,
    href: link.href,
    icon: link.icon,
  }));

  return (
    <>
      {/* Persistent Top Header (Logo + Switcher) */}
      <header 
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500 pointer-events-none",
          scrolled ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
        )}
      >
        <div className="container mx-auto px-6 max-w-7xl pointer-events-auto py-6 md:py-8">
          <nav className="flex flex-col gap-6">
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between bg-transparent gap-4 md:gap-12">
              
              {/* Logo & Mode Switcher */}
              <div className="flex items-center gap-6 md:gap-12 w-full md:w-auto justify-between md:justify-start">
                <Link href="/" className="shrink-0 flex items-center h-8 md:h-10">
                  {isPortfolio ? (
                    <img key="portfolio-logo" src="/images/logo/logo-icon.png" alt="Deepankar Portfolio" className="h-full w-auto object-contain max-w-[40px]" />
                  ) : (
                    <img key="business-logo" src="/images/logo/full_logo.png" alt="Deepankar.tech" className="h-full w-auto object-contain max-w-[150px] md:max-w-[200px]" />
                  )}
                </Link>
                
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono tracking-widest uppercase shrink-0">
                  <Link 
                    href="/" 
                    className={cn("transition-colors", !isPortfolio ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground")}
                  >
                    [ BUSINESS ]
                  </Link>
                  <Link 
                    href="/portfolio" 
                    className={cn("transition-colors", isPortfolio ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground")}
                  >
                    [ PORTFOLIO ]
                  </Link>
                </div>
              </div>

              {/* Desktop CTA */}
              <Magnetic>
                <Link 
                  href={isPortfolio ? "/#contact" : "/#contact"}
                  className="hidden md:flex items-center gap-2 text-xs font-mono uppercase tracking-widest border border-primary/50 text-primary px-6 py-3 rounded-full hover:bg-primary hover:text-black transition-colors font-bold shrink-0"
                >
                  {isPortfolio ? "Work With Me" : "Start a Project"} <Icons.arrowRight className="size-3 -rotate-45" />
                </Link>
              </Magnetic>
            </div>
            
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 pl-[4.5rem]">
              {currentLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Floating Dock (Desktop + Mobile navigation) */}
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

