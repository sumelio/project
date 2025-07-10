import React from 'react';
import { Product } from '../../domain/entities/Product';
import styles from './ProductInfo.module.css';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  // Parse price to show it properly formatted
  const formatPrice = (price: string) => {
    const numericPrice = parseFloat(price.replace(/[^\d.-]/g, ''));
    if (isNaN(numericPrice)) return price;
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numericPrice);
  };

  return (
    <div className={styles.productInfo}>
      {/* Product Status */}
      <div className={styles.statusBadges}>
        <span className={styles.newBadge}>Nuevo</span>
        <span className={styles.soldBadge}>+1000 vendidos</span>
      </div>

      {/* Product Title */}
      <h1 className={styles.title}>{product.title}</h1>

      {/* Rating Section */}
      <div className={styles.ratingSection}>
        <div className={styles.stars}>
          <span className={styles.ratingNumber}>4.9</span>
          <span className={styles.starRating}>★★★★★</span>
        </div>
        <span className={styles.reviewCount}>
          ({product.additionalDetails?.reviews || '857'})
        </span>
        <span className={styles.reviewsLink}>Ver las opiniones</span>
      </div>

      {/* Pricing Section */}
      <div className={styles.pricingSection}>
        {/* Current Price */}
        <div className={styles.currentPrice}>
          {formatPrice(product.price)}
        </div>

        {/* Original Price and Discount */}
        <div className={styles.originalPrice}>
          <span className={styles.originalPriceText}>$ 1.999.000</span>
          <span className={styles.discountPercentage}>8% OFF</span>
        </div>

        {/* Installments */}
        <div className={styles.installments}>
          <span className={styles.installmentText}>
            en 12x $ 154.488 sin interés
          </span>
          <button className={styles.installmentLink}>Ver los medios de pago</button>
        </div>
      </div>

      {/* Color Selection */}
      <div className={styles.colorSection}>
        <h4 className={styles.sectionTitle}>Color: <span className={styles.selectedColor}>Azul oscuro</span></h4>
        <div className={styles.colorOptions}>
          <div className={`${styles.colorOption} ${styles.active}`} style={{backgroundColor: '#1a365d'}} title="Azul oscuro"></div>
          <div className={styles.colorOption} style={{backgroundColor: '#e5e5e5'}} title="Blanco"></div>
          <div className={styles.colorOption} style={{backgroundColor: '#ffd700'}} title="Amarillo"></div>
          <div className={styles.colorOption} style={{backgroundColor: '#ff6b6b'}} title="Coral"></div>
        </div>
      </div>

      {/* Storage Options */}
      <div className={styles.storageSection}>
        <h4 className={styles.sectionTitle}>Memoria interna: <span className={styles.selectedStorage}>256 GB</span></h4>
        <div className={styles.storageOptions}>
          <button className={styles.storageOption}>128 GB</button>
          <button className={`${styles.storageOption} ${styles.active}`}>256 GB</button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo; 