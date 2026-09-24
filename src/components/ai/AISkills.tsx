import { DATA } from "@/data/resume";

export default function AISkills() {
  const skills = DATA.skills;

  // Categorize manually for visual presentation matching the spec
  const categories = {
    "Frontend": ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
    "Backend": ["Node.js", "Express.js", "Go"],
    "Database": ["MongoDB", "PostgreSQL"],
    "Cloud & DevOps": ["AWS"],
    "Tools & Others": ["Git"]
  };

  return (
    <div className="w-full mt-4 flex flex-col gap-4 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(categories).map(([category, skillNames]) => {
          const categorySkills = skills.filter(s => skillNames.includes(s.name));
          if (categorySkills.length === 0) return null;

          return (
            <div key={category} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col gap-4 group hover:border-lime-500/30 transition-colors">
              <h3 className="font-bold text-lg text-white">{category}</h3>
              <div className="flex flex-wrap gap-4">
                {categorySkills.map((skill, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center p-2 group-hover:border-neutral-700 transition-colors">
                      {skill.icon ? (
                        <skill.icon className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-full h-full bg-neutral-800 rounded-md" />
                      )}
                    </div>
                    <span className="text-[10px] text-neutral-400 font-mono tracking-wide">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
