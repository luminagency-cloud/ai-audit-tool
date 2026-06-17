export default function ErrorState({ message, onRetry, onNew }) {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Audit failed</h2>
      <p className="text-gray-500 mb-8">{message}</p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={onNew}
          className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
        >
          New Audit
        </button>
        <button
          onClick={onRetry}
          className="px-5 py-2.5 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
