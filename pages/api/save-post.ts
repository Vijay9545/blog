import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { slug, content } = req.body;

  if (!slug || content === undefined) {
    return res.status(400).json({ message: 'Missing slug or content' });
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'posts.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const posts = JSON.parse(raw);

    const postIndex = posts.findIndex((p: { slug: string }) => p.slug === slug);
    if (postIndex === -1) {
      return res.status(404).json({ message: 'Post not found' });
    }

    posts[postIndex].content = content;
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf-8');

    return res.status(200).json({ message: 'Post saved successfully' });
  } catch (err) {
    console.error('Save post error:', err);
    return res.status(500).json({ message: 'Failed to save post' });
  }
}
