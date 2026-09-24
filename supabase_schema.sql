-- Schema for Deepankar.tech Productized Freelance Platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Leads Table (Capturing AI chat interests and contact forms)
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT,
    email TEXT,
    phone TEXT,
    source TEXT DEFAULT 'website', -- e.g., 'ai_chat', 'contact_form', 'quote_request'
    service_interest TEXT, -- e.g., 'business-website', 'landing-page'
    message TEXT,
    status TEXT DEFAULT 'new' -- 'new', 'contacted', 'qualified', 'converted', 'closed'
);

-- 2. Customers Table (People who actually bought something or booked)
CREATE TABLE public.customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    company_name TEXT,
    billing_address TEXT
);

-- 3. Orders Table (Purchased packages)
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    service_slug TEXT NOT NULL,
    package_name TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'in_progress', 'delivered', 'cancelled'
    payment_id TEXT, -- Stripe/Razorpay payment intent or session ID
    notes TEXT
);

-- 4. Bookings Table (Consultation calls)
CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    meeting_link TEXT,
    status TEXT DEFAULT 'scheduled', -- 'scheduled', 'completed', 'cancelled', 'no_show'
    topic TEXT
);

-- Row Level Security (RLS) Policies

-- Leads: Insert allowed for anyone (anon), Select/Update/Delete only for authenticated admin
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert to leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin full access to leads" ON public.leads FOR ALL USING (auth.role() = 'authenticated');

-- Customers: Admin only
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow admin full access to customers" ON public.customers FOR ALL USING (auth.role() = 'authenticated');

-- Orders: Admin only (for now, webhook will handle inserts via service role)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow admin full access to orders" ON public.orders FOR ALL USING (auth.role() = 'authenticated');

-- Bookings: Insert allowed for anon, Select/Update/Delete admin only
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert to bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin full access to bookings" ON public.bookings FOR ALL USING (auth.role() = 'authenticated');
