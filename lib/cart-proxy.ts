import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { CART_COOKIE, WOO_URL } from "@/lib/constants";

const STORE = `${WOO_URL.replace(/\/$/, "")}/wp-json/wc/store/v1`;

export async function wooCart(
  path: string,
  init: RequestInit = {},
): Promise<NextResponse> {
  const jar = await cookies();
  const token = jar.get(CART_COOKIE)?.value;
  const res = await fetch(`${STORE}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { "Cart-Token": token } : {}),
      ...(init.headers ?? {}),
    },
  });

  const text = await res.text();
  let body: unknown = text;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { message: text || "Unexpected cart response" };
  }

  const response = NextResponse.json(body, { status: res.status });
  const nextToken =
    res.headers.get("Cart-Token") || res.headers.get("cart-token");
  if (nextToken) {
    response.cookies.set(CART_COOKIE, nextToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });
  }
  return response;
}
