
import { NextResponse } from "next/server";
import { supabaseAdmin as supabase } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company_name, billing_address, service_slug, package_name, amount, currency } = body;

    // Basic validation
    if (!name || !email || !service_slug || !amount) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Create or get customer
    let customerId;
    const { data: existingCustomer, error: existingError } = await supabase
      .from("customers")
      .select("id")
      .eq("email", email)
      .maybeSingle(); // Use maybeSingle to prevent PGRST116 error when not found

    if (existingCustomer) {
      customerId = existingCustomer.id;
    } else {
      const { data: newCustomer, error: customerError } = await supabase
        .from("customers")
        .insert([{ name, email, phone, company_name, billing_address }])
        .select()
        .single();
      
      if (customerError || !newCustomer) {
        console.error("Customer insert error:", customerError);
        return NextResponse.json({ success: false, error: customerError?.message || "Failed to create customer record", details: customerError }, { status: 400 });
      }
      customerId = newCustomer.id;
    }

    // 2. Create Order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          customer_id: customerId,
          service_slug,
          package_name: package_name || service_slug,
          amount,
          currency: currency || "INR",
          status: "pending", 
          payment_id: `mock_txn_${Date.now()}` 
        }
      ])
      .select()
      .single();

    if (orderError) {
      console.error("Order insert error:", orderError);
      return NextResponse.json({ success: false, error: orderError.message || "Failed to create order", details: orderError }, { status: 400 });
    }

    return NextResponse.json({ success: true, orderId: order?.id });
  } catch (error: any) {
    console.error("API /orders error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

