import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body;
    console.log("📩 Received order:", body);

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Use temporary verified sender
    const { data, error } = await resend.emails.send({
      from: "Slim Detox Store <onboarding@resend.dev>", // ✅ temporary sender
      to: body.payer_email || "support@vitanixa.com",
      subject: "Order Confirmation",
      html: `
        <h2>Thank you for your order, ${body.payer_name || "Customer"}!</h2>
        <p>Amount: ${body.amount} ${body.currency}</p>
        <p>Your order has been received and is being processed.</p>
      `,
    });

    if (error) throw new Error(error.message);

    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("❌ Email send failed:", err);
    return res.status(500).json({ error: err.message });
  }
}

