export default async function handler(req, res) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

  const response = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
    headers: {
      apikey: SUPABASE_API_KEY,
      Authorization: `Bearer ${SUPABASE_API_KEY}`
    }
  });

  const data = await response.json();
  res.status(200).json(data);
}
