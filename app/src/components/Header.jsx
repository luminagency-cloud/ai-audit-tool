export default function Header({ onReset, showReset }) {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <button onClick={onReset} className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <span className="font-semibold text-lg text-gray-900">AI Visibility Audit</span>
        </button>
        {showReset && (
          <button
            onClick={onReset}
            className="text-sm text-brand-600 hover:text-brand-800 font-medium"
          >
            New Audit
          </button>
        )}
      </div>
    </header>
  )
}
