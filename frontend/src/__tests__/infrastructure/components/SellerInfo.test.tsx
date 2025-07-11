import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SellerInfo from '../../../infrastructure/components/SellerInfo';
import { mockProduct } from '../../utils/testUtils';

describe('SellerInfo', () => {
  const mockSellerName = mockProduct.sellerInformation.name;

  describe('rendering', () => {
    it('should render seller information', () => {
      render(<SellerInfo sellerInfo={mockSellerName} />);
      expect(screen.getByText('Seller Information')).toBeInTheDocument();
    });

    it('should display seller name', () => {
      render(<SellerInfo sellerInfo={mockSellerName} />);
      expect(screen.getByText(mockSellerName)).toBeInTheDocument();
    });

    it('should show default seller stats', () => {
      render(<SellerInfo sellerInfo={mockSellerName} />);
      expect(screen.getByText('4.8')).toBeInTheDocument();
      expect(screen.getByText('1,234')).toBeInTheDocument();
      expect(screen.getByText('99%')).toBeInTheDocument();
    });

    it('should render seller badges', () => {
      render(<SellerInfo sellerInfo={mockSellerName} />);
      expect(screen.getByText('🏆 Top Seller')).toBeInTheDocument();
      expect(screen.getByText('✅ Verified')).toBeInTheDocument();
    });

    it('should render action buttons', () => {
      render(<SellerInfo sellerInfo={mockSellerName} />);
      expect(screen.getByText('💬 Contact Seller')).toBeInTheDocument();
      expect(screen.getByText('🏪 Visit Store')).toBeInTheDocument();
    });

    it('should render seller promises', () => {
      render(<SellerInfo sellerInfo={mockSellerName} />);
      expect(screen.getByText('Fast shipping')).toBeInTheDocument();
      expect(screen.getByText('Secure payment')).toBeInTheDocument();
      expect(screen.getByText('Easy returns')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle undefined seller info gracefully', () => {
      expect(() => {
        render(<SellerInfo sellerInfo={undefined as any} />);
      }).not.toThrow();
    });

    it('should handle empty seller string', () => {
      render(<SellerInfo sellerInfo="" />);
      expect(screen.getByText('Seller Information')).toBeInTheDocument();
    });

    it('should handle very long seller names', () => {
      const longName = 'very-long-seller-name-that-might-break-layout-testing-purposes';
      render(<SellerInfo sellerInfo={longName} />);
      expect(screen.getByText(longName)).toBeInTheDocument();
    });
  });

  describe('component structure', () => {
    it('should have correct CSS classes', () => {
      const { container } = render(<SellerInfo sellerInfo={mockSellerName} />);
      expect(container.querySelector('.sellerCard')).toBeInTheDocument();
      expect(container.querySelector('.sellerDetails')).toBeInTheDocument();
    });

    it('should render stat labels', () => {
      render(<SellerInfo sellerInfo={mockSellerName} />);
      expect(screen.getByText('⭐ Rating')).toBeInTheDocument();
      expect(screen.getByText('📦 Sales')).toBeInTheDocument();
      expect(screen.getByText('✅ Positive')).toBeInTheDocument();
    });
  });

  describe('seller data variations', () => {
    it('should handle different seller names', () => {
      const differentName = 'different-seller-name';
      render(<SellerInfo sellerInfo={differentName} />);
      expect(screen.getByText(differentName)).toBeInTheDocument();
    });

    it('should handle special characters in names', () => {
      const specialName = 'seller@123-_name';
      render(<SellerInfo sellerInfo={specialName} />);
      expect(screen.getByText(specialName)).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper heading structure', () => {
      render(<SellerInfo sellerInfo={mockSellerName} />);
      expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
    });

    it('should have accessible buttons', () => {
      render(<SellerInfo sellerInfo={mockSellerName} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveTextContent('💬 Contact Seller');
      expect(buttons[1]).toHaveTextContent('🏪 Visit Store');
    });

    it('should be accessible to screen readers', () => {
      render(<SellerInfo sellerInfo={mockSellerName} />);
      expect(screen.getByText(mockSellerName)).toBeInTheDocument();
    });
  });
}); 