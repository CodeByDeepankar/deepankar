"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  
  // Custom tokenizer to keep **bold** phrases or [links](url) together
  const parts = words.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
  
  type WordToken = { text: string; url?: string; isBold: boolean; isLink: boolean; isSpace: boolean; key: string };
  
  // Then we split each part into words, tagging them if they are bold or a link
  const wordsArray = parts.flatMap((part, partIdx): WordToken[] => {
    const isBold = part.startsWith('**') && part.endsWith('**');
    const isLink = part.startsWith('[') && part.includes('](') && part.endsWith(')');
    
    if (isLink) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      const label = match ? match[1] : part;
      const url = match ? match[2] : '#';
      
      return [{
        text: label,
        url: url,
        isBold: false,
        isLink: true,
        isSpace: false,
        key: `${partIdx}-0`
      }];
    }
    
    const cleanText = isBold ? part.slice(2, -2) : part;
    
    // Split the clean text into words
    return cleanText.split(/(\s+)/).filter(w => w.length > 0).map((word, wordIdx) => ({
      text: word,
      url: undefined,
      isBold,
      isLink: false,
      isSpace: /^\s+$/.test(word),
      key: `${partIdx}-${wordIdx}`
    }));
  });

  useEffect(() => {
    if (scope.current) {
      animate(
        ".animate-word",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration ? duration : 1,
          delay: stagger(0.02),
        }
      );
    }
  }, [scope.current, animate, filter, duration]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((item) => {
          if (item.isSpace) {
            return <span key={item.key}>{item.text}</span>;
          }
          if (item.isLink) {
            return (
              <motion.a
                key={item.key}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn("animate-word opacity-0 inline-block text-[#D4F870] underline underline-offset-4 decoration-lime-500/30 hover:decoration-lime-500 transition-colors")}
                style={{
                  filter: filter ? "blur(10px)" : "none",
                }}
              >
                {item.text}
              </motion.a>
            );
          }
          return (
            <motion.span
              key={item.key}
              className={cn("animate-word opacity-0 inline-block", item.isBold ? "text-[#D4F870] font-bold" : "")}
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {item.text}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("", className)}>
      {renderWords()}
    </div>
  );
};
