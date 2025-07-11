import React from 'react';
import styles from './SellerPanel.module.css';

interface SellerPanelProps {
  seller: {
    name: string;
    productsCount: string;
    reputation: {
      level: string;
      description: string;
    };
    metrics: {
      sales: string;
      service: string;
      delivery: string;
    };
  };
  purchaseOptions: {
    price: number;
  };
}

const SellerPanel: React.FC<SellerPanelProps> = ({ seller, purchaseOptions }) => {
  return (
    <div className={styles.sellerPanel}>
      {/* Seller Info */}
      <div className={styles.sellerInfo}>
        <div className={styles.sellerHeader}>
          <div className={styles.sellerAvatar}>L</div>
          <div className={styles.sellerDetails}>
            <h3 className={styles.sellerName}>{seller.name}</h3>
            <span className={styles.productsCount}>+{seller.productsCount} Productos</span>
          </div>
          <button className={styles.followButton}>Seguir</button>
        </div>

        <div className={styles.reputationInfo}>
          <span className={styles.reputationBadge}>
            <span className={styles.badgeIcon}>🏆</span>
            {seller.reputation.level}
          </span>
          <span className={styles.reputationDescription}>{seller.reputation.description}</span>
        </div>

        <div className={styles.metricsBar}>
          <div className={styles.progressBar}>
            <div className={styles.progressSegment} style={{ background: '#fff1e5' }}></div>
            <div className={styles.progressSegment} style={{ background: '#fff1e5' }}></div>
            <div className={styles.progressSegment} style={{ background: '#fff1e5' }}></div>
            <div className={styles.progressSegment} style={{ background: '#dff9e9' }}></div>
            <div className={styles.progressSegment} style={{ background: '#39b54a' }}></div>
          </div>
        </div>

        <div className={styles.metrics}>
          <div className={styles.metricItem}>
            <span className={styles.metricValue}>+{seller.metrics.sales}</span>
            <span className={styles.metricLabel}>Ventas concretadas</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricIcon}>👍</span>
            <span className={styles.metricLabel}>Brinda buena atención</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricIcon}>⏱️</span>
            <span className={styles.metricLabel}>Entrega sus productos a tiempo</span>
          </div>
        </div>

        <a href="#" className={styles.sellerLink}>Ir a la página del vendedor</a>
      </div>

      {/* Purchase Options */}
      <div className={styles.purchaseOptions}>
        <h4 className={styles.optionsTitle}>Otras opciones de compra</h4>
        <a href="#" className={styles.optionsLink}>
          Ver 3 opciones desde $ {purchaseOptions.price.toLocaleString('es-CO')}
        </a>
      </div>

      {/* Payment Methods */}
      <div className={styles.paymentMethods}>
        <h4 className={styles.paymentTitle}>Medios de pago</h4>
        <div className={styles.creditCards}>
          <h5 className={styles.cardTitle}>Tarjetas de crédito</h5>
          <p className={styles.cardSubtitle}>¡Paga en hasta 36 cuotas!</p>
          <div className={styles.cardLogos}>
            <span className={styles.cardLogo}>💳</span>
            <span className={styles.cardLogo}>💳</span>
            <span className={styles.cardLogo}>💳</span>
            <span className={styles.cardLogo}>💳</span>
          </div>
        </div>
        <div className={styles.debitCards}>
          <h5 className={styles.cardTitle}>Tarjetas de débito</h5>
          <div className={styles.cardLogos}>
            <span className={styles.cardLogo}>💳</span>
            <span className={styles.cardLogo}>💳</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPanel; 