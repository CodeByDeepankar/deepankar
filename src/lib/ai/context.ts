import { DATA } from "@/data/resume";
import { SERVICES } from "@/data/services";
import { PRICING_PACKAGES } from "@/data/pricing";

export function getPortfolioContext() {
  return `
Deepankar Portfolio Profile:
Name: ${DATA.name}
Initials: ${DATA.initials}
Location: ${DATA.location}
Description: ${DATA.description}
Summary: ${DATA.summary}

Freelance Services Available:
${SERVICES.map((s) => `- ${s.name} (${s.slug}): ${s.shortDescription}. Base price: ${s.currency}${s.price} (${s.priceType}). Features: ${s.features.join(", ")}`).join("\n")}

Pricing Packages:
${PRICING_PACKAGES.map((p) => `- ${p.name}: ${typeof p.price === 'number' ? p.currency + p.price : p.price}. For ${p.serviceSlug}. Features: ${p.features.join(", ")}`).join("\n")}

Skills:
${DATA.skills.map((s: any) => s.name || s).join(", ")}

Experience:
${DATA.work.map((w: any) => `- ${w.title} at ${w.company} (${w.start} - ${w.end}): ${w.description}`).join("\n")}

Education:
${DATA.education.map((e: any) => `- ${e.degree} at ${e.school} (${e.start} - ${e.end})`).join("\n")}

Projects:
${DATA.projects.map((p: any) => `- ${p.title} (${p.dates}): ${p.description}. Technologies: ${p.technologies.join(", ")}`).join("\n")}

Hackathons:
${DATA.hackathons.map((h: any) => `- ${h.title} (${h.dates}) at ${h.location}: ${h.description} [Status: ${h.win}]`).join("\n")}

Contact:
Email: ${DATA.contact.email}
Socials: ${Object.entries(DATA.contact.social).map(([name, social]: any) => `${name}: ${social.url}`).join("\n")}
`;
}
