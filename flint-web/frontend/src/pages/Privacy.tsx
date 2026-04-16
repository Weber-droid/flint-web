import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background text-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center text-secondary hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to App
        </Link>
        
        <article className="prose prose-invert prose-slate max-w-none">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">1. Information We Collect</h2>
            <p className="text-secondary leading-relaxed mb-4">
              We collect information you provide directly to us when you use our services. This includes your account information, 
              request history, and any configuration settings you save.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">2. How We Use Your Information</h2>
            <p className="text-secondary leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-secondary space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your experience</li>
              <li>Monitor and analyze usage trends and activities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">3. Data Security</h2>
            <p className="text-secondary leading-relaxed mb-4">
              We implement industry-standard security measures to protect your data. All requests are handled with care, 
              and sensitive information is encrypted.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">4. Contact Us</h2>
            <p className="text-secondary leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us.
            </p>
          </section>

          <footer className="mt-12 pt-8 border-t border-border text-sm text-secondary">
            Last updated: April 14, 2026
          </footer>
        </article>
      </div>
    </div>
  )
}
