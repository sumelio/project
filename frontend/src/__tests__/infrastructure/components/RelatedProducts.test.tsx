import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RelatedProducts from '../../../infrastructure/components/RelatedProducts';
import { mockProduct, mockRelatedProducts } from '../../utils/testUtils';

// Mock SellerPanel
jest.mock('../../../infrastructure/components/SellerPanel', () => {
  return function MockSellerPanel({ product }: { product: any }) {
    return (
      <div data-testid="seller-panel">
        <div>Seller: {product.sellerInformation.name}</div>
      </div>
    );
  };
});

describe('RelatedProducts', () => {
  const defaultProps = {
    products: mockRelatedProducts,
    currentProduct: mockProduct
  };

  describe('rendering', () => {
    it('should render section title', () => {
      render(<RelatedProducts {...defaultProps} />);
      expect(screen.getByText('Productos relacionados')).toBeInTheDocument();
    });

    it('should render section subtitle', () => {
      render(<RelatedProducts {...defaultProps} />);
      expect(screen.getByText('Promocionado')).toBeInTheDocument();
    });

    it('should render all related products', () => {
      render(<RelatedProducts {...defaultProps} />);
      
      mockRelatedProducts.forEach(product => {
        expect(screen.getByText(product.title)).toBeInTheDocument();
      });
    });

    it('should render seller panel with current product', () => {
      render(<RelatedProducts {...defaultProps} />);
      
      expect(screen.getByTestId('seller-panel')).toBeInTheDocument();
      expect(screen.getByText(`Seller: ${mockProduct.sellerInformation.name}`)).toBeInTheDocument();
    });
  });

  describe('product cards', () => {
    beforeEach(() => {
      render(<RelatedProducts {...defaultProps} />);
    });

    it('should render product images', () => {
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(mockRelatedProducts.length);
      
      images.forEach((img, index) => {
        expect(img).toHaveAttribute('src', mockRelatedProducts[index].image);
        expect(img).toHaveAttribute('alt', mockRelatedProducts[index].title);
      });
    });

    it('should render product prices', () => {
      mockRelatedProducts.forEach(product => {
        // Check for price patterns rather than exact formatting
        expect(screen.getByText(`${product.discount}% OFF`)).toBeInTheDocument();
      });
      
      // Check that price elements exist
      const priceElements = screen.getAllByText(/\$/);
      expect(priceElements.length).toBeGreaterThan(0);
    });

    it('should render installment information', () => {
      // Check for installment text pattern rather than exact matches
      const installmentElements = screen.getAllByText(/en \d+ cuotas de/);
      expect(installmentElements.length).toBeGreaterThan(0);
    });

    it('should render free shipping for applicable products', () => {
      const freeShippingProducts = mockRelatedProducts.filter(p => p.hasFreeShipping);
      const freeShippingElements = screen.getAllByText('Envío gratis FULL');
      expect(freeShippingElements).toHaveLength(freeShippingProducts.length);
    });

    it('should render shipping icons', () => {
      const shippingIcons = screen.getAllByText('⚡');
      const expectedCount = mockRelatedProducts.filter(p => p.hasFreeShipping).length;
      expect(shippingIcons).toHaveLength(expectedCount);
    });
  });

  describe('price formatting', () => {
    it('should format Colombian pesos correctly', () => {
      render(<RelatedProducts {...defaultProps} />);
      
      // Check that prices are formatted with thousands separators
      expect(screen.getByText(/\$ 294\.900/)).toBeInTheDocument();
      expect(screen.getByText(/\$ 504\.900/)).toBeInTheDocument();
    });

    it('should remove COP from formatted prices', () => {
      render(<RelatedProducts {...defaultProps} />);
      
      // Should use $ instead of COP
      const copTexts = screen.queryAllByText(/COP/);
      expect(copTexts).toHaveLength(0);
    });
  });

  describe('product links', () => {
    it('should render product cards as links', () => {
      render(<RelatedProducts {...defaultProps} />);
      
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThanOrEqual(mockRelatedProducts.length);
      
      links.forEach(link => {
        expect(link).toHaveAttribute('href', '#');
      });
    });

    it('should have correct link structure', () => {
      const { container } = render(<RelatedProducts {...defaultProps} />);
      
      const productCards = container.querySelectorAll('.productCard');
      expect(productCards).toHaveLength(mockRelatedProducts.length);
    });
  });

  describe('edge cases', () => {
    it('should handle empty products array', () => {
      render(<RelatedProducts products={[]} currentProduct={mockProduct} />);
      
      expect(screen.getByText('Productos relacionados')).toBeInTheDocument();
      expect(screen.getByTestId('seller-panel')).toBeInTheDocument();
      
      const productCards = screen.queryAllByText(/Zte Blade/);
      expect(productCards).toHaveLength(0);
    });

    it('should handle products without free shipping', () => {
      const productsWithoutShipping = mockRelatedProducts.map(p => ({
        ...p,
        hasFreeShipping: false
      }));

      render(<RelatedProducts products={productsWithoutShipping} currentProduct={mockProduct} />);
      
      const freeShippingElements = screen.queryAllByText('Envío gratis FULL');
      expect(freeShippingElements).toHaveLength(0);
    });

    it('should handle products with zero discount', () => {
      const productsWithoutDiscount = mockRelatedProducts.map(p => ({
        ...p,
        discount: 0,
        originalPrice: p.currentPrice
      }));

      render(<RelatedProducts products={productsWithoutDiscount} currentProduct={mockProduct} />);
      
      const discountElements = screen.queryAllByText(/% OFF/);
      expect(discountElements).toHaveLength(mockRelatedProducts.length); // Should still show 0% OFF
    });

    it('should handle very large prices', () => {
      const expensiveProducts = mockRelatedProducts.map(p => ({
        ...p,
        currentPrice: 10000000,
        originalPrice: 15000000
      }));

      render(<RelatedProducts products={expensiveProducts} currentProduct={mockProduct} />);
      
      // Check for any element with the large price (there will be multiple)
      const largePrice = screen.getAllByText(/\$ 10\.000\.000/);
      expect(largePrice.length).toBeGreaterThan(0);
    });
  });

  describe('component structure', () => {
    it('should have correct CSS classes', () => {
      const { container } = render(<RelatedProducts {...defaultProps} />);
      
      expect(container.querySelector('.relatedSection')).toBeInTheDocument();
      expect(container.querySelector('.contentWrapper')).toBeInTheDocument();
      expect(container.querySelector('.productsWrapper')).toBeInTheDocument();
      expect(container.querySelector('.relatedProducts')).toBeInTheDocument();
    });

    it('should maintain proper layout structure', () => {
      const { container } = render(<RelatedProducts {...defaultProps} />);
      
      const section = container.querySelector('.relatedSection');
      const wrapper = container.querySelector('.contentWrapper');
      const productsWrapper = container.querySelector('.productsWrapper');
      const sellerPanel = screen.getByTestId('seller-panel');

      expect(section).toContainElement(wrapper as HTMLElement);
      expect(wrapper).toContainElement(productsWrapper as HTMLElement);
      expect(wrapper).toContainElement(sellerPanel);
    });
  });

  describe('accessibility', () => {
    it('should have accessible product links', () => {
      render(<RelatedProducts {...defaultProps} />);
      
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toBeInTheDocument();
      });
    });

    it('should have accessible images', () => {
      render(<RelatedProducts {...defaultProps} />);
      
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
        expect(img.getAttribute('alt')).not.toBe('');
      });
    });

    it('should have semantic HTML structure', () => {
      const { container } = render(<RelatedProducts {...defaultProps} />);
      
      expect(container.querySelector('section')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });
  });

  describe('responsive behavior', () => {
    it('should render responsive grid structure', () => {
      const { container } = render(<RelatedProducts {...defaultProps} />);
      
      expect(container.querySelector('.relatedProducts')).toBeInTheDocument();
    });
  });
}); 