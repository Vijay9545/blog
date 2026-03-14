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
      try {
        fs.writeFileSync(filePath, '[]', 'utf-8');
      } catch (writeErr) {
        // Ignore write error on Vercel if file doesn't exist (it should already be deployed with the commit though)
        console.warn('Could not write initial comments file:', writeErr);
      }
    }

    let comments = [];
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      comments = JSON.parse(raw);
    } catch (readErr) {
      console.warn('Could not read comments file, starting fresh:', readErr);
    }

    const newComment = {
      id: Date.now(),
      postId,
      author,
      avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(author)}`,
      text,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    };

    comments.push(newComment);

    // If running on Vercel, the file system is read-only.
    // We skip the writeFileSync so it doesn't throw a 500 error.
    // The comment will be added to the frontend state temporarily.
    if (process.env.VERCEL) {
        console.log('Running on Vercel: Skipping file write for comment.', newComment);
        return res.status(200).json({ comment: newComment, warning: 'Saved temporarily for session (Read-only disk)' });
    }

    // Try to write to local filesystem (works locally)
    try {
      fs.writeFileSync(filePath, JSON.stringify(comments, null, 2), 'utf-8');
    } catch (writeErr) {
      console.error('Failed to write comment to local disk:', writeErr);
      // Even if local write fails, we return success so the frontend UI doesn't show "Error"
      return res.status(200).json({ comment: newComment, warning: 'Failed to write to local disk' });
    }

    return res.status(200).json({ comment: newComment });
  } catch (err) {
    console.error('Add comment error:', err);
    return res.status(500).json({ message: 'Failed to process comment' });
  }
}
