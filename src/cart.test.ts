import { describe, it, expect } from "vitest";
import { subtotal, applyDiscount, withTax, checkoutTotal, type LineItem } from "./cart.js";

const cart: LineItem[] = [
  { name: "Widget", price: 40, quantity: 2 }, // 80
  { name: "Gadget", price: 20, quantity: 1 }, // 20
];

describe("subtotal", () => {
  it("sums price * quantity", () => {
    expect(subtotal(cart)).toBe(100);
  });
});

describe("applyDiscount", () => {
  it("reduces the amount by the given percentage", () => {
    expect(applyDiscount(100, 20)).toBe(80);
  });
  it("returns the same amount for a 0% discount", () => {
    expect(applyDiscount(100, 0)).toBe(100);
  });
  it("returns 0 for a 100% discount", () => {
    expect(applyDiscount(100, 100)).toBe(0);
  });
});

describe("withTax", () => {
  it("adds tax at the given rate", () => {
    expect(withTax(100, 0.08)).toBe(108);
  });
});

describe("checkoutTotal", () => {
  it("applies discount then tax", () => {
    // subtotal 100, 20% off -> 80, +8% tax -> 86.4
    expect(checkoutTotal(cart, 20, 0.08)).toBeCloseTo(86.4, 5);
  });
});
