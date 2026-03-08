/**
 * Calculates ApalyRx Program Administrative Fee from PAA Attachment A
 * Given the ApalyRx net drug price and a set of fee schedule tiers,
 * returns the combined admin fee (flat + value-based, with cap applied).
 */
export function calculateApalyFee(
  netDrugPrice: number,
  tiers: Array<{
    net_cost_min: number;
    net_cost_max: number | null;
    flat_fee: number;
    percent_fee: number;
    vbp_cap: number | null;
  }>
): number {
  const tier = tiers.find(
    (t) =>
      netDrugPrice >= t.net_cost_min &&
      (t.net_cost_max === null || netDrugPrice <= t.net_cost_max)
  );
  if (!tier) return 0;
  const valueBased = netDrugPrice * tier.percent_fee;
  const cappedValueBased = tier.vbp_cap
    ? Math.min(valueBased, tier.vbp_cap)
    : valueBased;
  return tier.flat_fee + cappedValueBased;
}

/**
 * Calculates partner commission amount from an ApalyRx admin fee
 * and a commission rate (stored as decimal e.g. 0.10 = 10%)
 */
export function calculateCommission(
  apalyFee: number,
  commissionRate: number
): number {
  return apalyFee * commissionRate;
}
