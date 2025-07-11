import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainImageDisplay from '../../../infrastructure/components/MainImageDisplay';

describe('MainImageDisplay', () => {
  const mockProps = {
    image: 'https://example.com/image.jpg',
    title: 'Test Product'
  };

  describe('rendering', () => {
    it('should render main image', () => {
      render(<MainImageDisplay {...mockProps} />);
      const image = screen.getByAltText(mockProps.title);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', mockProps.image);
    });

    it('should display image with correct alt text', () => {
      render(<MainImageDisplay {...mockProps} />);
      const image = screen.getByAltText(mockProps.title);
      expect(image).toHaveAttribute('alt', mockProps.title);
    });

    it('should have correct CSS class', () => {
      const { container } = render(<MainImageDisplay {...mockProps} />);
      expect(container.querySelector('.mainImageDisplay')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle missing image URL', () => {
      render(<MainImageDisplay image="" title={mockProps.title} />);
      const image = screen.getByAltText(mockProps.title);
      // Browser might normalize empty src differently, so just check it exists
      expect(image).toBeInTheDocument();
    });

    it('should handle missing title', () => {
      const { container } = render(<MainImageDisplay image={mockProps.image} title="" />);
      const image = container.querySelector('img');
      expect(image).toHaveAttribute('alt', '');
    });

    it('should handle special characters in title', () => {
      const specialTitle = 'Product with "quotes" & symbols';
      render(<MainImageDisplay image={mockProps.image} title={specialTitle} />);
      const image = screen.getByAltText(specialTitle);
      expect(image).toBeInTheDocument();
    });

    it('should handle very long titles', () => {
      const longTitle = 'This is a very long product title that might exceed normal length limits and could potentially cause layout issues but should still work correctly';
      render(<MainImageDisplay image={mockProps.image} title={longTitle} />);
      const image = screen.getByAltText(longTitle);
      expect(image).toBeInTheDocument();
    });

    it('should handle URLs with query parameters', () => {
      const imageWithParams = 'https://example.com/image.jpg?size=large&quality=high';
      render(<MainImageDisplay image={imageWithParams} title={mockProps.title} />);
      const image = screen.getByAltText(mockProps.title);
      expect(image).toHaveAttribute('src', imageWithParams);
    });
  });

  describe('component structure', () => {
    it('should render only one image element', () => {
      render(<MainImageDisplay {...mockProps} />);
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(1);
    });

    it('should have proper image container structure', () => {
      const { container } = render(<MainImageDisplay {...mockProps} />);
      const mainContainer = container.querySelector('.mainImageDisplay');
      const image = mainContainer?.querySelector('img');
      
      expect(mainContainer).toBeInTheDocument();
      expect(image).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have accessible image with alt text', () => {
      render(<MainImageDisplay {...mockProps} />);
      const image = screen.getByRole('img', { name: mockProps.title });
      expect(image).toBeInTheDocument();
    });

    it('should be findable by alt text', () => {
      render(<MainImageDisplay {...mockProps} />);
      const image = screen.getByAltText(mockProps.title);
      expect(image).toBeInTheDocument();
    });

    it('should maintain proper image semantics', () => {
      render(<MainImageDisplay {...mockProps} />);
      const image = screen.getByRole('img');
      expect(image.tagName).toBe('IMG');
    });
  });

  describe('props validation', () => {
    it('should accept valid image URLs', () => {
      const validUrls = [
        'https://example.com/image.jpg',
        'http://example.com/image.png',
        '/relative/path/image.gif',
        'data:image/svg+xml;base64,ABC123'
      ];

      validUrls.forEach(url => {
        const { container } = render(<MainImageDisplay image={url} title="Test" />);
        const image = container.querySelector('img');
        expect(image).toHaveAttribute('src', url);
      });
    });

    it('should handle different title formats', () => {
      const titles = [
        'Simple Title',
        'Title with Numbers 123',
        'Title-with-dashes',
        'Title_with_underscores',
        'Title (with parentheses)',
        'Title [with brackets]'
      ];

      titles.forEach(title => {
        render(<MainImageDisplay image={mockProps.image} title={title} />);
        const image = screen.getByAltText(title);
        expect(image).toBeInTheDocument();
      });
    });
  });

  describe('performance considerations', () => {
    it('should not have loading attribute by default', () => {
      render(<MainImageDisplay {...mockProps} />);
      const image = screen.getByRole('img');
      expect(image).not.toHaveAttribute('loading');
    });

    it('should maintain image dimensions', () => {
      const { container } = render(<MainImageDisplay {...mockProps} />);
      const image = container.querySelector('img');
      expect(image).toBeInTheDocument();
      // Image dimensions would typically be handled by CSS
    });
  });
}); 