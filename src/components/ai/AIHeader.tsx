import Link from "next/link";
import { MoveLeft, X, Trash2 } from "lucide-react";

interface AIHeaderProps {
  onClear?: () => void;
  showClear?: boolean;
}

export default function AIHeader({ onClear, showClear }: AIHeaderProps = {}) {
  return (
    <header className="w-full flex items-center justify-between px-6 py-8 relative z-50 text-white font-mono text-xs uppercase tracking-[0.2em]">
      <div className="flex-1 flex items-center justify-start">
        <Link href="/" className="font-sans font-bold text-2xl normal-case tracking-tight">D.</Link>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-neutral-400">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <Link href="/#about" className="hover:text-white transition-colors">About</Link>
        <Link href="/#work" className="hover:text-white transition-colors">Work</Link>
        <Link href="/#gallery" className="hover:text-white transition-colors">Gallery</Link>
        <Link href="/#lab" className="hover:text-white transition-colors">Lab</Link>
        <div className="relative text-lime-400 flex flex-col items-center">
          <span>AI</span>
          <div className="absolute -bottom-2 w-4 h-[2px] bg-lime-400"></div>
        </div>
        <Link href="/#contact" className="hover:text-white transition-colors">Contact</Link>
      </nav>

      <div className="flex-1 flex justify-end items-center gap-4">
        {showClear && (
          <button 
            onClick={onClear}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-red-400 hover:border-red-900/50 transition-colors"
            title="Clear conversation"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
        <Link href="/" className="md:hidden flex items-center gap-2 border border-neutral-800 rounded-full px-4 py-2 hover:bg-neutral-900 transition-colors">
          <MoveLeft className="w-3 h-3" /> Back
        </Link>
        <Link href="/" className="hidden md:flex items-center gap-2 border border-neutral-800 rounded-full px-4 py-2 hover:bg-neutral-900 transition-colors" title="Exit AI">
          <div className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-pulse"></div>
          <span className="text-[10px]">Portfolio AI</span>
          <X className="w-3 h-3 ml-1 text-neutral-400" />
        </Link>
      </div>
    </header>
  );
}
