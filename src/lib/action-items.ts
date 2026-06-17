export function generateActionItems(
  aiResults: {
    competitors: Array<{ name: string; mentioned: boolean; rank: number | null; reviews: number | null; rating: number | null; mentions: number }>;
    aiMentions: number;
    visibilityScore: number;
  },
  { businessName, location, category }: { businessName: string; location: string; category: string }
) {
  const items: Array<{ priority: "high" | "medium" | "low"; title: string; detail: string }> = [];
  const { competitors, aiMentions } = aiResults;

  const mentionedBusiness = competitors.find(c =>
    c.name.toLowerCase().includes(businessName.toLowerCase())
  );
  const topCompetitors = competitors.filter(c => c.mentioned).slice(0, 3);
  const avgReviews = topCompetitors.length > 0
    ? Math.round(topCompetitors.reduce((sum, c) => sum + (c.reviews || 0), 0) / topCompetitors.length)
    : 150;

  if (aiMentions === 0) {
    items.push({
      priority: "high",
      title: "You are invisible to AI",
      detail: `${businessName} was not mentioned by any AI platform for "${category} in ${location}". ${topCompetitors.length} competitors appeared instead.`,
    });
    items.push({
      priority: "high",
      title: "Build citation presence",
      detail: "Get listed on Yelp, BBB, Angi, Thumbtack, and industry-specific directories. AI models pull from these sources.",
    });
  } else if (mentionedBusiness && mentionedBusiness.rank && mentionedBusiness.rank > 3) {
    items.push({
      priority: "high",
      title: `You rank #${mentionedBusiness.rank} — push into the top 3`,
      detail: "You're mentioned but ranked below competitors. Closing the gap requires more reviews and stronger signals.",
    });
  }

  if (!mentionedBusiness || !mentionedBusiness.reviews || mentionedBusiness.reviews < avgReviews * 0.5) {
    items.push({
      priority: "high",
      title: "Increase review volume",
      detail: `Top competitors average ~${avgReviews} reviews. Aim for ${Math.ceil(avgReviews * 0.7)}+ reviews to be competitive.`,
    });
  }

  items.push({
    priority: "medium",
    title: "Add LocalBusiness schema markup",
    detail: "Add structured data (JSON-LD) to your website with your business name, address, phone, hours, and services.",
  });

  items.push({
    priority: "medium",
    title: "Optimize Google Business Profile",
    detail: "Complete every field: all service categories, business description, 10+ photos, regular posts, Q&A section.",
  });

  items.push({
    priority: "low",
    title: "Get mentioned in local media",
    detail: "Press mentions, local blog features, and community event sponsorships are strong credibility signals for AI.",
  });

  return items;
}
