"use client";

import { cn } from "@/lib/utils";
import { BarChart3, BookText, FileText, LogOut, LucideBluetoothSearching } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardSidebar() {
  const pathname = usePathname();

  const routes = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
    },
    {
      name: "Booking",
      href: "/dashboard/booking",
      icon: BookText,
    },
    {
      name: "Content",
      href: "/dashboard/content",
      icon: FileText,
    },
    {
      name: "Blog",
      href: "/dashboard/blog",
      icon: ,
    },
    {
      name: "Faq",
      href: "/dashboard/faq",
      icon: FileText,
    },
    {
      name: "Promo",
      href: "/dashboard/promo",
      icon: FileText,
    },
  ];

  return (
    <div className="w-64 border-r border-zinc-800/10 bg-white text-white">
      <div className="flex flex-col h-full">
        <div className="p-6 flex justify-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center">
              <div className="text-xs font-bold">
                <div className="uppercase text-center">Room</div>
                <div className="uppercase text-center">Chambers</div>
                <div className="text-[10px] text-center">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-2 py-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-orange-500",
                pathname === route.href
                  ? "bg-orange-500/10 text-orange-500"
                  : "text-zinc-400"
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-zinc-800/10">
          <Link
            href="/logout"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-all hover:text-orange-500"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </Link>
        </div>
      </div>
    </div>
  );
}
