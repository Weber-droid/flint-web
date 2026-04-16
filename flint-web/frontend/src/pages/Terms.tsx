import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
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
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <p className="text-secondary leading-relaxed mb-8">
            By using Flint Web, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">1. Acceptance of Terms</h2>
            <p className="text-secondary leading-relaxed mb-4">
              Your access to and use of Flint Web is conditioned on your acceptance of and compliance with these Terms. 
              These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">2. User Conduct</h2>
            <p className="text-secondary leading-relaxed mb-4">
              You agree not to use the Service for any unlawful purpose or in any way that interrupts, damages, 
              or impairs the Service. You are responsible for all activity that occurs under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">3. Intellectual Property</h2>
            <p className="text-secondary leading-relaxed mb-4">
              The Service and its original content, features, and functionality are and will remain the exclusive 
              property of Flint Web and its licensors.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-primary">4. Termination</h2>
            <p className="text-secondary leading-relaxed mb-4">
              We may terminate or suspend access to our Service immediately, without prior notice or liability, 
              for any reason whatsoever, including without limitation if you breach the Terms.
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
