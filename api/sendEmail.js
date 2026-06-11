const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY || "re_BMgMbTK9_JNAe7Lk3csbujG5yMpEixhVW");

module.exports = async function handler(req, res) {
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

    const itemRows = items.map((item) => `
      <tr>
        <td style="padding:14px 0;border-bottom:1px solid #f0ebe3;">
          <p style="margin:0;font-weight:700;color:#1a3328;font-size:14px;">${item.name}</p>
          <p style="margin:2px 0 0;color:#64748b;font-size:12px;">Qty: ${item.quantity} &nbsp;&middot;&nbsp; 30 herbal tea bags</p>
        </td>
        <td style="padding:14px 0;border-bottom:1px solid #f0ebe3;text-align:right;font-weight:700;color:#1a3328;font-size:14px;vertical-align:top;">
          $${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>
    `).join("");

    const shippingLine = shipping?.address
      ? `${shipping.address.address_line_1 || ""}, ${shipping.address.admin_area_2 || ""}, ${shipping.address.admin_area_1 || ""} ${shipping.address.postal_code || ""}`
      : "Will be confirmed via shipping notification";

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f8f5f0;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f5f0;padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <tr>
    <td style="background:#0d1f15;border-radius:20px 20px 0 0;padding:40px;text-align:center;">
      <p style="margin:0 0 6px;font-size:22px;font-weight:800;color:white;letter-spacing:-0.02em;">🍃 Vitanixa</p>
      <p style="margin:0 0 24px;font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:0.15em;text-transform:uppercase;">Herbal Wellness</p>
      <p style="margin:0 0 8px;font-size:32px;">✅</p>
      <h1 style="margin:0 0 8px;color:white;font-size:26px;font-weight:800;">Order Confirmed!</h1>
      <p style="margin:0;color:rgba(255,255,255,0.6);font-size:15px;">Thank you, ${firstName}. Your wellness journey starts now.</p>
    </td>
  </tr>

  <tr>
    <td style="background:#C8973A;padding:12px 40px;">
      <table width="100%"><tr>
        <td style="color:white;font-size:12px;font-weight:600;">Order Reference</td>
        <td style="color:white;font-size:12px;font-weight:800;text-align:right;letter-spacing:0.1em;">#VTX-${orderRef}</td>
      </tr></table>
    </td>
  </tr>

  <tr>
    <td style="background:white;padding:40px;">
      <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.7;">
        Hi <strong style="color:#1a3328;">${firstName}</strong>, we've received your order and it's being prepared with care.
        You'll receive a shipping notification with tracking once your blends are on their way.
      </p>

      <h3 style="margin:0 0 8px;color:#1a3328;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;">Order Summary</h3>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${itemRows}
        <tr>
          <td style="padding:12px 0 4px;color:#64748b;font-size:13px;">Shipping</td>
          <td style="padding:12px 0 4px;text-align:right;color:#4A7C59;font-size:13px;font-weight:700;">Free</td>
        </tr>
        <tr>
          <td style="padding:8px 0 0;color:#1a3328;font-size:17px;font-weight:800;border-top:2px solid #f0ebe3;">Total Paid</td>
          <td style="padding:8px 0 0;text-align:right;color:#1a3328;font-size:17px;font-weight:800;border-top:2px solid #f0ebe3;">$${parseFloat(amount).toFixed(2)} ${currency}</td>
        </tr>
      </table>

      <div style="margin:20px 0;padding:12px 16px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;">
        <p style="margin:0;font-size:12px;color:#64748b;">
          💳 Paid via <strong style="color:#1a3328;">${payment_method}</strong> &nbsp;&middot;&nbsp; Secured &amp; encrypted
        </p>
      </div>

      <h3 style="margin:24px 0 8px;color:#1a3328;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.1em;">Shipping To</h3>
      <div style="background:#f8f5f0;border-radius:12px;padding:16px;border:1px solid #f0ebe3;">
        <p style="margin:0;color:#475569;font-size:13px;line-height:1.7;">
          <strong style="color:#1a3328;">${payer_name || "Customer"}</strong><br/>
          ${shippingLine}
        </p>
      </div>

      <div style="margin:32px 0 0;background:#0d1f15;border-radius:16px;padding:24px;text-align:center;">
        <p style="margin:0 0 8px;color:#C8973A;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Your Wellness Ritual</p>
        <p style="margin:0;color:white;font-size:15px;font-weight:700;">🌅 SlimDetox in the morning</p>
        <p style="margin:4px 0 12px;color:white;font-size:15px;font-weight:700;">🌙 Night Blend before bed</p>
        <p style="margin:0;color:rgba(255,255,255,0.5);font-size:12px;">Steep 5–7 minutes &nbsp;&middot;&nbsp; Feel the difference in 7 days</p>
      </div>
    </td>
  </tr>

  <tr>
    <td style="background:#1a3328;border-radius:0 0 20px 20px;padding:28px 40px;text-align:center;">
      <p style="margin:0 0 6px;color:rgba(255,255,255,0.5);font-size:12px;">Questions about your order?</p>
      <a href="mailto:support@vitanixa.com" style="color:#C8973A;font-size:13px;font-weight:700;text-decoration:none;">support@vitanixa.com</a>
      <p style="margin:20px 0 0;color:rgba(255,255,255,0.3);font-size:11px;line-height:1.6;">
        &copy; ${new Date().getFullYear()} Vitanixa LLC &nbsp;&middot;&nbsp; These statements have not been evaluated by the FDA.
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;

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
};
