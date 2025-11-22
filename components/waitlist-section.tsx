'use client'

import { useState } from 'react'

export function WaitlistSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source: 'waitlist' }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        return
      }

      setSubmitted(true)
      setEmail('')
      setTimeout(() => {
        setSubmitted(false)
      }, 3000)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full py-24 px-4 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Ready to Transform Your AI Applications?
        </h2>
        <p className="text-lg text-gray-500 mb-12">
          Join the waitlist for early access to Mirror
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-6 py-3 rounded-full border border-gray-200 bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-full bg-black text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 whitespace-nowrap"
          >
            {loading ? 'Joining...' : submitted ? 'Joined!' : 'Join Waitlist'}
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-purple-600 font-medium">Thanks for joining! Check your email for next steps.</p>
        )}
        {error && (
          <p className="mt-4 text-red-600 font-medium">{error}</p>
        )}
      </div>
    </section>
  )
}
