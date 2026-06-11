const Stripe = require("stripe");
const { createClient } = require("@supabase/supabase-js");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const rawBody = await new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    return res.status(400).json({ error: `Webhook error: ${err.message}` });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const customerName =
      session.shipping_details?.name ||
      session.customer_details?.name ||
      "Customer";
    const customerEmail = session.customer_details?.email;
    const amount = (session.amount_total / 100).toFixed(2);
    const items = JSON.parse(session.metadata?.items || "[]");
    const shipping = session.shipping_details || null;

    // Save to Supabase
    try {
      const supabase = createClient(
        process.env.VITE_SUPABASE_URL,
        process.env.VITE_SUPABASE_ANON_KEY
      );
      await supabase.from("orders").insert([{
        payer_name: customerName,
        payer_email: customerEmail,
        amount,
        currency: "USD",
        stripe_session_id: session.id,
        payment_method: "Stripe",
        items,
        shipping,
        created_at: new Date().toISOString(),
      }]);
    } catch (err) {
      console.error("Supabase insert error:", err.message);
    }

    // Send confirmation email
    try {
      const siteUrl = process.env.VITE_SITE_URL || "https://vitanixa.com";
      await fetch(`${siteUrl}/api/sendEmail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payer_name: customerName,
          payer_email: customerEmail,
          amount,
          currency: "USD",
          items,
          shipping,
          order_id: session.id,
          payment_method: "Stripe",
        }),
      });
    } catch (err) {
      console.error("Email send error:", err.message);
    }
  }

  return res.status(200).json({ received: true });
};
