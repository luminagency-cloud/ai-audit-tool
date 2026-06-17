import { useState } from "react";

interface Competitor {
  name: string;
  mentioned: boolean;
  rank: number;
  reviews: number;
  rating: number;
  mentions: number;
  sources: string[];
}

interface ActionItem {
  priority: "high" | "medium" | "low";
  title: string;
  detail: string;
}

interface AuditResult {
  businessName: string;
  location: string;
  category: string;
  competitors: Competitor[];
  actionItems: ActionItem[];
  visibilityScore: number;
  aiMentions: number;
  competitorMentions: number;
  generatedAt: string;
}

export default function Home() {
  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !location || !category) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName, location, category }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Audit failed");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const scoreColor =
    result && result.visibilityScore >= 60
      ? "text-green-600"
      : result && result.visibilityScore >= 30
        ? "text-yellow-600"
        : "text-red-600";

  const scoreLabel =
    result && result.visibilityScore >= 60
      ? "Good visibility"
      : result && result.visibilityScore >= 30
        ? "Moderate visibility"
        : "Low visibility";

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AS</span>
            </div>
            <span className="font-semibold text-gray-900">Answerspot</span>
          </div>
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
            Free Beta
          </span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Hero */}
        {!result && !loading && (
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              See if AI recommends your business
            </h1>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">
              Enter your business details and we&apos;ll check what AI platforms like Claude say when someone asks for recommendations in your area.
            </p>
          </div>
        )}

        {/* Form */}
        {!result && !loading && (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Newport Plumbing Co"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Newport, RI"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. plumber, restaurant, dentist"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 placeholder-gray-400"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Run Free Audit
            </button>
          </form>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-block w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
            <p className="text-gray-600 font-medium">Checking AI visibility...</p>
            <p className="text-gray-400 text-sm mt-1">Querying AI platforms for your business</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Score Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    AI Visibility Score
                  </h2>
                  <p className="text-sm text-gray-500">
                    {result.businessName} — {result.category} in {result.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-4xl font-bold ${scoreColor}`}>
                    {result.visibilityScore}
                    <span className="text-lg text-gray-400">/100</span>
                  </div>
                  <p className={`text-sm font-medium ${scoreColor}`}>{scoreLabel}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {result.aiMentions}
                  </div>
                  <div className="text-xs text-gray-500">AI Mentions</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {result.competitorMentions}
                  </div>
                  <div className="text-xs text-gray-500">Competitors Found</div>
                </div>
              </div>
            </div>

            {/* Competitors */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Competitor Landscape
              </h3>
              {result.competitors.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No competitors found in AI results.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-3 font-medium text-gray-500">
                          #
                        </th>
                        <th className="text-left py-2 px-3 font-medium text-gray-500">
                          Business
                        </th>
                        <th className="text-center py-2 px-3 font-medium text-gray-500">
                          Rating
                        </th>
                        <th className="text-center py-2 px-3 font-medium text-gray-500">
                          Reviews
                        </th>
                        <th className="text-center py-2 px-3 font-medium text-gray-500">
                          Sources
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.competitors.map((c, i) => (
                        <tr
                          key={i}
                          className={`border-b border-gray-100 ${
                            c.name
                              .toLowerCase()
                              .includes(result.businessName.toLowerCase())
                              ? "bg-indigo-50"
                              : ""
                          }`}
                        >
                          <td className="py-2.5 px-3 text-gray-400">{i + 1}</td>
                          <td className="py-2.5 px-3 font-medium text-gray-900">
                            {c.name}
                            {c.name
                              .toLowerCase()
                              .includes(result.businessName.toLowerCase()) && (
                              <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded">
                                You
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-center text-gray-600">
                            {c.rating > 0 ? `★ ${c.rating}` : "—"}
                          </td>
                          <td className="py-2.5 px-3 text-center text-gray-600">
                            {c.reviews > 0 ? c.reviews : "—"}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            {c.sources.map((s, j) => (
                              <span
                                key={j}
                                className="inline-block text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded mr-1"
                              >
                                {s}
                              </span>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Action Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recommended Actions
              </h3>
              <div className="space-y-3">
                {result.actionItems.map((item, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-lg border ${
                      item.priority === "high"
                        ? "bg-red-50 border-red-200"
                        : item.priority === "medium"
                          ? "bg-yellow-50 border-yellow-200"
                          : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                          item.priority === "high"
                            ? "bg-red-200 text-red-800"
                            : item.priority === "medium"
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {item.priority}
                      </span>
                      <div>
                        <div className="font-medium text-gray-900">
                          {item.title}
                        </div>
                        <div className="text-sm text-gray-600 mt-0.5">
                          {item.detail}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-indigo-600 rounded-xl p-6 text-center text-white">
              <h3 className="text-lg font-semibold mb-2">
                Want to track your AI visibility over time?
              </h3>
              <p className="text-indigo-200 text-sm mb-4">
                Get weekly AI audits, competitor alerts, and a prioritized action plan. Free now — paid plans coming soon.
              </p>
              <button
                type="button"
                className="bg-white text-indigo-600 font-medium py-2 px-6 rounded-lg hover:bg-indigo-50 transition-colors"
                onClick={() => alert("Email capture coming soon")}
              >
                Get Notified at Launch
              </button>
            </div>

            {/* Re-run */}
            <div className="text-center">
              <button
                onClick={() => {
                  setResult(null);
                  setBusinessName("");
                  setLocation("");
                  setCategory("");
                }}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                ← Run another audit
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-gray-400">
          <p>Answerspot — AI Visibility Audit Tool</p>
          <p className="mt-1">Free beta · Results are AI-generated estimates, not guarantees</p>
        </footer>
      </div>
    </main>
  );
}
