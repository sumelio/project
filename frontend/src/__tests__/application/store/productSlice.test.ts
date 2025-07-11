import productReducer, {
  ProductState,
  fetchProductByIdStart,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
  clearProduct
} from '../../../application/store/productSlice';
import { mockProduct } from '../../utils/testUtils';

describe('productSlice', () => {
  const initialState: ProductState = {
    currentProduct: null,
    loading: false,
    error: null
  };

  describe('initial state', () => {
    it('should return the initial state', () => {
      expect(productReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });
  });

  describe('fetchProductByIdStart', () => {
    it('should set loading to true and clear error', () => {
      const previousState: ProductState = {
        currentProduct: null,
        loading: false,
        error: 'Previous error'
      };

      const action = fetchProductByIdStart('1');
      const newState = productReducer(previousState, action);

      expect(newState).toEqual({
        currentProduct: null,
        loading: true,
        error: null
      });
    });

    it('should maintain current product while loading', () => {
      const previousState: ProductState = {
        currentProduct: mockProduct,
        loading: false,
        error: null
      };

      const action = fetchProductByIdStart('2');
      const newState = productReducer(previousState, action);

      expect(newState).toEqual({
        currentProduct: mockProduct,
        loading: true,
        error: null
      });
    });
  });

  describe('fetchProductByIdSuccess', () => {
    it('should set product data and stop loading', () => {
      const previousState: ProductState = {
        currentProduct: null,
        loading: true,
        error: null
      };

      const action = fetchProductByIdSuccess(mockProduct);
      const newState = productReducer(previousState, action);

      expect(newState).toEqual({
        currentProduct: mockProduct,
        loading: false,
        error: null
      });
    });

    it('should replace existing product data', () => {
      const previousProduct = { ...mockProduct, id: '2', title: 'Previous Product' };
      const previousState: ProductState = {
        currentProduct: previousProduct,
        loading: true,
        error: null
      };

      const action = fetchProductByIdSuccess(mockProduct);
      const newState = productReducer(previousState, action);

      expect(newState.currentProduct).toEqual(mockProduct);
      expect(newState.currentProduct?.id).toBe('1');
      expect(newState.loading).toBe(false);
    });
  });

  describe('fetchProductByIdFailure', () => {
    it('should set error and stop loading', () => {
      const previousState: ProductState = {
        currentProduct: null,
        loading: true,
        error: null
      };

      const errorMessage = 'Product not found';
      const action = fetchProductByIdFailure(errorMessage);
      const newState = productReducer(previousState, action);

      expect(newState).toEqual({
        currentProduct: null,
        loading: false,
        error: errorMessage
      });
    });

    it('should maintain current product on error', () => {
      const previousState: ProductState = {
        currentProduct: mockProduct,
        loading: true,
        error: null
      };

      const errorMessage = 'Network error';
      const action = fetchProductByIdFailure(errorMessage);
      const newState = productReducer(previousState, action);

      expect(newState).toEqual({
        currentProduct: mockProduct,
        loading: false,
        error: errorMessage
      });
    });

    it('should replace previous error', () => {
      const previousState: ProductState = {
        currentProduct: null,
        loading: true,
        error: 'Previous error'
      };

      const newErrorMessage = 'New error';
      const action = fetchProductByIdFailure(newErrorMessage);
      const newState = productReducer(previousState, action);

      expect(newState.error).toBe(newErrorMessage);
    });
  });

  describe('clearProduct', () => {
    it('should clear product and error', () => {
      const previousState: ProductState = {
        currentProduct: mockProduct,
        loading: false,
        error: 'Some error'
      };

      const action = clearProduct();
      const newState = productReducer(previousState, action);

      expect(newState).toEqual({
        currentProduct: null,
        loading: false,
        error: null
      });
    });

    it('should maintain loading state when clearing', () => {
      const previousState: ProductState = {
        currentProduct: mockProduct,
        loading: true,
        error: 'Some error'
      };

      const action = clearProduct();
      const newState = productReducer(previousState, action);

      expect(newState).toEqual({
        currentProduct: null,
        loading: true,
        error: null
      });
    });
  });

  describe('action creators', () => {
    it('should create fetchProductByIdStart action', () => {
      const productId = '123';
      const expectedAction = {
        type: 'product/fetchProductByIdStart',
        payload: productId
      };

      expect(fetchProductByIdStart(productId)).toEqual(expectedAction);
    });

    it('should create fetchProductByIdSuccess action', () => {
      const expectedAction = {
        type: 'product/fetchProductByIdSuccess',
        payload: mockProduct
      };

      expect(fetchProductByIdSuccess(mockProduct)).toEqual(expectedAction);
    });

    it('should create fetchProductByIdFailure action', () => {
      const errorMessage = 'Error message';
      const expectedAction = {
        type: 'product/fetchProductByIdFailure',
        payload: errorMessage
      };

      expect(fetchProductByIdFailure(errorMessage)).toEqual(expectedAction);
    });

    it('should create clearProduct action', () => {
      const expectedAction = {
        type: 'product/clearProduct'
      };

      expect(clearProduct()).toEqual(expectedAction);
    });
  });

  describe('state transitions', () => {
    it('should handle loading -> success flow', () => {
      let state = initialState;

      // Start loading
      state = productReducer(state, fetchProductByIdStart('1'));
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);

      // Success
      state = productReducer(state, fetchProductByIdSuccess(mockProduct));
      expect(state.loading).toBe(false);
      expect(state.currentProduct).toEqual(mockProduct);
      expect(state.error).toBe(null);
    });

    it('should handle loading -> failure flow', () => {
      let state = initialState;

      // Start loading
      state = productReducer(state, fetchProductByIdStart('1'));
      expect(state.loading).toBe(true);

      // Failure
      const errorMessage = 'Failed to load';
      state = productReducer(state, fetchProductByIdFailure(errorMessage));
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.currentProduct).toBe(null);
    });

    it('should handle success -> clear flow', () => {
      let state = initialState;

      // Load product
      state = productReducer(state, fetchProductByIdSuccess(mockProduct));
      expect(state.currentProduct).toEqual(mockProduct);

      // Clear product
      state = productReducer(state, clearProduct());
      expect(state.currentProduct).toBe(null);
      expect(state.error).toBe(null);
    });
  });
}); 