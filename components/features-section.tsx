import { Zap, Brain, Shield, Speech as Speed } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: 'Advanced Reasoning',
      description: 'Multi-step logical thinking with contextual awareness for complex problem solving'
    },
    {
      icon: Speed,
      title: 'Real-Time Processing',
      description: 'Sub-millisecond response times with streaming capabilities'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'End-to-end encryption, compliance with SOC2, GDPR, and HIPAA standards'
    },
    {
      icon: Zap,
      title: 'Seamless Integration',
      description: 'Works with your existing stack via REST APIs, webhooks, and SDKs'
    },
  ]

  return (
    <section id="features" className="w-full py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Engineered for Performance
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Built with the latest advancements in AI, Mirror delivers uncompromising performance and reliability
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors group"
              >
                <div className="mb-6">
                  <Icon className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
