import { DATA } from "@/data/resume";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code, Globe } from "lucide-react";

interface AIProjectDetailProps {
  text: string;
}

export default function AIProjectDetail({ text }: AIProjectDetailProps) {
  // Try to find which project they're talking about based on the text
  const lowerText = text.toLowerCase();
  const project = DATA.projects.find(p => lowerText.includes(p.title.toLowerCase())) || DATA.projects[0];

  if (!project) return null;

  return (
    <div className="w-full mt-4 bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden max-w-3xl">
      <div className="p-8 pb-0">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-3xl font-bold text-white tracking-tight">{project.title}</h2>
          <ArrowUpRight className="w-6 h-6 text-lime-400" />
        </div>
        <p className="text-neutral-400 text-sm leading-relaxed mb-8 max-w-xl">
          {project.description}
        </p>
      </div>

      <div className="w-full px-8 relative h-[300px] sm:h-[400px]">
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-t-xl border-t border-x border-neutral-800"
          />
        )}
        <div className="absolute inset-x-8 bottom-0 h-1/2 bg-gradient-to-t from-neutral-900 to-transparent" />
      </div>

      <div className="p-8 pt-4">
        <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-4">Tech Stack</h4>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.technologies.map(tech => (
            <span key={tech} className="px-3 py-1.5 rounded border border-neutral-700 bg-neutral-950 text-neutral-300 text-xs font-mono">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          {project.links?.map(link => (
            <Link 
              key={link.href}
              href={link.href}
              target="_blank"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-colors ${
                link.type.toLowerCase() === 'website' 
                  ? 'bg-[#D4F870] text-black hover:bg-lime-400'
                  : 'border border-neutral-700 bg-neutral-950 text-neutral-300 hover:text-white'
              }`}
            >
              {link.type}
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
