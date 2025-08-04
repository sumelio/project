import axios from 'axios';
import { Product } from '../../domain/entities/Product';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export class ProductApiService {
  private apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout
  });

  constructor() {
    // Add request interceptor for logging
    this.apiClient.interceptors.request.use(
      (config) => {
        console.log(`Making API request to: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.apiClient.interceptors.response.use(
      (response) => {
        console.log(`API response received from: ${response.config.url}`, response.status);
        return response;
      },
      (error) => {
        console.error('Response error:', error);
        if (error.response) {
          // Server responded with error status
          const message = error.response.data?.message || `HTTP ${error.response.status}`;
          throw new Error(message);
        } else if (error.request) {
          // Request was made but no response received
          throw new Error('No response from server. Please check if the backend is running.');
        } else {
          // Something else happened
          throw new Error('Request failed: ' + error.message);
        }
      }
    );
  }

  async getProductById(id: string): Promise<Product> {
    if (!id || id.trim() === '') {
      throw new Error('Product ID is required');
    }

    try {
      const response = await this.apiClient.get<Product>(`/product/${encodeURIComponent(id)}`);
      
      // Validate response data
      if (!response.data) {
        throw new Error('No product data received from server');
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error(`Product with ID "${id}" not found`);
        }
        if (error.response?.status === 500) {
          throw new Error('Server error occurred while fetching product');
        }
      }
      throw error;
    }
  }

  async getAllProducts(): Promise<Product[]> {
    const response = await this.apiClient.get<Product[]>('/product');
    return response.data;
  }

  // Method to test API connection
  async testConnection(): Promise<boolean> {
    try {
      await this.apiClient.get('/product');
      return true;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }
} 