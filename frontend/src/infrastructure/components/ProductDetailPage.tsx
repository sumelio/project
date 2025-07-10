import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../application/store/store';
import { fetchProductByIdStart } from '../../application/store/productSlice';
import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';
import SellerInfo from './SellerInfo';
import AdditionalInfo from './AdditionalInfo';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import styles from './ProductDetailPage.module.css';

interface ProductDetailPageProps {
  productId?: string;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId = "1" }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentProduct, loading, error } = useSelector((state: RootState) => state.product);

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
            {/* Four Column Layout: Thumbnails | Main Image | Product Info | Purchase Panel */}
            <ImageGallery images={currentProduct.images} title={currentProduct.title} />

            {/* Third Column: Product Info */}
            <div className={styles.productInfoColumn}>
              <div className={styles.productBasicInfo}>
                <ProductInfo product={currentProduct} />
                
                {/* Product Features */}
                <div className={styles.productFeatures}>
                  <h3 className={styles.featuresTitle}>Lo que tienes que saber de este producto</h3>
                  <ul className={styles.featuresList}>
                    <li>Memoria RAM: 8 GB.</li>
                    <li>Dispositivo desbloqueado para que elijas tu compañía telefónica preferida.</li>
                    <li>Memoria interna de 256 GB.</li>
                  </ul>
                  <button className={styles.seeMoreButton}>Ver características</button>
                </div>

                {/* Purchase Options */}
                <div className={styles.purchaseOptions}>
                  <h4 className={styles.optionsTitle}>Opciones de compra:</h4>
                  <div className={styles.optionItem}>
                    <span className={styles.optionCount}>3 productos nuevos desde</span>
                    <span className={styles.optionPrice}>US$ 439</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fourth Column: Purchase Panel */}
            <div className={styles.purchasePanelColumn}>
              <div className={styles.purchasePanel}>
                {/* Shipping Info */}
                <div className={styles.shippingCard}>
                  <div className={styles.shippingOption}>
                    <span className={styles.shippingIcon}>🚚</span>
                    <div className={styles.shippingDetails}>
                      <span className={styles.shippingTitle}>Envío gratis a todo el país</span>
                      <span className={styles.shippingSubtitle}>Conoce los tiempos y las formas de envío.</span>
                      <button className={styles.shippingLink}>Calcular cuándo llega</button>
                    </div>
                  </div>
                </div>

                {/* Stock Info */}
                <div className={styles.stockCard}>
                  <div className={styles.stockHeader}>
                    <span className={styles.stockTitle}>Stock disponible</span>
                  </div>
                  <div className={styles.quantitySelector}>
                    <label className={styles.quantityLabel}>Cantidad:</label>
                    <select className={styles.quantitySelect}>
                      <option value="1">1 unidad</option>
                      <option value="2">2 unidades</option>
                      <option value="3">3 unidades</option>
                      <option value="4">4 unidades</option>
                    </select>
                    <span className={styles.stockAvailable}>(+50 disponibles)</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.actionButtons}>
                  <button className={styles.buyNowButton}>Comprar ahora</button>
                  <button className={styles.addToCartButton}>Agregar al carrito</button>
                </div>

                {/* Seller Info */}
                <div className={styles.sellerCard}>
                  <div className={styles.sellerHeader}>
                    <span className={styles.sellerLabel}>Vendido por</span>
                    <a href="#" className={styles.sellerName}>Samsung</a>
                    <span className={styles.officialBadge}>Tienda oficial</span>
                  </div>
                  <div className={styles.sellerStats}>
                    <span className={styles.sellerSales}>+50 mil ventas</span>
                  </div>
                </div>

                {/* Guarantees */}
                <div className={styles.guaranteesCard}>
                  <div className={styles.guaranteeItem}>
                    <span className={styles.guaranteeIcon}>↩️</span>
                    <span className={styles.guaranteeText}>Devolución gratis. Tienes 30 días desde que lo recibes.</span>
                  </div>
                  <div className={styles.guaranteeItem}>
                    <span className={styles.guaranteeIcon}>🛡️</span>
                    <span className={styles.guaranteeText}>Compra Protegida, recibe el producto que esperabas o te devolvemos tu dinero.</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className={styles.paymentCard}>
                  <h4 className={styles.paymentTitle}>Medios de pago</h4>
                  <div className={styles.paymentBenefit}>
                    <span className={styles.paymentIcon}>💳</span>
                    <span>¡Paga en hasta 12 cuotas sin interés!</span>
                  </div>
                  <div className={styles.paymentMethods}>
                    <div className={styles.paymentMethod}>
                      <span className={styles.methodIcon}>💳</span>
                      <span>Tarjetas de crédito</span>
                    </div>
                    <div className={styles.paymentMethod}>
                      <span className={styles.methodIcon}>💰</span>
                      <span>Efectivo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className={styles.relatedSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Productos relacionados</h2>
          <p className={styles.sectionSubtitle}>Patrocinados</p>
          <div className={styles.relatedProducts}>
            <div className={styles.productCard}>
              <div className={styles.productImage}>
                <img src="/api/placeholder/200/200" alt="Samsung Galaxy M55 5g" />
                <span className={styles.productBadge}>5G</span>
              </div>
              <h3 className={styles.productTitle}>Samsung Galaxy M55 5g 8+256gb Dual Sim Teléfono</h3>
              <div className={styles.productPrice}>
                <span className={styles.currentPrice}>US$ 421</span>
                <span className={styles.discount}>3% OFF</span>
              </div>
              <div className={styles.installments}>en 12 cuotas de $ 1.839 sin interés</div>
              <span className={styles.freeShipping}>Envío gratis</span>
            </div>

            <div className={styles.productCard}>
              <div className={styles.productImage}>
                <img src="/api/placeholder/200/200" alt="Motorola Edge 50 Fusion" />
              </div>
              <h3 className={styles.productTitle}>Motorola Edge 50 Fusion 5g 256 Gb Azul Ártico 8 Gb Ram</h3>
              <div className={styles.productPrice}>
                <span className={styles.currentPrice}>US$ 419</span>
                <span className={styles.discount}>1% OFF</span>
              </div>
              <div className={styles.installments}>en 12 cuotas de $ 1.845 sin interés</div>
              <span className={styles.freeShipping}>Envío gratis</span>
            </div>

            <div className={styles.productCard}>
              <div className={styles.productImage}>
                <img src="/api/placeholder/200/200" alt="Samsung Galaxy A16 5g" />
              </div>
              <h3 className={styles.productTitle}>Samsung Galaxy A16 5g 256gb Negro Trueno</h3>
              <div className={styles.productPrice}>
                <span className={styles.currentPrice}>US$ 326</span>
                <span className={styles.discount}>3% OFF</span>
              </div>
              <div className={styles.installments}>en 12 cuotas de $ 1.424 sin interés</div>
              <span className={styles.freeShipping}>Envío gratis</span>
            </div>
          </div>
        </div>
      </div>

      {/* Samsung Products Section */}
      <div className={styles.brandSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Productos de Samsung</h2>
          <div className={styles.brandProducts}>
            <div className={styles.brandProductCard}>
              <div className={styles.brandProductImage}>
                <img src="/api/placeholder/100/100" alt="Samsung Galaxy S25" />
              </div>
              <div className={styles.brandProductInfo}>
                <h4 className={styles.brandProductTitle}>Samsung Galaxy S25 256 Gb Colores Varios</h4>
                <div className={styles.brandProductPrice}>
                  <span className={styles.brandCurrentPrice}>US$ 959</span>
                  <span className={styles.brandDiscount}>26% OFF</span>
                </div>
                <div className={styles.brandInstallments}>12 cuotas de $ 4.191,24 sin interés</div>
                <span className={styles.brandFreeShipping}>Envío gratis</span>
              </div>
            </div>

            <div className={styles.brandProductCard}>
              <div className={styles.brandProductImage}>
                <img src="/api/placeholder/100/100" alt="Samsung Galaxy S25 Plus" />
              </div>
              <div className={styles.brandProductInfo}>
                <h4 className={styles.brandProductTitle}>Samsung Galaxy S25 Plus 512 Gb Colores Varios</h4>
                <div className={styles.brandProductPrice}>
                  <span className={styles.brandCurrentPrice}>US$ 1.379</span>
                  <span className={styles.brandDiscount}>8% OFF</span>
                </div>
                <div className={styles.brandInstallments}>12 cuotas de $ 6.012,44 sin interés</div>
                <span className={styles.brandFreeShipping}>Envío gratis</span>
              </div>
            </div>
          </div>
          <button className={styles.seeMoreProducts}>Ver más productos de Samsung</button>
        </div>
      </div>

      {/* Product Characteristics Section */}
      <div className={styles.characteristicsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Características del producto</h2>
          <div className={styles.characteristicsGrid}>
            <div className={styles.characteristicCard}>
              <div className={styles.characteristicIcon}>📱</div>
              <div className={styles.characteristicInfo}>
                <span className={styles.characteristicLabel}>Tamaño de la pantalla</span>
                <span className={styles.characteristicValue}>6.6 " (16.11 cm x 7.74 cm x 8.2 mm)</span>
              </div>
            </div>

            <div className={styles.characteristicCard}>
              <div className={styles.characteristicIcon}>💾</div>
              <div className={styles.characteristicInfo}>
                <span className={styles.characteristicLabel}>Memoria interna</span>
                <span className={styles.characteristicValue}>256 GB</span>
              </div>
            </div>

            <div className={styles.characteristicCard}>
              <div className={styles.characteristicIcon}>📸</div>
              <div className={styles.characteristicInfo}>
                <span className={styles.characteristicLabel}>Cámara trasera principal</span>
                <span className={styles.characteristicValue}>50 Mpx</span>
              </div>
            </div>

            <div className={styles.characteristicCard}>
              <div className={styles.characteristicIcon}>📶</div>
              <div className={styles.characteristicInfo}>
                <span className={styles.characteristicLabel}>Con NFC</span>
                <span className={styles.characteristicValue}>Sí</span>
              </div>
            </div>
          </div>
          <button className={styles.seeAllCharacteristics}>Ver todas las características</button>
        </div>
      </div>

      {/* Opinions Section */}
      <div className={styles.opinionsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Opiniones del producto</h2>
          <div className={styles.opinionsHeader}>
            <div className={styles.overallRating}>
              <span className={styles.ratingScore}>4.9</span>
              <div className={styles.ratingStars}>★★★★★</div>
              <span className={styles.ratingCount}>857 opiniones</span>
            </div>
            <div className={styles.ratingDistribution}>
              <div className={styles.ratingBar}>
                <span className={styles.ratingLabel}>5 estrellas</span>
                <div className={styles.ratingProgress}>
                  <div className={styles.ratingFill} style={{width: '85%'}}></div>
                </div>
                <span className={styles.ratingPercent}>85%</span>
              </div>
              <div className={styles.ratingBar}>
                <span className={styles.ratingLabel}>4 estrellas</span>
                <div className={styles.ratingProgress}>
                  <div className={styles.ratingFill} style={{width: '10%'}}></div>
                </div>
                <span className={styles.ratingPercent}>10%</span>
              </div>
              <div className={styles.ratingBar}>
                <span className={styles.ratingLabel}>3 estrellas</span>
                <div className={styles.ratingProgress}>
                  <div className={styles.ratingFill} style={{width: '3%'}}></div>
                </div>
                <span className={styles.ratingPercent}>3%</span>
              </div>
              <div className={styles.ratingBar}>
                <span className={styles.ratingLabel}>2 estrellas</span>
                <div className={styles.ratingProgress}>
                  <div className={styles.ratingFill} style={{width: '1%'}}></div>
                </div>
                <span className={styles.ratingPercent}>1%</span>
              </div>
              <div className={styles.ratingBar}>
                <span className={styles.ratingLabel}>1 estrella</span>
                <div className={styles.ratingProgress}>
                  <div className={styles.ratingFill} style={{width: '1%'}}></div>
                </div>
                <span className={styles.ratingPercent}>1%</span>
              </div>
            </div>
          </div>
          
          <div className={styles.opinionsGrid}>
            <div className={styles.opinionCard}>
              <div className={styles.opinionHeader}>
                <div className={styles.opinionRating}>★★★★★</div>
                <span className={styles.opinionDate}>Hace 2 días</span>
              </div>
              <p className={styles.opinionText}>
                Excelente producto, muy buena calidad y llegó rápido. La batería dura todo el día y la cámara es increíble.
              </p>
              <div className={styles.opinionFooter}>
                <span className={styles.opinionAuthor}>Carlos M.</span>
                <button className={styles.opinionHelpful}>👍 Útil</button>
              </div>
            </div>
            
            <div className={styles.opinionCard}>
              <div className={styles.opinionHeader}>
                <div className={styles.opinionRating}>★★★★★</div>
                <span className={styles.opinionDate}>Hace 1 semana</span>
              </div>
              <p className={styles.opinionText}>
                Muy contenta con la compra. El teléfono es rápido y la pantalla se ve genial. Recomendado 100%.
              </p>
              <div className={styles.opinionFooter}>
                <span className={styles.opinionAuthor}>María L.</span>
                <button className={styles.opinionHelpful}>👍 Útil</button>
              </div>
            </div>
          </div>
          
          <button className={styles.seeAllOpinions}>Ver todas las opiniones</button>
        </div>
      </div>

      {/* Questions Section */}
      <div className={styles.questionsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Preguntas y respuestas</h2>
          <div className={styles.questionsGrid}>
            <div className={styles.questionCard}>
              <div className={styles.questionText}>¿Viene con cargador incluido?</div>
              <div className={styles.answerText}>
                <strong>Respuesta:</strong> Sí, viene con cargador rápido de 25W incluido en la caja.
              </div>
              <div className={styles.questionFooter}>
                <span className={styles.questionDate}>Hace 3 días</span>
                <button className={styles.questionHelpful}>👍 Útil</button>
              </div>
            </div>
            
            <div className={styles.questionCard}>
              <div className={styles.questionText}>¿Es compatible con todas las operadoras?</div>
              <div className={styles.answerText}>
                <strong>Respuesta:</strong> Sí, es un dispositivo liberado compatible con todas las operadoras de Colombia.
              </div>
              <div className={styles.questionFooter}>
                <span className={styles.questionDate}>Hace 1 semana</span>
                <button className={styles.questionHelpful}>👍 Útil</button>
              </div>
            </div>
          </div>
          
          <button className={styles.askQuestion}>Preguntar</button>
        </div>
      </div>

      {/* Description Section */}
      <div className={styles.descriptionSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Descripción</h2>
          <div className={styles.descriptionContent}>
            <h3>Capacidad y eficiencia</h3>
            <p>
              Con su potente procesador y 8 GB de RAM, su computadora logrará un alto rendimiento 
              con una alta velocidad de transmisión de contenido y ejecutará varias aplicaciones al 
              mismo tiempo, sin demoras.
            </p>
            
            <h3>Capacidad de almacenamiento ilimitada</h3>
            <p>
              Olvídate de borrar. Con su memoria interna de 256 GB puedes descargar todos los 
              archivos y aplicaciones que necesites, guardar fotos y almacenar tus películas, series y 
              videos favoritos para reproducirlos cuando quieras.
            </p>
          </div>
        </div>
      </div>

      {/* Additional Related Products */}
      <div className={styles.additionalProductsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Productos relacionados</h2>
          <div className={styles.additionalProductsGrid}>
            <div className={styles.additionalProductCard}>
              <div className={styles.additionalProductImage}>
                <img src="/api/placeholder/150/150" alt="Samsung Galaxy M55 5g" />
              </div>
              <h4 className={styles.additionalProductTitle}>Samsung Galaxy M55 5g 8+256gb Dual Sim Teléfono</h4>
              <div className={styles.additionalProductPrice}>
                <span className={styles.additionalCurrentPrice}>US$ 421</span>
                <span className={styles.additionalDiscount}>3% OFF</span>
              </div>
              <div className={styles.additionalInstallments}>12 cuotas de $ 1.839 sin interés</div>
              <span className={styles.additionalFreeShipping}>Envío gratis</span>
            </div>

            <div className={styles.additionalProductCard}>
              <div className={styles.additionalProductImage}>
                <img src="/api/placeholder/150/150" alt="Motorola Edge 50 Fusion" />
              </div>
              <h4 className={styles.additionalProductTitle}>Motorola Edge 50 Fusion 5g 256 Gb Azul Ártico 8 Gb Ram</h4>
              <div className={styles.additionalProductPrice}>
                <span className={styles.additionalCurrentPrice}>US$ 419</span>
                <span className={styles.additionalDiscount}>1% OFF</span>
              </div>
              <div className={styles.additionalInstallments}>12 cuotas de $ 1.845 sin interés</div>
              <span className={styles.additionalFreeShipping}>Envío gratis</span>
            </div>

            <div className={styles.additionalProductCard}>
              <div className={styles.additionalProductImage}>
                <img src="/api/placeholder/150/150" alt="Samsung Galaxy A16 5g" />
              </div>
              <h4 className={styles.additionalProductTitle}>Samsung Galaxy A16 5g 256gb Negro Trueno</h4>
              <div className={styles.additionalProductPrice}>
                <span className={styles.additionalCurrentPrice}>US$ 326</span>
                <span className={styles.additionalDiscount}>3% OFF</span>
              </div>
              <div className={styles.additionalInstallments}>12 cuotas de $ 1.424 sin interés</div>
              <span className={styles.additionalFreeShipping}>Envío gratis</span>
            </div>

            <div className={styles.additionalProductCard}>
              <div className={styles.additionalProductImage}>
                <img src="/api/placeholder/150/150" alt="Motorola G85 5g" />
              </div>
              <h4 className={styles.additionalProductTitle}>Motorola G85 5g 256gb Azul Marino</h4>
              <div className={styles.additionalProductPrice}>
                <span className={styles.additionalCurrentPrice}>US$ 329</span>
                <span className={styles.additionalDiscount}>10% OFF</span>
              </div>
              <div className={styles.additionalInstallments}>12 cuotas de $ 1.439 sin interés</div>
              <span className={styles.additionalFreeShipping}>Envío gratis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 