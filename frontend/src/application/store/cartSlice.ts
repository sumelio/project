import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../domain/entities/Product';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  visible: boolean;
}

const initialState: CartState = {
  items: [],
  visible: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find(item => item.product.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
      state.visible = true;
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.product.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    showCart(state) {
      state.visible = true;
    },
    hideCart(state) {
      state.visible = false;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, showCart, hideCart } = cartSlice.actions;
export default cartSlice.reducer; 