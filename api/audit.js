import { runAudit } from '../server/lib/audit-engine.js'
import { generateActionItems } from '../server/lib/action-items.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { businessName, location, category } = req.body

  if (!businessName || !location || !category) {
    return res.status(400).json({ error: 'Missing required fields: businessName, location, category' })
  }

  try {
    console.log(`[AUDIT] Running audit for "${businessName}" (${category} in ${location})`)

    const aiResults = await runAudit({ businessName, location, category })
    const actionItems = generateActionItems(aiResults, { businessName, location, category })

    const response = {
      businessName,
      location,
      category,
      competitors: aiResults.competitors,
      actionItems,
      visibilityScore: aiResults.visibilityScore,
      maxScore: 100,
      aiMentions: aiResults.aiMentions,
      competitorMentions: aiResults.competitorMentions,
      sources: aiResults.sources,
      generatedAt: new Date().toISOString(),
    }

    console.log(`[AUDIT] Complete. Score: ${response.visibilityScore}/100, Mentions: ${response.aiMentions}`)
    res.json(response)
  } catch (err) {
    console.error('[AUDIT ERROR]', err)
    res.status(500).json({ error: 'Audit failed', message: err.message })
  }
}
