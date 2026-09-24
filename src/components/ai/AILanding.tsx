import Image from "next/image";
import AIInput from "./AIInput";

const QUICK_PROMPTS = [
  "Show my projects",
  "My skills",
  "View my services",
  "Request a custom quote"
];

interface AILandingProps {
  onSendMessage: (msg: string) => void;
  isLoading: boolean;
}

export default function AILanding({ onSendMessage, isLoading }: AILandingProps) {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center relative z-10 px-4">
      {/* Decorative text left */}
      <div className="hidden lg:block absolute left-20 top-1/3 -translate-y-1/2 font-mono text-[10px] text-neutral-500 uppercase tracking-widest leading-relaxed">
        <p>My Work</p>
        <p>Projects</p>
        <p>Skills</p>
        <p>Hackathons</p>
        <p>Experiences</p>
        <p>And more...</p>
        <div className="w-8 h-[1px] bg-lime-500/50 mt-4" />
      </div>

      {/* Decorative text right */}
      <div className="hidden lg:block absolute right-20 top-1/3 -translate-y-1/2 font-mono text-[10px] text-neutral-500 uppercase tracking-widest leading-relaxed text-right">
        <p>Ideas</p>
        <p>Teams</p>
        <p>Late Nights</p>
        <p>Big Dreams</p>
      </div>

      <div className="hidden lg:block absolute right-[25%] top-[20%] rotate-12 font-serif italic text-2xl text-neutral-400 opacity-60">
        <p>Ask</p>
        <p>Explore</p>
        <p>Discover</p>
      </div>

      {/* Main Avatar Area */}
      <div className="relative w-full max-w-2xl flex flex-col items-center justify-center -mt-10 md:mt-0">
        {/* Orbital rings behind avatar */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[120%] aspect-square rounded-full border border-lime-500/20 z-0 animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[90%] aspect-square rounded-full border border-lime-500/10 z-0 animate-[spin_40s_linear_infinite_reverse]" />
        
        {/* Avatar Image */}
        <div className="relative w-64 h-64 md:w-96 md:h-96 z-10 animate-in fade-in zoom-in duration-1000 ease-out">
          <Image
            src="/images/ai/ai_avater.png"
            alt="Deepankar AI Avatar"
            fill sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain drop-shadow-[0_0_50px_rgba(132,204,22,0.3)]"
            priority
          />
        </div>

        {/* Text content - positioned to overlap the bottom of the avatar like in the reference */}
        <div className="relative z-20 flex flex-col items-center text-center -mt-16 md:-mt-24 w-full">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
            Let's Talk
            <br />
            <span className="text-[#D4F870] drop-shadow-[0_0_30px_rgba(132,204,22,0.4)]">Deepankar AI</span>
          </h1>
          
          <p className="mt-6 font-mono text-[10px] md:text-xs text-neutral-400 uppercase tracking-widest max-w-md">
            Ask anything about my work,<br className="md:hidden" /> projects, skills, hackathons or ideas.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center mt-10 z-30">
        <AIInput 
          onSend={onSendMessage} 
          isLoading={isLoading} 
          placeholder="Ask me anything about Deepankar..."
        />
        
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6 max-w-2xl">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => onSendMessage(prompt)}
              disabled={isLoading}
              className="px-4 py-2 rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-400 text-xs font-sans hover:bg-neutral-800 hover:text-white transition-colors disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
