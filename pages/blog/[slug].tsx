import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import postsData from '../../data/posts.json';
import Comments from '../../components/Comments';
import Layout from '../../components/Layout';
import styles from '../../styles/Blog.module.css';

// Dynamically import the Edit component
const EditPost = dynamic(() => import('../../components/EditPost'), {
  loading: () => <p className={styles.loadingEditor}>Loading component...</p>,
});

interface NavigationPost {
  title: string;
  slug: string;
}

interface BlogPostProps {
  post: typeof postsData[0];
  prevPost: NavigationPost | null;
  nextPost: NavigationPost | null;
}

export default function BlogPost({ post, prevPost, nextPost }: BlogPostProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (!post) return <div>Post not found</div>;

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>

      <article className={styles.article}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>{post.title}</h1>
          </header>

          <div className={styles.heroContainer}>
            <Image
              src={post.image}
              alt={post.title}
              sizes="(max-width: 1000px) 100vw, 1000px"
              fill
              className={styles.heroImage}
              priority
            />
          </div>

          <div className={styles.contentWrapper}>
            <aside className={styles.socialShare}>
              <button aria-label="Share" className={styles.shareButton}>♡</button>
              <button aria-label="Share" className={styles.shareButton}>💬</button>
              <button aria-label="Share" className={styles.shareButton}>🔗</button>
            </aside>

            <div className={styles.mainContent}>
              <div className={styles.articleMeta}>
                <div className={styles.metaAuthor}>
                  <Image src={post.avatar} alt={post.author} width={36} height={36} className={styles.metaAvatar} />
                  <span className={styles.metaName}>{post.author.toUpperCase()}</span>
                </div>
                <span className={styles.metaDate}>{post.date.toUpperCase()}</span>
              </div>
              <hr className={styles.metaDivider} />

              <div
                className={styles.bodyContent}
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n\n/g, '<br/><br/>') }}
              />

              <div className={styles.editSection}>
                <button
                  className={styles.editButton}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel Edit' : 'Edit Post'}
                </button>
                {isEditing && <div className={styles.editWrapper}><EditPost initialContent={post.content} slug={post.slug} /></div>}
              </div>

              <hr className={styles.divider} />

              <div className={styles.bottomAuthor}>
                <h3 className={styles.bottomAuthorTitle}>About {post.author}</h3>
                <div className={styles.bottomAuthorAvatar}>
                  <Image src={post.avatar} alt={post.author} width={80} height={80} className={styles.bottomAvatarImage} />
                </div>
                <p className={styles.bottomAuthorBio}>
                  With over a decade of experience in the fitness industry, {post.author} specializes in strength training and functional fitness. Certified by NASM and known for his motivational style, {post.author.split(' ')[0]} designs workout programs that are both challenging and achievable. His passion lies in helping clients build strength and confidence through personalized training routines. Outside the gym, {post.author.split(' ')[0]} is an avid runner and enjoys outdoor adventures.
                </p>
              </div>

              <div className={styles.postNavigation}>
                {prevPost ? (
                  <Link href={`/blog/${prevPost.slug}`} className={styles.navButton}>
                    <div><span className={styles.navIcon}>←</span> Previous</div>
                    <span className={styles.navSubtext}>{prevPost.title}</span>
                  </Link>
                ) : <div />}

                {nextPost ? (
                  <Link href={`/blog/${nextPost.slug}`} className={styles.navButtonRight}>
                    <div>Next <span className={styles.navIcon}>→</span></div>
                    <span className={styles.navSubtext}>{nextPost.title}</span>
                  </Link>
                ) : <div />}
              </div>

              <Comments postId={post.slug} />
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.sidebarSection}>
                <h3 className={styles.sidebarTitle}>Explore more</h3>
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
      <section className={styles.relatedSection}>
        <div className={styles.containerRelated}>
          <h2 className={styles.relatedTitle}>Related articles</h2>
          <div className={styles.relatedGrid}>
            {[
              { id: 1, title: 'The Ultimate Guide To Full-Body Workouts', author: 'Alex Carter', img: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&h=300&fit=crop', desc: 'Discover exercises that target every muscle group, helping you build strength and endurance.' },
              { id: 2, title: '5 Tips For Better Cardio Sessions', author: 'Maya Lee', img: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&h=300&fit=crop', desc: 'Improve your cardio performance with these simple yet effective techniques to maximize st..' },
              { id: 3, title: 'Meal Prep Basics For Gym Enthusiasts', author: 'Jordan Smith', img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop', desc: 'Fuel your workouts with balanced, easy-to-prepare meals. A guide on planning, prepping..' },
              { id: 4, title: 'Building Core Strength: Exercises And Benefits', author: 'Emma Rodriguez', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop', desc: 'A strong core is essential for stability and injury prevention. Learn the best exercises..' }
            ].map((item) => (
              <div key={item.id} className={styles.relatedCard}>
                <div className={styles.relatedImageContainer}>
                  <Image src={item.img} alt="Related" fill sizes="(max-width: 768px) 100vw, 25vw" className={styles.relatedImage} />
                </div>
                <div className={styles.relatedCardContent}>
                  <h3>{item.title}</h3>
                  <p className={styles.relatedDesc}>{item.desc}</p>
                  <div className={styles.relatedTags}>
                    <span className={styles.tag}>By {item.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postsData.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postIndex = postsData.findIndex((p) => p.slug === params?.slug);
  const post = postsData[postIndex] || null;

  const prevPost = postIndex > 0 ? postsData[postIndex - 1] : null;
  const nextPost = postIndex < postsData.length - 1 && postIndex !== -1 ? postsData[postIndex + 1] : null;

  return {
    props: {
      post,
      prevPost: prevPost ? { title: prevPost.title, slug: prevPost.slug } : null,
      nextPost: nextPost ? { title: nextPost.title, slug: nextPost.slug } : null,
    },
  };
};
