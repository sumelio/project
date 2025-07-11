import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PurchasePanelColumn from '../../../infrastructure/components/PurchasePanelColumn';
import { mockProduct } from '../../utils/testUtils';

describe('PurchasePanelColumn', () => {
  describe('rendering', () => {
    it('should render shipping information', () => {
      render(<PurchasePanelColumn product={mockProduct} />);
      expect(screen.getByText('Llega gratis mañana')).toBeInTheDocument();
      expect(screen.getByText('Más formas de entrega')).toBeInTheDocument();
      expect(screen.getByText('Retira gratis')).toBeInTheDocument();
      expect(screen.getByText('en una agencia de Mercado Libre')).toBeInTheDocument();
    });

    it('should render stock selection', () => {
      render(<PurchasePanelColumn product={mockProduct} />);
      expect(screen.getByText('Stock disponible')).toBeInTheDocument();
      expect(screen.getByText('Cantidad:')).toBeInTheDocument();
      expect(screen.getByText(`(${mockProduct.additionalDetails.availableStock} disponibles)`)).toBeInTheDocument();
    });

    it('should render quantity selector', () => {
      render(<PurchasePanelColumn product={mockProduct} />);
      const select = screen.getByDisplayValue('1 unidad');
      expect(select).toBeInTheDocument();
      
      const options = screen.getAllByText(/unidad/);
      expect(options.length).toBeGreaterThan(1);
    });

    it('should render action buttons', () => {
      render(<PurchasePanelColumn product={mockProduct} />);
      expect(screen.getByText('Comprar ahora')).toBeInTheDocument();
      expect(screen.getByText('Agregar al carrito')).toBeInTheDocument();
    });

    it('should render seller information', () => {
      render(<PurchasePanelColumn product={mockProduct} />);
      expect(screen.getByText('Vendido por')).toBeInTheDocument();
      expect(screen.getByText(mockProduct.sellerInformation.name)).toBeInTheDocument();
      expect(screen.getByText(/MercadoLíder/)).toBeInTheDocument();
      expect(screen.getByText(/1000 ventas/)).toBeInTheDocument();
    });

    it('should render protection information', () => {
      render(<PurchasePanelColumn product={mockProduct} />);
      expect(screen.getByText(/Devolución gratis/)).toBeInTheDocument();
      expect(screen.getByText(/Compra Protegida/)).toBeInTheDocument();
    });

    it('should render add to list button', () => {
      render(<PurchasePanelColumn product={mockProduct} />);
      expect(screen.getByText('Agregar a una lista')).toBeInTheDocument();
    });
  });

  describe('shipping icons', () => {
    it('should render shipping icons', () => {
      render(<PurchasePanelColumn product={mockProduct} />);
      expect(screen.getByText('🚚')).toBeInTheDocument();
      expect(screen.getByText('🏪')).toBeInTheDocument();
    });

    it('should render protection icons', () => {
      render(<PurchasePanelColumn product={mockProduct} />);
      expect(screen.getByText('↩️')).toBeInTheDocument();
      expect(screen.getByText('🛡️')).toBeInTheDocument();
    });

    it('should render arrow icon', () => {
      render(<PurchasePanelColumn product={mockProduct} />);
      expect(screen.getByText('›')).toBeInTheDocument();
    });
  });

  describe('component structure', () => {
    it('should have correct CSS classes', () => {
      const { container } = render(<PurchasePanelColumn product={mockProduct} />);
      expect(container.querySelector('.purchasePanelColumn')).toBeInTheDocument();
      expect(container.querySelector('.shippingCard')).toBeInTheDocument();
      expect(container.querySelector('.stockCard')).toBeInTheDocument();
      expect(container.querySelector('.actionButtons')).toBeInTheDocument();
    });

    it('should render interactive elements', () => {
      render(<PurchasePanelColumn product={mockProduct} />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
      
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle missing stock information', () => {
      const productWithoutStock = {
        ...mockProduct,
        additionalDetails: {
          ...mockProduct.additionalDetails,
          availableStock: undefined as any
        }
      };

      render(<PurchasePanelColumn product={productWithoutStock} />);
      expect(screen.getByText('(4 disponibles)')).toBeInTheDocument(); // fallback value
    });

    it('should handle zero stock', () => {
      const productWithZeroStock = {
        ...mockProduct,
        additionalDetails: {
          ...mockProduct.additionalDetails,
          availableStock: '0'
        }
      };

      render(<PurchasePanelColumn product={productWithZeroStock} />);
      expect(screen.getByText('(0 disponibles)')).toBeInTheDocument();
    });

    it('should handle high stock numbers', () => {
      const productWithHighStock = {
        ...mockProduct,
        additionalDetails: {
          ...mockProduct.additionalDetails,
          availableStock: '100'
        }
      };

      render(<PurchasePanelColumn product={productWithHighStock} />);
      expect(screen.getByText('(100 disponibles)')).toBeInTheDocument();
    });
  });

  describe('interaction elements', () => {
    it('should have clickable shipping links', () => {
      render(<PurchasePanelColumn product={mockProduct} />);
      const shippingButtons = screen.getAllByRole('button');
      
      const deliveryButton = shippingButtons.find(button => 
        button.textContent?.includes('Más formas de entrega')
      );
      const mapButton = shippingButtons.find(button => 
        button.textContent?.includes('Ver en el mapa')
      );
      
      expect(deliveryButton).toBeInTheDocument();
      expect(mapButton).toBeInTheDocument();
    });

    it('should have quantity selection options', () => {
      render(<PurchasePanelColumn product={mockProduct} />);
      const select = screen.getByRole('combobox');
      const options = select.querySelectorAll('option');
      
      expect(options.length).toBe(4); // 1-4 units
      expect(options[0]).toHaveValue('1');
      expect(options[3]).toHaveValue('4');
    });
  });

  describe('accessibility', () => {
    it('should have accessible form elements', () => {
      render(<PurchasePanelColumn product={mockProduct} />);
      
      expect(screen.getByText('Cantidad:')).toBeInTheDocument();
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
    });

    it('should have accessible buttons', () => {
      render(<PurchasePanelColumn product={mockProduct} />);
      
      const buyButton = screen.getByRole('button', { name: 'Comprar ahora' });
      const cartButton = screen.getByRole('button', { name: 'Agregar al carrito' });
      const listButton = screen.getByRole('button', { name: /Agregar a una lista/ });
      
      expect(buyButton).toBeInTheDocument();
      expect(cartButton).toBeInTheDocument();
      expect(listButton).toBeInTheDocument();
    });

    it('should have accessible links', () => {
      render(<PurchasePanelColumn product={mockProduct} />);
      
      const sellerLink = screen.getByRole('link');
      expect(sellerLink).toHaveAttribute('href', '#');
    });
  });
}); 