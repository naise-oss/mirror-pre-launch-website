"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Brand */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-3">
            <Image src="/mirror-logo.png" alt="Mirror" width={32} height={32} className="h-8 w-auto" />
            <span className="text-base font-semibold text-black hidden sm:inline">Mirror</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 items-center">
            <button className="px-6 py-2 rounded-full bg-black text-white text-sm font-medium hover:opacity-90 transition-opacity">
              Request Access
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 pt-4">
            <button className="w-full px-6 py-2 rounded-full bg-black text-white text-sm font-medium hover:opacity-90 transition-opacity">
              Request Access
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
