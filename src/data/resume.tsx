import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";

export const DATA = {
  name: "Deepankar Sahoo",
  initials: "DS",
  url: "https://deepankar.tech",
  location: "Odisha, India",
  locationLink: "https://www.google.com/maps/place/odisha",
  description:
    "Full Stack Developer. Building scalable, secure, and user-centric software using modern technologies.",
  summary:
    "Motivated Computer Science undergraduate with hands-on experience in full stack web and cloud application development. I build scalable, secure, and user-centric software using modern technologies like [Next.js](https://nextjs.org), [TypeScript](https://typescriptlang.org), and [AWS](https://aws.amazon.com). From winning hackathons like [BPUT Hackathon](/#hackathons) to being a [Smart India Hackathon 2025 Finalist](/#hackathons), I love solving real-world problems with innovative tech.",
  avatarUrl: "/me.png",
  skills: [
    { name: "JavaScript", icon: Typescript },
    { name: "TypeScript", icon: Typescript },
    { name: "React.js", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Tailwind CSS", icon: Typescript },
    { name: "Node.js", icon: Nodejs },
    { name: "Express.js", icon: Nodejs },
    { name: "Go", icon: Nodejs },
    { name: "MongoDB", icon: Nodejs },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "AWS", icon: Docker },
    { name: "Git", icon: Docker },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "contact@deepankar.tech",
    tel: "+917327007170",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/codebydeepankar",
        icon: Icons.github,
        navbar: true,
      },

      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/deepankarsahoo",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://twitter.com/codebydeepankar",
        icon: Icons.x,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:contact@deepankar.tech",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Freelance",
      href: "https://github.com/codebydeepankar",
      badges: [],
      location: "Remote",
      title: "Fullstack Developer",
      logoUrl: "/Freelance.svg",
      start: "2023",
      end: "Present",
      description:
        "Building modern web applications for clients using React, Next.js, TypeScript, and Tailwind CSS. Developing scalable APIs with Node.js, Express, and PostgreSQL. Implementing CI/CD pipelines and deploying applications using Docker and AWS.",
    },
  ],
  education: [
    {
      school: "Government College of Engineering, Kalahandi",
      href: "https://gcekalahandi.odisha.gov.in",
      degree: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
      logoUrl: "/placeholder-college.png",
      start: "2024",
      end: "2028",
    },
  ],
  projects: [
    {
      title: "Tekkzy",
      href: "https://tekky.vercel.app",
      dates: "2025",
      active: true,
      description:
        "Intelligent Cloud Applications Platform. Designed and developed a production-grade full stack cloud platform showcasing automation and software solutions. Built serverless APIs on AWS Lambda with MongoDB persistence and JWT-based authentication.",
      technologies: [
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "Node.js",
        "Express.js",
        "AWS Lambda",
        "MongoDB",
        "Framer Motion",
      ],
      links: [
        {
          type: "Website",
          href: "https://tekky.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/CodeByDeepankar/tekkzy",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/placeholder-tekkzy.png",
      video: "",
    },
    {
      title: "Gyanaratna",
      href: "https://gyanaratna.vercel.app",
      dates: "2025",
      active: true,
      description:
        "AI-powered full stack Progressive Web Application for academic management. Built role-based dashboards for admin, teachers, and students. Integrated AI-driven insights for academic monitoring and designed scalable REST APIs with optimized frontend performance.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "TailwindCSS",
        "Node.js",
      ],
      links: [
        {
          type: "Website",
          href: "https://gyanaratna.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/CodeByDeepankar/gyanaratna",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/gyanaratnaweb.png",
      video: "",
    },
    {
      title: "Nagarmitra",
      href: "https://nagarmitra.vercel.app",
      dates: "2025",
      active: true,
      description:
        "Civic issue reporting web application with map-based tracking. Enabled public reporting of infrastructure issues like potholes and streetlights. Implemented map view, admin workflows, and complaint status tracking.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "TailwindCSS",
        "Node.js",
        "PostgreSQL",
      ],
      links: [
        {
          type: "Website",
          href: "https://nagarmitra.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/CodeByDeepankar/nagarmitra",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/nagaramitra.png",
      video: "",
    },
    {
      title: "Nidhisetu",
      href: "https://nidhisetu.vercel.app",
      dates: "2025",
      active: true,
      description:
        "Loan utilization analysis mobile application. Built a React Native app for monitoring loan asset utilization. Integrated AI analysis using Ollama models for asset review.",
      technologies: [
        "React Native",
        "TypeScript",
        "AI/ML",
        "Ollama",
        "Node.js",
      ],
      links: [
        {
          type: "Website",
          href: "https://nidhisetu.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/CodeByDeepankar/nidhisetu",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/nidhisetuweb.png",
      video: "",
    }
  ],
  hackathons: [
    {
      title: "Smart India Hackathon (SIH) 2025",
      dates: "2025",
      location: "India",
      description:
        "Represented team in developing Nidhisetu, a loan utilization analysis mobile application. Built a React Native app with AI-powered asset monitoring using Ollama model. Secured Finalist position among thousands of participating teams.",
      image: "/placeholder-sih.png",
      win: "Finalist",
      links: [],
    },
    {
      title: "Inspireano 2k25",
      dates: "2025",
      location: "India",
      description:
        "Won the college-level hackathon by building Nagaramitra, a civic issue reporting web application with map-based tracking. Enabled public reporting of infrastructure issues and implemented admin workflows with complaint status tracking.",
      image: "/placeholder-inspireano.png",
      win: "Winner",
      links: [
        {
          title: "Website",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://nagarmitra.vercel.app",
        },
      ],
    },
    {
      title: "BPUT Hackathon",
      dates: "2025",
      location: "India",
      description:
        "Built Gyanaratna, an AI-powered full stack Progressive Web Application for academic management. Designed role-based dashboards, integrated AI-driven insights for academic monitoring, and optimized frontend performance.",
      image: "/gyanaratna.png",
      win: "Winner",
      links: [
        {
          title: "Website",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://gyanaratna.vercel.app",
        },
      ],
    },
  ],
} as const;
