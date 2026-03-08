import Layout from '../components/Layout';
import styles from '../styles/Blog.module.css';
import { useState } from 'react';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 500);
  };

  return (
    <Layout>
      <div className={styles.container} style={{ paddingTop: '4rem', paddingBottom: '4rem', maxWidth: '800px' }}>
        <h1 className={styles.title} style={{ marginBottom: '1rem', textAlign: 'center' }}>Get in Touch</h1>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>
          Have a question about fitness, nutrition, or our articles? We'd love to hear from you.
        </p>
        
        <div style={{ background: 'var(--color-bg-alt)', padding: '3rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <h3 style={{ color: 'var(--color-brand)', marginBottom: '1rem', fontFamily: 'var(--font-serif)', fontSize: '1.75rem' }}>Thank You!</h3>
              <p style={{ color: 'var(--color-text-main)' }}>Your message has been sent successfully. We will get back to you soon.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className={styles.editButton}
                style={{ marginTop: '2rem' }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className={styles.contactFormGrid}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="firstName" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>First Name</label>
                  <input required type="text" id="firstName" style={{ padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-bg-main)' }} placeholder="Jane" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="lastName" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>Last Name</label>
                  <input required type="text" id="lastName" style={{ padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-bg-main)' }} placeholder="Doe" />
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="email" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>Email Address</label>
                <input required type="email" id="email" style={{ padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-bg-main)' }} placeholder="jane@example.com" />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="subject" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>Subject</label>
                <input required type="text" id="subject" style={{ padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-bg-main)' }} placeholder="How can we help you?" />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="message" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-main)' }}>Message</label>
                <textarea required id="message" rows={6} style={{ padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', background: 'var(--color-bg-main)', resize: 'vertical' }} placeholder="Write your message here..."></textarea>
              </div>
              
              <button type="submit" style={{ backgroundColor: 'var(--color-brand)', color: 'white', border: 'none', padding: '1rem', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', marginTop: '1rem', transition: 'opacity 0.2s' }}>
                Send Message
              </button>
            </form>
          )}
        </div>
        
        <div className={styles.contactInfoGrid}>
          <div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📍</div>
            <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Visit Us</h4>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>123 Fitness Street<br/>Healthy City, HC 12345</p>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📞</div>
            <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Call Us</h4>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>+1 (555) 123-4567<br/>Mon-Fri, 9am-5pm</p>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✉️</div>
            <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Email Us</h4>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>hello@fitnessblog.com<br/>support@fitnessblog.com</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
