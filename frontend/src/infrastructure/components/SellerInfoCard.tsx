import React from 'react';
import styles from './SellerInfoCard.module.css';

const SellerInfoCard: React.FC = () => {
  return (
    <div className={styles.sellerInfoCard}>
      <h2 className={styles.title}>Información sobre el vendedor</h2>
      <div className={styles.sellerInfo}>
        <div className={styles.sellerLocation}>
          <span className={styles.locationIcon}>📍</span>
          <div>
            <p className={styles.locationText}>Ubicación</p>
            <p className={styles.locationValue}>Bogotá D.C., Bogota D.c.</p>
          </div>
        </div>
        <div className={styles.sellerReputation}>
          <span className={styles.reputationIcon}>🏆</span>
          <div>
            <p className={styles.reputationText}>MercadoLíder Platinum</p>
            <p className={styles.reputationValue}>¡Es uno de los mejores del sitio!</p>
          </div>
        </div>
      </div>
      <div className={styles.reputationBar}>
        <div className={styles.barSegment} style={{ background: '#f8f8f8' }}></div>
        <div className={styles.barSegment} style={{ background: '#fff1e5' }}></div>
        <div className={styles.barSegment} style={{ background: '#fff1e5' }}></div>
        <div className={styles.barSegment} style={{ background: '#dff9e9' }}></div>
        <div className={styles.barSegment} style={{ background: '#39b54a' }}></div>
      </div>
      <div className={styles.sellerStats}>
        <div className={styles.stat}>
          <p className={styles.statValue}>54.897</p>
          <p className={styles.statLabel}>Ventas en los últimos 60 días</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statValue}>Brinda buena atención</p>
          <p className={styles.statLabel}></p>
        </div>
        <div className={styles.stat}>
          <p className={styles.statValue}>Despacha sus productos a tiempo</p>
          <p className={styles.statLabel}></p>
        </div>
      </div>
      <a href="#" className={styles.seeMoreLink}>Ver más datos de este vendedor</a>
    </div>
  );
};

export default SellerInfoCard; 