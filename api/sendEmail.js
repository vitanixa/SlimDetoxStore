import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY || "re_BMgMbTK9_JNAe7Lk3csbujG5yMpEixhVW"
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("🔑 Using RESEND_API_KEY:", !!process.env.RESEND_API_KEY);

    const data = req.body;

    const emailResponse = await resend.emails.send({
      from: "Slim Detox <support@vitanixa.com>",
      to: data.payer_email || "support@vitanixa.com",
      subject: `Order Confirmation - ${data.payer_name || "Customer"}`,
      html: `
        <h2>Thank you for your order, ${data.payer_name}!</h2>
        <p>Order amount: ${data.amount} ${data.currency}</p>
      `,
    });

    console.log("✅ Email sent:", emailResponse);
    return res.status(200).json({ success: true, data: emailResponse });
  } catch (error) {
    console.error("❌ Email send failed:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}

