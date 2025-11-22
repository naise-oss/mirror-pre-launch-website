const features = [
  "Proactive suggestions based on your routine",
  "Understanding context across multiple apps",
  "Advanced memory and learning",
  "Deeper integration with your digital life",
  "Seamless cross-device experiences"
]

export function ComingSoonSection() {
  return (
    <section className="w-full py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-black">
          The journey is just beginning.
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-2 h-2 rounded-full bg-black flex-shrink-0" />
              <p className="text-lg text-gray-700">
                {feature}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
