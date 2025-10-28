// src/api/sendEmail.js
import { Resend } from "resend";

// ⚠️ Temporarily hard-coded — move to .env later
const resend = new Resend("re_BMgMbTK9_JNAe7Lk3csbujG5yMpEixhVW");

/**
 * Sends confirmation email to customer and a notification to support@vitanixa.com
 */
export async function sendOrderEmail(order) {
  try {
    if (!order || !order.payer_email) {
      console.warn("❌ Missing email or order data – email not sent");
      return;
    }

    const customerEmailHTML = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e6e6e6; border-radius: 12px;">
        <div style="text-align: center;">
          <img src="https://www.vitanixa.com/logo.png" alt="Vitanixa Logo" style="max-width: 150px; margin-bottom: 20px;">
          <h2 style="color: #166534;">Thank you for your order!</h2>
        </div>

        <p>Hi ${order.payer_name || "Valued Customer"},</p>
        <p>We’ve received your payment of <strong>$${order.amount} ${order.currency}</strong>.</p>

        <h3 style="color: #166534; margin-top: 25px;">Order Details</h3>
        <ul style="padding-left: 20px;">
          ${order.items && Array.isArray(order.items)
            ? order.items
                .map(
                  (i) =>
                    `<li>${i.name} × ${i.quantity} — $${(
                      i.price * i.quantity
                    ).toFixed(2)}</li>`
                )
                .join("")
            : "<li>No items found</li>"}
        </ul>

        <p style="margin-top: 20px;">You can track or view your order here:</p>
        <a href="https://www.vitanixa.com/orders/${order.id}" 
           style="display: inline-block; background-color: #166534; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; margin-top: 10px;">
           Track My Order
        </a>

        <p style="margin-top: 30px;">We’ll notify you once it ships.<br/>– The Vitanixa Team</p>

        <hr style="margin-top: 30px; border-color: #eee;">
        <p style="font-size: 12px; color: #777; text-align: center;">
          Need help? <a href="mailto:support@vitanixa.com">support@vitanixa.com</a>
        </p>
      </div>
    `;

    // 🧾 Support copy (internal notification)
    const adminEmailHTML = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px;">
        <h2>🛍️ New Order Received</h2>
        <p><strong>Name:</strong> ${order.payer_name}</p>
        <p><strong>Email:</strong> ${order.payer_email}</p>
        <p><strong>Amount:</strong> $${order.amount} ${order.currency}</p>
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Items:</strong></p>
        <ul>
          ${order.items
            ?.map((i) => `<li>${i.name} × ${i.quantity} — $${i.price}</li>`)
            .join("")}
        </ul>
        <hr>
        <p><em>Login to Supabase to view full order details.</em></p>
      </div>
    `;

    // ✉️ Send to customer
    await resend.emails.send({
      from: "Vitanixa Store <orders@vitanixa.com>",
      to: order.payer_email,
      subject: `Your Vitanixa Order #${order.id}`,
      html: customerEmailHTML,
    });

    // ✉️ Send to support team
    await resend.emails.send({
      from: "Vitanixa Store <orders@vitanixa.com>",
      to: "support@vitanixa.com",
      subject: `🆕 New Order from ${order.payer_name} ($${order.amount})`,
      html: adminEmailHTML,
    });

    console.log(`✅ Emails sent to ${order.payer_email} and support@vitanixa.com`);
  } catch (err) {
    console.error("❌ Failed to send email:", err);
  }
}

