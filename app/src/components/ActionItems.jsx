const PRIORITY_STYLES = {
  high: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700', icon: '🔴' },
  medium: { bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-700', icon: '🟡' },
  low: { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700', icon: '🔵' },
}

export default function ActionItems({ items }) {
  const sorted = [...items].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 }
    return order[a.priority] - order[b.priority]
  })

  return (
    <div className="space-y-3">
      {sorted.map((item, i) => {
        const style = PRIORITY_STYLES[item.priority]
        return (
          <div
            key={i}
            className={`${style.bg} border ${style.border} rounded-xl p-4`}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg flex-shrink-0 mt-0.5">{style.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${style.badge}`}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.detail}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
