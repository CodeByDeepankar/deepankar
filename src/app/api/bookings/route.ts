import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, scheduled_at, topic, lead_id } = body;

    // Basic validation
    if (!name || !email || !scheduled_at) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and scheduled_at are required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('bookings')
      .insert([
        {
          name,
          email,
          scheduled_at,
          topic: topic || 'General Consultation',
          lead_id: lead_id || null,
          status: 'scheduled'
        }
      ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create booking' },
        { status: 500 }
      );
    }

    // In a future phase, you might trigger an email/calendar invite here
    // using Resend or Google Calendar API.

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API /bookings error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
