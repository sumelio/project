import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../domain/entities/Product';

export interface ProductState {
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  currentProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProductByIdStart: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductByIdSuccess: (state, action: PayloadAction<Product>) => {
      state.loading = false;
      state.currentProduct = action.payload;
    },
    fetchProductByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearProduct: (state) => {
      state.currentProduct = null;
      state.error = null;
    },
  },
});

export const {
  fetchProductByIdStart,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
  clearProduct,
} = productSlice.actions;

export default productSlice.reducer; 