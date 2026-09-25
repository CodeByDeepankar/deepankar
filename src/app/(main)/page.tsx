
import HeroSection from "@/components/section/hero-section";
import ServicesSection from "@/components/section/services-section";
import WorkSection from "@/components/section/work-section";
import ProcessSection from "@/components/section/process-section";
import PricingSection from "@/components/section/pricing-section";
import WhyDeepankarSection from "@/components/section/why-deepankar-section";
import AICtaSection from "@/components/section/ai-cta-section";
import ContactSection from "@/components/section/contact-section";

export default function BusinessHomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-primary/30 selection:text-primary">
      <HeroSection />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <PricingSection />
      <WhyDeepankarSection />
      <AICtaSection />
      <ContactSection />
    </main>
  );
}

