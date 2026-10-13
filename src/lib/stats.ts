/**
 * One set of proof numbers, used everywhere. Confirmed by Murad, 13 Oct 2026
 * (SEO fix list, "Number fixes" tab). Change here, not in components.
 *
 * Rules:
 * - successRate (83%) is the overall figure. Program pages keep their own rate.
 * - "3,000+" is designers trained and mentored across all formats. Use "trained",
 *   never "consulted".
 * - "140+" is only for sentences that explicitly say 1:1 or name the programs.
 * - "830+" is designers who landed senior roles. Never "830+ trained".
 */
export const STATS = {
  successRate: '83%',
  designersTrained: '3,000+',
  oneToOneMentees: '140+',
  avgSalaryHike: '38%',
  communityMembers: '1,370+',
  seniorRolesLanded: '830+',
  outcome: '₹18-28 LPA in 90 days',
  successRateByProgram: { current: '80%', ripple: '83%', tide: '86%' },
} as const;
