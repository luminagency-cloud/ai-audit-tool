export default function VisibilityScore({ data }) {
  const score = data.visibilityScore
  const isLow = score < 30
  const color = isLow ? 'text-red-600' : score < 60 ? 'text-yellow-600' : 'text-green-600'
  const bgColor = isLow ? 'bg-red-50' : score < 60 ? 'bg-yellow-50' : 'bg-green-50'
  const label = isLow ? 'Not visible' : score < 60 ? 'Low visibility' : 'Good visibility'

  return (
    <div className={`${bgColor} rounded-2xl p-8 border border-gray-200`}>
      <div className="flex items-center gap-8">
        {/* Score circle */}
        <div className="flex-shrink-0 text-center">
          <div className={`text-5xl font-bold ${color}`}>{score}</div>
          <div className="text-sm text-gray-500">out of {data.maxScore}</div>
        </div>

        <div className="flex-1">
          <div className={`text-lg font-semibold ${color} mb-1`}>{label}</div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {data.aiMentions === 0 ? (
              <>
                <strong>{data.businessName}</strong> was not mentioned by any AI platform for "{data.category} in {data.location}".
                {' '}{data.competitorMentions} competitors were recommended instead.
              </>
            ) : (
              <>
                <strong>{data.businessName}</strong> appeared {data.aiMentions} time(s) across AI platforms.
                {' '}{data.competitorMentions} competitors also appeared.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Bar */}
      <div className="mt-6">
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${isLow ? 'bg-red-500' : score < 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Not visible</span>
          <span>Dominating</span>
        </div>
      </div>
    </div>
  )
}
