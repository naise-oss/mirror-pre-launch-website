export function TestimonialsSection() {
  const testimonials = [
    {
      quote: 'Mirror transformed how we build AI features. The API is incredibly intuitive and the performance is unmatched.',
      author: 'Sarah Chen',
      role: 'CTO at TechCorp',
      avatar: '🧠'
    },
    {
      quote: 'The security and compliance features give us confidence to deploy in regulated environments.',
      author: 'James Murphy',
      role: 'Head of Engineering at FinServe',
      avatar: '🔒'
    },
    {
      quote: 'Real-time streaming capabilities made our user experience feel incredibly responsive and natural.',
      author: 'Emma Rodriguez',
      role: 'Product Lead at CreativeAI',
      avatar: '⚡'
    }
  ]

  return (
    <section className="w-full py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Trusted by Innovators
          </h2>
          <p className="text-lg text-gray-500">
            Leading companies rely on Mirror for their most critical AI applications
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-white border border-gray-200">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-purple-600">★</span>
                ))}
              </div>
              <p className="text-black mb-6 leading-relaxed italic">&quot;{testimonial.quote}&quot;</p>
              <div className="flex items-center gap-4">
                <div className="text-3xl">{testimonial.avatar}</div>
                <div>
                  <p className="font-semibold text-black">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
