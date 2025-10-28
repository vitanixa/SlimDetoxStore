import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const order = req.body;

  try {
    const itemsHtml = order.items
      .map((i) => `<li>${i.name} × ${i.quantity} — $${i.price.toFixed(2)}</li>`)
      .join("");

    const shippingHtml = order.shipping
      ? `<h3>Shipping Address:</h3><pre>${JSON.stringify(order.shipping, null, 2)}</pre>`
      : "";

    // ✉️ 1. Email to Customer
    await resend.emails.send({
      from: "Vitanixa Store <orders@vitanixa.com>",
      to: order.payer_email,
      subject: `Your Vitanixa Order #${order.paypal_order_id}`,
      html: `
        <h2>Thank you for your purchase, ${order.payer_name}!</h2>
        <p>We’ve received your payment of <strong>$${order.amount} ${order.currency}</strong>.</p>
        <p><strong>Order ID:</strong> ${order.paypal_order_id}</p>
        <h3>Items Ordered:</h3>
        <ul>${itemsHtml}</ul>
        ${shippingHtml}
        <p>We’ll notify you once your order ships.<br/>– The Vitanixa Team</p>
      `,
    });

    // ✉️ 2. Email to Support
    await resend.emails.send({
      from: "Vitanixa Orders <orders@vitanixa.com>",
      to: "support@vitanixa.com",
      subject: `🛍️ New Order from ${order.payer_name} ($${order.amount})`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Order ID:</strong> ${order.paypal_order_id}</p>
        <p><strong>Customer:</strong> ${order.payer_name} (${order.payer_email})</p>
        <p><strong>Amount:</strong> $${order.amount} ${order.currency}</p>
        <h3>Items:</h3>
        <ul>${itemsHtml}</ul>
        ${shippingHtml}
        <hr />
        <p><em>Inserted into Supabase with ID: ${order.id}</em></p>
        <p>Timestamp: ${new Date().toLocaleString()}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ error: error.message });
  }
}

