import { ArrowUp, Loader2 } from "lucide-react";
import { useState } from "react";

interface AIInputProps {
  onSend: (text: string) => void;
  isLoading: boolean;
  placeholder?: string;
  className?: string;
}

export default function AIInput({ onSend, isLoading, placeholder = "Ask me anything...", className = "" }: AIInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSend(text);
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`w-full max-w-[800px] bg-neutral-900/50 backdrop-blur-md border border-lime-500/20 rounded-[2rem] p-2 flex items-center shadow-[0_0_30px_rgba(132,204,22,0.1)] ${className}`}
    >
      <div className="pl-4 pr-3 text-neutral-400">
        <div className="flex items-center gap-1 opacity-50">
          <div className="w-0.5 h-3 bg-current animate-[pulse_1s_ease-in-out_infinite]" />
          <div className="w-0.5 h-4 bg-current animate-[pulse_1.2s_ease-in-out_infinite]" />
          <div className="w-0.5 h-2 bg-current animate-[pulse_0.8s_ease-in-out_infinite]" />
          <div className="w-0.5 h-3 bg-current animate-[pulse_1.1s_ease-in-out_infinite]" />
        </div>
      </div>
      
      <input 
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isLoading}
        className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-neutral-500 font-sans px-2"
        autoFocus
      />
      
      <button 
        type="submit"
        disabled={!text.trim() || isLoading}
        className="w-10 h-10 rounded-full bg-[#D4F870] flex items-center justify-center text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 flex-shrink-0"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <ArrowUp className="w-5 h-5" />
        )}
      </button>
    </form>
  );
}
