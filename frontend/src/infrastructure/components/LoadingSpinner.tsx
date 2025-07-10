import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}>
        <div className={styles.spinnerRing}></div>
        <div className={styles.spinnerRing}></div>
        <div className={styles.spinnerRing}></div>
      </div>
      <p className={styles.loadingText}>Loading product...</p>
    </div>
  );
};

export default LoadingSpinner; 