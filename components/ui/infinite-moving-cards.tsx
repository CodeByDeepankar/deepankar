"use client";

import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useState } from "react";

type DefaultCard = {
  quote: string;
  name: string;
  title: string;
};

type InfiniteMovingCardsProps<T extends Record<string, unknown> = DefaultCard> = {
  items: T[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  itemClassName?: string;
  renderItem?: (item: T, index: number) => React.ReactNode;
};

export const InfiniteMovingCards = <T extends Record<string, unknown> = DefaultCard>(
  {
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
    itemClassName,
    renderItem,
  }: InfiniteMovingCardsProps<T>,
) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const [start, setStart] = useState(false);
  const getDirection = useCallback(() => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse",
    );
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (!containerRef.current) return;
    const duration =
      speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
    containerRef.current.style.setProperty("--animation-duration", duration);
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    if (scrollerRef.current.dataset.animated === "true") {
      getDirection();
      getSpeed();
      setStart(true);
      return;
    }

    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scrollerRef.current?.appendChild(duplicatedItem);
    });

    scrollerRef.current.dataset.animated = "true";
    getDirection();
    getSpeed();
    setStart(true);
  }, [getDirection, getSpeed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className={cn(
              "relative w-[350px] max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-200 bg-[linear-gradient(180deg,#fafafa,#f5f5f5)] px-8 py-6 md:w-[450px] dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)]",
              itemClassName,
            )}
            key={idx}
          >
            {renderItem ? (
              renderItem(item, idx)
            ) : (
              (() => {
                const defaultItem = item as unknown as DefaultCard;
                return (
              <blockquote>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-0.5 -left-0.5 -z-1 h-[calc(100%+4px)] w-[calc(100%+4px)] user-select-none"
                ></div>
                <span className="relative z-20 text-sm font-normal leading-[1.6] text-neutral-800 dark:text-gray-100">
                  {defaultItem.quote}
                </span>
                <div className="relative z-20 mt-6 flex flex-row items-center">
                  <span className="flex flex-col gap-1">
                    <span className="text-sm font-normal leading-[1.6] text-neutral-500 dark:text-gray-400">
                      {defaultItem.name}
                    </span>
                    <span className="text-sm font-normal leading-[1.6] text-neutral-500 dark:text-gray-400">
                      {defaultItem.title}
                    </span>
                  </span>
                </div>
              </blockquote>
                );
              })()
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
