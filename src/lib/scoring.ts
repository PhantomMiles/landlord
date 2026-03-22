/**
 * Tenant Credibility Scoring Engine
 *
 * Weights:
 *   Identity Verification  → 10%
 *   Financial Stability    → 40%
 *   Behavioral History     → 30%
 *   Rental References      → 10%
 *   Engagement Score       → 10%
 */

export interface ScoringInputs {
  // --- Identity (10%) ---
  isBvnVerified: boolean;
  isGovIdVerified: boolean;
  isBiometricVerified: boolean;

  // --- Financial (40%) ---
  incomeTsRentRatio: number;   // e.g., 3.0 means income is 3x the rent
  hasLinkedBankAccount: boolean;
  hasCreditHistory: boolean;

  // --- Behavioral (30%) ---
  paymentStreak: number;       // consecutive on-time payments
  hasRentAutomation: boolean;  // enrolled in auto-pay
  hasRentShield: boolean;      // enrolled in Rent Shield/Reserve

  // --- References (10%) ---
  previousLandlordRating: number; // 0 – 5
  hasConflictHistory: boolean;

  // --- Engagement (10%) ---
  avgResponseTimeHours: number; // average message response time
  maintenanceRequestsHandled: number;
  platformActivityDays: number; // days active in last 90 days
}

export interface ScoreBreakdown {
  identityScore: number;    // 0 – 10
  financialScore: number;   // 0 – 40
  behavioralScore: number;  // 0 – 30
  referencesScore: number;  // 0 – 10
  engagementScore: number;  // 0 – 10
  totalScore: number;       // 0 – 100
  grade: "A" | "B" | "C" | "D" | "F";
  label: string;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function calculateTenantScore(inputs: ScoringInputs): ScoreBreakdown {
  // ─── Identity (10 points) ───────────────────────────────────────────────
  let identityScore = 0;
  if (inputs.isBvnVerified) identityScore += 4;
  if (inputs.isGovIdVerified) identityScore += 4;
  if (inputs.isBiometricVerified) identityScore += 2;
  identityScore = clamp(identityScore, 0, 10);

  // ─── Financial (40 points) ──────────────────────────────────────────────
  let financialScore = 0;
  // Income-to-rent ratio: 3x or above = full points, scales down below
  const ratioPoints = clamp((inputs.incomeTsRentRatio / 3) * 20, 0, 20);
  financialScore += ratioPoints;
  if (inputs.hasLinkedBankAccount) financialScore += 10;
  if (inputs.hasCreditHistory) financialScore += 10;
  financialScore = clamp(financialScore, 0, 40);

  // ─── Behavioral (30 points) ─────────────────────────────────────────────
  let behavioralScore = 0;
  // Payment streak: each on-time payment = 2 points, max 20
  behavioralScore += clamp(inputs.paymentStreak * 2, 0, 20);
  if (inputs.hasRentAutomation) behavioralScore += 5;
  if (inputs.hasRentShield) behavioralScore += 5;
  behavioralScore = clamp(behavioralScore, 0, 30);

  // ─── Rental References (10 points) ─────────────────────────────────────
  let referencesScore = 0;
  // Previous landlord rating out of 5, scaled to 8 points
  referencesScore += clamp((inputs.previousLandlordRating / 5) * 8, 0, 8);
  if (!inputs.hasConflictHistory) referencesScore += 2;
  referencesScore = clamp(referencesScore, 0, 10);

  // ─── Engagement (10 points) ─────────────────────────────────────────────
  let engagementScore = 0;
  // Response time: ≤2h = 4pts, ≤12h = 2pts, else 0
  if (inputs.avgResponseTimeHours <= 2) engagementScore += 4;
  else if (inputs.avgResponseTimeHours <= 12) engagementScore += 2;
  // Platform activity: 60+ days out of 90 = 4pts, 30+ = 2pts
  if (inputs.platformActivityDays >= 60) engagementScore += 4;
  else if (inputs.platformActivityDays >= 30) engagementScore += 2;
  // Maintenance: 2 per properly handled request, max 2pts
  engagementScore += clamp(inputs.maintenanceRequestsHandled, 0, 2);
  engagementScore = clamp(engagementScore, 0, 10);

  const totalScore = Math.round(
    identityScore + financialScore + behavioralScore + referencesScore + engagementScore
  );

  let grade: ScoreBreakdown["grade"];
  let label: string;
  if (totalScore >= 90) { grade = "A"; label = "Exceptional Tenant"; }
  else if (totalScore >= 75) { grade = "B"; label = "Reliable Tenant"; }
  else if (totalScore >= 60) { grade = "C"; label = "Average Tenant"; }
  else if (totalScore >= 45) { grade = "D"; label = "At-Risk Tenant"; }
  else { grade = "F"; label = "High-Risk Tenant"; }

  return {
    identityScore,
    financialScore,
    behavioralScore,
    referencesScore,
    engagementScore,
    totalScore,
    grade,
    label,
  };
}
