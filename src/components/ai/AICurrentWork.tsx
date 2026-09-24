import { DATA } from "@/data/resume";
import Image from "next/image";
import { ArrowRight, CheckSquare, Code2, Cpu, TestTube } from "lucide-react";

export default function AICurrentWork() {
  const lab = DATA.lab || [];
  
  if (lab.length === 0) return null;

  return (
    <div className="w-full mt-4 flex flex-col md:flex-row gap-6 max-w-4xl h-auto md:h-[400px]">
      {/* Featured Left Image */}
      <div className="w-full md:w-[45%] h-[250px] md:h-full relative rounded-2xl overflow-hidden border border-neutral-800">
        <Image 
          src={lab[0]?.image || "/images/about/about-portrait.png"}
          alt="Current setup"
          fill sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* List Right */}
      <div className="w-full md:w-[55%] flex flex-col gap-3">
        {lab.slice(0, 4).map((item: any, idx: number) => (
          <div key={idx} className="group flex items-center justify-between p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-lime-500/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-lime-400 group-hover:bg-lime-500/10 transition-colors">
                {idx === 0 ? <CheckSquare className="w-5 h-5" /> : 
                 idx === 1 ? <Cpu className="w-5 h-5" /> : 
                 idx === 2 ? <Code2 className="w-5 h-5" /> : 
                 <TestTube className="w-5 h-5" />}
              </div>
              <div className="flex flex-col">
                <h4 className="font-bold text-white text-sm">{item.title}</h4>
                <p className="text-neutral-400 text-xs">{item.description}</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-lime-400 transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}
