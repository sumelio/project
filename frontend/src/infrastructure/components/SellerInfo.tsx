import React from 'react';
import styles from './SellerInfo.module.css';

interface SellerInfoProps {
  sellerInfo: string;
}

const SellerInfo: React.FC<SellerInfoProps> = ({ sellerInfo }) => {
  return (
    <div className={styles.sellerCard}>
      <h4 className={styles.title}>Seller Information</h4>
      
      <div className={styles.sellerDetails}>
        <div className={styles.sellerName}>
          <span className={styles.icon}>👤</span>
          <span className={styles.name}>{sellerInfo}</span>
        </div>
        
        <div className={styles.sellerStats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>4.8</span>
            <span className={styles.statLabel}>⭐ Rating</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>1,234</span>
            <span className={styles.statLabel}>📦 Sales</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>99%</span>
            <span className={styles.statLabel}>✅ Positive</span>
          </div>
        </div>

        <div className={styles.sellerBadges}>
          <span className={styles.badge}>
            🏆 Top Seller
          </span>
          <span className={styles.badge}>
            ✅ Verified
          </span>
        </div>

        <div className={styles.sellerActions}>
          <button className={styles.contactButton}>
            💬 Contact Seller
          </button>
          <button className={styles.storeButton}>
            🏪 Visit Store
          </button>
        </div>

        <div className={styles.sellerPromises}>
          <div className={styles.promise}>
            <span className={styles.promiseIcon}>🚚</span>
            <span>Fast shipping</span>
          </div>
          <div className={styles.promise}>
            <span className={styles.promiseIcon}>🔒</span>
            <span>Secure payment</span>
          </div>
          <div className={styles.promise}>
            <span className={styles.promiseIcon}>↩️</span>
            <span>Easy returns</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo; 