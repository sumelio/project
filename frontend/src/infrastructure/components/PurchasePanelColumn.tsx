import React from 'react';
import { Product } from '../../domain/entities/Product';
import styles from './PurchasePanelColumn.module.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../application/store/cartSlice';

interface PurchasePanelColumnProps {
  product: Product;
}

const PurchasePanelColumn: React.FC<PurchasePanelColumnProps> = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.purchasePanelColumn}>
      {/* Shipping Info */}
      <div className={styles.shippingCard}>
        <div className={styles.shippingOption}>
          <span className={styles.shippingIcon}>🚚</span>
          <div className={styles.shippingDetails}>
            <span className={styles.shippingTitle}>Llega gratis mañana</span>
            <button className={styles.shippingLink}>Más formas de entrega</button>
          </div>
        </div>
        <div className={styles.shippingOption}>
          <span className={styles.shippingIcon}>🏪</span>
          <div className={styles.shippingDetails}>
            <span className={styles.shippingTitle}>Retira gratis</span>
            <span className={styles.shippingSubtitle}>en una agencia de Mercado Libre</span>
            <button className={styles.shippingLink}>Ver en el mapa</button>
          </div>
        </div>
      </div>

      {/* Stock Selection */}
      <div className={styles.stockCard}>
        <span className={styles.stockTitle}>Stock disponible</span>
        <div className={styles.quantitySelector}>
          <label className={styles.quantityLabel}>Cantidad:</label>
          <select className={styles.quantitySelect}>
            <option value="1">1 unidad</option>
            <option value="2">2 unidades</option>
            <option value="3">3 unidades</option>
            <option value="4">4 unidades</option>
          </select>
          <span className={styles.stockAvailable}>({product.additionalDetails?.availableStock || '4'} disponibles)</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <button className={styles.buyNowButton}>Comprar ahora</button>
        <button className={styles.addToCartButton} onClick={() => dispatch(addToCart(product))}>Agregar al carrito</button>
      </div>

      {/* Seller Info */}
      <div className={styles.sellerInfo}>
        <span className={styles.sellerLabel}>
          Vendido por <a href="#" className={styles.sellerName}>{product.sellerInformation.name}</a>
        </span>
        <span className={styles.sellerReputation}>
          {product.sellerInformation.reputation.level} | +{product.sellerInformation.metrics.sales} ventas
        </span>
      </div>

      {/* Protection Info */}
      <div className={styles.protectionInfo}>
        <div className={styles.protectionItem}>
          <span className={styles.protectionIcon}>↩️</span>
          <span className={styles.protectionText}>
            Devolución gratis. Tienes 30 días desde que lo recibes.
          </span>
        </div>
        <div className={styles.protectionItem}>
          <span className={styles.protectionIcon}>🛡️</span>
          <span className={styles.protectionText}>
            Compra Protegida, recibe el producto que esperabas o te devolvemos tu dinero.
          </span>
        </div>
      </div>

      {/* Add to List */}
      <button className={styles.addToListButton}>
        Agregar a una lista
        <span className={styles.arrowIcon}>›</span>
      </button>
    </div>
  );
};

export default PurchasePanelColumn; 