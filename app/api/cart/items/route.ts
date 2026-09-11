import { wooCart } from "@/lib/cart-proxy";

export async function POST(request: Request) {
  const payload = await request.json();
  return wooCart("/cart/add-item", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
