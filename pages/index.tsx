import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import posts from '../data/posts.json';
import styles from '../styles/Blog.module.css';

export default function Home() {
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <Layout>
      <article className={styles.article}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>Welcome to FitnessBlog</h1>
          </header>

          <Link href={`/blog/${featuredPost.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div className={styles.heroContainer} style={{ cursor: 'pointer', overflow: 'hidden' }}>
              <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  sizes="(max-width: 1000px) 100vw, 1000px"
                  fill
                  className={styles.heroImage}
                  priority
                />
              </div>
              <div className={styles.heroTextContainer}>
                 <div className={styles.relatedTags} style={{ marginBottom: '0.75rem' }}>
                    <span className={styles.tag} style={{ color: 'var(--color-brand)', background: 'white', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>Featured</span>
                 </div>
                 <h2 className={styles.heroContentTitle}>{featuredPost.title}</h2>
              </div>
            </div>
          </Link>

          <div className={styles.contentWrapper}>
            <div className={styles.mainContent}>
              <h3 className={styles.sidebarTitle} style={{ marginTop: 0 }}>Latest Articles</h3>
              <div className={styles.otherPostsContainer} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {otherPosts.map(post => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.postCardLink} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: '1.5rem', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '2rem' }}>
                    <div className={styles.postCardImageWrapper} style={{ position: 'relative', width: '220px', height: '150px', flexShrink: 0, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                       <Image src={post.image} alt={post.title} fill sizes="(max-width: 640px) 100vw, 220px" style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className={styles.relatedTags} style={{ marginBottom: '0.5rem' }}>
                        <span className={styles.tag}>{post.date}</span>
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: '0.5rem 0', color: 'var(--color-brand)', lineHeight: 1.4 }}>{post.title}</h4>
                      <p style={{ fontSize: '0.95rem', color: 'var(--color-text-main)', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.content.split('\n')[0]}
                      </p>
                      <div className={styles.relatedTags}>
                        <span className={styles.tag} style={{ color: 'var(--color-brand)' }}>{post.readTime}</span>
                        <span className={styles.tag}>By {post.author}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle} style={{ marginTop: 0 }}>Explore more</h3>
                <div className={styles.sidebarGrid}>
                  {[
                    { id: 1, type: 'Culinary', date: '15 Jan 2022', title: 'Two women in local stand are chatting during morning..', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop' },
                    { id: 2, type: 'Travel', date: '22 Jul 2022', title: 'Enjoying the sunset on Padar Island together', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop' },
                    { id: 3, type: 'Travel', date: '22 Jul 2022', title: 'The lush green surroundings of the campgrounds create a..', img: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=400&h=300&fit=crop' }
                  ].map((item) => (
                    <div key={item.id} className={styles.sidebarCard}>
                      <div className={styles.sidebarImageContainer}>
                        <Image src={item.img} alt={item.title} fill sizes="300px" className={styles.sidebarImage} />
                      </div>
                      <div className={styles.sidebarCardContent}>
                        <div className={styles.sidebarCardMeta}>
                          <span className={styles.sidebarCardType}>{item.type}</span>
                          <span className={styles.sidebarCardDate}>{item.date}</span>
                        </div>
                        <h4>{item.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>Tour Guides</h3>
                <div className={styles.tourGuidesList}>
                  {[
                    { name: 'Miranda Rachel', location: 'Jombang, Jawa Timur', rating: '4.0', avatar: 'https://i.pravatar.cc/150?u=miranda' },
                    { name: 'Danielle Marsh', location: 'Wonosobo, Jawa Ten..', rating: '4.0', avatar: 'https://i.pravatar.cc/150?u=danielle' },
                    { name: 'Kang Haorin', location: 'Bandung, Jawa Barat', rating: '5.0', avatar: 'https://i.pravatar.cc/150?u=kang' }
                  ].map((guide, idx) => (
                    <div key={idx} className={styles.guideCard}>
                      <Image src={guide.avatar} alt={guide.name} width={40} height={40} className={styles.guideAvatar} />
                      <div className={styles.guideInfo}>
                        <span className={styles.guideName}>{guide.name}</span>
                        <span className={styles.guideLocation}>📍 {guide.location}</span>
                        <div className={styles.guideRating}>
                          {'⭐'.repeat(Math.round(parseFloat(guide.rating)))} ({guide.rating})
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </Layout>
  );
}
