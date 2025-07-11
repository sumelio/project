import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SellerInfoCard from '../../../infrastructure/components/SellerInfoCard';

describe('SellerInfoCard', () => {
  describe('rendering', () => {
    it('should render seller info card title', () => {
      render(<SellerInfoCard />);
      expect(screen.getByText('Información sobre el vendedor')).toBeInTheDocument();
    });

    it('should display seller location', () => {
      render(<SellerInfoCard />);
      expect(screen.getByText('Ubicación')).toBeInTheDocument();
      expect(screen.getByText('Bogotá D.C., Bogota D.c.')).toBeInTheDocument();
    });

    it('should show seller reputation', () => {
      render(<SellerInfoCard />);
      expect(screen.getByText('MercadoLíder Platinum')).toBeInTheDocument();
      expect(screen.getByText('¡Es uno de los mejores del sitio!')).toBeInTheDocument();
    });

    it('should display seller statistics', () => {
      render(<SellerInfoCard />);
      expect(screen.getByText('54.897')).toBeInTheDocument();
      expect(screen.getByText('Ventas en los últimos 60 días')).toBeInTheDocument();
      expect(screen.getByText('Brinda buena atención')).toBeInTheDocument();
      expect(screen.getByText('Despacha sus productos a tiempo')).toBeInTheDocument();
    });

    it('should render location icon', () => {
      render(<SellerInfoCard />);
      expect(screen.getByText('📍')).toBeInTheDocument();
    });

    it('should render reputation icon', () => {
      render(<SellerInfoCard />);
      expect(screen.getByText('🏆')).toBeInTheDocument();
    });

    it('should display see more link', () => {
      render(<SellerInfoCard />);
      expect(screen.getByText('Ver más datos de este vendedor')).toBeInTheDocument();
    });
  });

  describe('component structure', () => {
    it('should have correct CSS classes', () => {
      const { container } = render(<SellerInfoCard />);
      expect(container.querySelector('.sellerInfoCard')).toBeInTheDocument();
      expect(container.querySelector('.sellerInfo')).toBeInTheDocument();
      expect(container.querySelector('.sellerStats')).toBeInTheDocument();
    });

    it('should render reputation bar segments', () => {
      const { container } = render(<SellerInfoCard />);
      const reputationBar = container.querySelector('.reputationBar');
      expect(reputationBar).toBeInTheDocument();
      
      const barSegments = container.querySelectorAll('.barSegment');
      expect(barSegments).toHaveLength(5);
    });

    it('should render all stat sections', () => {
      const { container } = render(<SellerInfoCard />);
      const stats = container.querySelectorAll('.stat');
      expect(stats).toHaveLength(3);
    });
  });

  describe('accessibility', () => {
    it('should have proper heading structure', () => {
      render(<SellerInfoCard />);
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('should have accessible link', () => {
      render(<SellerInfoCard />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '#');
    });

    it('should be readable by screen readers', () => {
      render(<SellerInfoCard />);
      expect(screen.getByText('Información sobre el vendedor')).toBeInTheDocument();
    });
  });

  describe('content validation', () => {
    it('should display all required seller information', () => {
      render(<SellerInfoCard />);
      
      // Location info
      expect(screen.getByText('Ubicación')).toBeInTheDocument();
      expect(screen.getByText('Bogotá D.C., Bogota D.c.')).toBeInTheDocument();
      
      // Reputation info
      expect(screen.getByText('MercadoLíder Platinum')).toBeInTheDocument();
      expect(screen.getByText('¡Es uno de los mejores del sitio!')).toBeInTheDocument();
      
      // Stats
      expect(screen.getByText('54.897')).toBeInTheDocument();
      expect(screen.getByText('Ventas en los últimos 60 días')).toBeInTheDocument();
      expect(screen.getByText('Brinda buena atención')).toBeInTheDocument();
      expect(screen.getByText('Despacha sus productos a tiempo')).toBeInTheDocument();
    });

    it('should render with static content', () => {
      render(<SellerInfoCard />);
      
      // This component renders static content, so we verify it's all there
      expect(screen.getByText('Información sobre el vendedor')).toBeInTheDocument();
      expect(screen.getByText('Ver más datos de este vendedor')).toBeInTheDocument();
    });
  });

  describe('visual elements', () => {
    it('should render with proper layout structure', () => {
      const { container } = render(<SellerInfoCard />);
      
      const card = container.querySelector('.sellerInfoCard');
      const info = container.querySelector('.sellerInfo');
      const stats = container.querySelector('.sellerStats');
      const link = container.querySelector('.seeMoreLink');
      
      expect(card).toBeInTheDocument();
      expect(info).toBeInTheDocument();
      expect(stats).toBeInTheDocument();
      expect(link).toBeInTheDocument();
    });

    it('should have reputation bar styling', () => {
      const { container } = render(<SellerInfoCard />);
      const barSegments = container.querySelectorAll('.barSegment');
      
      expect(barSegments[0]).toHaveStyle('background: #f8f8f8');
      expect(barSegments[4]).toHaveStyle('background: #39b54a');
    });
  });
}); 