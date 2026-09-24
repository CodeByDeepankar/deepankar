import { supabaseAdmin } from "@/lib/supabase-admin";
import Link from "next/link";
import { ArrowLeft, Users, Calendar, ShoppingCart, UserCheck } from "lucide-react";

export const revalidate = 0; // Disable caching for admin dashboard

export default async function AdminDashboard() {
  // Fetch data in parallel
  const [
    { data: leads },
    { data: customers },
    { data: orders },
    { data: bookings }
  ] = await Promise.all([
    supabaseAdmin.from("leads").select("*").order("created_at", { ascending: false }),
    supabaseAdmin.from("customers").select("*").order("created_at", { ascending: false }),
    supabaseAdmin.from("orders").select("*").order("created_at", { ascending: false }),
    supabaseAdmin.from("bookings").select("*").order("scheduled_at", { ascending: false }),
  ]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <header className="flex items-center justify-between mb-12">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-lime-500 transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to Website
            </Link>
            <h1 className="text-3xl font-bold text-white">Platform CRM</h1>
            <p className="text-neutral-500 text-sm mt-1">Manage your freelance business leads, clients, and orders.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex items-center gap-4">
              <Users className="w-8 h-8 text-lime-500 opacity-50" />
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider">Total Leads</p>
                <p className="text-2xl font-bold text-white">{leads?.length || 0}</p>
              </div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex items-center gap-4">
              <ShoppingCart className="w-8 h-8 text-lime-500 opacity-50" />
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider">Total Orders</p>
                <p className="text-2xl font-bold text-white">{orders?.length || 0}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEADS */}
          <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-neutral-800 pb-4">
              <Users className="w-5 h-5 text-lime-500" />
              <h2 className="text-xl font-bold text-white">Recent Leads</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-neutral-500 border-b border-neutral-800">
                    <th className="pb-3 font-normal">Name</th>
                    <th className="pb-3 font-normal">Email</th>
                    <th className="pb-3 font-normal">Source</th>
                    <th className="pb-3 font-normal">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {leads?.slice(0, 10).map((lead) => (
                    <tr key={lead.id} className="hover:bg-neutral-800/50 transition-colors">
                      <td className="py-3 text-white font-medium">{lead.name}</td>
                      <td className="py-3 text-neutral-400">{lead.email}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-300">
                          {lead.source}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-lime-500/10 text-lime-500 rounded text-xs uppercase tracking-wider">
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {(!leads || leads.length === 0) && (
                    <tr><td colSpan={4} className="py-8 text-center text-neutral-600">No leads found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* BOOKINGS */}
          <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-neutral-800 pb-4">
              <Calendar className="w-5 h-5 text-lime-500" />
              <h2 className="text-xl font-bold text-white">Upcoming Bookings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-neutral-500 border-b border-neutral-800">
                    <th className="pb-3 font-normal">Client</th>
                    <th className="pb-3 font-normal">Date & Time</th>
                    <th className="pb-3 font-normal">Topic</th>
                    <th className="pb-3 font-normal">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {bookings?.slice(0, 10).map((booking) => (
                    <tr key={booking.id} className="hover:bg-neutral-800/50 transition-colors">
                      <td className="py-3 text-white font-medium">{booking.name}</td>
                      <td className="py-3 text-neutral-400">
                        {new Date(booking.scheduled_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                      </td>
                      <td className="py-3 text-neutral-400 truncate max-w-[150px]" title={booking.topic}>{booking.topic}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs uppercase tracking-wider">
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {(!bookings || bookings.length === 0) && (
                    <tr><td colSpan={4} className="py-8 text-center text-neutral-600">No upcoming bookings.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* ORDERS */}
          <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6 border-b border-neutral-800 pb-4">
              <ShoppingCart className="w-5 h-5 text-lime-500" />
              <h2 className="text-xl font-bold text-white">Recent Orders & Customers</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-neutral-500 border-b border-neutral-800">
                    <th className="pb-3 font-normal">Order ID</th>
                    <th className="pb-3 font-normal">Customer</th>
                    <th className="pb-3 font-normal">Package</th>
                    <th className="pb-3 font-normal">Amount</th>
                    <th className="pb-3 font-normal">Date</th>
                    <th className="pb-3 font-normal">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {orders?.map((order) => {
                    const customer = customers?.find(c => c.id === order.customer_id);
                    return (
                      <tr key={order.id} className="hover:bg-neutral-800/50 transition-colors">
                        <td className="py-3 text-neutral-500 font-mono text-xs">{order.id.split('-')[0]}</td>
                        <td className="py-3 text-white font-medium">
                          {customer?.name || 'Unknown'}
                          <span className="block text-xs text-neutral-500 font-normal">{customer?.email}</span>
                        </td>
                        <td className="py-3 text-neutral-300">{order.package_name}</td>
                        <td className="py-3 text-lime-500 font-medium">{order.currency}{order.amount.toLocaleString()}</td>
                        <td className="py-3 text-neutral-400">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded text-xs uppercase tracking-wider">
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {(!orders || orders.length === 0) && (
                    <tr><td colSpan={6} className="py-8 text-center text-neutral-600">No orders found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
