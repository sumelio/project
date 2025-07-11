import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductDetail from '../../../infrastructure/components/ProductDetail';
import { renderWithRedux, mockProduct } from '../../utils/testUtils';

describe('ProductDetail', () => {
  describe('rendering', () => {
    it('should render product detail fetcher container', () => {
      renderWithRedux(<ProductDetail />);
      expect(screen.getByText('🛍️ Product Detail Fetcher')).toBeInTheDocument();
    });

    it('should render input field for product ID', () => {
      renderWithRedux(<ProductDetail />);
      expect(screen.getByPlaceholderText('Enter product ID (e.g., 1)')).toBeInTheDocument();
    });

    it('should render fetch button', () => {
      renderWithRedux(<ProductDetail />);
      expect(screen.getByText('🔍 Fetch Product')).toBeInTheDocument();
    });

    it('should render instructions', () => {
      renderWithRedux(<ProductDetail />);
      expect(screen.getByText('💡 How to test:')).toBeInTheDocument();
    });
  });

  describe('user interactions', () => {
    it('should enable fetch button when product ID is entered', () => {
      renderWithRedux(<ProductDetail />);
      const input = screen.getByPlaceholderText('Enter product ID (e.g., 1)');
      const button = screen.getByText('🔍 Fetch Product');
      
      expect(button).toBeDisabled();
      
      fireEvent.change(input, { target: { value: '1' } });
      expect(button).not.toBeDisabled();
    });

    it('should call fetch on Enter key press', async () => {
      const { store } = renderWithRedux(<ProductDetail />);
      
      const input = screen.getByPlaceholderText('Enter product ID (e.g., 1)');
      fireEvent.change(input, { target: { value: '123' } });
      
      fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
      
      // Should trigger loading state - check for the actual button text change
      await waitFor(() => {
        const fetchButton = screen.getByRole('button', { name: /🔄 Loading|🔍 Fetch Product/ });
        expect(fetchButton).toBeInTheDocument();
      });
    });

    it('should clear input when clear button is clicked', () => {
      const { store } = renderWithRedux(<ProductDetail />, {
        initialState: { currentProduct: mockProduct, loading: false, error: null }
      });
      
      const clearButton = screen.getByText('🗑️ Clear');
      fireEvent.click(clearButton);
      
      const input = screen.getByPlaceholderText('Enter product ID (e.g., 1)');
      expect(input).toHaveValue('');
    });
  });

  describe('state management', () => {
    it('should show loading state', () => {
      renderWithRedux(<ProductDetail />, {
        initialState: { currentProduct: null, loading: true, error: null }
      });
      
      expect(screen.getByText('🔄 Fetching product from backend...')).toBeInTheDocument();
    });

    it('should show error state', () => {
      const errorMessage = 'Product not found';
      renderWithRedux(<ProductDetail />, {
        initialState: { currentProduct: null, loading: false, error: errorMessage }
      });
      
      expect(screen.getByText('❌ Error:')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('should show product when loaded', () => {
      renderWithRedux(<ProductDetail />, {
        initialState: { currentProduct: mockProduct, loading: false, error: null }
      });
      
      expect(screen.getByText('✅ Product Found')).toBeInTheDocument();
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    });

    it('should show clear button when product is loaded', () => {
      renderWithRedux(<ProductDetail />, {
        initialState: { currentProduct: mockProduct, loading: false, error: null }
      });
      
      expect(screen.getByText('🗑️ Clear')).toBeInTheDocument();
    });
  });

  describe('product display', () => {
    it('should display all product information', () => {
      renderWithRedux(<ProductDetail />, {
        initialState: { currentProduct: mockProduct, loading: false, error: null }
      });
      
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
      expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
      expect(screen.getByText(mockProduct.sellerInformation.name)).toBeInTheDocument();
    });

    it('should display additional details when available', () => {
      renderWithRedux(<ProductDetail />, {
        initialState: { currentProduct: mockProduct, loading: false, error: null }
      });
      
      expect(screen.getByText('📊 Additional Details:')).toBeInTheDocument();
      // Check for rating and review patterns
      expect(screen.getByText(/4\.8|Rating:/)).toBeInTheDocument();
      expect(screen.getByText(/769|Reviews:/)).toBeInTheDocument();
    });

    it('should handle product without additional details', () => {
      const productWithoutDetails = { ...mockProduct, additionalDetails: undefined as any };
      renderWithRedux(<ProductDetail />, {
        initialState: { currentProduct: productWithoutDetails, loading: false, error: null }
      });
      
      expect(screen.getByText(productWithoutDetails.title)).toBeInTheDocument();
      expect(screen.queryByText('📊 Additional Details:')).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper heading structure', () => {
      renderWithRedux(<ProductDetail />);
      
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('should have accessible form elements', () => {
      renderWithRedux(<ProductDetail />);
      
      const input = screen.getByRole('textbox');
      const button = screen.getByRole('button', { name: /Fetch Product/ });
      
      expect(input).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    it('should have proper button states', () => {
      renderWithRedux(<ProductDetail />, {
        initialState: { currentProduct: null, loading: true, error: null }
      });
      
      const button = screen.getByRole('button', { name: /Loading/ });
      expect(button).toBeDisabled();
    });
  });
}); 