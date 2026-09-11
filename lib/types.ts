export type WooPrice = {
  price: string;
  regular_price: string;
  sale_price: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
};

export type WooImage = {
  id: number;
  src: string;
  thumbnail: string;
  alt: string;
  name: string;
};

export type WooTerm = {
  id: number;
  name: string;
  slug: string;
  default?: boolean;
};

export type WooAttribute = {
  id: number;
  name: string;
  taxonomy: string;
  has_variations: boolean;
  terms: WooTerm[];
};

export type WooVariationRef = {
  id: number;
  attributes: { name: string; value: string }[];
};

export type WooCategory = {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count: number;
  description: string;
  image: WooImage | null;
};

export type WooProduct = {
  id: number;
  name: string;
  slug: string;
  parent: number;
  type: string;
  sku: string;
  short_description: string;
  description: string;
  permalink: string;
  on_sale: boolean;
  prices: WooPrice;
  images: WooImage[];
  categories: { id: number; name: string; slug: string }[];
  attributes: WooAttribute[];
  variations: WooVariationRef[];
  has_options: boolean;
  is_purchasable: boolean;
  is_in_stock: boolean;
  add_to_cart: {
    text: string;
    single_text: string;
    minimum: number;
    maximum: number;
  };
};

export type WooCartItem = {
  key: string;
  id: number;
  name: string;
  quantity: number;
  type: string;
  sku: string;
  permalink: string;
  images: WooImage[];
  variation: { raw_attribute?: string; attribute: string; value: string }[];
  prices: WooPrice;
  totals: {
    line_subtotal: string;
    line_subtotal_tax: string;
    line_total: string;
    line_total_tax: string;
    currency_minor_unit: number;
  };
  quantity_limits: {
    minimum: number;
    maximum: number;
    multiple_of: number;
    editable: boolean;
  };
};

export type WooCart = {
  items: WooCartItem[];
  items_count: number;
  needs_shipping: boolean;
  totals: {
    total_items: string;
    total_items_tax: string;
    total_shipping: string;
    total_shipping_tax: string;
    total_price: string;
    total_tax: string;
    currency_minor_unit: number;
    currency_prefix: string;
    currency_suffix: string;
  };
  errors?: { message: string; code: string }[];
};
