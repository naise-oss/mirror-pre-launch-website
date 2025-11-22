import { Check } from 'lucide-react'

export function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      description: 'For individuals and small teams',
      features: [
        'Up to 10,000 requests/month',
        'Basic API access',
        'Community support',
        'Standard rate limits'
      ]
    },
    {
      name: 'Professional',
      price: '$99',
      description: 'For growing teams',
      features: [
        'Up to 100,000 requests/month',
        'Advanced API access',
        'Priority email support',
        'Custom rate limits',
        'Advanced analytics'
      ],
      featured: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Unlimited requests',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantees',
        'On-premise deployment'
      ]
    }
  ]

  return (
    <section id="pricing" className="w-full py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Choose the plan that works for your needs. Scale as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 border ${
                plan.featured
                  ? 'border-purple-600 bg-white scale-105 shadow-lg'
                  : 'border-gray-200 bg-white'
              } transition-all`}
            >
              {plan.featured && (
                <div className="mb-4 inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-semibold">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-500 mb-6 text-sm">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-gray-500">/month</span>}
              </div>
              <button className={`w-full py-2 rounded-lg font-medium mb-8 transition-colors ${
                plan.featured
                  ? 'bg-purple-600 text-white hover:opacity-90'
                  : 'border border-gray-200 text-black hover:bg-gray-50'
              }`}>
                Get Started
              </button>
              <div className="space-y-4">
                {plan.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-black">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
