export function PartnersSection() {
  return (
    <section className="w-full py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Partner Ecosystem
          </h2>
          <p className="text-lg text-gray-500">
            Integrations with the tools you already use
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {['Vercel', 'AWS', 'Azure', 'Google Cloud', 'Stripe', 'Salesforce', 'Datadog', 'PagerDuty'].map((partner) => (
            <div
              key={partner}
              className="flex items-center justify-center p-8 rounded-2xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg font-semibold text-gray-500">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
