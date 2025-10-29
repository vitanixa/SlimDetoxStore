import { Resend } from "resend";

// Initialize Resend with environment key or fallback (for testing)
const resend = new Resend(
  process.env.RESEND_API_KEY || "re_BMgMbTK9_JNAe7Lk3csbujG5yMpEixhVW"
);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { payer_name, payer_email, amount, currency, items, shipping } = req.body;

    // Safety checks
    if (!payer_email) {
      return res.status(400).json({ error: "Missing payer_email" });
    }

    // Build email body
    const itemsHtml = (items || [])
      .map(
        (item) =>
          `<li>${item.quantity} × ${item.name} — $${item.price.toFixed(2)}</li>`
      )
      .join("");

    const addressHtml = shipping?.address
      ? `
        <p>
          <strong>Shipping Address:</strong><br/>
          ${shipping.address.address_line_1 || ""}<br/>
          ${shipping.address.admin_area_2 || ""}<br/>
          ${shipping.address.country_code || ""}
        </p>`
      : "";

    const htmlContent = `
      <div style="font-family:Arial,sans-serif;padding:20px;">
        <h2>Thank you, ${payer_name || "Customer"}!</h2>
        <p>We’ve received your payment of <strong>${amount} ${currency}</strong>.</p>
        <h3>Order Summary:</h3>
        <ul>${itemsHtml}</ul>
        ${addressHtml}
        <p>We’ll process and ship your order soon.</p>
        <p style="margin-top:20px;">— Slim Detox Team</p>
      </div>
    `;

    console.log("📧 Sending email via Resend for:", payer_email);

    // Send email
    const result = await resend.emails.send({
      from: "Slim Detox <support@vitanixa.com>",
      to: [payer_email, "support@vitanixa.com"], // send copy to store
      subject: `Order Confirmation — Slim Detox Store`,
      html: htmlContent,
    });

    console.log("✅ Email sent successfully:", result.id || result);

    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("❌ Email send failed:", error);
    return res.status(500).json({ error: error.message });
  }
}

