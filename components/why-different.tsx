const differences = [
  "Understands what you want, not just commands you give.",
  "Works with thousands of apps instantly — no waiting for updates.",
  "Learns your patterns and preferences over time.",
  "Operates like a human, not a limited AI assistant.",
  "Handles complex, multi-app tasks others can't touch."
]

export function WhyDifferentSection() {
  return (
    <section className="w-full py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-black">
          Built differently. Works beautifully.
        </h2>

        <div className="space-y-4">
          {differences.map((diff, idx) => (
            <div key={idx} className="flex gap-4 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
                ✓
              </div>
              <p className="text-lg text-gray-700 leading-relaxed pt-0.5">
                {diff}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
