import { FadeUp } from "@/components/animations/reveal";
import BookingForm from "@/components/booking-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Consultation | Deepankar",
  description: "Schedule a free consultation call to discuss your project.",
};

export default function BookPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container max-w-4xl mx-auto px-6">
        <FadeUp>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-primary font-mono text-sm">##</span>
            <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase">Consultation</span>
          </div>
        </FadeUp>
        
        <FadeUp delay={0.1}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase leading-[0.9] mb-8">
            Let's discuss<br />your project.
          </h1>
        </FadeUp>
        
        <FadeUp delay={0.2}>
          <p className="text-muted-foreground text-lg font-light leading-relaxed mb-16 max-w-xl">
            Book a free 30-minute discovery call. We'll discuss your goals, requirements, and see if we're a good fit to work together.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <BookingForm />
        </FadeUp>
      </div>
    </div>
  );
}
