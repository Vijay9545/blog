import Layout from '../components/Layout';
import Image from 'next/image';
import styles from '../styles/Blog.module.css';

export default function About() {
  return (
    <Layout>
      <div className={styles.container} style={{ paddingTop: '4rem', paddingBottom: '6rem', maxWidth: '1000px' }}>
        <h1 className={styles.title}>About FitnessBlog</h1>
        <p style={{ textAlign: 'center', fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '4rem', maxWidth: '800px', marginInline: 'auto', lineHeight: 1.6 }}>
          Empowering your wellness journey through evidence-based insights, expert guidance, and a supportive community.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center', marginBottom: '5rem' }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}>
            <Image 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=675&fit=crop" 
              alt="People working out together" 
              fill 
              style={{ objectFit: 'cover' }} 
            />
          </div>
        </div>

        <div className={styles.bodyContent} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
            <div>
              <h3 className={styles.sidebarTitle} style={{ marginTop: 0, borderBottom: 'none' }}>Our Mission</h3>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-text-main)' }}>
                At FitnessBlog, we believe that true health is holistic. Our mission is to cut through industry noise and provide you with actionable, scientifically-backed information. We strive to make premium fitness knowledge accessible to everyone, from seasoned athletes to those taking their first steps toward a healthier lifestyle.
              </p>
            </div>
            <div>
              <h3 className={styles.sidebarTitle} style={{ marginTop: 0, borderBottom: 'none' }}>Our Approach</h3>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-text-main)' }}>
                We partner with certified trainers, registered dietitians, and medical professionals to ensure every article meets the highest standards of accuracy. Whether we're exploring the nuances of strength programming or delving into nutritional science, our commitment remains steadfast: delivering content you can trust and apply.
              </p>
            </div>
          </div>

          <hr style={{ border: '0', height: '1px', background: 'var(--color-border)', margin: '4rem 0' }} />

          <div style={{ textAlign: 'center' }}>
            <h3 className={styles.relatedTitle} style={{ textAlign: 'center' }}>The Team Behind the Insights</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              {[
                { name: 'Dr. Sarah Jenkins', role: 'Head of Nutrition', image: 'https://i.pravatar.cc/300?u=sarah' },
                { name: 'Marcus Chen', role: 'Lead Strength Coach', image: 'https://i.pravatar.cc/300?u=marcus' },
                { name: 'Elena Rodriguez', role: 'Wellness Editor', image: 'https://i.pravatar.cc/300?u=elena' }
              ].map((member, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', marginBottom: '1rem', border: '3px solid var(--color-bg-alt)' }}>
                    <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', color: 'var(--color-text-main)' }}>{member.name}</h4>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{member.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
