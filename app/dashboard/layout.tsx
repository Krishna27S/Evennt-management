"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MapPin, Calendar, MessageSquare, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Places to Visit", href: "/dashboard/places", icon: MapPin },
    { name: "Bookings", href: "/dashboard/bookings", icon: Calendar },
    { name: "Contact", href: "/dashboard/contact", icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-4 bg-white shadow-sm">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <h1 className="text-xl font-semibold">Event Manager</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
        ${isMobile ? "top-16" : ""}
      `}
      >
        <div className="flex flex-col h-full">
          {!isMobile && (
            <div className="px-6 py-6">
              <h1 className="text-2xl font-bold">Event Manager</h1>
            </div>
          )}

          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium rounded-md
                  ${pathname === item.href ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}
                `}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <Button variant="outline" className="w-full flex items-center justify-center" asChild>
              <Link href="/">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`
        ${isMobile ? "pt-16" : "ml-64"} 
        min-h-screen transition-all duration-300
      `}
      >
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
