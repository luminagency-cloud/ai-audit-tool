import express from 'express'
import cors from 'cors'
import { runAudit } from './lib/audit-engine.js'
import { generateActionItems } from './lib/action-items.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Run an audit
app.post('/api/audit', async (req, res) => {
  const { businessName, location, category } = req.body

  if (!businessName || !location || !category) {
    return res.status(400).json({ error: 'Missing required fields: businessName, location, category' })
  }

  try {
    console.log(`[AUDIT] Running audit for "${businessName}" (${category} in ${location})`)

    // Query AI platforms
    const aiResults = await runAudit({ businessName, location, category })

    // Generate action items based on findings
    const actionItems = generateActionItems(aiResults, { businessName, location, category })

    // Build response
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
})

app.listen(PORT, () => {
  console.log(`AI Audit server running on port ${PORT}`)
})
