'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const faqs = [
    {
      question: 'How do I get started with Mirror?',
      answer: 'Join our waitlist to get early access. We\'ll provide you with API documentation, SDKs for popular languages, and a sandbox environment to experiment with.'
    },
    {
      question: 'What pricing models do you offer?',
      answer: 'We offer flexible pricing based on usage. Start with our Starter plan for $29/month, scale to Professional at $99/month, or contact us for Enterprise solutions.'
    },
    {
      question: 'Is Mirror compliant with industry standards?',
      answer: 'Yes, Mirror is SOC2 Type II, GDPR, HIPAA, and CCPA compliant. We maintain enterprise-grade security with regular audits and penetration testing.'
    },
    {
      question: 'Can I use Mirror in production?',
      answer: 'Absolutely. Mirror is designed for production workloads with 99.99% uptime SLA, real-time monitoring, and dedicated support.'
    },
    {
      question: 'What languages does Mirror support?',
      answer: 'Mirror supports 50+ languages across all major language families, with continuous expansion based on user demand.'
    }
  ]

  return (
    <section id="faq" className="w-full py-24 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-500">
            Everything you need to know about Mirror
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <span className="font-semibold text-black">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIdx === idx ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIdx === idx && (
                <div className="px-6 py-4 border-t border-gray-200 bg-white text-gray-500 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
