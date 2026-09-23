/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";
import Magnetic from "@/components/animations/magnetic";
import { ParallaxImage } from "@/components/animations/parallax-image";
import { LinkPreview } from "@/components/ui/link-preview";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  if (!src) return <div className="w-full h-48 bg-muted" />;

  return (
    <div className="w-full h-48 overflow-hidden relative">
      <ParallaxImage
        src={src}
        alt={alt}
        className="w-full h-full"
        imageClassName="transition-transform duration-500 ease-out group-hover/card:scale-105"
      />
    </div>
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <CardContainer className="inter-var w-full h-full">
      <CardBody className="group/card w-full h-full flex flex-col border border-border rounded-xl overflow-hidden hover:ring-2 cursor-pointer hover:ring-muted transition-all duration-300 ease-out bg-background">
        <CardItem translateZ="50" className="relative shrink-0 w-full">
          <Link
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {video ? (
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-48 object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
              />
            ) : image ? (
              <ProjectImage src={image} alt={title} />
            ) : (
              <div className="w-full h-48 bg-muted" />
            )}
          </Link>
          {links && links.length > 0 && (
            <div className="absolute top-2 right-2 flex flex-wrap gap-2">
              {links.map((link, idx) => (
                <Magnetic key={idx}>
                  <LinkPreview
                    url={link.href}
                  >
                    <div onClick={(e) => e.stopPropagation()}>
                      <Badge
                        className="flex items-center gap-1.5 text-xs bg-black text-white hover:bg-black/90 transition-transform duration-200"
                        variant="default"
                      >
                        {link.icon}
                        {link.type}
                      </Badge>
                    </div>
                  </LinkPreview>
                </Magnetic>
              ))}
            </div>
          )}
        </CardItem>
        <div className="p-6 flex flex-col gap-3 flex-1">
          <div className="flex items-start justify-between gap-2">
            <CardItem translateZ="60" className="flex flex-col gap-1">
              <h3 className="font-semibold">{title}</h3>
              <time className="text-xs text-muted-foreground">{dates}</time>
            </CardItem>
            <CardItem translateZ="40">
              <LinkPreview
                url={href || "#"}
                className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </LinkPreview>
            </CardItem>
          </div>
          <CardItem translateZ="30" className="text-xs flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown>{description}</Markdown>
          </CardItem>
          {tags && tags.length > 0 && (
            <CardItem translateZ="40" className="flex flex-wrap gap-1 mt-auto">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  className="text-[11px] font-medium border border-border h-6 w-fit px-2 transition-colors duration-200 hover:bg-muted hover:border-primary/30"
                  variant="outline"
                >
                  {tag}
                </Badge>
              ))}
            </CardItem>
          )}
        </div>
      </CardBody>
    </CardContainer>
  );
}
