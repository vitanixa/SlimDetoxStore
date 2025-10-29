// /api/sendEmail.js
import { Resend } from "resend";

/**
 * ✅ Serverless API Route for Vercel
 * Sends confirmation email to buyer + store.
 */
export default async function handler(req, res) {
  console.log("📩 sendEmail API route hit");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const resend = new Resend("re_BMgMbTK9_JNAe7Lk3csbujG5yMpEixhVW");

    const { payer_name, payer_email, amount, currency, items, shipping, paypal_order_id } =
      req.body || {};

    if (!payer_email) {
      console.error("❌ Missing payer_email");
      return res.status(400).json({ error: "Missing payer_email" });
    }

    const itemList =
      items && items.length
        ? items.map((i) => `<li>${i.name} × ${i.quantity}</li>`).join("")
        : "<li>No items</li>";

    // 📨 Send to buyer
    await resend.emails.send({
      from: "Vitanixa <onboarding@resend.dev>",
      to: payer_email,
      subject: `Your Vitanixa Order #${paypal_order_id}`,
      html: `
        <h2>Thank you for your order!</h2>
        <p>Hi ${payer_name || "Customer"},</p>
        <p>We’ve received your payment of <strong>$${amount} ${currency}</strong>.</p>
        <ul>${itemList}</ul>
        ${shipping ? `<p><strong>Shipping to:</strong><br>${shipping.address?.address_line_1 || ""} ${shipping.address?.admin_area_2 || ""}</p>` : ""}
        <p>We’ll notify you once it ships.<br/>– The Vitanixa Team</p>
      `,
    });

    // 📨 Send a copy to store admin
    await resend.emails.send({
      from: "Vitanixa Store <support@vitanixa.com>",
      to: "support@vitanixa.com",
      subject: `🛒 New Order from ${payer_name}`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Name:</strong> ${payer_name}</p>
        <p><strong>Email:</strong> ${payer_email}</p>
        <p><strong>Amount:</strong> $${amount} ${currency}</p>
        <p><strong>PayPal ID:</strong> ${paypal_order_id}</p>
        <ul>${itemList}</ul>
        ${shipping ? `<pre>${JSON.stringify(shipping, null, 2)}</pre>` : ""}
      `,
    });

    console.log("✅ Emails sent successfully");
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ sendEmail crash:", err);
    return res.status(500).json({ error: err.message });
  }
}

