export const PRICING_PACKAGES = [
  {
    id: "starter",
    name: "Starter",
    price: 999,
    currency: "₹",
    interval: null,
    popular: false,
    description: "For simple landing pages and quick validations.",
    features: [
      "1-2 page website",
      "Responsive design",
      "Contact form",
      "Basic SEO"
    ],
    ctaText: "Get Started",
    serviceSlug: "landing-page"
  },
  {
    id: "business",
    name: "Business",
    price: 1999,
    currency: "₹",
    interval: null,
    popular: true,
    description: "For established businesses needing a professional presence.",
    features: [
      "Up to 5 pages",
      "WhatsApp integration",
      "Google Maps",
      "Gallery & SEO"
    ],
    ctaText: "Get Started",
    serviceSlug: "business-website"
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    price: 3999,
    currency: "₹",
    interval: null,
    popular: false,
    description: "For retail businesses ready to sell online.",
    features: [
      "Product catalog",
      "Payment setup",
      "Admin panel",
      "Order management"
    ],
    ctaText: "Get Started",
    serviceSlug: "e-commerce"
  },
  {
    id: "custom",
    name: "Custom",
    price: "Custom Quote",
    currency: "",
    interval: null,
    popular: false,
    description: "For advanced applications and complex requirements.",
    features: [
      "Web application",
      "SaaS product",
      "Dashboard / Admin",
      "AI Integration"
    ],
    ctaText: "Request Quote",
    serviceSlug: "custom-web-app"
  }
];
