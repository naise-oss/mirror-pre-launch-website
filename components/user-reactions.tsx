const testimonials = [
  {
    quote: "It feels magical. My phone understands me.",
    context: "Early User"
  },
  {
    quote: "This is the future I've been waiting for.",
    context: "Beta Tester"
  },
  {
    quote: "My grandma can finally use her phone confidently.",
    context: "Family Member"
  }
]

export function UserReactionsSection() {
  return (
    <section className="w-full py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-black">
          People get it immediately.
        </h2>
        <p className="text-center text-xl text-gray-700 mb-16 font-medium">
          The first question is always the same: When can I use it?
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((item, idx) => (
            <div key={idx} className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <p className="text-lg text-gray-700 italic mb-4">
                "{item.quote}"
              </p>
              <p className="text-sm text-gray-500">
                {item.context}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-700">
            We tested Mirror with real people across different ages and backgrounds. Everyone immediately understood its potential.
          </p>
        </div>
      </div>
    </section>
  )
}
