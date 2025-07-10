import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.topBarContent}>
            <div className={styles.leftSection}>
              <span className={styles.location}>
                <span className={styles.locationIcon}>📍</span>
                Ship to Colombia
              </span>
            </div>
            <div className={styles.rightSection}>
              <a href="#" className={styles.topLink}>Create account</a>
              <a href="#" className={styles.topLink}>Sign in</a>
              <a href="#" className={styles.topLink}>My purchases</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={styles.mainHeader}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            {/* Logo */}
            <div className={styles.logoSection}>
              <h1 className={styles.logo}>
                <span className={styles.logoText}>MarketPlace</span>
              </h1>
            </div>

            {/* Search Bar */}
            <div className={styles.searchSection}>
              <form className={styles.searchForm}>
                <input
                  type="text"
                  placeholder="Search products, brands and more..."
                  className={styles.searchInput}
                />
                <button type="submit" className={styles.searchButton}>
                  <span className={styles.searchIcon}>🔍</span>
                </button>
              </form>
            </div>

            {/* Right Actions */}
            <div className={styles.actionsSection}>
              <button className={styles.actionButton}>
                <span className={styles.actionIcon}>🔔</span>
                <span className={styles.actionText}>Notifications</span>
              </button>
              <button className={styles.actionButton}>
                <span className={styles.actionIcon}>🛒</span>
                <span className={styles.actionText}>Cart</span>
                <span className={styles.cartBadge}>3</span>
              </button>
            </div>
          </div>
        </div>
      </div>

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