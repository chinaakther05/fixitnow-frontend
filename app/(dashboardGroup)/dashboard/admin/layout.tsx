"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FolderKanban, 
  Wrench, 
  ShieldCheck,
  Home,
  User,
  Settings
} from "lucide-react";

const navItems = [
  { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/admin/users", icon: Users },
  { name: "Bookings", href: "/dashboard/admin/bookings", icon: Calendar },
  { name: "Categories", href: "/dashboard/admin/categories", icon: FolderKanban },
  { name: "Services", href: "/dashboard/admin/services", icon: Wrench },
  { name: "My Profile", href: "/dashboard/admin/profile", icon: User },
  { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* 🎯 Technician & Customer Dashboard matching Rounded Glass Sidebar */}
          <aside className="w-full md:w-64 shrink-0 border bg-white dark:bg-slate-900/90 border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 h-fit shadow-sm backdrop-blur-sm">
            
            {/* 🔴 Click Logo & Name -> Go to Home Page ("/") */}
            <div className="mb-6 px-2">
              <Link href="/" className="flex items-center gap-2.5 group transition-all">
                <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    FixItNow
                  </h2>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Admin Panel
                  </p>
                </div>
              </Link>
            </div>

            {/* Navigation Items */}
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20 font-semibold"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Back to Home Link */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/"
                className="w-full flex items-center justify-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60 text-xs font-semibold py-2.5 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                Back to Home
              </Link>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 overflow-x-hidden">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
}