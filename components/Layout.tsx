import React from 'react';
import styles from './Layout.module.css';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <header className={styles.mainHeader}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logo}>
            FitnessBlog
          </Link>
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <Link href="/articles" className={styles.navLink}>Articles</Link>
            <Link href="/about" className={styles.navLink}>About</Link>
            <Link href="/contact" className={styles.navLink}>Contact Us</Link>
          </nav>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.navContainer} style={{ flexDirection: 'column' }}>
          <div className={styles.footerGrid}>
            <div className={styles.footerCol}>
              <div className={styles.footerLogo}>FitnessBlog</div>
              <p className={styles.footerDesc}>
                Empowering your wellness journey through evidence-based insights, expert guidance, and a supportive community. Join us in making fitness a lifelong habit.
              </p>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialIcon} aria-label="Twitter">𝕏</a>
                <a href="#" className={styles.socialIcon} aria-label="Facebook">f</a>
                <a href="#" className={styles.socialIcon} aria-label="Instagram">📷</a>
                <a href="#" className={styles.socialIcon} aria-label="YouTube">▶</a>
              </div>
            </div>

            <div className={styles.footerCol}>
              <h4 className={styles.footerHeading}>Explore</h4>
              <ul className={styles.footerLinks}>
                <li><Link href="/" className={styles.footerLink}>Home</Link></li>
                <li><Link href="/articles" className={styles.footerLink}>Articles</Link></li>
                <li><Link href="/about" className={styles.footerLink}>About Us</Link></li>
                <li><Link href="/contact" className={styles.footerLink}>Contact</Link></li>
              </ul>
            </div>

            <div className={styles.footerCol}>
              <h4 className={styles.footerHeading}>Categories</h4>
              <ul className={styles.footerLinks}>
                <li><Link href="#" className={styles.footerLink}>Strength Training</Link></li>
                <li><Link href="#" className={styles.footerLink}>Cardio & Endurance</Link></li>
                <li><Link href="#" className={styles.footerLink}>Nutrition</Link></li>
                <li><Link href="#" className={styles.footerLink}>Mental Wellness</Link></li>
              </ul>
            </div>

            <div className={styles.footerCol}>
              <h4 className={styles.footerHeading}>Legal</h4>
              <ul className={styles.footerLinks}>
                <li><Link href="#" className={styles.footerLink}>Privacy Policy</Link></li>
                <li><Link href="#" className={styles.footerLink}>Terms of Service</Link></li>
                <li><Link href="#" className={styles.footerLink}>Cookie Policy</Link></li>
                <li><Link href="#" className={styles.footerLink}>Disclaimer</Link></li>
              </ul>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>&copy; {new Date().getFullYear()} FitnessBlog. All rights reserved.</p>
            <p style={{ margin: 0 }}>Designed for a healthier everyday.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
