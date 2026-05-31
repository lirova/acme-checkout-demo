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

/** Full checkout total: subtotal, then discount, then tax. */
export function checkoutTotal(
  items: LineItem[],
  percentOff: number,
  taxRate: number,
): number {
  const afterDiscount = applyDiscount(subtotal(items), percentOff);
  return withTax(afterDiscount, taxRate);
}
