'use client'

import { useState } from 'react'

export function JoinUsSection() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source: 'join-us' }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }

      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-black">
          Join us. Experience the future.
        </h2>

        <p className="text-xl text-gray-700">
          Be among the first to experience an AI assistant that actually understands you. Early access starts soon.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center pt-8">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-6 py-3 rounded-full border border-gray-300 text-black placeholder-gray-500 focus:outline-none focus:border-black transition-colors"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-full bg-black text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Joining...' : 'Join Waitlist'}
          </button>
        </form>

        {submitted && (
          <p className="text-green-600 font-medium">Welcome! Check your email for updates.</p>
        )}
        {error && (
          <p className="text-red-600 font-medium">{error}</p>
        )}

        <p className="text-sm text-gray-600 pt-8">
          Something extraordinary is coming. Don't miss it.
        </p>
      </div>
    </section>
  )
}
