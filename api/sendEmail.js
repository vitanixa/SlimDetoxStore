import { Resend } from "resend";

// ⚠️ For testing you can hardcode the API key,
// but later move this to an environment variable in Vercel.
const resend = new Resend("re_BMgMbTK9_JNAe7Lk3csbujG5yMpEixhVW");

export async function sendOrderEmail(order) {
  try {
    // 🧾 Build common HTML block for items
    const itemsHtml = order.items
      .map(
        (i) =>
          `<li>${i.name} × ${i.quantity} — $${i.price.toFixed(2)}</li>`
      )
      .join("");

    const shippingHtml = order.shipping
      ? `
        <h3>Shipping Address:</h3>
        <pre style="background:#f7f7f7;padding:10px;border-radius:6px;">
${JSON.stringify(order.shipping, null, 2)}
        </pre>
      `
      : "";

    // ✉️ 1. Email to customer
    await resend.emails.send({
      from: "Vitanixa Store <orders@vitanixa.com>",
      to: order.payer_email,
      subject: `Thank you for your order #${order.paypal_order_id}`,
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

    // ✉️ 2. Email to support with full order info
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

    console.log("✅ Emails sent successfully for order:", order.paypal_order_id);
  } catch (error) {
    console.error("❌ Error sending emails:", error);
  }
}

