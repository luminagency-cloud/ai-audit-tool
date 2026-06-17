export default function CompetitorTable({ competitors, businessName }) {
  const sorted = [...competitors].sort((a, b) => {
    if (a.mentioned && !b.mentioned) return -1
    if (!a.mentioned && b.mentioned) return 1
    return (a.rank || 999) - (b.rank || 999)
  })

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="text-left px-4 py-3 font-medium text-gray-500">Business</th>
            <th className="text-center px-4 py-3 font-medium text-gray-500">Rank</th>
            <th className="text-center px-4 py-3 font-medium text-gray-500">Reviews</th>
            <th className="text-center px-4 py-3 font-medium text-gray-500">Rating</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((c, i) => {
            const isUser = c.name === businessName
            return (
              <tr
                key={i}
                className={`border-b border-gray-50 ${isUser ? 'bg-brand-50' : ''} ${!c.mentioned ? 'opacity-60' : ''}`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {c.mentioned ? (
                      <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" title="Mentioned by AI" />
                    ) : (
                      <span className="w-2 h-2 bg-gray-300 rounded-full flex-shrink-0" title="Not mentioned" />
                    )}
                    <span className={isUser ? 'font-semibold text-brand-700' : 'text-gray-700'}>
                      {c.name}
                    </span>
                    {isUser && (
                      <span className="text-xs bg-brand-100 text-brand-700 px-1.5 py-0.5 rounded font-medium">
                        You
                      </span>
                    )}
                  </div>
                </td>
                <td className="text-center px-4 py-3 text-gray-600">
                  {c.rank ? `#${c.rank}` : '—'}
                </td>
                <td className="text-center px-4 py-3 text-gray-600">
                  {c.reviews}
                </td>
                <td className="text-center px-4 py-3 text-gray-600">
                  ★ {c.rating}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
