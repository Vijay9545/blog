import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// In production (Railway), use the mounted persistent volume at /app/data
// In development, use the local data/ folder
const DATA_DIR =
  process.env.NODE_ENV === 'production' && process.env.RAILWAY_VOLUME_MOUNT_PATH
    ? process.env.RAILWAY_VOLUME_MOUNT_PATH
    : path.join(process.cwd(), 'data');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { postId, author, text } = req.body;

  if (!postId || !author || !text) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const filePath = path.join(DATA_DIR, 'comments.json');

    // Ensure the directory exists (important on first run with a fresh volume)
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Seed empty array if file doesn't exist on the volume yet
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '[]', 'utf-8');
    }

    const raw = fs.readFileSync(filePath, 'utf-8');
    const comments = JSON.parse(raw);

    const newComment = {
      id: Date.now(),
      postId,
      author,
      avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(author)}`,
      text,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    };

    comments.push(newComment);
    fs.writeFileSync(filePath, JSON.stringify(comments, null, 2), 'utf-8');

    return res.status(200).json({ comment: newComment });
  } catch (err) {
    console.error('Add comment error:', err);
    return res.status(500).json({ message: 'Failed to add comment' });
  }
}
