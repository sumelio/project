import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductInfoColumn from '../../../infrastructure/components/ProductInfoColumn';
import { mockProduct } from '../../utils/testUtils';

describe('ProductInfoColumn', () => {
  describe('rendering', () => {
    it('should render product title', () => {
      render(<ProductInfoColumn product={mockProduct} />);
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    });

    it('should render product status', () => {
      render(<ProductInfoColumn product={mockProduct} />);
      expect(screen.getByText('Nuevo')).toBeInTheDocument();
      expect(screen.getByText('+1000 vendidos')).toBeInTheDocument();
    });

    it('should render rating information', () => {
      render(<ProductInfoColumn product={mockProduct} />);
      expect(screen.getByText(mockProduct.additionalDetails.ratings)).toBeInTheDocument();
      expect(screen.getByText(`(${mockProduct.additionalDetails.reviews})`)).toBeInTheDocument();
    });

    it('should render price information', () => {
      render(<ProductInfoColumn product={mockProduct} />);
      expect(screen.getByText(mockProduct.price)).toBeInTheDocument();
    });

    it('should render installment information', () => {
      render(<ProductInfoColumn product={mockProduct} />);
      expect(screen.getByText(/3 cuotas de/)).toBeInTheDocument();
      expect(screen.getByText('con 0% interés')).toBeInTheDocument();
    });

    it('should render color information', () => {
      render(<ProductInfoColumn product={mockProduct} />);
      expect(screen.getByText('Color:')).toBeInTheDocument();
      expect(screen.getByText('Azul oscuro')).toBeInTheDocument();
    });

    it('should render product features', () => {
      render(<ProductInfoColumn product={mockProduct} />);
      expect(screen.getByText('Lo que tienes que saber de este producto')).toBeInTheDocument();
      expect(screen.getByText('Memoria RAM: 8 GB.')).toBeInTheDocument();
      expect(screen.getByText('Dispositivo desbloqueado para que elijas tu compañía telefónica preferida.')).toBeInTheDocument();
    });
  });

  describe('component structure', () => {
    it('should have correct CSS classes', () => {
      const { container } = render(<ProductInfoColumn product={mockProduct} />);
      expect(container.querySelector('.productInfoColumn')).toBeInTheDocument();
    });

    it('should render stars for rating', () => {
      render(<ProductInfoColumn product={mockProduct} />);
      expect(screen.getByText('★★★★★')).toBeInTheDocument();
    });

    it('should render payment link', () => {
      render(<ProductInfoColumn product={mockProduct} />);
      expect(screen.getByText('Ver los medios de pago')).toBeInTheDocument();
    });

    it('should render see more button', () => {
      render(<ProductInfoColumn product={mockProduct} />);
      expect(screen.getByText('Ver características')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle missing ratings', () => {
      const productWithoutRating = {
        ...mockProduct,
        additionalDetails: {
          ...mockProduct.additionalDetails,
          ratings: '',
          reviews: ''
        }
      };

      render(<ProductInfoColumn product={productWithoutRating} />);
      expect(screen.getByText('4.9')).toBeInTheDocument(); // fallback value
      expect(screen.getByText('(858)')).toBeInTheDocument(); // fallback value
    });

    it('should handle missing additional details', () => {
      const productWithoutDetails = {
        ...mockProduct,
        additionalDetails: undefined as any
      };

      expect(() => render(<ProductInfoColumn product={productWithoutDetails} />)).not.toThrow();
    });
  });

  describe('accessibility', () => {
    it('should have proper heading structure', () => {
      render(<ProductInfoColumn product={mockProduct} />);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('should have accessible buttons', () => {
      render(<ProductInfoColumn product={mockProduct} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });
}); 