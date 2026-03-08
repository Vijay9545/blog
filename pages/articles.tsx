import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import posts from '../data/posts.json';
import styles from '../styles/Blog.module.css';

export default function Articles() {
  return (
    <Layout>
      <div className={styles.container} style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <h1 className={styles.title} style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'left' }}>All Articles</h1>
        
        <div className={styles.relatedGrid}>
          {posts.map(post => (
            <div key={post.slug} className={styles.relatedCard}>
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className={styles.relatedImageContainer}>
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.relatedImage} />
                </div>
                <div className={styles.relatedCardContent}>
                  <div className={styles.relatedTags} style={{ marginBottom: '0.5rem' }}>
                    <span className={styles.tag}>{post.date}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{post.title}</h3>
                  <div className={styles.relatedTags} style={{ marginTop: 'auto' }}>
                    <span className={styles.tag} style={{ color: 'var(--color-brand)' }}>{post.readTime}</span>
                    <span className={styles.tag} style={{ marginLeft: 'auto' }}>By {post.author}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
