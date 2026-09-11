import { wooCart } from "@/lib/cart-proxy";

export async function GET() {
  return wooCart("/cart");
}
