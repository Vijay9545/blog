import { useState, useEffect } from 'react';
import styles from './Comments.module.css';
import Image from 'next/image';

interface Comment {
  id: number;
  postId: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
}

export default function Comments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const commentsData = (await import('../data/comments.json')).default;
        const postComments = commentsData.filter(c => c.postId === postId);
        setComments(postComments as Comment[]);
      } catch {
        setError('Failed to load comments.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async () => {
    if (!name.trim() || !text.trim()) {
      alert('Please fill in your name and comment.');
      return;
    }

    setSendStatus('sending');
    try {
      const res = await fetch('/api/add-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, author: name.trim(), text: text.trim() }),
      });

      if (!res.ok) throw new Error('Failed');
      const { comment } = await res.json();

      // Append the new comment to the displayed list immediately
      setComments((prev) => [...prev, comment]);
      setName('');
      setEmail('');
      setText('');
      setSendStatus('sent');
      setTimeout(() => setSendStatus('idle'), 2500);
    } catch {
      setSendStatus('error');
      setTimeout(() => setSendStatus('idle'), 2500);
    }
  };

  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <section className={styles.commentsSection}>
      <h3 className={styles.commentsTitle}>Comments</h3>
      <div className={styles.commentsList}>
        {isLoading ? (
          <>
            <div className={styles.skeletonComment}></div>
            <div className={styles.skeletonComment}></div>
          </>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <Image src={comment.avatar} alt={comment.author} width={40} height={40} className={styles.commentAvatar} />
              <div className={styles.commentBody}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentAuthor}>{comment.author}</span>
                  <div className={styles.commentRating}>
                    {'⭐'.repeat(5)} <span className={styles.ratingText}>(5.0)</span>
                  </div>
                  <span className={styles.commentDate}>{comment.date}</span>
                </div>
                <p className={styles.commentText}>{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className={styles.addCommentSection}>
        <h3 className={styles.addCommentTitle}>Add A Comment</h3>

        <div className={styles.formGrid}>
          <div className={styles.formLeft}>
            <div className={styles.inputGroup}>
              <label>Name</label>
              <input
                type="text"
                className={styles.inputField}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                className={styles.inputField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.formRight}>
            <div className={styles.inputGroup}>
              <label>Comment</label>
              <textarea
                placeholder="Write your comment..."
                className={styles.textareaField}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.formFooter}>
          <div className={styles.ratingSection}>
            <span className={styles.ratingLabel}>Rate The Usefulness Of The Article</span>
            <div className={styles.ratingIcons}>
              <span className={styles.emojiIcon}>😣</span>
              <span className={styles.emojiIcon}>😕</span>
              <span className={styles.emojiIcon}>😐</span>
              <span className={styles.emojiIcon}>🙂</span>
            </div>
            <button className={styles.goodButton}>
              <span className={styles.btnEmoji}>😀</span> Good
            </button>
          </div>

          <button
            className={styles.sendButton}
            onClick={handleSubmit}
            disabled={sendStatus === 'sending'}
          >
            <span className={styles.btnEmoji}>💬</span>{' '}
            {sendStatus === 'sending' ? 'Sending…' : sendStatus === 'sent' ? '✓ Sent!' : sendStatus === 'error' ? '✗ Error' : 'Send'}
          </button>
        </div>
      </div>
    </section>
  );
}
