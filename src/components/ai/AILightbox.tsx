import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface AILightboxProps {
  images: any[];
  initialIndex: number;
  onClose: () => void;
}

export default function AILightbox({ images, initialIndex, onClose }: AILightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images[currentIndex]) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center animate-in fade-in duration-300">
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-neutral-400 hover:text-white transition-colors"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="absolute bottom-8 font-mono text-sm tracking-widest text-neutral-500">
        {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>

      <button 
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
      >
        <ChevronLeft className="w-12 h-12" />
      </button>

      <div className="relative w-[90vw] max-w-5xl h-[80vh]">
        <Image 
          src={images[currentIndex].src}
          alt={images[currentIndex].title || "Gallery Image"}
          fill
          className="object-contain"
          priority
        />
      </div>

      <button 
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
      >
        <ChevronRight className="w-12 h-12" />
      </button>
    </div>
  );
}
