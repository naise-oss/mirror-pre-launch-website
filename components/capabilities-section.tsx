export function CapabilitiesSection() {
  const capabilities = [
    {
      metric: '10B+ Parameters',
      description: 'State-of-the-art model architecture'
    },
    {
      metric: '99.99% Uptime',
      description: 'Enterprise-grade reliability'
    },
    {
      metric: '50+ Languages',
      description: 'Global language support'
    },
    {
      metric: '< 100ms Latency',
      description: 'Real-time responsiveness'
    },
  ]

  return (
    <section className="w-full py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-black mb-2">
                {cap.metric}
              </div>
              <p className="text-gray-500">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
