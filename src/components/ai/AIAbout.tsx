import { DATA } from "@/data/resume";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";

export default function AIAbout() {
  return (
    <div className="w-full mt-4 flex flex-col md:flex-row gap-8 bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 max-w-4xl">
      <div className="w-full md:w-1/3 relative aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-800 shrink-0">
        <Image 
          src="/images/about/about-portrait.png" 
          alt={DATA.name} 
          fill 
          className="object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="flex flex-col justify-center flex-1">
        <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">{DATA.name}</h2>
        
        <div className="flex items-center gap-4 text-xs font-mono text-lime-400 uppercase tracking-widest mb-6">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {DATA.location}</span>
          <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {DATA.contact.email}</span>
        </div>

        <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-6">
          {DATA.summary}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div className="flex flex-col p-4 rounded-xl border border-neutral-800 bg-neutral-950">
            <span className="text-2xl font-bold text-white mb-1">{DATA.projects.length}+</span>
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Projects</span>
          </div>
          <div className="flex flex-col p-4 rounded-xl border border-neutral-800 bg-neutral-950">
            <span className="text-2xl font-bold text-white mb-1">{DATA.hackathons.length}</span>
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest">Hackathons</span>
          </div>
        </div>
      </div>
    </div>
  );
}
