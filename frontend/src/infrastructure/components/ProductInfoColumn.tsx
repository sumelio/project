import React from 'react';
import { Product } from '../../domain/entities/Product';
import styles from './ProductInfoColumn.module.css';

interface ProductInfoColumnProps {
  product: Product;
}

const ProductInfoColumn: React.FC<ProductInfoColumnProps> = ({ product }) => {
  return (
    <div className={styles.productInfoColumn}>
      <div className={styles.status}>
        <span className={styles.condition}>Nuevo</span>
        <span className={styles.separator}>|</span>
        <span className={styles.soldCount}>+1000 vendidos</span>
      </div>

      <h1 className={styles.title}>{product.title}</h1>

      <div className={styles.rating}>
        <span className={styles.ratingScore}>{product.additionalDetails?.ratings || '4.9'}</span>
        <div className={styles.stars}>★★★★★</div>
        <span className={styles.reviewCount}>({product.additionalDetails?.reviews || '858'})</span>
      </div>

      <div className={styles.pricing}>
        <div className={styles.price}>{product.price}</div>
        <div className={styles.installments}>
          en <span className={styles.highlight}>3 cuotas de $ 617.954</span>
        </div>
        <div className={styles.interestRate}>con 0% interés</div>
        <button className={styles.paymentLink}>Ver los medios de pago</button>
      </div>

      <div className={styles.color}>
        <span className={styles.label}>Color: </span>
        <span className={styles.value}>Azul oscuro</span>
      </div>

      <div className={styles.features}>
        <h3 className={styles.featuresTitle}>Lo que tienes que saber de este producto</h3>
        <ul className={styles.featuresList}>
          <li>Memoria RAM: 8 GB.</li>
          <li>Dispositivo desbloqueado para que elijas tu compañía telefónica preferida.</li>
          <li>Memoria interna de 256 GB.</li>
        </ul>
        <button className={styles.seeMoreButton}>Ver características</button>
      </div>
    </div>
  );
};

export default ProductInfoColumn; 