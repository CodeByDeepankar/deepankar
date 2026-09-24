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
import AIServiceCard from "./AIServiceCard";
import AIAutoSubmitLead from "./AIAutoSubmitLead";
import { TextGenerateEffect } from "../ui/text-generate-effect";

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
          <div className="bg-neutral-900 border border-neutral-800 rounded-full px-6 py-3 text-sm text-neutral-200 shadow-lg whitespace-pre-wrap">
            {typeof message.content === 'string' ? message.content : JSON.stringify(message.content)}
          </div>
          <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center flex-shrink-0 bg-neutral-950">
            <User className="w-4 h-4 text-neutral-500" />
          </div>
        </div>
      </div>
    );
  }

  // Parse markers for AI Message
  let displayContent = typeof message.content === 'string' ? message.content : JSON.stringify(message.content);
  
  // Extract Service markers: [[SHOW_SERVICE:slug]]
  const serviceRegex = /\[\[SHOW_SERVICE:([^\]]+)\]\]/g;
  let serviceSlug: string | null = null;
  const serviceMatch = serviceRegex.exec(displayContent);
  if (serviceMatch) {
    serviceSlug = serviceMatch[1];
    displayContent = displayContent.replace(serviceRegex, "").trim();
  }
  
  // Extract Auto Submit Lead marker: [[SUBMIT_LEAD:{...}]]
  const leadRegex = /\[\[SUBMIT_LEAD:([^\]]+)\]\]/g;
  let leadData: any = null;
  const leadMatch = leadRegex.exec(displayContent);
  if (leadMatch) {
    try {
      leadData = JSON.parse(leadMatch[1]);
    } catch (e) {
      console.error("Failed to parse lead data from AI", e);
    }
    displayContent = displayContent.replace(leadRegex, "").trim();
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
            fill sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Response Content */}
        <div className="flex flex-col gap-6 pt-1 w-full">
          {/* AI Text Response */}
          <div className="text-lg md:text-xl text-neutral-200 font-sans max-w-3xl leading-relaxed whitespace-pre-wrap">
            <TextGenerateEffect words={displayContent} duration={isLast ? 0.3 : 0} filter={isLast} />
          </div>

          {/* AI Visual Response based on Intent */}
          {message.intent === "projects" && <AIProjectCarousel />}
          {message.intent === "project-detail" && <AIProjectDetail text={displayContent} />}
          {message.intent === "gallery" && <AIGallery />}
          {message.intent === "skills" && <AISkills />}
          {message.intent === "current-work" && <AICurrentWork />}
          {message.intent === "hackathons" && <AIHackathons />}
          {message.intent === "about" && <AIAbout />}
          
          {/* AI Visual Response based on Markers */}
          {serviceSlug && <AIServiceCard slug={serviceSlug} />}
          {leadData && <AIAutoSubmitLead data={leadData} />}
        </div>
      </div>
    </div>
  );
}
