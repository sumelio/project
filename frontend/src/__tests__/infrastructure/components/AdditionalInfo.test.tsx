import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdditionalInfo from '../../../infrastructure/components/AdditionalInfo';
import { mockProduct } from '../../utils/testUtils';

describe('AdditionalInfo', () => {
  const mockDetails = mockProduct.additionalDetails;

  describe('rendering', () => {
    it('should render additional info container', () => {
      const { container } = render(<AdditionalInfo details={mockDetails} />);
      expect(container.querySelector('.additionalInfo')).toBeInTheDocument();
    });

    it('should render product details title', () => {
      render(<AdditionalInfo details={mockDetails} />);
      expect(screen.getByText('Product Details')).toBeInTheDocument();
    });

    it('should display customer rating', () => {
      render(<AdditionalInfo details={mockDetails} />);
      expect(screen.getByText('Customer Rating')).toBeInTheDocument();
      expect(screen.getByText(mockDetails.ratings)).toBeInTheDocument();
    });

    it('should display customer reviews', () => {
      render(<AdditionalInfo details={mockDetails} />);
      expect(screen.getByText('Customer Reviews')).toBeInTheDocument();
      expect(screen.getByText(mockDetails.reviews)).toBeInTheDocument();
    });

    it('should display availability info', () => {
      render(<AdditionalInfo details={mockDetails} />);
      expect(screen.getByText('Availability')).toBeInTheDocument();
      expect(screen.getByText(mockDetails.availableStock)).toBeInTheDocument();
    });

    it('should render rating stars', () => {
      render(<AdditionalInfo details={mockDetails} />);
      const stars = screen.getAllByText('★');
      expect(stars).toHaveLength(5);
    });

    it('should render stock status', () => {
      render(<AdditionalInfo details={mockDetails} />);
      expect(screen.getByText('units in stock')).toBeInTheDocument();
    });

    it('should render features section', () => {
      render(<AdditionalInfo details={mockDetails} />);
      expect(screen.getByText('Why choose this product?')).toBeInTheDocument();
      expect(screen.getByText('Trending product')).toBeInTheDocument();
      expect(screen.getByText('Best seller in category')).toBeInTheDocument();
      expect(screen.getByText('Fast delivery available')).toBeInTheDocument();
    });

    it('should render read reviews button', () => {
      render(<AdditionalInfo details={mockDetails} />);
      expect(screen.getByText('Read Reviews')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle undefined details gracefully', () => {
      const { container } = render(<AdditionalInfo details={undefined as any} />);
      expect(container.firstChild).toBeNull();
    });

    it('should handle empty details object', () => {
      const emptyDetails = {} as any;
      render(<AdditionalInfo details={emptyDetails} />);
      expect(screen.getByText('Product Details')).toBeInTheDocument();
    });

    it('should handle missing ratings', () => {
      const detailsWithoutRating = { ...mockDetails, ratings: '' };
      render(<AdditionalInfo details={detailsWithoutRating} />);
      expect(screen.queryByText('Customer Rating')).not.toBeInTheDocument();
    });

    it('should handle missing reviews', () => {
      const detailsWithoutReviews = { ...mockDetails, reviews: '' };
      render(<AdditionalInfo details={detailsWithoutReviews} />);
      expect(screen.queryByText('Customer Reviews')).not.toBeInTheDocument();
    });

    it('should handle missing stock', () => {
      const detailsWithoutStock = { ...mockDetails, availableStock: '' };
      render(<AdditionalInfo details={detailsWithoutStock} />);
      expect(screen.queryByText('Availability')).not.toBeInTheDocument();
    });
  });

  describe('stock status indicators', () => {
    it('should show "In Stock" for high stock', () => {
      const highStockDetails = { ...mockDetails, availableStock: '15' };
      render(<AdditionalInfo details={highStockDetails} />);
      expect(screen.getByText('✅ In Stock')).toBeInTheDocument();
    });

    it('should show "Low Stock" for low stock', () => {
      const lowStockDetails = { ...mockDetails, availableStock: '3' };
      render(<AdditionalInfo details={lowStockDetails} />);
      expect(screen.getByText('⚠️ Low Stock')).toBeInTheDocument();
    });

    it('should show "Out of Stock" for zero stock', () => {
      const noStockDetails = { ...mockDetails, availableStock: '0' };
      render(<AdditionalInfo details={noStockDetails} />);
      expect(screen.getByText('❌ Out of Stock')).toBeInTheDocument();
    });
  });

  describe('component structure', () => {
    it('should have correct CSS classes', () => {
      const { container } = render(<AdditionalInfo details={mockDetails} />);
      expect(container.querySelector('.additionalInfo')).toBeInTheDocument();
      expect(container.querySelector('.detailsGrid')).toBeInTheDocument();
      expect(container.querySelector('.features')).toBeInTheDocument();
    });

    it('should render detail cards', () => {
      const { container } = render(<AdditionalInfo details={mockDetails} />);
      const detailCards = container.querySelectorAll('.detailCard');
      expect(detailCards.length).toBeGreaterThan(0);
    });
  });

  describe('accessibility', () => {
    it('should have proper heading structure', () => {
      render(<AdditionalInfo details={mockDetails} />);
      expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 5 })).toBeInTheDocument();
    });

    it('should have accessible button', () => {
      render(<AdditionalInfo details={mockDetails} />);
      expect(screen.getByRole('button', { name: 'Read Reviews' })).toBeInTheDocument();
    });
  });
}); 