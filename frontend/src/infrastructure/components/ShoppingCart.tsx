import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../application/store/store';
import { hideCart, removeFromCart, clearCart } from '../../application/store/cartSlice';
import styles from './ShoppingCart.module.css';

const ShoppingCart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, visible } = useSelector((state: RootState) => state.cart);

  if (!visible) return null;

  const total = items.reduce((sum, item) => sum + parseFloat(item.product.price) * item.quantity, 0);

  return (
    <div className={styles.overlay}>
      <div className={styles.cartPanel}>
        <button className={styles.closeButton} onClick={() => dispatch(hideCart())}>×</button>
        <h2>🛒 Carrito de compras</h2>
        {items.length === 0 ? (
          <div className={styles.empty}>El carrito está vacío.</div>
        ) : (
          <>
            <ul className={styles.itemList}>
              {items.map(item => (
                <li key={item.product.id} className={styles.item}>
                  <img src={item.product.images[0]} alt={item.product.title} className={styles.image} />
                  <div className={styles.info}>
                    <span className={styles.title}>{item.product.title}</span>
                    <span className={styles.price}>${item.product.price} x {item.quantity}</span>
                  </div>
                  <button className={styles.removeButton} onClick={() => dispatch(removeFromCart(item.product.id))}>Eliminar</button>
                </li>
              ))}
            </ul>
            <div className={styles.total}>Total: ${total.toFixed(2)}</div>
            <button className={styles.clearButton} onClick={() => dispatch(clearCart())}>Vaciar carrito</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart; 