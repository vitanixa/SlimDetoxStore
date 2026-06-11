import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_BMgMbTK9_JNAe7Lk3csbujG5yMpEixhVW");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      payer_name,
      payer_email,
      amount,
      currency = "USD",
      items = [],
      shipping,
      order_id,
      payment_method = "PayPal",
    } = req.body;

    if (!payer_email) {
      return res.status(400).json({ error: "Missing payer_email" });
    }

    const firstName = (payer_name || "Customer").split(" ")[0];
    const orderRef = (order_id || Date.now().toString()).slice(-8).toUpperCase();

    // Build items rows
    const itemRows = items.map((item) => `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #f0ebe3;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:48px;height:48px;background:#e8f0eb;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;">🍃</div>
            <div>
              <p style="margin:0;font-weight:700;color:#1a3328;font-size:14px;">${item.name}</p>
              <p style="margin:2px 0 0;color:#64748b;font-size:12px;">Qty: ${item.quantity} · 30 herbal tea bags</p>
            </div>
          </div>
        </td>
        <td style="padding:14px 0;border-bottom:1px solid #f0ebe3;text-align:right;font-weight:700;color:#1a3328;font-size:14px;vertical-align:top;">
          $${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>
    `).join("");

    const shippingLine = shipping?.address
      ? `${shipping.address.address_line_1 || ""}${shipping.address.address_line_2 ? ", " + shipping.address.address_line_2 : ""}, ${shipping.address.admin_area_2 || ""}, ${shipping.address.admin_area_1 || ""} ${shipping.address.postal_code || ""}`
      : "Will be confirmed via shipping notification";

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f8f5f0;font-family:'Helvetica Neue',Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f5f0;padding:40px 16px;">
    <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#0d1f15,#1a3328);border-radius:20px 20px 0 0;padding:40px 40px 32px;text-align:center;">
          <div style="display:inline-flex;align-items:center;gap:10px;margin-bottom:20px;">
            <div style="width:40px;height:40px;background:#C8973A;border-radius:10px;display:inline-flex;align-items:center;justify-content:center;font-size:20px;line-height:1;">🍃</div>
            <div style="text-align:left;">
              <p style="margin:0;color:white;font-size:20px;font-weight:800;letter-spacing:-0.02em;">Vitanixa</p>
              <p style="margin:0;color:rgba(255,255,255,0.4);font-size:10px;letter-spacing:0.15em;text-transform:uppercase;">Herbal Wellness</p>
            </div>
          </div>
          <div style="width:64px;height:64px;background:rgba(74,124,89,0.2);border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:32px;">✅</div>
          <h1 style="margin:0 0 8px;color:white;font-size:28px;font-weight:800;letter-spacing:-0.02em;">Order Confirmed!</h1>
          <p style="margin:0;color:rgba(255,255,255,0.6);font-size:15px;">Thank you, ${firstName}. Your wellness journey starts now.</p>
        </td>
      </tr>

      <!-- Order ref bar -->
      <tr>
        <td style="background:#C8973A;padding:12px 40px;display:flex;justify-content:space-between;align-items:center;">
          <table width="100%"><tr>
            <td style="color:white;font-size:12px;font-weight:600;">Order Reference</td>
            <td style="color:white;font-size:12px;font-weight:800;text-align:right;letter-spacing:0.1em;">#VTX-${orderRef}</td>
          </tr></table>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="background:white;padding:40px;">

          <!-- Greeting -->
          <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.7;">
            Hi <strong style="color:#1a3328;">${firstName}</strong>, we've received your order and it's being prepared with care. 
            You'll receive a shipping notification with tracking once your blends are on their way.
          </p>

          <!-- Items -->
          <h3 style="margin:0 0 4px;color:#1a3328;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;">Order Summary</h3>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
            ${itemRows}
            <tr>
              <td style="padding:14px 0 6px;color:#64748b;font-size:13px;">Shipping</td>
              <td style="padding:14px 0 6px;text-align:right;color:#4A7C59;font-size:13px;font-weight:700;">
                ${parseFloat(amount) >= 30 ? "Free 🎉" : "$4.99"}
              </td>
            </tr>
            <tr>
              <td style="padding:6px 0 0;color:#1a3328;font-size:17px;font-weight:800;border-top:2px solid #f0ebe3;">Total Paid</td>
              <td style="padding:6px 0 0;text-align:right;color:#1a3328;font-size:17px;font-weight:800;border-top:2px solid #f0ebe3;">$${parseFloat(amount).toFixed(2)} ${currency}</td>
            </tr>
          </table>

          <!-- Payment method badge -->
          <div style="margin:24px 0;padding:12px 16px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;display:inline-block;">
            <p style="margin:0;font-size:12px;color:#64748b;">
              💳 Paid via <strong style="color:#1a3328;">${payment_method}</strong> · Secured & encrypted
            </p>
          </div>

          <!-- Shipping address -->
          <h3 style="margin:24px 0 8px;color:#1a3328;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;">Shipping To</h3>
          <div style="background:#f8f5f0;border-radius:12px;padding:16px;border:1px solid #f0ebe3;">
            <p style="margin:0;color:#475569;font-size:13px;line-height:1.7;">
              <strong style="color:#1a3328;">${payer_name || "Customer"}</strong><br/>
              ${shippingLine}
            </p>
          </div>

          <!-- Tea ritual tip -->
          <div style="margin:32px 0 0;background:linear-gradient(135deg,#0d1f15,#1a3328);border-radius:16px;padding:24px;text-align:center;">
            <p style="margin:0 0 8px;color:#C8973A;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Your Wellness Ritual</p>
            <p style="margin:0;color:white;font-size:15px;font-weight:700;">🌅 SlimDetox in the morning</p>
            <p style="margin:4px 0 12px;color:white;font-size:15px;font-weight:700;">🌙 Night Blend before bed</p>
            <p style="margin:0;color:rgba(255,255,255,0.5);font-size:12px;">Steep 5–7 minutes · Feel the difference in 7 days</p>
          </div>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#1a3328;border-radius:0 0 20px 20px;padding:28px 40px;text-align:center;">
          <p style="margin:0 0 8px;color:rgba(255,255,255,0.5);font-size:12px;">Questions about your order?</p>
          <a href="mailto:support@vitanixa.com" style="color:#C8973A;font-size:13px;font-weight:700;text-decoration:none;">support@vitanixa.com</a>
          <p style="margin:20px 0 0;color:rgba(255,255,255,0.3);font-size:11px;line-height:1.6;">
            © ${new Date().getFullYear()} Vitanixa LLC · These statements have not been evaluated by the FDA.<br/>
            This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </td>
      </tr>

    </table>
    </td></tr>
  </table>

</body>
</html>`;

    // Send to customer + store copy
    const result = await resend.emails.send({
      from: "Vitanixa <support@vitanixa.com>",
      to: [payer_email],
      bcc: ["support@vitanixa.com"],
      subject: `Your Vitanixa Order is Confirmed 🍃 — #VTX-${orderRef}`,
      html: htmlContent,
    });

    console.log("✅ Email sent:", result.id || result);
    return res.status(200).json({ success: true, result });

  } catch (error) {
    console.error("❌ Email send failed:", error);
    return res.status(500).json({ error: error.message });
  }
}
