// api/sendEmail.js
import { Resend } from "resend";

/**
 * ✅ Make sure you replace this with your actual API key from https://resend.com/api-keys
 * It’s fine to hardcode temporarily while testing.
 */
const resend = new Resend("re_BMgMbTK9_JNAe7Lk3csbujG5yMpEixhVW");

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const order = req.body;
    console.log("📦 Incoming order email:", order);

    // basic validation
    if (!order?.payer_email || !order?.id) {
      return res.status(400).json({ error: "Missing order data" });
    }

    // 📨 Send buyer email
    const buyer = await resend.emails.send({
      from: "Vitanixa <onboarding@resend.dev>", // ✅ temporary sender
      to: order.payer_email,
      subject: `Your Vitanixa Order #${order.id}`,
      html: `
        <h2>Thank you for your order, ${order.payer_name}!</h2>
        <p>We received your payment of <strong>$${order.amount} ${order.currency}</strong>.</p>
        <p><strong>Items:</strong></p>
        <ul>
          ${order.items
            ?.map(
              (i) =>
                `<li>${i.name} × ${i.quantity} - $${i.price.toFixed(2)}</li>`
            )
            .join("")}
        </ul>
        ${
          order.shipping
            ? `<p><strong>Shipping:</strong> ${
                order.shipping.address?.address_line_1 || ""
              }, ${order.shipping.address?.admin_area_2 || ""}, ${
                order.shipping.address?.country_code || ""
              }</p>`
            : ""
        }
        <p>We’ll notify you when it ships.<br/>– The Vitanixa Team</p>
      `,
    });

    // 📨 Send admin notification
    const admin = await resend.emails.send({
      from: "Vitanixa <onboarding@resend.dev>", // same sandbox sender
      to: "support@vitanixa.com",
      subject: `🛍️ New Order Received – #${order.id}`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Customer:</strong> ${order.payer_name} (${order.payer_email})</p>
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Amount:</strong> $${order.amount} ${order.currency}</p>
        <p><strong>PayPal ID:</strong> ${order.paypal_order_id}</p>
        <p><strong>Items:</strong></p>
        <ul>
          ${order.items
            ?.map(
              (i) =>
                `<li>${i.name} × ${i.quantity} - $${i.price.toFixed(2)}</li>`
            )
            .join("")}
        </ul>
        ${
          order.shipping
            ? `<p><strong>Shipping:</strong> ${
                order.shipping.address?.address_line_1 || ""
              }, ${order.shipping.address?.admin_area_2 || ""}, ${
                order.shipping.address?.country_code || ""
              }</p>`
            : ""
        }
        <p>— Vitanixa Store System</p>
      `,
    });

    console.log("✅ Email results:", { buyer, admin });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ sendEmail API error:", err);
    return res.status(500).json({ error: "Server error", message: err.message });
  }
}

