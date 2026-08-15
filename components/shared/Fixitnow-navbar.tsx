"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, LogOut, User, Settings as SettingsIcon, Wrench, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logoutAction } from "@/app/(auth)/-actions/auth.action";
import ThemeToggle from "@/components/shared/ThemeToggle";

interface FixItNowNavbarProps {
  user: { id: string; name: string; email: string; role: string } | null;
}

export function FixItNowNavbar({ user }: FixItNowNavbarProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  
  const rolePath = user?.role ? user.role.toLowerCase() : "";
  const dashboardPath = user ? `/dashboard/${rolePath}` : "/";
  const profilePath = user ? `/dashboard/${rolePath}/profile` : "/";
  const settingsPath = user ? `/dashboard/${rolePath}/settings` : "/";

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      {/* Container with ample side padding */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950/80 rounded-xl group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900 transition-colors">
              <Wrench className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight hidden sm:inline">
              FixItNow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground font-medium text-sm hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth + Theme Section */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                    {getInitials(user.name)}
                  </button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent align="end" className="w-56 mt-1 p-2">
                  <div className="px-2 py-1.5">
                    <p className="font-semibold text-foreground text-sm truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  
                  {/* Dashboard Link */}
                  <DropdownMenuItem
                    className="cursor-pointer font-medium"
                    onSelect={() => router.push(dashboardPath)}
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2.5 text-muted-foreground" />
                    Dashboard
                  </DropdownMenuItem>

                  {/* Profile Link */}
                  <DropdownMenuItem
                    className="cursor-pointer font-medium"
                    onSelect={() => router.push(profilePath)}
                  >
                    <User className="w-4 h-4 mr-2.5 text-muted-foreground" />
                    My Profile
                  </DropdownMenuItem>

                  {/* Settings Link */}
                  <DropdownMenuItem
                    className="cursor-pointer font-medium"
                    onSelect={() => router.push(settingsPath)}
                  >
                    <SettingsIcon className="w-4 h-4 mr-2.5 text-muted-foreground" />
                    Settings
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  {/* Logout Action */}
                  <DropdownMenuItem
                    onSelect={() => logoutAction()}
                    className="cursor-pointer font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50"
                  >
                    <LogOut className="w-4 h-4 mr-2.5" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Button variant="ghost" onClick={() => router.push("/login")}>
                  Login
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm" onClick={() => router.push("/register")}>
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors">
                  <Menu className="w-6 h-6 text-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex flex-col gap-3">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-foreground font-medium hover:text-emerald-600 px-2 py-1.5 rounded-md hover:bg-accent transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4">
                    {user ? (
                      <div className="flex flex-col gap-2">
                        <div className="px-2 pb-2">
                          <p className="font-semibold text-foreground text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                        <button
                          onClick={() => { router.push(dashboardPath); setOpen(false); }}
                          className="text-foreground font-medium hover:text-emerald-600 text-left px-2 py-2 rounded-md hover:bg-accent transition-colors"
                        >
                          Dashboard
                        </button>
                        <button
                          onClick={() => { router.push(profilePath); setOpen(false); }}
                          className="text-foreground font-medium hover:text-emerald-600 text-left px-2 py-2 rounded-md hover:bg-accent transition-colors"
                        >
                          My Profile
                        </button>
                        <button
                          onClick={() => { router.push(settingsPath); setOpen(false); }}
                          className="text-foreground font-medium hover:text-emerald-600 text-left px-2 py-2 rounded-md hover:bg-accent transition-colors"
                        >
                          Settings
                        </button>
                        <button
                          onClick={() => { logoutAction(); setOpen(false); }}
                          className="text-red-600 font-medium hover:bg-red-50 dark:hover:bg-red-950/50 text-left px-2 py-2 rounded-md transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <Button variant="outline" className="w-full" onClick={() => { router.push("/login"); setOpen(false); }}>
                          Login
                        </Button>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => { router.push("/register"); setOpen(false); }}>
                          Sign Up
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default FixItNowNavbar;