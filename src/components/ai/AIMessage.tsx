import { Message } from "./AIExperience";
import Image from "next/image";
import { User } from "lucide-react";
import AIProjectCarousel from "./AIProjectCarousel";
import AIProjectDetail from "./AIProjectDetail";
import AIGallery from "./AIGallery";
import AISkills from "./AISkills";
import AICurrentWork from "./AICurrentWork";
import AIHackathons from "./AIHackathons";
import AIAbout from "./AIAbout";

interface AIMessageProps {
  message: Message;
  isLast: boolean;
}

export default function AIMessageNode({ message, isLast }: AIMessageProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="w-full flex justify-end animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="flex items-center gap-3 max-w-[80%] md:max-w-[60%]">
          <div className="bg-neutral-900 border border-neutral-800 rounded-full px-6 py-3 text-sm text-neutral-200 shadow-lg">
            {message.content}
          </div>
          <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center flex-shrink-0 bg-neutral-950">
            <User className="w-4 h-4 text-neutral-500" />
          </div>
        </div>
      </div>
    );
  }

  // AI Message
  return (
    <div className="w-full flex justify-start animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start gap-4 max-w-full md:max-w-[90%] lg:max-w-[85%]">
        
        {/* AI Avatar */}
        <div className="w-10 h-10 rounded-full border border-lime-500/30 overflow-hidden relative flex-shrink-0 bg-black">
          <Image
            src="/images/ai/ai_avater.png"
            alt="AI"
            fill
            className="object-cover"
          />
        </div>

        {/* Response Content */}
        <div className="flex flex-col gap-6 pt-1 w-full">
          {/* AI Text Response */}
          <div className="text-lg md:text-xl text-neutral-200 font-sans max-w-3xl leading-relaxed">
            {message.content}
          </div>

          {/* AI Visual Response based on Intent */}
          {message.intent === "projects" && <AIProjectCarousel />}
          {message.intent === "project-detail" && <AIProjectDetail text={message.content} />}
          {message.intent === "gallery" && <AIGallery />}
          {message.intent === "skills" && <AISkills />}
          {message.intent === "current-work" && <AICurrentWork />}
          {message.intent === "hackathons" && <AIHackathons />}
          {message.intent === "about" && <AIAbout />}
        </div>
      </div>
    </div>
  );
}
