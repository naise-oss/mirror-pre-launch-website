export function VisionSection() {
  return (
    <section className="w-full py-32 px-4 bg-white">
      <div className="max-w-3xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <p className="text-xs font-medium tracking-widest uppercase text-gray-600">The Future of AI</p>
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-balance">
            Technology that <span className="italic">disappears</span>.
          </h2>
        </div>

        <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
          Mirror is the beginning. An AI that feels less like a tool and more like an extension of yourself. Smart
          enough to understand you. Powerful enough to do anything. Simple enough that anyone can use it.
        </p>

        <div className="pt-12 space-y-8 border-t border-gray-200">
          <div className="text-left space-y-2">
            <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">Today</p>
            <p className="text-2xl font-semibold text-black">Mirror understands your phone.</p>
          </div>
          <div className="text-left space-y-2">
            <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">Tomorrow</p>
            <p className="text-2xl font-semibold text-black">
              Mirror becomes the intelligence layer across your entire digital world.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
