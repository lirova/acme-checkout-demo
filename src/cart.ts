export interface LineItem {
  name: string;
  price: number; // unit price in dollars
  quantity: number;
}

/** Sum of price * quantity across all line items. */
export function subtotal(items: LineItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/**
 * Apply a percentage discount to an amount.
 * e.g. applyDiscount(100, 20) should return 80 (20% off).
 */
export function applyDiscount(amount: number, percentOff: number): number {
  return amount - amount * (percentOff / 100);
}

/** Add sales tax to an amount. taxRate is a fraction, e.g. 0.08 for 8%. */
export function withTax(amount: number, taxRate: number): number {
  return amount + amount * taxRate;
}

/**
 * Apply a promo code to a subtotal.
 * - SAVE10  -> 10% off
 * - SAVE20  -> 20% off
 * - WELCOME -> $5 off (flat)
 * Unknown or empty codes throw. The result is never negative (clamped at 0).
 */
export function applyPromoCode(subtotal: number, code: string): number {
  let discounted: number;
  switch (code) {
    case "SAVE10":
      discounted = subtotal * 0.9;
      break;
    case "SAVE20":
      discounted = subtotal * 0.8;
      break;
    case "WELCOME":
      discounted = subtotal - 5;
      break;
    default:
      throw new Error("Invalid promo code");
  }
  return Math.max(0, discounted);
}

/** Full checkout total: subtotal, then promo code, then discount, then tax. */
export function checkoutTotal(
  items: LineItem[],
  percentOff: number,
  taxRate: number,
  promoCode?: string,
): number {
  let base = subtotal(items);
  if (promoCode !== undefined) {
    base = applyPromoCode(base, promoCode);
  }
  const afterDiscount = applyDiscount(base, percentOff);
  return withTax(afterDiscount, taxRate);
}
