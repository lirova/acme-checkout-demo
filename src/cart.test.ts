import { describe, it, expect } from "vitest";
import { subtotal, applyDiscount, applyPromoCode, withTax, checkoutTotal, type LineItem } from "./cart.js";

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

describe("applyPromoCode", () => {
  it("applies 10% off for SAVE10", () => {
    expect(applyPromoCode(100, "SAVE10")).toBe(90);
  });
  it("applies 20% off for SAVE20", () => {
    expect(applyPromoCode(100, "SAVE20")).toBe(80);
  });
  it("applies $5 off for WELCOME", () => {
    expect(applyPromoCode(100, "WELCOME")).toBe(95);
  });
  it("throws for an unknown code", () => {
    expect(() => applyPromoCode(100, "BOGUS")).toThrow("Invalid promo code");
  });
  it("throws for an empty code", () => {
    expect(() => applyPromoCode(100, "")).toThrow("Invalid promo code");
  });
  it("clamps the result at 0 (never negative)", () => {
    expect(applyPromoCode(3, "WELCOME")).toBe(0);
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
  it("applies the promo code to the subtotal before discount and tax", () => {
    // subtotal 100, SAVE10 -> 90, 20% off -> 72, +8% tax -> 77.76
    expect(checkoutTotal(cart, 20, 0.08, "SAVE10")).toBeCloseTo(77.76, 5);
  });
});
