import { Message } from "./AIExperience";
import AIInput from "./AIInput";
import AIMessageNode from "./AIMessage";
import { useEffect, useRef } from "react";

interface AIConversationProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
}

export default function AIConversation({ messages, isLoading, onSendMessage }: AIConversationProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col items-center justify-between relative z-10 px-4 md:px-8 pb-6">
      
      {/* Scrollable messages container */}
      <div 
        ref={scrollRef}
        className="flex-1 min-h-0 w-full max-w-5xl overflow-y-auto overflow-x-hidden pt-10 pb-32 no-scrollbar flex flex-col gap-8"
      >
        {messages.map((msg, index) => (
          <AIMessageNode key={msg.id} message={msg} isLast={index === messages.length - 1} />
        ))}
        {isLoading && (
          <div className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-10 h-10 rounded-full border border-lime-500/30 overflow-hidden relative flex-shrink-0 bg-black/50">
              <div className="absolute inset-0 bg-lime-500/20 animate-pulse" />
            </div>
            <div className="mt-2 text-sm text-lime-400/70 font-mono animate-pulse">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input area anchored to bottom */}
      <div className="absolute bottom-6 left-0 right-0 px-4 w-full flex justify-center bg-gradient-to-t from-black via-black/80 to-transparent pt-10 pb-4">
        <AIInput 
          onSend={onSendMessage} 
          isLoading={isLoading} 
          placeholder="Ask me anything..."
        />
      </div>
    </div>
  );
}
