import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  console.log('Proxy API called with URL:', url);

  if (!url || typeof url !== 'string') {
    console.log('Error: URL is missing or invalid');
    return res.status(400).json({ error: 'URL required' });
  }

  try {
    console.log('Fetching URL:', url);
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NeoSearch/1.0)',
      },
    });
    console.log('Fetch response status:', response.status);

    const buffer = await response.arrayBuffer();
    res.status(response.status).send(Buffer.from(buffer));
    console.log('Proxy response sent successfully');
  } catch (err) {
    console.error('Error in proxy API:', err);
    res.status(500).json({ error: 'Fetch failed' });
  }
}
