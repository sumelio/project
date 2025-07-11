import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../application/store/store';
import { fetchProductByIdStart } from '../../application/store/productSlice';
import ThumbnailStrip from './ThumbnailStrip';
import MainImageDisplay from './MainImageDisplay';
import ProductInfoColumn from './ProductInfoColumn';
import PurchasePanelColumn from './PurchasePanelColumn';
import RelatedProducts from './RelatedProducts';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import styles from './ProductDetailPage.module.css';

interface ProductDetailPageProps {
  productId?: string;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId = "1" }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentProduct, loading, error } = useSelector((state: RootState) => state.product);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductByIdStart(productId));
    }
  }, [dispatch, productId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!currentProduct) {
    return <ErrorMessage message="Product not found" />;
  }

  const handleThumbnailSelect = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className={styles.pageContainer}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumbSection}>
        <div className={styles.container}>
          <nav className={styles.breadcrumb}>
            <div className={styles.breadcrumbNav}>
              <a href="/products" className={styles.breadcrumbLink}>Celulares y Teléfonos</a>
              <span className={styles.breadcrumbSeparator}>&gt;</span>
              <a href="/products/phones" className={styles.breadcrumbLink}>Celulares y Smartphones</a>
              <span className={styles.breadcrumbSeparator}>&gt;</span>
              <a href="/products/samsung" className={styles.breadcrumbLink}>Samsung</a>
              <span className={styles.breadcrumbSeparator}>&gt;</span>
              <a href="/products/samsung/galaxy-a55" className={styles.breadcrumbLink}>Galaxy A55</a>
              <span className={styles.breadcrumbSeparator}>&gt;</span>
              <span className={styles.breadcrumbCurrent}>Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM</span>
            </div>
            <div className={styles.breadcrumbActions}>
              <a href="#" className={styles.breadcrumbAction}>
                <span className={styles.shareIcon}>🔗</span>
                Compartir
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.productLayout}>
            {/* Column 1: Thumbnail Strip */}
            <ThumbnailStrip
              images={currentProduct.images}
              onSelect={handleThumbnailSelect}
              selectedIndex={selectedIndex}
            />

            {/* Column 2: Main Image */}
            <MainImageDisplay
              image={currentProduct.images[selectedIndex]}
              title={currentProduct.title}
            />

            {/* Column 3: Product Info */}
            <ProductInfoColumn product={currentProduct} />

            {/* Column 4: Purchase Panel */}
            <PurchasePanelColumn product={currentProduct} />
          </div>
        </div>
      </div>

     {/* Related Products Section */}
      <RelatedProducts
        products={[
          {
            id: '1',
            image: 'https://http2.mlstatic.com/D_Q_NP_2X_724202-MCO83153296147_032025-AB.webp',
            title: 'Zte Blade A55 Dual Sim 128gb 4gb Ram',
            originalPrice: 500000,
            currentPrice: 294900,
            discount: 41,
            installments: {
              quantity: 3,
              amount: 98300
            },
            hasFreeShipping: true
          },
          {
            id: '2',
            image: 'https://http2.mlstatic.com/D_Q_NP_2X_806397-MCO82866909662_032025-AB.webp',
            title: 'Zte Blade V70 Dual Sim 256gb 8gb Ram',
            originalPrice: 850000,
            currentPrice: 504900,
            discount: 40,
            installments: {
              quantity: 3,
              amount: 168300
            },
            hasFreeShipping: true
          },
          {
            id: '3',
            image: 'https://http2.mlstatic.com/D_Q_NP_2X_939552-MCO83649111115_042025-AB.webp',
            title: 'Zte Blade A35e Dual Sim 64gb 2gb Ram',
            originalPrice: 499000,
            currentPrice: 239520,
            discount: 52,
            installments: {
              quantity: 3,
              amount: 79840
            },
            hasFreeShipping: true
          }
        ]}
      />
    </div>
  );
};

export default ProductDetailPage; 