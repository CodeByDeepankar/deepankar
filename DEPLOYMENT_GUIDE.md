# Production Deployment Guide

Your portfolio has now been transformed into a fully-functional, productized freelance development platform with an AI Sales Assistant, CRM, and Booking system!

Follow these final steps to push your new platform live to the world.

## 1. Push Code to GitHub

First, make sure all your new features are committed and pushed to your GitHub repository:

```bash
git add .
git commit -m "feat: complete productized agency platform (AI, Booking, Checkout, CRM)"
git push origin main
```

## 2. Set Up Vercel Environment Variables

Log into your [Vercel Dashboard](https://vercel.com) and navigate to your project settings (Settings > Environment Variables). 

You must add the following variables so the production build can connect to Supabase:

| Variable Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL (e.g., `https://xxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase `anon` public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase `service_role` secret key |

> **Security Warning:** The `SUPABASE_SERVICE_ROLE_KEY` gives full administrative access to your database. Never prefix it with `NEXT_PUBLIC_`, as that would expose it to the browser. It is securely used only on the server (like in `/api/orders` and `/admin`).

## 3. Database Verification

Before going live, ensure your Supabase database is ready:

1. Go to your [Supabase Dashboard](https://supabase.com).
2. Open the **SQL Editor**.
3. If you haven't already, run the entire contents of the `supabase_schema.sql` file we generated in Phase 3.
4. Verify that the following tables exist in your `public` schema: `leads`, `customers`, `orders`, and `bookings`.

## 4. Deploy!

If Vercel is connected to your GitHub repository, pushing to `main` (Step 1) likely already triggered a deployment.

Go to the Vercel **Deployments** tab and wait for the build to finish. Once completed, your new productized freelance platform is live!

---

### What to do next (Post-Launch)
- Test your live `/book` page to ensure the calendar booking form works.
- Test the AI chat assistant `[[START_QUOTE]]` functionality on the live site.
- Bookmark your `/admin` route to keep an eye on incoming leads and orders!
