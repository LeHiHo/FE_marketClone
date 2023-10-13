// route.ts
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const clientIp =
      req.connection.remoteAddress ||
      (req.headers['x-forwarded-for'] as string);
    const { email, password } = req.body;

    const apiResponse = await fetch(
      'https://api.mwt-market.store/api/v1/login',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': clientIp,
        },
        body: JSON.stringify({ email, password }),
      },
    );

    if (!apiResponse.ok) {
      return res.status(apiResponse.status).json({ error: 'Failed to login' });
    }

    const data = await apiResponse.json();
    return res.json({ data });
  } catch (error) {
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
