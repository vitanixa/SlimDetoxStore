import { Resend } from "resend";

// ✅ You can keep it hardcoded for now (but later store in Vercel env var)
const resend = new Resend("re_BMgMbTK9_JNAe7Lk3csbujG5yMpEixhVW");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const order = req.body;

    // 🧾 Validate minimal fields
    if (!order || !order.payer_email || !order.amount) {
      console.error("❌ Missing order data:", order);
      return res.status(400).json({ error: "Invalid order data" });
    }

    const itemList = order.items
      ?.map(
        (i) =>
          `<li>${i.name} (${i.quantity} × $${i.price.toFixed(2)})</li>`
      )
      .join("") || "<li>No items listed</li>";

    const shippingBlock = order.shipping
      ? `
      <h3>Shipping Address</h3>
      <p>
        ${order.shipping.name?.full_name ?? "N/A"}<br/>
        ${order.shipping.address?.address_line_1 ?? ""}<br/>
        ${order.shipping.address?.admin_area_2 ?? ""}, 
        ${order.shipping.address?.admin_area_1 ?? ""} 
        ${order.shipping.address?.postal_code ?? ""}<br/>
        ${order.shipping.address?.country_code ?? ""}
      </p>`
      : "<p><em>No shipping address provided.</em></p>";

    // 📨 Customer confirmation
    await resend.emails.send({
      from: "Vitanixa Store <support@vitanixa.com>",
      to: order.payer_email,
      subject: `Your Vitanixa Order #${order.id}`,
      html: `
        <h2>Thank you for your order!</h2>
        <p>Hi ${order.payer_name},</p>
        <p>We’ve received your payment of <strong>$${order.amount} ${order.currency}</strong>.</p>
        <h3>Order Details</h3>
        <ul>${itemList}</ul>
        ${shippingBlock}
        <p>We’ll notify you once it ships.<br/>– The Vitanixa Team</p>
      `,
    });

    // �� Store copy to support@vitanixa.com
    await resend.emails.send({
      from: "Vitanixa Store <support@vitanixa.com>",
      to: "support@vitanixa.com",
      subject: `🛍️ New Order Received - ${order.payer_name}`,
      html: `
        <h2>New Order Notification</h2>
        <p><strong>Name:</strong> ${order.payer_name}</p>
        <p><strong>Email:</strong> ${order.payer_email}</p>
        <p><strong>Amount:</strong> $${order.amount} ${order.currency}</p>
        <p><strong>PayPal Order ID:</strong> ${order.paypal_order_id}</p>
        <h3>Items:</h3>
        <ul>${itemList}</ul>
        ${shippingBlock}
        <p><strong>Order Created:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    console.log("✅ Emails sent successfully.");
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Email send error:", error);
    return res
      .status(500)
      .json({ error: "Email send failed", details: error.message });
  }
}

