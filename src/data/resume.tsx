import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Javascript } from "@/components/ui/svgs/javascript";
import { TailwindCSS } from "@/components/ui/svgs/tailwindcss";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { ExpressJs } from "@/components/ui/svgs/expressjs";
import { Golang } from "@/components/ui/svgs/golang";
import { MongoDB } from "@/components/ui/svgs/mongodb";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { AWS } from "@/components/ui/svgs/aws";
import { Git } from "@/components/ui/svgs/git";
import { Docker } from "@/components/ui/svgs/docker";
import rawData from "./resume.json";
import React from "react";

// Icon registry to map string keys from JSON to actual React components
const IconRegistry: Record<string, React.ElementType | any> = {
  Javascript,
  Typescript,
  ReactLight,
  NextjsIconDark,
  TailwindCSS,
  Nodejs,
  ExpressJs,
  Golang,
  MongoDB,
  Postgresql,
  AWS,
  Git,
  Docker,
  HomeIcon,
  NotebookIcon,
  github: Icons.github,
  linkedin: Icons.linkedin,
  x: Icons.x,
  email: Icons.email,
  globe: Icons.globe,
};

// Process rawData to inject components
export const DATA = {
  ...rawData,
  skills: rawData.skills.map((skill) => ({
    ...skill,
    icon: IconRegistry[skill.icon] || Icons.globe,
  })),
  navbar: rawData.navbar.map((item) => ({
    ...item,
    icon: IconRegistry[item.icon] || HomeIcon,
  })),
  contact: {
    ...rawData.contact,
    social: Object.fromEntries(
      Object.entries(rawData.contact.social).map(([key, social]) => [
        key,
        {
          ...social,
          icon: IconRegistry[social.icon] || Icons.globe,
        },
      ])
    ),
  },
  projects: rawData.projects.map((project) => ({
    ...project,
    links: project.links.map((link) => ({
      ...link,
      icon: React.createElement(IconRegistry[link.icon] || Icons.globe, { className: "size-3" }),
    })),
  })),
  hackathons: rawData.hackathons.map((hackathon) => ({
    ...hackathon,
    links: hackathon.links.map((link) => ({
      ...link,
      icon: React.createElement(IconRegistry[link.icon] || Icons.globe, { className: "h-4 w-4" }),
    })),
  })),
} as const;
