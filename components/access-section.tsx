"use client"

export function AccessSection() {
  return (
    <section className="w-full py-32 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-light tracking-tight">
          Request <span className="italic">early access</span>.
        </h2>

        <p className="text-lg text-gray-600 font-light">
          Be among the first to experience an AI that actually understands you.
        </p>

        <div className="pt-8">
          <a
            href="#hero"
            className="inline-block px-8 py-3 rounded-full bg-black text-white font-medium hover:opacity-90 transition-opacity"
          >
            Join the Waitlist
          </a>
        </div>
      </div>
    </section>
  )
}
