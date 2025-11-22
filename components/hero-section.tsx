"use client"

import type React from "react"

import { useState } from "react"

export function HeroSection() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source: 'hero' }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }

      setSubmitted(true)
      setEmail("")
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full min-h-screen flex items-center justify-center px-4 pt-32 pb-24">
      <div className="max-w-2xl mx-auto text-center space-y-12">
        {/* Badge */}
        <div className="inline-block">
          <span className="text-xs font-medium tracking-widest uppercase text-gray-600">Coming Soon</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-6xl md:text-7xl font-light tracking-tight text-balance">
          Your phone, <span className="italic">intelligent</span>.
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
          Mirror is the AI that operates your apps like you would. With a single sentence, everything just happens.
        </p>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-8 max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 px-6 py-3 rounded-full bg-gray-50 border border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-full bg-black text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? "Joining..." : "Request Access"}
            </button>
          </div>

          {submitted && (
            <p className="text-sm text-green-600 font-medium">
              Thank you! We'll be in touch with you soon.
            </p>
          )}
          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
        </form>
      </div>
    </section>
  )
}
