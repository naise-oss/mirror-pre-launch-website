import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Mirror - The AI That Uses Your Phone',
  description: 'Mirror is the world\'s first AI that can actually operate your apps like a real user — tapping buttons, scrolling, typing, searching, and completing multi-step tasks hands-free.',
  icons: {
    icon: '/mirror-icon.svg',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${_geist.className} antialiased bg-white text-black`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
