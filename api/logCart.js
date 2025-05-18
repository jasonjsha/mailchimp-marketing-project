export default async function handler(req, res) {
  if (req.method === 'POST') {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

    const { cart } = req.body;

    if (!cart || typeof cart !== 'object') {
      return res.status(400).json({ error: 'Invalid cart format' });
    }

    const cartArray = Object.values(cart).map(item => ({
      name: item.name,
      quantity: item.quantity,
      unit_price: typeof item.case_price === "string"
        ? parseFloat(item.case_price.replace('$', ''))
        : item.case_price,
      units_per_case: item.units_per_case
    }));

    const response = await fetch(`${SUPABASE_URL}/rest/v1/visits`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_API_KEY,
        Authorization: `Bearer ${SUPABASE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page: 'cart_submission',
        timestamp: new Date().toISOString(),
        cart_contents: cartArray
      })
    });

    const data = await response.json();
    res.status(200).json({ message: 'Cart logged', data });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
