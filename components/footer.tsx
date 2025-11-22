import Link from "next/link"
import { Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-black">Mirror</h3>
            <p className="text-sm text-gray-600">The AI that operates your phone.</p>
          </div>

          <div className="flex gap-8">
            <Link href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex gap-4">
            <Link href="#" className="text-gray-600 hover:text-black transition-colors" aria-label="Twitter">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="text-gray-600 hover:text-black transition-colors" aria-label="LinkedIn">
              <Linkedin size={20} />
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">© 2025 Mirror. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
