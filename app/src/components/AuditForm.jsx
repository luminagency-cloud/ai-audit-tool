import { useState } from 'react'

const CATEGORIES = [
  'Roofer',
  'Plumber',
  'HVAC',
  'Dentist',
  'Auto Repair',
  'Electrician',
  'Lawyer',
  'Accountant',
  'Restaurant',
  'Salon',
  'Real Estate Agent',
  'Home Builder',
  'Landscaper',
  'Pest Control',
  'Chiropractor',
]

export default function AuditForm({ onSubmit }) {
  const [businessName, setBusinessName] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [customCategory, setCustomCategory] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const cat = category === 'Other' ? customCategory : category
    if (!businessName.trim() || !location.trim() || !cat.trim()) {
      setError('Fill in all fields to continue')
      return
    }
    setError('')
    onSubmit({ businessName: businessName.trim(), location: location.trim(), category: cat.trim() })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></span>
          Free Beta — No signup required
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Does AI recommend your business?
        </h1>
        <p className="text-lg text-gray-600 max-w-lg mx-auto">
          Enter your business details and we'll check what AI platforms say when someone searches for your service in your area.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Name</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="e.g. Johnson Roofing"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition text-gray-900 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Newport, RI"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition text-gray-900 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Business Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition text-gray-900 bg-white"
          >
            <option value="">Select a category...</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
            <option value="Other">Other</option>
          </select>
          {category === 'Other' && (
            <input
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              placeholder="Enter your category..."
              className="w-full mt-3 px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition text-gray-900 placeholder-gray-400"
            />
          )}
        </div>

        {error && (
          <p className="text-red-600 text-sm font-medium">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3.5 rounded-lg transition shadow-sm text-lg"
        >
          Run Free Audit →
        </button>

        <p className="text-xs text-gray-400 text-center">
          Takes about 30 seconds · Results shown instantly
        </p>
      </form>

      {/* Social proof */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500 mb-4">The problem:</p>
        <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
          <div>
            <div className="text-2xl font-bold text-gray-900">1.2%</div>
            <div className="text-xs text-gray-500">of local businesses appear in AI recommendations</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">7×</div>
            <div className="text-xs text-gray-500">increase in AI-driven local search in one year</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">45%</div>
            <div className="text-xs text-gray-500">of consumers now use AI to find local services</div>
          </div>
        </div>
      </div>
    </div>
  )
}
