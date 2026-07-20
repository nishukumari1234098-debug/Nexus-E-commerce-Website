import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Upper Grid Layout */}
      <div className={styles.footerGrid}>
        
        {/* Brand Information Column */}
        <div className={styles.footerBrand}>
          <h3>Nexus<span>Portal</span></h3>
          <p>An elite, resume-grade e-commerce storefront & admin micro-system built with React and cutting-edge web methodologies.</p>
          <div className={styles.socialIcons}>
            <a href="https://github.com" target="_blank" rel="noreferrer">📁</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">💼</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">🌐</a>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className={styles.footerCol}>
          <h4>Shop Navigation</h4>
          <ul className={styles.footerLinks}>
            <li><Link to="/">Home Dashboard</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
          </ul>
        </div>

        {/* Tech Stack Highlights */}
        <div className={styles.footerCol}>
          <h4>Architecture Stack</h4>
          <ul className={styles.footerLinks}>
            <li>React Router v6</li>
            <li>React Context & Reducers</li>
            <li>TanStack Query (React Query)</li>
            <li>CSS Modules System</li>
          </ul>
        </div>

        {/* Contact/Verification Disclaimer */}
        <div className={styles.footerCol}>
          <h4>Project Scope</h4>
          <ul className={styles.footerLinks}>
            <li>Academic Capstone Project</li>
            <li>Mock Authentication Engine</li>
            <li>Fully Secure Routing Guard</li>
          </ul>
        </div>

      </div>

      {/* Lower Copyright Strip */}
      <div className={styles.footerBottom}>
        &copy; 2026 Nexus E-Commerce. Built with architectural integrity. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;