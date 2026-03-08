import { useState } from 'react';
import styles from './EditPost.module.css';

interface EditPostProps {
  initialContent: string;
  slug: string;
}

export default function EditPost({ initialContent, slug }: EditPostProps) {
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const handleSave = async () => {
    setStatus('saving');
    try {
      const res = await fetch('/api/save-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, content }),
      });

      if (!res.ok) throw new Error('Save failed');
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 2500);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2500);
    }
  };

  return (
    <div className={styles.editorContainer}>
      <h4 className={styles.editorTitle}>Edit Post (Markdown)</h4>
      <textarea
        className={styles.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
      />
      <div className={styles.actions}>
        <button
          className={styles.saveBtn}
          onClick={handleSave}
          disabled={status === 'saving'}
        >
          {status === 'saving' ? 'Saving…' : status === 'saved' ? '✓ Saved!' : status === 'error' ? '✗ Error' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
