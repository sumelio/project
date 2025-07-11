import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.navContent}>
            <button className={styles.categoriesButton}>
              <span className={styles.menuIcon}>☰</span>
              Categories
            </button>
            
            <div className={styles.navLinks}>
              <a href="#" className={styles.navLink}>Offers</a>
              <a href="#" className={styles.navLink}>History</a>
              <a href="#" className={styles.navLink}>Supermarket</a>
              <a href="#" className={styles.navLink}>Fashion</a>
              <a href="#" className={styles.navLink}>Sell</a>
              <a href="#" className={styles.navLink}>Help</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 