import { DATA } from "@/data/resume";

export function getPortfolioContext() {
  return `
Deepankar Portfolio Profile:
Name: ${DATA.name}
Initials: ${DATA.initials}
Location: ${DATA.location}
Description: ${DATA.description}
Summary: ${DATA.summary}

Skills:
${DATA.skills.map((s) => s.name || s).join(", ")}

Experience:
${DATA.work.map((w) => `- ${w.title} at ${w.company} (${w.start} - ${w.end}): ${w.description}`).join("\n")}

Education:
${DATA.education.map((e) => `- ${e.degree} at ${e.school} (${e.start} - ${e.end})`).join("\n")}

Projects:
${DATA.projects.map((p) => `- ${p.title} (${p.dates}): ${p.description}. Technologies: ${p.technologies.join(", ")}`).join("\n")}

Hackathons:
${DATA.hackathons.map((h: any) => `- ${h.title} (${h.dates}) at ${h.location}: ${h.description} [Status: ${h.win}]`).join("\n")}

Current Work / Lab:
${DATA.lab ? DATA.lab.map((l: any) => `- ${l.title}: ${l.description}`).join("\n") : "Not specified"}

Contact:
Email: ${DATA.contact.email}
Socials: ${Object.keys(DATA.contact.social).join(", ")}
`;
}
