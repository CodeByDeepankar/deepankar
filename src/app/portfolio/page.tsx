
import PortfolioHeroSection from "@/components/section/portfolio-hero-section";
import AboutSection from "@/components/section/about-section";
import PhilosophySection from "@/components/section/philosophy-section";
import SkillsSection from "@/components/section/skills-section";
import ProjectsSection from "@/components/section/projects-section";
import HackathonsSection from "@/components/section/hackathons-section";
import GallerySection from "@/components/section/gallery-section";
import LabSection from "@/components/section/lab-section";
import CurrentlyBuildingSection from "@/components/section/currently-building-section";
import ContactSection from "@/components/section/contact-section";
import ExperienceSection from "@/components/section/experience-section";
import AiCtaSection from "@/components/section/ai-cta-section";
import { DATA } from "@/data/resume";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: DATA.name,
  url: DATA.url,
  sameAs: Object.values(DATA.contact.social).map((social) => social.url),
  jobTitle: "Full Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "Self-Employed",
  },
  alumniOf: "Computer Science Undergraduate",
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function PortfolioPage() {
  return (
    <main className="relative w-full">
      <JsonLd />
      <PortfolioHeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <HackathonsSection />
      <GallerySection />
      <LabSection />
      <CurrentlyBuildingSection />
      <AiCtaSection />
      <ContactSection />
    </main>
  );
}

