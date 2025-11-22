const features = [
  {
    title: "Understands Intent",
    description: "Say what you want. Mirror figures out how to make it happen.",
  },
  {
    title: "Works Everywhere",
    description: "Compatible with every app you already use. No setup needed.",
  },
  {
    title: "Always Listening",
    description: "Hands-free operation. Works while you're driving, cooking, or working.",
  },
  {
    title: "Learns You",
    description: "Gets smarter over time. Understands your preferences and patterns.",
  },
]

export function CoreFeaturesSection() {
  return (
    <section className="w-full py-32 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {features.map((feature, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-2xl font-semibold text-black">{feature.title}</h3>
              <p className="text-lg text-gray-600 font-light leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
