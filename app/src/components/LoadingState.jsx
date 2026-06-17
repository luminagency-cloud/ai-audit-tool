import { useState, useEffect } from 'react'

const MESSAGES = [
  'Querying ChatGPT for local recommendations...',
  'Checking Google AI Overview results...',
  'Scanning Perplexity for your category...',
  'Analyzing competitor mentions...',
  'Generating your visibility report...',
]

export default function LoadingState({ businessName }) {
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="w-16 h-16 mx-auto mb-8 relative">
        <div className="absolute inset-0 rounded-full border-4 border-brand-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-brand-600 border-t-transparent animate-spin"></div>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Auditing <span className="text-brand-600">{businessName}</span>
      </h2>
      <p className="text-gray-500 animate-pulse">{MESSAGES[msgIndex]}</p>
      <p className="text-sm text-gray-400 mt-6">This usually takes 20–30 seconds</p>
    </div>
  )
}
