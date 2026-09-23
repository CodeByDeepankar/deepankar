import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import rawData from "@/data/resume.json";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token");

  if (!token || token.value !== "authenticated") {
    redirect("/edit");
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardClient initialData={rawData} />
    </div>
  );
}
