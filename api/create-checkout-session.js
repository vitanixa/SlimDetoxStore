import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  console.log('📥 API called', req.method);
  console.log('Environment secret key loaded:', !!process.env.STRIPE_SECRET_KEY);

  if (req.method !== 'POST') {
    console.log('❌ Wrong method', req.method);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const items = req.body.items;
    console.log('📦 Received items:', JSON.stringify(items, null, 2));

    // Validate shape
    if (!Array.isArray(items) || items.some(i => !i.name || !i.price || !i.quantity)) {
      console.error('❗ Invalid item format');
      return res.status(400).json({ error: 'Invalid items' });
    }

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image || ''],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    console.log('🔧 Stripe line items:', JSON.stringify(lineItems, null, 2));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    console.log('✅ Stripe session created:', session.id);
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('🛑 Stripe checkout session failed:', err);
    return res.status(500).json({ error: 'Stripe checkout session failed.' });
  }
}
