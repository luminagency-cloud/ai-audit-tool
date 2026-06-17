import type { NextApiRequest, NextApiResponse } from "next";
import { runAudit } from "../../src/lib/audit-engine";
import { generateActionItems } from "../../src/lib/action-items";

export const config = {
  maxDuration: 60,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { businessName, location, category } = req.body;

  if (!businessName || !location || !category) {
    return res.status(400).json({
      error: "Missing required fields: businessName, location, category",
    });
  }

  try {
    console.log(
      `[AUDIT] Running audit for "${businessName}" (${category} in ${location})`
    );

    const aiResults = await runAudit({ businessName, location, category });
    const actionItems = generateActionItems(aiResults, {
      businessName,
      location,
      category,
    });

    return res.status(200).json({
      businessName,
      location,
      category,
      competitors: aiResults.competitors,
      actionItems,
      visibilityScore: aiResults.visibilityScore,
      aiMentions: aiResults.aiMentions,
      competitorMentions: aiResults.competitorMentions,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[AUDIT ERROR]", err);
    return res.status(500).json({
      error: "Audit failed",
      message: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
