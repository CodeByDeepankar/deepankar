import { NextResponse } from 'next/server';
import { supabaseAdmin as supabase } from '@/lib/supabase-admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company_name, billing_address, service_slug, package_name, amount, currency } = body;

    // Basic validation
    if (!name || !email || !service_slug || !amount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Create or get customer
    let customerId;
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('email', email)
      .single();

    if (existingCustomer) {
      customerId = existingCustomer.id;
    } else {
      const { data: newCustomer, error: customerError } = await supabase
        .from('customers')
        .insert([{ name, email, phone, company_name, billing_address }])
        .select()
        .single();
      
      if (customerError || !newCustomer) {
        console.error('Customer insert error:', customerError);
        return NextResponse.json({ success: false, error: 'Failed to create customer record' }, { status: 500 });
      }
      customerId = newCustomer.id;
    }

    // 2. Create Order
    // NOTE: In Phase 7 we are skipping Stripe, so we just mock a successful payment and set status to 'paid' or 'pending'
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          customer_id: customerId,
          service_slug,
          package_name: package_name || service_slug,
          amount,
          currency: currency || 'INR',
          status: 'pending', // Usually updated via Stripe webhook
          payment_id: `mock_txn_${Date.now()}` // Mocked
        }
      ])
      .select()
      .single();

    if (orderError) {
      console.error('Order insert error:', orderError);
      return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
    }

    return NextResponse.json({ success: true, orderId: order?.id });
  } catch (error) {
    console.error('API /orders error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
