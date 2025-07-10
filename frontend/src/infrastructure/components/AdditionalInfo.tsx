import React from 'react';
import { AdditionalDetails } from '../../domain/entities/Product';
import styles from './AdditionalInfo.module.css';

interface AdditionalInfoProps {
  details: AdditionalDetails;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ details }) => {
  if (!details) {
    return null;
  }

  return (
    <div className={styles.additionalInfo}>
      <h4 className={styles.title}>Product Details</h4>
      
      <div className={styles.detailsGrid}>
        {/* Ratings Section */}
        {details.ratings && (
          <div className={styles.detailCard}>
            <div className={styles.detailHeader}>
              <span className={styles.detailIcon}>⭐</span>
              <span className={styles.detailTitle}>Customer Rating</span>
            </div>
            <div className={styles.detailValue}>
              <span className={styles.ratingScore}>{details.ratings}</span>
              <div className={styles.ratingStars}>
                {Array.from({ length: 5 }, (_, i) => (
                  <span 
                    key={i} 
                    className={`${styles.star} ${
                      i < Math.floor(parseFloat(details.ratings) || 0) ? styles.filledStar : ''
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reviews Section */}
        {details.reviews && (
          <div className={styles.detailCard}>
            <div className={styles.detailHeader}>
              <span className={styles.detailIcon}>💬</span>
              <span className={styles.detailTitle}>Customer Reviews</span>
            </div>
            <div className={styles.detailValue}>
              <span className={styles.reviewCount}>{details.reviews}</span>
              <button className={styles.reviewsLink}>
                Read Reviews
              </button>
            </div>
          </div>
        )}

        {/* Stock Section */}
        {details.availableStock && (
          <div className={styles.detailCard}>
            <div className={styles.detailHeader}>
              <span className={styles.detailIcon}>📦</span>
              <span className={styles.detailTitle}>Availability</span>
            </div>
            <div className={styles.detailValue}>
              <span className={styles.stockNumber}>{details.availableStock}</span>
              <span className={styles.stockLabel}>units in stock</span>
              <div className={styles.stockStatus}>
                {parseInt(details.availableStock) > 10 ? (
                  <span className={styles.inStock}>✅ In Stock</span>
                ) : parseInt(details.availableStock) > 0 ? (
                  <span className={styles.lowStock}>⚠️ Low Stock</span>
                ) : (
                  <span className={styles.outOfStock}>❌ Out of Stock</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional Features */}
      <div className={styles.features}>
        <h5 className={styles.featuresTitle}>Why choose this product?</h5>
        <div className={styles.featuresList}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🔥</span>
            <span>Trending product</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🎯</span>
            <span>Best seller in category</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>⚡</span>
            <span>Fast delivery available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo; 