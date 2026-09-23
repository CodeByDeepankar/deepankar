import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { pin } = await req.json();
    const correctPin = process.env.ADMIN_PIN;

    if (!correctPin) {
      return NextResponse.json({ error: "ADMIN_PIN not configured" }, { status: 500 });
    }

    if (pin === correctPin) {
      const cookieStore = await cookies();
      cookieStore.set("admin_token", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
