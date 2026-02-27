export function calculateBusinessZakat({
  cash = 0,
  inventoryValue = 0,
  receivables = 0,
  debts = 0
}) {
  const totalAssets = cash + inventoryValue + receivables;
  const zakatableAmount = totalAssets - debts;

  if (zakatableAmount <= 0) return 0;

  return zakatableAmount * 0.025; // 2.5%
}