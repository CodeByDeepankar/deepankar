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

  // Load from session storage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem("ai_portfolio_chat");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          setMessages(parsed);
          setHasStarted(true);
        }
      } catch (e) {}
    }
  }, []);

  // Save to session storage when messages change
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem("ai_portfolio_chat", JSON.stringify(messages));
    }
  }, [messages]);
  
  const handleClearChat = () => {
    setMessages([]);
    setHasStarted(false);
    sessionStorage.removeItem("ai_portfolio_chat");
  };

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

  useEffect(() => {
    // Explicitly remove custom cursor class from body that might be left over from home page
    document.body.classList.remove("has-custom-cursor");
    // Ensure body scroll is unlocked in case lenis left it locked
    document.body.style.overflow = "auto";
  }, []);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden flex flex-col font-sans selection:bg-lime-500/30 cursor-auto">
      {/* Background with subtle glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-black/90 z-10" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-lime-500/10 blur-[120px] rounded-full z-0 opacity-50" />
      </div>
      
      <AIHeader onClear={handleClearChat} showClear={hasStarted} />
      
      <div className="flex-1 min-h-0 relative z-10 flex flex-col items-center w-full h-full overflow-hidden">
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
