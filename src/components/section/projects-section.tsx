import { AnimatedProjects } from "@/components/ui/animated-projects";
import { DATA } from "@/data/resume";

export default function ProjectsSection() {
    return (
        <section id="projects" className="py-24 bg-background">
            <div className="flex flex-col gap-y-12">
                <div className="flex flex-col gap-y-4 items-center justify-center container mx-auto px-6">
                    <div className="flex items-center w-full max-w-3xl">
                        <div className="flex-1 h-px bg-linear-to-r from-transparent from-5% via-border via-95% to-transparent" />
                        <div className="border bg-primary z-10 rounded-xl px-4 py-1 transition-transform duration-300 hover:scale-105 mx-4">
                            <span className="text-background text-sm font-medium">My Projects</span>
                        </div>
                        <div className="flex-1 h-px bg-linear-to-l from-transparent from-5% via-border via-95% to-transparent" />
                    </div>
                    <div className="flex flex-col gap-y-3 items-center justify-center">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">Check out my latest work</h2>
                        <p className="text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed text-balance text-center max-w-2xl font-light">
                            I&apos;ve worked on a variety of projects, from simple
                            websites to complex web applications. Here are a few of my
                            favorites.
                        </p>
                    </div>
                </div>
                
                <AnimatedProjects projects={DATA.projects} />
            </div>
        </section>
    );
}
