"use client";

import { useState, useRef, useEffect } from "react";
import AIHeader from "./AIHeader";
import AILanding from "./AILanding";
import AIConversation from "./AIConversation";
import { sendPortfolioAIMessage } from "@/lib/ai/api";
import { detectIntent, AIIntent } from "@/lib/ai/intent";

export type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
  intent?: AIIntent;
};

export default function AIExperience() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    setHasStarted(true);
    
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    
    try {
      const apiHistory = messages.map(m => ({ role: m.role, content: m.content }));
      const responseText = await sendPortfolioAIMessage(text, apiHistory);
      
      const intent = detectIntent(text);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: responseText,
        intent
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "Something went wrong. Try asking again.",
        intent: "general"
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden flex flex-col font-sans selection:bg-lime-500/30">
      {/* Background with subtle glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-black/90 z-10" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-lime-500/10 blur-[120px] rounded-full z-0 opacity-50" />
      </div>
      
      <AIHeader />
      
      <div className="flex-1 relative z-10 flex flex-col items-center w-full h-full overflow-hidden">
        {!hasStarted ? (
          <AILanding onSendMessage={handleSendMessage} isLoading={isLoading} />
        ) : (
          <AIConversation 
            messages={messages} 
            isLoading={isLoading} 
            onSendMessage={handleSendMessage} 
          />
        )}
      </div>
    </div>
  );
}
