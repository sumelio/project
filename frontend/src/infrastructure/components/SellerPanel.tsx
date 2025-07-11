import React from 'react';
import { Product } from '../../domain/entities/Product';
import styles from './SellerPanel.module.css';

interface SellerPanelProps {
  product: Product;
}

const SellerPanel: React.FC<SellerPanelProps> = ({ product }) => {
  const { sellerInformation } = product;
  
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  return (
    <div className={styles.sellerPanel}>
      {/* Seller Info */}
      <div className={styles.sellerInfo}>
        <div className={styles.sellerHeader}>
          <div className={styles.sellerAvatar}>
            {sellerInformation.name.charAt(0).toUpperCase()}
          </div>
          <div className={styles.sellerDetails}>
            <h3 className={styles.sellerName}>{sellerInformation.name}</h3>
            <span className={styles.productsCount}>+{sellerInformation.productsCount} Productos</span>
          </div>
          <button className={styles.followButton}>Seguir</button>
        </div>

        <div className={styles.reputationInfo}>
          <span className={styles.reputationBadge}>
            <span className={styles.badgeIcon}>🏆</span>
            {sellerInformation.reputation.level}
          </span>
          <span className={styles.reputationDescription}>{sellerInformation.reputation.description}</span>
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
            <span className={styles.metricIcon}>📊</span>
            <span className={styles.metricValue}>{sellerInformation.metrics.sales}</span>
            <span>ventas</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricIcon}>⭐</span>
            <span>{sellerInformation.metrics.service}</span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricIcon}>🚚</span>
            <span>{sellerInformation.metrics.delivery}</span>
          </div>
        </div>

        <a href={`/seller/${sellerInformation.name}`} className={styles.sellerLink}>
          Ver más datos de este vendedor
        </a>
      </div>

      {/* Purchase Options */}
      <div className={styles.purchaseOptions}>
        <div className={styles.priceSection}>
          <div className={styles.currentPrice}>
            {formatPrice(sellerInformation.purchaseOptions.price)}
          </div>
          <div className={styles.installments}>
            en 12x {formatPrice(sellerInformation.purchaseOptions.price / 12)}
          </div>
        </div>

        <div className={styles.stockInfo}>
          <span className={styles.stockText}>Stock disponible</span>
          <span className={styles.stockQuantity}>({product.additionalDetails.availableStock} disponibles)</span>
        </div>

        <div className={styles.shippingInfo}>
          <div className={styles.shippingItem}>
            <span className={styles.shippingIcon}>🚚</span>
            <div className={styles.shippingDetails}>
              <span className={styles.shippingText}>Envío gratis a todo el país</span>
              <span className={styles.shippingSubtext}>Conoce los tiempos y las formas de envío.</span>
            </div>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.buyButton}>Comprar ahora</button>
          <button className={styles.addToCartButton}>Agregar al carrito</button>
        </div>

        <div className={styles.paymentMethods}>
          <h4 className={styles.paymentTitle}>Medios de pago</h4>
          <div className={styles.paymentList}>
            {product.paymentMethods.map((method, index) => (
              <div key={index} className={styles.paymentMethod}>
                <span className={styles.paymentIcon}>💳</span>
                <span className={styles.paymentText}>{method}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
};

export default SellerPanel; 