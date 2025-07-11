import React from 'react';
import SellerPanel from './SellerPanel';
import styles from './RelatedProducts.module.css';

interface RelatedProduct {
  id: string;
  image: string;
  title: string;
  originalPrice: number;
  currentPrice: number;
  discount: number;
  installments: {
    quantity: number;
    amount: number;
  };
  hasFreeShipping: boolean;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price).replace('COP', '$');
  };

  return (
    <section className={styles.relatedSection}>
      <div className={styles.contentWrapper}>
        <div className={styles.productsWrapper}>
          <h2 className={styles.sectionTitle}>Productos relacionados</h2>
          <p className={styles.sectionSubtitle}>Promocionado</p>
          <div className={styles.relatedProducts}>
            {products.map((product) => (
              <a href="#" key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img src={product.image} alt={product.title} />
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.priceInfo}>
                    <div className={styles.originalPrice}>
                      {formatPrice(product.originalPrice)}
                    </div>
                    <div className={styles.priceRow}>
                      <span className={styles.currentPrice}>
                        {formatPrice(product.currentPrice)}
                      </span>
                      <span className={styles.discount}>
                        {product.discount}% OFF
                      </span>
                    </div>
                  </div>
                  <div className={styles.installments}>
                    en {product.installments.quantity} cuotas de {formatPrice(product.installments.amount)} con 0% interés
                  </div>
                  {product.hasFreeShipping && (
                    <div className={styles.freeShipping}>
                      <span className={styles.shippingIcon}>⚡</span>
                      Envío gratis FULL
                    </div>
                  )}
                  <h3 className={styles.productTitle}>{product.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>

        <SellerPanel
          seller={{
            name: "laeternaproductos",
            productsCount: "100mil",
            reputation: {
              level: "MercadoLíder",
              description: "¡Uno de los mejores del sitio!"
            },
            metrics: {
              sales: "1000",
              service: "Brinda buena atención",
              delivery: "Entrega sus productos a tiempo"
            }
          }}
          purchaseOptions={{
            price: 1853861
          }}
        />
      </div>
    </section>
  );
};

export default RelatedProducts; 