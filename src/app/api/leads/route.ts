
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, source, service_interest } = body;

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("leads")
      .insert([
        {
          name,
          email,
          phone: phone || null,
          message: message || null,
          source: source || "website",
          service_interest: service_interest || null,
          status: "new"
        }
      ]);

    if (error) {
      console.error("Supabase insert error:", error);
      
      // If the error is a unique constraint violation (code 23505), it means 
      // this person already submitted a lead. Instead of crashing and showing
      // a scary error to the user, we can tell the UI it was successful.
      if (error.code === "23505") {
        return NextResponse.json({ success: true, note: "Already exists" });
      }

      // For other Supabase errors, return 400 so we can debug, not 500
      return NextResponse.json(
        { success: false, error: error.message || "Failed to create lead", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API /leads error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

