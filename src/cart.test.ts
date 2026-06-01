import { describe, it, expect } from "vitest";
import { subtotal, applyDiscount, withTax, applyPromoCode, checkoutTotal, type LineItem } from "./cart.js";

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

describe("applyPromoCode", () => {
  it("applies SAVE10 as 10% off", () => {
    expect(applyPromoCode(100, "SAVE10")).toBeCloseTo(90, 5);
  });
  it("applies SAVE20 as 20% off", () => {
    expect(applyPromoCode(100, "SAVE20")).toBeCloseTo(80, 5);
  });
  it("applies WELCOME as $5 off", () => {
    expect(applyPromoCode(100, "WELCOME")).toBeCloseTo(95, 5);
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

describe("checkoutTotal", () => {
  it("applies discount then tax", () => {
    // subtotal 100, 20% off -> 80, +8% tax -> 86.4
    expect(checkoutTotal(cart, 20, 0.08)).toBeCloseTo(86.4, 5);
  });
  it("applies a promo code to the subtotal before tax", () => {
    // subtotal 100, SAVE10 -> 90, 0% off -> 90, +8% tax -> 97.2
    expect(checkoutTotal(cart, 0, 0.08, "SAVE10")).toBeCloseTo(97.2, 5);
  });
  it("behaves unchanged when no promo code is given", () => {
    expect(checkoutTotal(cart, 20, 0.08, undefined)).toBeCloseTo(86.4, 5);
  });
});
