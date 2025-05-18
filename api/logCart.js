export default async function handler(req, res) {
  if (req.method === 'POST') {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;
    const { cart_contents } = req.body;

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
        cart_contents
      })
    });

    const data = await response.json();
    res.status(200).json({ status: 'logged', data });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
