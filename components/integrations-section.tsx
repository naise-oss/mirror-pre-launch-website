"use client"

export function IntegrationsSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-2 gap-20 items-center">
          {/* Left content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-light leading-tight mb-6">
              Mirror works with <span className="italic">everything</span> you use.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Mirror seamlessly integrates with all your favorite apps — messaging, productivity, entertainment, and
              more. It understands your workflow and operates every platform like a natural extension of your digital
              life.
            </p>
          </div>

          {/* Right - integrations grid */}
          <div className="flex justify-center">
            <div className="bg-black rounded-3xl p-8 overflow-hidden">
              <img
                src="/Untitled design-2.jpg"
                alt="Mirror integrations with apps"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
