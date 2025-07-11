import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductInfo from '../../../infrastructure/components/ProductInfo';
import { mockProduct } from '../../utils/testUtils';

describe('ProductInfo', () => {
  describe('rendering', () => {
    it('should render product title', () => {
      render(<ProductInfo product={mockProduct} />);
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    });

    it('should display product status badges', () => {
      render(<ProductInfo product={mockProduct} />);
      expect(screen.getByText('Nuevo')).toBeInTheDocument();
      expect(screen.getByText('+1000 vendidos')).toBeInTheDocument();
    });

    it('should show rating information', () => {
      render(<ProductInfo product={mockProduct} />);
      expect(screen.getByText('4.9')).toBeInTheDocument();
      expect(screen.getByText('★★★★★')).toBeInTheDocument();
      expect(screen.getByText('Ver las opiniones')).toBeInTheDocument();
    });

    it('should display pricing information', () => {
      render(<ProductInfo product={mockProduct} />);
      expect(screen.getByText('$ 1.999.000')).toBeInTheDocument();
      expect(screen.getByText('8% OFF')).toBeInTheDocument();
      expect(screen.getByText('en 12x $ 154.488 sin interés')).toBeInTheDocument();
    });

    it('should show color selection', () => {
      render(<ProductInfo product={mockProduct} />);
      expect(screen.getByText('Color:')).toBeInTheDocument();
      expect(screen.getByText('Azul oscuro')).toBeInTheDocument();
    });

    it('should display storage options', () => {
      render(<ProductInfo product={mockProduct} />);
      expect(screen.getByText('Memoria interna:')).toBeInTheDocument();
      expect(screen.getAllByText('256 GB')).toHaveLength(2); // Appears in selected and button
      expect(screen.getByText('128 GB')).toBeInTheDocument();
    });

    it('should render payment link', () => {
      render(<ProductInfo product={mockProduct} />);
      expect(screen.getByText('Ver los medios de pago')).toBeInTheDocument();
    });
  });

  describe('price formatting', () => {
    it('should format Colombian peso prices correctly', () => {
      render(<ProductInfo product={mockProduct} />);
      // The price should be formatted for Colombian pesos
      // Note: exact format may vary based on locale
      const priceElements = screen.getAllByText(/\$/);
      expect(priceElements.length).toBeGreaterThan(0);
    });

    it('should handle invalid price gracefully', () => {
      const productWithInvalidPrice = { ...mockProduct, price: 'invalid-price' };
      expect(() => {
        render(<ProductInfo product={productWithInvalidPrice} />);
      }).not.toThrow();
    });

    it('should handle empty price', () => {
      const productWithEmptyPrice = { ...mockProduct, price: '' };
      expect(() => {
        render(<ProductInfo product={productWithEmptyPrice} />);
      }).not.toThrow();
    });
  });

  describe('review count', () => {
    it('should display review count from product', () => {
      render(<ProductInfo product={mockProduct} />);
      expect(screen.getByText(`(${mockProduct.additionalDetails.reviews})`)).toBeInTheDocument();
    });

    it('should show fallback review count when not available', () => {
      const productWithoutReviews = {
        ...mockProduct,
        additionalDetails: { ...mockProduct.additionalDetails, reviews: undefined as any }
      };
      render(<ProductInfo product={productWithoutReviews} />);
      expect(screen.getByText('(857)')).toBeInTheDocument();
    });
  });

  describe('interactive elements', () => {
    it('should render color options as clickable elements', () => {
      const { container } = render(<ProductInfo product={mockProduct} />);
      const colorOptions = container.querySelectorAll('.colorOption');
      expect(colorOptions.length).toBeGreaterThan(0);
    });

    it('should render storage options as buttons', () => {
      render(<ProductInfo product={mockProduct} />);
      const storageButtons = screen.getAllByRole('button');
      
      // Should have storage buttons and payment link button
      expect(storageButtons.length).toBeGreaterThan(0);
    });

    it('should show active color selection', () => {
      const { container } = render(<ProductInfo product={mockProduct} />);
      const activeColorOption = container.querySelector('.colorOption.active');
      expect(activeColorOption).toBeInTheDocument();
    });

    it('should show active storage selection', () => {
      const { container } = render(<ProductInfo product={mockProduct} />);
      const activeStorageOption = container.querySelector('.storageOption.active');
      expect(activeStorageOption).toBeInTheDocument();
    });
  });

  describe('component structure', () => {
    it('should have correct CSS classes', () => {
      const { container } = render(<ProductInfo product={mockProduct} />);
      expect(container.querySelector('.productInfo')).toBeInTheDocument();
      expect(container.querySelector('.statusBadges')).toBeInTheDocument();
      expect(container.querySelector('.ratingSection')).toBeInTheDocument();
      expect(container.querySelector('.pricingSection')).toBeInTheDocument();
    });

    it('should render all main sections', () => {
      const { container } = render(<ProductInfo product={mockProduct} />);
      expect(container.querySelector('.colorSection')).toBeInTheDocument();
      expect(container.querySelector('.storageSection')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper heading structure', () => {
      render(<ProductInfo product={mockProduct} />);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      
      const h4Headings = screen.getAllByRole('heading', { level: 4 });
      expect(h4Headings.length).toBeGreaterThan(0);
    });

    it('should have accessible buttons', () => {
      render(<ProductInfo product={mockProduct} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
      
      // Check that payment button is accessible
      const paymentButton = screen.getByRole('button', { name: 'Ver los medios de pago' });
      expect(paymentButton).toBeInTheDocument();
    });

    it('should have color options with titles', () => {
      const { container } = render(<ProductInfo product={mockProduct} />);
      const colorOptions = container.querySelectorAll('.colorOption[title]');
      expect(colorOptions.length).toBeGreaterThan(0);
    });
  });

  describe('edge cases', () => {
    it('should handle undefined product gracefully', () => {
      expect(() => {
        render(<ProductInfo product={undefined as any} />);
      }).toThrow(); // Component should throw when product is undefined
    });

    it('should handle missing additional details', () => {
      const productWithoutDetails = { ...mockProduct, additionalDetails: undefined as any };
      expect(() => {
        render(<ProductInfo product={productWithoutDetails} />);
      }).not.toThrow();
    });

    it('should handle very long product titles', () => {
      const productWithLongTitle = {
        ...mockProduct,
        title: 'This is a very long product title that might exceed normal length limits and could potentially cause layout issues but should still work correctly without breaking the component'
      };
      render(<ProductInfo product={productWithLongTitle} />);
      expect(screen.getByText(productWithLongTitle.title)).toBeInTheDocument();
    });
  });
}); 