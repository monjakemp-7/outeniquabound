/**
 * Woo Store API (empty cart, 2026-09-17) exposes payment_methods:
 * ["stitch-express"].
 *
 * Stitch Express card checkout is Visa / Mastercard. Instant EFT is not
 * listed on that plugin, so we do not claim it here.
 */
export const PAYMENTS = {
  line: "Pay with Visa or Mastercard on secure checkout",
  methods: ["Visa", "Mastercard"] as const,
  till: "Card payment is completed on outeniquabound.com via Stitch.",
};
