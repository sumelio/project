import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SellerPanel from '../../../infrastructure/components/SellerPanel';
import { mockProduct } from '../../utils/testUtils';

describe('SellerPanel', () => {
  describe('rendering', () => {
    it('should render seller information correctly', () => {
      render(<SellerPanel product={mockProduct} />);

      // Seller name and avatar
      expect(screen.getByText('laeternaproductos')).toBeInTheDocument();
      expect(screen.getByText('L')).toBeInTheDocument(); // Avatar letter

      // Products count
      expect(screen.getByText('+100mil Productos')).toBeInTheDocument();

      // Reputation
      expect(screen.getByText('MercadoLíder')).toBeInTheDocument();
      expect(screen.getByText('¡Uno de los mejores del sitio!')).toBeInTheDocument();
    });

    it('should render seller metrics', () => {
      render(<SellerPanel product={mockProduct} />);

      expect(screen.getByText('1000')).toBeInTheDocument();
      expect(screen.getByText('ventas')).toBeInTheDocument();
      expect(screen.getByText('Brinda buena atención')).toBeInTheDocument();
      expect(screen.getByText('Entrega sus productos a tiempo')).toBeInTheDocument();
    });

    it('should render purchase options with formatted price', () => {
      render(<SellerPanel product={mockProduct} />);

      // Colombian peso formatting - match the space between $ and number
      expect(screen.getByText(/\$ 1\.853\.861/)).toBeInTheDocument();
      expect(screen.getByText(/en 12x/)).toBeInTheDocument();
    });

    it('should render stock information', () => {
      render(<SellerPanel product={mockProduct} />);

      expect(screen.getByText('Stock disponible')).toBeInTheDocument();
      expect(screen.getByText('(4 disponibles)')).toBeInTheDocument();
    });

    it('should render shipping information', () => {
      render(<SellerPanel product={mockProduct} />);

      expect(screen.getByText('Envío gratis a todo el país')).toBeInTheDocument();
      expect(screen.getByText('Conoce los tiempos y las formas de envío.')).toBeInTheDocument();
    });

    it('should render action buttons', () => {
      render(<SellerPanel product={mockProduct} />);

      expect(screen.getByRole('button', { name: 'Comprar ahora' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Agregar al carrito' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Seguir' })).toBeInTheDocument();
    });

    it('should render payment methods', () => {
      render(<SellerPanel product={mockProduct} />);

      expect(screen.getByText('Medios de pago')).toBeInTheDocument();
      
      mockProduct.paymentMethods.forEach(method => {
        expect(screen.getByText(method)).toBeInTheDocument();
      });
    });

    it('should render seller link with correct href', () => {
      render(<SellerPanel product={mockProduct} />);

      const sellerLink = screen.getByText('Ver más datos de este vendedor');
      expect(sellerLink).toBeInTheDocument();
      expect(sellerLink.closest('a')).toHaveAttribute('href', '/seller/laeternaproductos');
    });
  });

  describe('price formatting', () => {
    it('should format prices correctly', () => {
      render(<SellerPanel product={mockProduct} />);

      // Main price - use partial match for formatted price  
      expect(screen.getByText(/1\.853\.861/)).toBeInTheDocument();
      
      // Installment price (price / 12) - look for the number without formatting
      expect(screen.getByText(/154\.488/)).toBeInTheDocument();
    });

    it('should handle different price values', () => {
      const customProduct = {
        ...mockProduct,
        sellerInformation: {
          ...mockProduct.sellerInformation,
          purchaseOptions: { price: 500000 }
        }
      };

      render(<SellerPanel product={customProduct} />);
      expect(screen.getByText(/\$ 500\.000/)).toBeInTheDocument();
    });
  });

  describe('seller avatar', () => {
    it('should display first letter of seller name in uppercase', () => {
      render(<SellerPanel product={mockProduct} />);
      expect(screen.getByText('L')).toBeInTheDocument();
    });

    it('should handle different seller names', () => {
      const customProduct = {
        ...mockProduct,
        sellerInformation: {
          ...mockProduct.sellerInformation,
          name: 'testSeller'
        }
      };

      render(<SellerPanel product={customProduct} />);
      expect(screen.getByText('T')).toBeInTheDocument();
    });

    it('should handle empty seller name gracefully', () => {
      const customProduct = {
        ...mockProduct,
        sellerInformation: {
          ...mockProduct.sellerInformation,
          name: ''
        }
      };

      // Should not crash
      expect(() => render(<SellerPanel product={customProduct} />)).not.toThrow();
    });
  });

  describe('component structure', () => {
    it('should have correct CSS classes', () => {
      const { container } = render(<SellerPanel product={mockProduct} />);
      
      expect(container.querySelector('.sellerPanel')).toBeInTheDocument();
      expect(container.querySelector('.sellerInfo')).toBeInTheDocument();
      expect(container.querySelector('.purchaseOptions')).toBeInTheDocument();
    });

    it('should render reputation badge with icon', () => {
      render(<SellerPanel product={mockProduct} />);
      
      const reputationSection = screen.getByText('MercadoLíder').closest('span');
      expect(reputationSection).toBeInTheDocument();
      expect(reputationSection).toHaveTextContent('🏆');
    });

    it('should render metrics with icons', () => {
      render(<SellerPanel product={mockProduct} />);
      
      // Check for emoji icons in metrics
      expect(screen.getByText('📊')).toBeInTheDocument();
      expect(screen.getByText('⭐')).toBeInTheDocument();
      // Use getAllByText for 🚚 since it appears twice (metrics and shipping)
      expect(screen.getAllByText('🚚')).toHaveLength(2);
    });
  });

  describe('edge cases', () => {
    it('should handle zero stock', () => {
      const customProduct = {
        ...mockProduct,
        additionalDetails: {
          ...mockProduct.additionalDetails,
          availableStock: '0'
        }
      };

      render(<SellerPanel product={customProduct} />);
      expect(screen.getByText('(0 disponibles)')).toBeInTheDocument();
    });

    it('should handle high stock numbers', () => {
      const customProduct = {
        ...mockProduct,
        additionalDetails: {
          ...mockProduct.additionalDetails,
          availableStock: '999'
        }
      };

      render(<SellerPanel product={customProduct} />);
      expect(screen.getByText('(999 disponibles)')).toBeInTheDocument();
    });

    it('should handle empty payment methods array', () => {
      const customProduct = {
        ...mockProduct,
        paymentMethods: []
      };

      render(<SellerPanel product={customProduct} />);
      expect(screen.getByText('Medios de pago')).toBeInTheDocument();
    });

    it('should handle single payment method', () => {
      const customProduct = {
        ...mockProduct,
        paymentMethods: ['Credit cards only']
      };

      render(<SellerPanel product={customProduct} />);
      expect(screen.getByText('Credit cards only')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have accessible button labels', () => {
      render(<SellerPanel product={mockProduct} />);

      const buyButton = screen.getByRole('button', { name: 'Comprar ahora' });
      const cartButton = screen.getByRole('button', { name: 'Agregar al carrito' });
      const followButton = screen.getByRole('button', { name: 'Seguir' });

      expect(buyButton).toBeInTheDocument();
      expect(cartButton).toBeInTheDocument();
      expect(followButton).toBeInTheDocument();
    });

    it('should have accessible links', () => {
      render(<SellerPanel product={mockProduct} />);

      const sellerLink = screen.getByRole('link', { name: 'Ver más datos de este vendedor' });
      expect(sellerLink).toBeInTheDocument();
    });
  });
}); 