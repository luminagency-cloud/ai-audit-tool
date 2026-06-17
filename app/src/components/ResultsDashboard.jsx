import VisibilityScore from './VisibilityScore'
import CompetitorTable from './CompetitorTable'
import ActionItems from './ActionItems'

export default function ResultsDashboard({ data, input, onNewAudit }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          AI Visibility Report
        </h1>
        <p className="text-gray-500">
          {data.businessName} · {data.location} · {data.category}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Generated {new Date(data.generatedAt).toLocaleString()}
        </p>
      </div>

      {/* Score + Summary */}
      <VisibilityScore data={data} />

      {/* Two-column layout */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Competitors */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Who AI Recommends</h2>
          <CompetitorTable competitors={data.competitors} businessName={data.businessName} />
        </div>

        {/* Action Items */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">What To Fix</h2>
          <ActionItems items={data.actionItems} />
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 bg-brand-50 border border-brand-200 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Want to track this over time?
        </h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Get weekly alerts when your AI visibility changes, new competitors appear, or your ranking shifts.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onNewAudit}
            className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
          >
            Run Another Audit
          </button>
          <button
            className="px-6 py-3 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition shadow-sm"
            onClick={() => alert('Weekly tracking coming soon — leave your email at answerspot.co')}
          >
            Get Weekly Alerts →
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-4">Free while in beta · Paid plans coming soon</p>
      </div>
    </div>
  )
}
