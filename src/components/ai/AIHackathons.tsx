import { DATA } from "@/data/resume";
import Image from "next/image";
import { Trophy, MapPin, Calendar } from "lucide-react";

export default function AIHackathons() {
  const hackathons = DATA.hackathons || [];
  
  if (hackathons.length === 0) return null;

  return (
    <div className="w-full mt-4 flex flex-col gap-4 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hackathons.map((hackathon: any, idx: number) => (
          <div key={idx} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col gap-4 hover:border-lime-500/30 transition-colors">
            
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-white text-lg">{hackathon.title}</h3>
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-neutral-500 font-mono">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {hackathon.dates}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {hackathon.location}</span>
                </div>
              </div>
              
              {hackathon.image && (
                <div className="w-12 h-12 relative rounded-full overflow-hidden border border-neutral-800 shrink-0">
                  <Image src={hackathon.image} alt={hackathon.title} fill className="object-cover" />
                </div>
              )}
            </div>

            <p className="text-sm text-neutral-400 leading-relaxed mt-2">
              {hackathon.description}
            </p>

            <div className="mt-auto pt-4 flex items-center justify-between border-t border-neutral-800/50">
              <div className="flex items-center gap-2 text-lime-400 text-xs font-bold uppercase tracking-wider">
                <Trophy className="w-4 h-4" />
                {hackathon.win || "Participant"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
