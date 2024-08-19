import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ message: 'URL parameter is required.' });
  }

  try {
    const indexNowKey = '501fa2ba8c064f52b16ec288720b1488'; // Your IndexNow API key
    const indexNowEndpoint = `https://www.bing.com/indexnow?url=${url}&key=${indexNowKey}`;

    const response = await axios.get(indexNowEndpoint);

    if (response.status === 200) {
      return res.status(200).json({ message: 'URL successfully submitted to IndexNow.' });
    } else {
      return res.status(500).json({ message: 'Failed to submit URL to IndexNow.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error occurred while submitting URL to IndexNow.', error });
  }
}
