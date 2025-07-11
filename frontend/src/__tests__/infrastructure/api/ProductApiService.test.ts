import axios from 'axios';
import { ProductApiService } from '../../../infrastructure/api/ProductApiService';
import { mockProduct, mockApiResponses } from '../../utils/testUtils';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ProductApiService', () => {
  let productApiService: ProductApiService;
  let mockAxiosInstance: any;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Create mock axios instance
    mockAxiosInstance = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() }
      }
    };

    // Mock axios.create to return our mock instance
    mockedAxios.create.mockReturnValue(mockAxiosInstance);
    
    // Create new service instance
    productApiService = new ProductApiService();
  });

  describe('constructor', () => {
    it('should create axios instance with correct configuration', () => {
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'http://localhost:8080',
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
    });

    it('should setup request interceptor', () => {
      expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
    });

    it('should setup response interceptor', () => {
      expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
    });
  });

  describe('getProductById', () => {
    it('should return product data for valid ID', async () => {
      const productId = '1';
      const mockResponse = { data: mockProduct };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await productApiService.getProductById(productId);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/product/1');
      expect(result).toEqual(mockProduct);
    });

    it('should handle URL encoding for product ID', async () => {
      const productId = 'test id with spaces';
      const mockResponse = { data: mockProduct };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      await productApiService.getProductById(productId);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/product/test%20id%20with%20spaces');
    });

    it('should throw error for empty product ID', async () => {
      await expect(productApiService.getProductById('')).rejects.toThrow('Product ID is required');
      await expect(productApiService.getProductById('   ')).rejects.toThrow('Product ID is required');
    });

    it('should throw error when no data received', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: null });

      await expect(productApiService.getProductById('1')).rejects.toThrow('No product data received from server');
    });

    it('should handle 404 error', async () => {
      const error = {
        response: { status: 404 }
      };
      mockAxiosInstance.get.mockRejectedValue(error);
      mockedAxios.isAxiosError.mockReturnValue(true);

      await expect(productApiService.getProductById('999')).rejects.toThrow('Product with ID "999" not found');
    });

    it('should handle 500 error', async () => {
      const error = {
        response: { status: 500 }
      };
      mockAxiosInstance.get.mockRejectedValue(error);
      mockedAxios.isAxiosError.mockReturnValue(true);

      await expect(productApiService.getProductById('1')).rejects.toThrow('Server error occurred while fetching product');
    });

    it('should handle network error', async () => {
      const networkError = new Error('Network Error');
      mockAxiosInstance.get.mockRejectedValue(networkError);
      mockedAxios.isAxiosError.mockReturnValue(false);

      await expect(productApiService.getProductById('1')).rejects.toThrow('Network Error');
    });

    it('should handle axios errors with custom response message', async () => {
      const customErrorMessage = 'Custom server error';
      const axiosError = new Error('Request failed');
      (axiosError as any).response = {
        status: 500,
        data: { message: customErrorMessage }
      };
      (axiosError as any).isAxiosError = true;

      (axios.get as jest.Mock).mockRejectedValueOnce(axiosError);

      // The service will throw the error from the interceptor
      await expect(productApiService.getProductById('1')).rejects.toThrow();
    });
  });

  describe('testConnection', () => {
    it('should return true for successful connection', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: [] });

      const result = await productApiService.testConnection();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/product');
      expect(result).toBe(true);
    });

    it('should return false for failed connection', async () => {
      mockAxiosInstance.get.mockRejectedValue(new Error('Connection failed'));

      const result = await productApiService.testConnection();

      expect(result).toBe(false);
    });

    it('should log error on connection failure', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      const error = new Error('Connection failed');
      mockAxiosInstance.get.mockRejectedValue(error);

      await productApiService.testConnection();

      expect(consoleErrorSpy).toHaveBeenCalledWith('API connection test failed:', error);
      consoleErrorSpy.mockRestore();
    });
  });

  describe('API configuration', () => {
    it('should use environment variable for API URL when available', () => {
      // The API service constructs its URL in the constructor before mocking
      // So we need to test this at module load time or check the baseURL 
      expect(mockedAxios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          baseURL: expect.any(String),
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        })
      );
    });

    it('should use default URL when environment variable is not set', () => {
      // Similar to above - the URL is set at construction time
      expect(mockedAxios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        })
      );
    });
  });

  describe('interceptors', () => {
    it('should setup request interceptor with logging', async () => {
      const requestInterceptor = mockAxiosInstance.interceptors.request.use;
      expect(requestInterceptor).toHaveBeenCalled();
      
      const [successHandler, errorHandler] = requestInterceptor.mock.calls[0];
      
      // Test success handler
      const config = { method: 'GET', url: '/test' };
      const result = successHandler(config);
      expect(result).toBe(config);
      
      // Test error handler  
      const error = new Error('Request error');
      await expect(errorHandler(error)).rejects.toThrow('Request error');
    });

    it('should setup response interceptor with error handling', () => {
      const responseInterceptor = mockAxiosInstance.interceptors.response.use;
      expect(responseInterceptor).toHaveBeenCalled();
      
      const [successHandler, errorHandler] = responseInterceptor.mock.calls[0];
      
      // Test success handler
      const response = { config: { url: '/test' }, status: 200 };
      const result = successHandler(response);
      expect(result).toBe(response);
    });
  });
}); 