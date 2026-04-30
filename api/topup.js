const crypto = require('crypto');

const DIGI_USER = process.env.DIGI_USER;
const DIGI_KEY  = process.env.DIGI_KEY;
const DIGI_URL  = 'https://api.digiflazz.com/v1/transaction';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { customer_no, buyer_sku_code, ref_id } = req.body || {};

  if (!customer_no || !buyer_sku_code || !ref_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!/^\d{6,20}$/.test(customer_no)) {
    return res.status(400).json({ error: 'Invalid customer_no format' });
  }

  const sign = crypto
    .createHash('md5')
    .update(DIGI_USER + DIGI_KEY + ref_id)
    .digest('hex');

  try {
    const response = await fetch(DIGI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: DIGI_USER,
        buyer_sku_code,
        customer_no,
        ref_id,
        sign,
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Digiflazz request failed' });
  }
};
