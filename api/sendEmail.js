import { Resend } from "resend";

const resend = new Resend("re_BMgMbTK9_JNAe7Lk3csbujG5yMpEixhVW");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const order = req.body;

    // ✅ send to both buyer and store
    const recipients = [
      order.payer_email,
      "support@vitanixa.com"
    ];

    await resend.emails.send({
      from: "Vitanixa Store <orders@vitanixa.com>",
      to: recipients,
      subject: `New Vitanixa Order #${order.id}`,
      html: `
        <h2>New Order Received</h2>
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Customer:</strong> ${order.payer_name}</p>
        <p><strong>Email:</strong> ${order.payer_email}</p>
        <p><strong>Amount:</strong> $${order.amount} ${order.currency}</p>

        ${order.shipping ? `
        <h3>Shipping:</h3>
        <pre>${JSON.stringify(order.shipping, null, 2)}</pre>
        ` : ""}

        <h3>Items:</h3>
        <ul>
          ${order.items.map(i => `
            <li>${i.name} × ${i.quantity} — $${i.price}</li>
          `).join("")}
        </ul>

        <p>🪷 Thank you for choosing Vitanixa.</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Email send error:", err);
    res.status(500).json({ error: err.message });
  }
}

