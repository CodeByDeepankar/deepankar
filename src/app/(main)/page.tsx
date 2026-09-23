import HeroSection from "@/components/section/hero-section";
import AboutSection from "@/components/section/about-section";
import PhilosophySection from "@/components/section/philosophy-section";
import SkillsSection from "@/components/section/skills-section";
import ProjectsSection from "@/components/section/projects-section";
import HackathonsSection from "@/components/section/hackathons-section";
import GallerySection from "@/components/section/gallery-section";
import LabSection from "@/components/section/lab-section";
import CurrentlyBuildingSection from "@/components/section/currently-building-section";
import ContactSection from "@/components/section/contact-section";
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

export default function Page() {
  return (
    <main className="relative w-full">
      <JsonLd />
      <HeroSection />
      <AboutSection />
      <PhilosophySection />
      <SkillsSection />
      <ProjectsSection />
      <HackathonsSection />
      <GallerySection />
      <LabSection />
      <CurrentlyBuildingSection />
      <ContactSection />
    </main>
  );
}
