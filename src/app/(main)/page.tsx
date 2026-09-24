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
import ExperienceSection from "@/components/section/experience-section";
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

import ServicesSection from "@/components/section/services-section";
import PricingSection from "@/components/section/pricing-section";
import AiCtaSection from "@/components/section/ai-cta-section";

export default function Page() {
  return (
    <main className="relative w-full">
      <JsonLd />
      <HeroSection />
      
      {/* 4. Services */}
      <ServicesSection />
      
      {/* 5. Selected Work */}
      <ProjectsSection />
      
      {/* 6. Process (Philosophy) */}
      <PhilosophySection />
      
      {/* 7. Pricing */}
      <PricingSection />
      
      {/* 8. Why Deepankar (About) */}
      <AboutSection />
      
      {/* 9. CV / Experience */}
      <SkillsSection />
      <ExperienceSection />
      
      {/* 10. Hackathons / Achievements */}
      <HackathonsSection />
      
      {/* Gallery & Lab (Existing) */}
      <GallerySection />
      <LabSection />
      <CurrentlyBuildingSection />
      
      {/* 11. AI CTA */}
      <AiCtaSection />
      
      {/* 13. Final project CTA */}
      <ContactSection />
    </main>
  );
}
