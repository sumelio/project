import React from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>❌</div>
      <h3 className={styles.errorTitle}>Oops! Something went wrong</h3>
      <p className={styles.errorMessage}>{message}</p>
      <button 
        className={styles.retryButton}
        onClick={() => window.location.reload()}
      >
        🔄 Try Again
      </button>
    </div>
  );
};

export default ErrorMessage; 