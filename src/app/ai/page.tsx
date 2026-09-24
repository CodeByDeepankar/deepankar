import AIExperience from "@/components/ai/AIExperience";

export const metadata = {
  title: "AI Portfolio Assistant | Deepankar",
  description: "Explore Deepankar's portfolio through an intelligent visual interface.",
};

export default function AIPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-lime-500/30 selection:text-lime-200">
      <AIExperience />
    </main>
  );
}
