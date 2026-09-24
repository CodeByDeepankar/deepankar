import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, source, service_interest } = body;

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('leads')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          message: message || null,
          source: source || 'website',
          service_interest: service_interest || null,
          status: 'new'
        }
      ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create lead' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API /leads error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
