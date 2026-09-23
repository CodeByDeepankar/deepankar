"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Magnetic({ children }: { children: React.ReactElement }) {
    const magnetic = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = magnetic.current;
        if (!el) return;
        
        // Skip on mobile devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const mouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = el.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * 0.35);
            yTo(y * 0.35);
        };

        const mouseLeave = (e: MouseEvent) => {
            gsap.to(el, { x: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
            gsap.to(el, { y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
            xTo(0);
            yTo(0);
        };

        el.addEventListener("mousemove", mouseMove);
        el.addEventListener("mouseleave", mouseLeave);

        return () => {
            el.removeEventListener("mousemove", mouseMove);
            el.removeEventListener("mouseleave", mouseLeave);
        };
    }, []);

    return (
        <div ref={magnetic} className="inline-flex">
            {children}
        </div>
    );
}
