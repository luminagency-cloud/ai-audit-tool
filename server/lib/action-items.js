// Generate prioritized action items based on audit results
export function generateActionItems(aiResults, { businessName, location, category }) {
  const items = []
  const { competitors, aiMentions, visibilityScore } = aiResults

  const mentionedBusiness = competitors.find(c =>
    c.name.toLowerCase().includes(businessName.toLowerCase())
  )
  const topCompetitors = competitors.filter(c => c.mentioned).slice(0, 3)
  const avgCompetitorReviews = topCompetitors.length > 0
    ? Math.round(topCompetitors.reduce((sum, c) => sum + (c.reviews || 0), 0) / topCompetitors.length)
    : 150

  // Not mentioned at all — highest priority
  if (aiMentions === 0) {
    items.push({
      priority: 'high',
      title: 'You are invisible to AI',
      detail: `${businessName} was not mentioned by any AI platform for "${category} in ${location}". ${topCompetitors.length} competitors appeared instead. This is the #1 problem to fix.`,
    })
    items.push({
      priority: 'high',
      title: 'Build citation presence',
      detail: `Get listed on Yelp, BBB, Angi, Thumbtack, and industry-specific directories. AI models pull from these sources to build recommendations. Start with the top 5.`,
    })
  } else if (mentionedBusiness && mentionedBusiness.rank > 3) {
    items.push({
      priority: 'high',
      title: `You rank #${mentionedBusiness.rank} — push into the top 3`,
      detail: `You're mentioned but ranked below ${topCompetitors.filter(c => (c.rank || 99) < (mentionedBusiness.rank || 99)).map(c => c.name).join(', ')}. Closing the gap requires more reviews and stronger signals.`,
    })
  }

  // Review volume gap
  if (mentionedBusiness && mentionedBusiness.reviews && mentionedBusiness.reviews < avgCompetitorReviews * 0.5) {
    items.push({
      priority: 'high',
      title: 'Increase review volume',
      detail: `You have ~${mentionedBusiness.reviews} reviews. The top competitors average ~${avgCompetitorReviews}. Aim for ${Math.ceil(avgCompetitorReviews * 0.7)}+ reviews to be competitive. Ask every satisfied customer.`,
    })
  } else if (!mentionedBusiness || !mentionedBusiness.reviews) {
    items.push({
      priority: 'high',
      title: 'Build review volume',
      detail: `Top competitors average ~${avgCompetitorReviews} reviews. If you have fewer than ${Math.ceil(avgCompetitorReviews * 0.5)}, this is likely why AI doesn't recommend you. Set up automated review requests.`,
    })
  }

  // Rating gap
  if (mentionedBusiness && mentionedBusiness.rating && mentionedBusiness.rating < 4.5) {
    items.push({
      priority: 'medium',
      title: 'Improve your rating',
      detail: `Your rating is ${mentionedBusiness.rating}. AI models favor businesses rated 4.5+. Address negative reviews and encourage happy customers to leave feedback.`,
    })
  }

  // Schema markup — always relevant
  items.push({
    priority: 'medium',
    title: 'Add LocalBusiness schema markup',
    detail: 'Add structured data (JSON-LD) to your website with your business name, address, phone, hours, and services. This helps AI models understand and recommend your business.',
  })

  // Google Business Profile
  items.push({
    priority: 'medium',
    title: 'Optimize Google Business Profile',
    detail: 'Complete every field: all service categories, business description (750 chars), 10+ photos, regular posts, Q&A section. Google Business Profile is the #1 signal for local AI recommendations.',
  })

  // Cross-platform presence
  if (aiMentions > 0 && aiMentions < 2) {
    items.push({
      priority: 'low',
      title: 'Expand to more AI platforms',
      detail: `You appeared on ${aiMentions} platform(s). Being mentioned across multiple AI systems (ChatGPT, Perplexity, Google AI) increases your chances of being recommended.`,
    })
  }

  // Local media / PR
  items.push({
    priority: 'low',
    title: 'Get mentioned in local media',
    detail: 'Press mentions, local blog features, and community event sponsorships are strong credibility signals for AI recommendation engines.',
  })

  return items
}
