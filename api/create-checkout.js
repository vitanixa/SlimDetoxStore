const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { items, customerEmail } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No items provided" });
    }

    const siteUrl = process.env.VITE_SITE_URL || "https://vitanixa.com";

    // Check if order contains any bundle (tea or moimoi)
    const hasBundle = items.some((i) => i.id === "bundle" || i.id === "moimoi_bundle");

    // Calculate subtotal
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Free shipping if: has any bundle OR order $37+ (moimoi bundle price)
    const freeShipping = hasBundle || subtotal >= 37.00;

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          description: `Vitanixa ${item.name} — 30 Premium Herbal Tea Bags`,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const shippingOptions = freeShipping
      ? [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: { amount: 0, currency: "usd" },
              display_name: "Free Shipping 🎉 (5–7 business days)",
              delivery_estimate: {
                minimum: { unit: "business_day", value: 5 },
                maximum: { unit: "business_day", value: 7 },
              },
            },
          },
        ]
      : [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: { amount: 599, currency: "usd" },
              display_name: "Standard Shipping (5–7 business days)",
              delivery_estimate: {
                minimum: { unit: "business_day", value: 5 },
                maximum: { unit: "business_day", value: 7 },
              },
            },
          },
        ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: customerEmail || undefined,
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      shipping_options: shippingOptions,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cancel`,
      metadata: {
        source: "vitanixa-store",
        items: JSON.stringify(
          items.map((i) => ({ id: i.id, name: i.name, qty: i.quantity }))
        ),
      },
    });

    return res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("Stripe checkout error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
