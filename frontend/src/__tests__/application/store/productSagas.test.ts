import { runSaga } from 'redux-saga';
import { 
  watchProductSagas, 
  testApiConnectionSaga,
  testApiConnection,
  productApiService
} from '../../../application/store/productSagas';
import { 
  fetchProductByIdStart,
  fetchProductByIdSuccess, 
  fetchProductByIdFailure 
} from '../../../application/store/productSlice';
import { ProductApiService } from '../../../infrastructure/api/ProductApiService';
import { mockProduct } from '../../utils/testUtils';

// Mock ProductApiService
jest.mock('../../../infrastructure/api/ProductApiService');

describe('productSagas', () => {
  let dispatched: any[];
  let mockProductApiService: jest.Mocked<ProductApiService>;

  beforeEach(() => {
    dispatched = [];
    mockProductApiService = productApiService as jest.Mocked<ProductApiService>;
    mockProductApiService.getProductById = jest.fn();
    mockProductApiService.testConnection = jest.fn();
  });

  const mockStore = {
    dispatch: (action: any) => dispatched.push(action),
    getState: () => ({})
  };

  describe('watchProductSagas', () => {
    it('should export watchProductSagas as a generator function', () => {
      expect(typeof watchProductSagas).toBe('function');
      const saga = watchProductSagas();
      expect(typeof saga.next).toBe('function');
    });

    it('should log initialization message', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      const saga = watchProductSagas();
      saga.next(); // Start the saga
      
      expect(consoleSpy).toHaveBeenCalledWith('🚀 Product sagas initialized');
      consoleSpy.mockRestore();
    });
  });

  describe('testApiConnectionSaga', () => {
    it('should test API connection successfully', async () => {
      mockProductApiService.testConnection.mockResolvedValue(true);
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const saga = runSaga(mockStore, testApiConnectionSaga);
      const result = await saga.toPromise();

      expect(result).toBe(true);
      expect(mockProductApiService.testConnection).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith('🔍 Testing API connection...');
      expect(consoleSpy).toHaveBeenCalledWith('✅ API connection successful');
      
      consoleSpy.mockRestore();
    });

    it('should handle connection failure', async () => {
      mockProductApiService.testConnection.mockResolvedValue(false);
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      const saga = runSaga(mockStore, testApiConnectionSaga);
      const result = await saga.toPromise();

      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith('❌ API connection failed');
      
      consoleSpy.mockRestore();
    });

    it('should handle connection error', async () => {
      const error = new Error('Connection error');
      mockProductApiService.testConnection.mockRejectedValue(error);
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      const saga = runSaga(mockStore, testApiConnectionSaga);
      const result = await saga.toPromise();

      expect(result).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith('❌ API connection test error:', error);
      
      consoleErrorSpy.mockRestore();
    });
  });

  describe('action creators', () => {
    it('should create testApiConnection action', () => {
      const expectedAction = { type: 'TEST_API_CONNECTION' };
      expect(testApiConnection()).toEqual(expectedAction);
    });
  });

  describe('API service integration', () => {
    it('should export productApiService', () => {
      expect(productApiService).toBeInstanceOf(ProductApiService);
    });

    it('should have getProductById method', () => {
      expect(typeof productApiService.getProductById).toBe('function');
    });

    it('should have testConnection method', () => {
      expect(typeof productApiService.testConnection).toBe('function');
    });
  });

  describe('saga error handling', () => {
    it('should handle saga execution errors gracefully', async () => {
      // Test that sagas don't crash the application
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      
      try {
        const saga = watchProductSagas();
        const result = saga.next();
        expect(result.done).toBe(false);
      } catch (error) {
        // Should not throw
        expect(error).toBeUndefined();
      }
      
      consoleErrorSpy.mockRestore();
    });
  });

  describe('ProductApiService mock verification', () => {
    it('should properly mock ProductApiService methods', () => {
      expect(jest.isMockFunction(mockProductApiService.getProductById)).toBe(true);
      expect(jest.isMockFunction(mockProductApiService.testConnection)).toBe(true);
    });

    it('should allow method configuration', () => {
      mockProductApiService.getProductById.mockResolvedValue(mockProduct);
      mockProductApiService.testConnection.mockResolvedValue(true);

      expect(mockProductApiService.getProductById).toHaveBeenCalledTimes(0);
      expect(mockProductApiService.testConnection).toHaveBeenCalledTimes(0);
    });
  });

  describe('console logging', () => {
    it('should use consistent emoji patterns', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      const saga = watchProductSagas();
      saga.next();
      
      const logCalls = consoleSpy.mock.calls;
      const initMessage = logCalls.find(call => call[0].includes('🚀'));
      expect(initMessage).toBeDefined();
      
      consoleSpy.mockRestore();
    });
  });
}); 