"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default function EditLogin() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/edit/dashboard");
      } else {
        setError(data.error || "Invalid PIN");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-muted/30 border border-border/50 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 bg-primary/20 text-primary flex items-center justify-center rounded-full mb-4">
            <Icons.globe className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-2">Enter your 6-digit PIN to continue</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••••"
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </div>
          
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <Button type="submit" disabled={pin.length < 4 || loading} className="w-full py-6 text-md font-medium mt-2">
            {loading ? "Verifying..." : "Access Dashboard"}
          </Button>
        </form>
      </div>
    </div>
  );
}
