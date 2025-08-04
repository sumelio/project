import React, { useEffect, useState } from 'react';
import { Product } from '../../domain/entities/Product';
import { ProductApiService } from '../api/ProductApiService';
import { useNavigate } from 'react-router-dom';
import styles from './ProductList.module.css';

const productApiService = new ProductApiService();

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    productApiService.getAllProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.loading}>Cargando productos...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.productListContainer}>
      <h2>Productos</h2>
      <ul className={styles.productList}>
        {products.map(product => (
          <li key={product.id} className={styles.productItem}>
            <img src={product.images[0]} alt={product.title} className={styles.productImage} />
            <div className={styles.productInfo}>
              <span className={styles.productTitle}>{product.title}</span>
              <span className={styles.productPrice}>${product.price}</span>
              <button className={styles.detailButton} onClick={() => navigate(`/product/${product.id}`)}>
                Ver detalle
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList; 