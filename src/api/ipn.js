export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const body = req.body;
  const validationBody = new URLSearchParams({ ...body, cmd: '_notify-validate' }).toString();

  const paypalRes = await fetch('https://ipnpb.paypal.com/cgi-bin/webscr', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: validationBody,
  });

  const text = await paypalRes.text();

  if (text === 'VERIFIED') {
    console.log('✅ Verified IPN:', body);

    // Send yourself an email (replace this with EmailJS or SendGrid if needed)
    // For now, we’ll just log to Vercel
    return res.status(200).send('IPN Received');
  } else {
    console.warn('⚠️ Invalid IPN:', body);
    return res.status(400).send('IPN Invalid');
  }
}

