/**
 * Platform fee calculation utilities
 * Based on the revenue model:
 *   - Rent collection: 2% from property owner
 *   - Transaction/deal fees: 2% (vs 5% physical agents)
 *   - Maintenance: 5-10% depending on complexity
 *   - Escrow: 2% one-time payment
 */

export type FeeType = "rent" | "transaction" | "maintenance_simple" | "maintenance_complex" | "escrow";

export interface FeeBreakdown {
  grossAmount: number;
  platformFee: number;
  feeRate: number;
  netAmount: number;
  description: string;
}

const FEE_RATES: Record<FeeType, number> = {
  rent: 0.02,               // 2% of rent
  transaction: 0.02,        // 2% of real estate deal
  maintenance_simple: 0.05, // 5% for simple maintenance
  maintenance_complex: 0.10,// 10% for complex maintenance
  escrow: 0.02,             // 2% of escrow deposit
};

export function calculateFee(amount: number, type: FeeType): FeeBreakdown {
  const feeRate = FEE_RATES[type];
  const platformFee = Math.round(amount * feeRate * 100) / 100;
  const netAmount = amount - platformFee;

  const descriptions: Record<FeeType, string> = {
    rent: `2% rent collection fee`,
    transaction: `2% transaction processing fee`,
    maintenance_simple: `5% maintenance processing fee`,
    maintenance_complex: `10% maintenance processing fee`,
    escrow: `2% escrow handling fee`,
  };

  return {
    grossAmount: amount,
    platformFee,
    feeRate,
    netAmount,
    description: descriptions[type],
  };
}

/** Format amount to Nigerian Naira */
export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
}
