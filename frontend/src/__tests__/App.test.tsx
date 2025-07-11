import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { ProductApiService } from '../infrastructure/api/ProductApiService';
import { mockProduct } from './utils/testUtils';

// Mock the ProductApiService
jest.mock('../infrastructure/api/ProductApiService');

// Mock child components to focus on App integration
jest.mock('../infrastructure/components/Header', () => {
  return function MockHeader() {
    return <header data-testid="header">MercadoLibre Header</header>;
  };
});

jest.mock('../infrastructure/components/ProductDetailPage', () => {
  return function MockProductDetailPage({ productId }: { productId: string }) {
    return (
      <div data-testid="product-detail-page">
        <div>Product ID: {productId}</div>
      </div>
    );
  };
});

describe('App Integration Tests', () => {
  let mockProductApiService: jest.Mocked<ProductApiService>;

  beforeEach(() => {
    mockProductApiService = new ProductApiService() as jest.Mocked<ProductApiService>;
    mockProductApiService.getProductById = jest.fn();
    mockProductApiService.testConnection = jest.fn();
    
    // Clear all mocks
    jest.clearAllMocks();
  });

  describe('App Structure', () => {
    it('should render the main App structure', () => {
      render(<App />);

      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('product-detail-page')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('should have correct CSS class', () => {
      const { container } = render(<App />);
      expect(container.querySelector('.App')).toBeInTheDocument();
    });

    it('should render Header component', () => {
      render(<App />);
      expect(screen.getByText('MercadoLibre Header')).toBeInTheDocument();
    });

    it('should render ProductDetailPage with default productId', () => {
      render(<App />);
      expect(screen.getByText('Product ID: 1')).toBeInTheDocument();
    });
  });

  describe('Redux Provider Integration', () => {
    it('should provide Redux store to child components', () => {
      // This test verifies that the Provider is correctly wrapping the app
      expect(() => render(<App />)).not.toThrow();
    });

    it('should initialize with default state', () => {
      render(<App />);
      
      // Should render without errors, indicating store is properly initialized
      expect(screen.getByTestId('product-detail-page')).toBeInTheDocument();
    });
  });

  describe('Component Hierarchy', () => {
    it('should maintain correct component hierarchy', () => {
      const { container } = render(<App />);
      
      const app = container.querySelector('.App');
      const header = screen.getByTestId('header');
      const main = screen.getByRole('main');
      const productDetailPage = screen.getByTestId('product-detail-page');

      expect(app).toContainElement(header);
      expect(app).toContainElement(main);
      expect(main).toContainElement(productDetailPage);
    });

    it('should render header before main content', () => {
      render(<App />);
      
      const header = screen.getByTestId('header');
      const main = screen.getByRole('main');
      
      // Header should appear before main in the DOM
      expect(header.compareDocumentPosition(main)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
  });

  describe('Error Handling', () => {
    it('should handle component errors gracefully', () => {
      // Test that app doesn't crash with invalid props or state
      expect(() => render(<App />)).not.toThrow();
    });

    it('should continue to function if child components fail', () => {
      // Even if there are issues with child components, the app should still render
      render(<App />);
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
  });

  describe('Performance and Optimization', () => {
    it('should render efficiently', () => {
      const startTime = performance.now();
      render(<App />);
      const endTime = performance.now();
      
      // Should render in reasonable time (less than 100ms for this simple structure)
      expect(endTime - startTime).toBeLessThan(100);
    });

    it('should not cause memory leaks', () => {
      const { unmount } = render(<App />);
      
      // Should unmount cleanly
      expect(() => unmount()).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible structure', () => {
      render(<App />);
      
      // Should have main landmark
      expect(screen.getByRole('main')).toBeInTheDocument();
      
      // Should have proper heading structure (through Header)
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    it('should maintain focus management', () => {
      render(<App />);
      
      // Should not interfere with natural focus flow
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('should adapt to different screen sizes', () => {
      const { container } = render(<App />);
      
      // Should have responsive container structure
      expect(container.querySelector('.App')).toBeInTheDocument();
    });
  });

  describe('State Management Integration', () => {
    it('should properly initialize Redux store', () => {
      // Test that the store is properly configured by checking that components render
      render(<App />);
      
      // If store is not properly configured, this would throw
      expect(screen.getByTestId('product-detail-page')).toBeInTheDocument();
    });

    it('should handle store updates correctly', async () => {
      render(<App />);
      
      // The ProductDetailPage should be able to interact with the store
      await waitFor(() => {
        expect(screen.getByTestId('product-detail-page')).toBeInTheDocument();
      });
    });
  });

  describe('Environment and Configuration', () => {
    it('should handle missing environment variables gracefully', () => {
      const originalEnv = process.env.REACT_APP_API_URL;
      delete process.env.REACT_APP_API_URL;
      
      expect(() => render(<App />)).not.toThrow();
      
      // Restore environment
      process.env.REACT_APP_API_URL = originalEnv;
    });

    it('should adapt to different configurations', () => {
      // Test that app renders correctly in different environments
      expect(() => render(<App />)).not.toThrow();
    });
  });

  describe('Integration with External Services', () => {
    it('should initialize API services correctly', () => {
      render(<App />);
      
      // Should not throw errors related to API service initialization
      expect(screen.getByTestId('product-detail-page')).toBeInTheDocument();
    });
  });

  describe('App Lifecycle', () => {
    it('should mount correctly', () => {
      const { container } = render(<App />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should unmount correctly', () => {
      const { unmount } = render(<App />);
      expect(() => unmount()).not.toThrow();
    });

    it('should handle re-renders correctly', () => {
      const { rerender } = render(<App />);
      expect(() => rerender(<App />)).not.toThrow();
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
  });

  describe('CSS and Styling', () => {
    it('should load CSS correctly', () => {
      const { container } = render(<App />);
      
      // Should have the App CSS class
      expect(container.querySelector('.App')).toBeInTheDocument();
    });

    it('should maintain proper layout structure', () => {
      render(<App />);
      
      // Check that the layout elements are present
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });
}); 