// src/api/sendEmail.js
import { Resend } from "resend";

// ⚠️ Hard-coded for dev. Move to Vercel environment variable later.
const resend = new Resend("re_BMgMbTK9_JNAe7Lk3csbujG5yMpEixhVW");

/**
 * Sends confirmation email to the customer
 * and full order notification (with all details) to support@vitanixa.com
 */
export async function sendOrderEmail(order) {
  try {
    if (!order || !order.payer_email) {
      console.warn("❌ Missing order or payer_email — email not sent");
      return;
    }

    // 🧾 Format ordered items as an HTML table
    const itemsHTML =
      order.items && Array.isArray(order.items)
        ? order.items
            .map(
              (i) => `
              <tr>
                <td style="padding:6px 8px;border-bottom:1px solid #eee;">${i.name}</td>
                <td style="text-align:center;padding:6px 8px;border-bottom:1px solid #eee;">${i.quantity}</td>
                <td style="text-align:right;padding:6px 8px;border-bottom:1px solid #eee;">$${i.price}</td>
                <td style="text-align:right;padding:6px 8px;border-bottom:1px solid #eee;">$${(
                  i.price * i.quantity
                ).toFixed(2)}</td>
              </tr>`
            )
            .join("")
        : "<tr><td colspan='4'>No items found</td></tr>";

    // ✉️ CUSTOMER EMAIL
    const customerEmailHTML = `
      <div style="font-family:Arial,sans-serif;color:#333;max-width:600px;margin:auto;padding:20px;border:1px solid #e6e6e6;border-radius:12px;">
        <div style="text-align:center;">
          <img src="https://www.vitanixa.com/logo.png" alt="Vitanixa Logo" style="max-width:150px;margin-bottom:20px;">
          <h2 style="color:#166534;">Thank you for your order!</h2>
        </div>

        <p>Hi ${order.payer_name || "Valued Customer"},</p>
        <p>We’ve received your payment of <strong>$${order.amount} ${order.currency}</strong>.</p>

        <h3 style="color:#166534;margin-top:25px;">Order Details</h3>
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr>
              <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #166534;">Item</th>
              <th style="text-align:center;padding:6px 8px;border-bottom:2px solid #166534;">Qty</th>
              <th style="text-align:right;padding:6px 8px;border-bottom:2px solid #166534;">Price</th>
              <th style="text-align:right;padding:6px 8px;border-bottom:2px solid #166534;">Subtotal</th>
            </tr>
          </thead>
          <tbody>${itemsHTML}</tbody>
        </table>

        <p style="margin-top:15px;font-weight:bold;">Order Total: $${order.amount} ${order.currency}</p>
        <p><strong>Order ID:</strong> ${order.paypal_order_id || order.id}</p>

        <p style="margin-top:20px;">You can track or view your order here:</p>
        <a href="https://www.vitanixa.com/orders/${order.id}" 
           style="display:inline-block;background-color:#166534;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;margin-top:10px;">
           Track My Order
        </a>

        <p style="margin-top:30px;">We’ll notify you once it ships.<br/>– The Vitanixa Team</p>

        <hr style="margin-top:30px;border-color:#eee;">
        <p style="font-size:12px;color:#777;text-align:center;">
          Need help? <a href="mailto:support@vitanixa.com">support@vitanixa.com</a>
        </p>
      </div>
    `;

    // ✉️ ADMIN EMAIL (full details for support@vitanixa.com)
    const adminEmailHTML = `
      <div style="font-family:Arial,sans-serif;color:#333;max-width:700px;margin:auto;padding:20px;border:1px solid #e6e6e6;border-radius:12px;">
        <h2 style="color:#166534;">🛍️ New Order Received</h2>

        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>PayPal Order ID:</strong> ${order.paypal_order_id || "—"}</p>
        <p><strong>Payer Name:</strong> ${order.payer_name}</p>
        <p><strong>Payer Email:</strong> ${order.payer_email}</p>
        <p><strong>Amount:</strong> $${order.amount} ${order.currency}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>

        ${
          order.shipping
            ? `
          <h3 style="color:#166534;margin-top:20px;">Shipping Address</h3>
          <p>
            ${order.shipping.name?.full_name || ""}<br/>
            ${order.shipping.address?.address_line_1 || ""}<br/>
            ${order.shipping.address?.admin_area_2 || ""}, ${
                order.shipping.address?.admin_area_1 || ""
              } ${order.shipping.address?.postal_code || ""}<br/>
            ${order.shipping.address?.country_code || ""}
          </p>`
            : ""
        }

        <h3 style="color:#166534;margin-top:25px;">Ordered Items</h3>
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr>
              <th style="text-align:left;padding:6px 8px;border-bottom:2px solid #166534;">Item</th>
              <th style="text-align:center;padding:6px 8px;border-bottom:2px solid #166534;">Qty</th>
              <th style="text-align:right;padding:6px 8px;border-bottom:2px solid #166534;">Price</th>
              <th style="text-align:right;padding:6px 8px;border-bottom:2px solid #166534;">Subtotal</th>
            </tr>
          </thead>
          <tbody>${itemsHTML}</tbody>
        </table>

        <p style="margin-top:15px;font-weight:bold;">Total: $${order.amount} ${order.currency}</p>

        <hr style="margin-top:25px;border-color:#eee;">
        <p style="font-size:12px;color:#555;">
          This is an internal copy sent to support@vitanixa.com for order processing.
        </p>
      </div>
    `;

    // 🚀 Send both emails
    await resend.emails.send({
      from: "Vitanixa Store <orders@vitanixa.com>",
      to: order.payer_email,
      subject: `Your Vitanixa Order #${order.id}`,
      html: customerEmailHTML,
    });

    await resend.emails.send({
      from: "Vitanixa Store <orders@vitanixa.com>",
      to: "support@vitanixa.com",
      subject: `🆕 New Order from ${order.payer_name} ($${order.amount})`,
      html: adminEmailHTML,
    });

    console.log(`✅ Sent confirmation to ${order.payer_email} and copy to support@vitanixa.com`);
  } catch (err) {
    console.error("❌ Failed to send email:", err);
  }
}

