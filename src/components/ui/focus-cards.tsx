"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

export type FocusCardType = {
  title: string;
  src: string;
};

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    onClick
  }: {
    card: FocusCardType;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    onClick: () => void;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={onClick}
      className={cn(
        "rounded-lg relative bg-muted/20 border border-border/50 overflow-hidden w-full transition-all duration-300 ease-out cursor-pointer mb-4 break-inside-avoid",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98] opacity-50"
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        className="w-full h-auto block"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/60 flex items-end py-4 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-lg font-medium text-white">
          {card.title}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

export function FocusCards({ cards }: { cards: FocusCardType[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<FocusCardType | null>(null);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 w-full">
        {cards.map((card, index) => (
          <Card
            key={card.title + index}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
            onClick={() => setSelected(card)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              src={selected.src}
              alt={selected.title}
              className="w-full h-full object-contain max-w-7xl mx-auto rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-colors"
              onClick={() => setSelected(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
