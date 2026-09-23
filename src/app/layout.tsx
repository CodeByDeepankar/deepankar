import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PreLoader } from "@/components/preloader";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { SmoothScroll } from "@/components/animations/smooth-scroll";
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: `${DATA.name} — Full Stack Developer`,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  keywords: [
    "Deepankar Sahoo",
    "Full Stack Developer",
    "Software Engineer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Node.js",
    "Web Developer India",
    "Portfolio",
    "Blog",
    "AWS",
    "Golang",
    "PostgreSQL",
    "MongoDB",
  ],
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  publisher: DATA.name,
  category: "technology",
  alternates: {
    canonical: DATA.url,
  },
  openGraph: {
    title: `${DATA.name} — Full Stack Developer`,
    description: DATA.description,
    url: DATA.url,
    siteName: DATA.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${DATA.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${DATA.name} — Full Stack Developer`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name} — Full Stack Developer`,
    description: DATA.description,
    card: "summary_large_image",
    creator: "@codebydeepankar",
    images: [`${DATA.url}/opengraph-image`],
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <TooltipProvider delayDuration={0}>
            <div className="noise-overlay" />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
