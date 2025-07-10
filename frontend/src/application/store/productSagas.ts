import { call, put, takeEvery, delay } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { ProductApiService } from '../../infrastructure/api/ProductApiService';
import { Product } from '../../domain/entities/Product';
import {
  fetchProductByIdStart,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
} from './productSlice';

// Create singleton instance of the API service
const productApiService = new ProductApiService();

// Saga to handle fetching product by ID
function* fetchProductByIdSaga(action: PayloadAction<string>): SagaIterator {
  const productId = action.payload;
  
  try {
    console.log(`🔄 Starting fetch for product ID: ${productId}`);
    
    // Add small delay to show loading state
    yield delay(300);
    
    // Call the API service
    const product: Product = yield call([productApiService, 'getProductById'], productId);
    
    console.log(`✅ Successfully fetched product:`, product);
    
    // Dispatch success action with the product data
    yield put(fetchProductByIdSuccess(product));
    
  } catch (error) {
    console.error(`❌ Error fetching product ${productId}:`, error);
    
    // Extract error message
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unknown error occurred while fetching the product';
    
    // Dispatch failure action with error message
    yield put(fetchProductByIdFailure(errorMessage));
  }
}

// Saga to test API connection
function* testApiConnectionSaga(): SagaIterator {
  try {
    console.log('🔍 Testing API connection...');
    
    const isConnected: boolean = yield call([productApiService, 'testConnection']);
    
    if (isConnected) {
      console.log('✅ API connection successful');
    } else {
      console.log('❌ API connection failed');
    }
    
    return isConnected;
  } catch (error) {
    console.error('❌ API connection test error:', error);
    return false;
  }
}

// Root saga to watch for actions
export function* watchProductSagas(): SagaIterator {
  console.log('🚀 Product sagas initialized');
  
  // Watch for fetchProductByIdStart actions
  yield takeEvery(fetchProductByIdStart.type, fetchProductByIdSaga);
}

// Export for manual testing
export { testApiConnectionSaga, productApiService };

// Action creator for testing API connection
export const testApiConnection = () => ({ type: 'TEST_API_CONNECTION' }); 