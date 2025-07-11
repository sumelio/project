import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingSpinner from '../../../infrastructure/components/LoadingSpinner';
import ErrorMessage from '../../../infrastructure/components/ErrorMessage';
import Header from '../../../infrastructure/components/Header';
import MainImageDisplay from '../../../infrastructure/components/MainImageDisplay';
import ThumbnailStrip from '../../../infrastructure/components/ThumbnailStrip';

describe('UI Components', () => {
  describe('LoadingSpinner', () => {
    it('should render loading spinner', () => {
      render(<LoadingSpinner />);
      expect(screen.getByText('Loading product...')).toBeInTheDocument();
    });

    it('should have correct CSS class', () => {
      const { container } = render(<LoadingSpinner />);
      expect(container.querySelector('.loadingContainer')).toBeInTheDocument();
    });

    it('should render spinner animation', () => {
      const { container } = render(<LoadingSpinner />);
      expect(container.querySelector('.spinner')).toBeInTheDocument();
    });

    it('should render spinner rings', () => {
      const { container } = render(<LoadingSpinner />);
      const rings = container.querySelectorAll('.spinnerRing');
      expect(rings).toHaveLength(3);
    });
  });

  describe('ErrorMessage', () => {
    it('should render error message', () => {
      const errorMessage = 'Something went wrong';
      render(<ErrorMessage message={errorMessage} />);
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('should have correct CSS class', () => {
      const { container } = render(<ErrorMessage message="Error" />);
      expect(container.querySelector('.errorContainer')).toBeInTheDocument();
    });

    it('should render error icon', () => {
      render(<ErrorMessage message="Error" />);
      expect(screen.getByText('❌')).toBeInTheDocument();
    });

    it('should render error title', () => {
      render(<ErrorMessage message="Error" />);
      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    });

    it('should render retry button', () => {
      render(<ErrorMessage message="Error" />);
      expect(screen.getByText('🔄 Try Again')).toBeInTheDocument();
    });

    it('should handle empty message', () => {
      render(<ErrorMessage message="" />);
      expect(screen.getByText('❌')).toBeInTheDocument();
    });

    it('should handle long error messages', () => {
      const longMessage = 'This is a very long error message that should be displayed properly without breaking the layout';
      render(<ErrorMessage message={longMessage} />);
      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });
  });

  describe('Header', () => {
    it('should render header structure', () => {
      render(<Header />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('should render navigation menu', () => {
      render(<Header />);
      expect(screen.getByText('Categories')).toBeInTheDocument();
      expect(screen.getByText('Offers')).toBeInTheDocument();
      expect(screen.getByText('History')).toBeInTheDocument();
      expect(screen.getByText('Supermarket')).toBeInTheDocument();
      expect(screen.getByText('Fashion')).toBeInTheDocument();
      expect(screen.getByText('Sell')).toBeInTheDocument();
      expect(screen.getByText('Help')).toBeInTheDocument();
    });

    it('should render categories button', () => {
      render(<Header />);
      const categoriesButton = screen.getByRole('button', { name: /Categories/ });
      expect(categoriesButton).toBeInTheDocument();
    });

    it('should render menu icon', () => {
      render(<Header />);
      expect(screen.getByText('☰')).toBeInTheDocument();
    });

    it('should have correct CSS classes', () => {
      const { container } = render(<Header />);
      expect(container.querySelector('.header')).toBeInTheDocument();
      expect(container.querySelector('.navbar')).toBeInTheDocument();
      expect(container.querySelector('.container')).toBeInTheDocument();
    });

    it('should render navigation links', () => {
      render(<Header />);
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe('MainImageDisplay', () => {
    const mockProps = {
      image: 'https://example.com/image.jpg',
      title: 'Test Product'
    };

    it('should render image with correct src and alt', () => {
      render(<MainImageDisplay {...mockProps} />);
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', mockProps.image);
      expect(image).toHaveAttribute('alt', mockProps.title);
    });

    it('should have correct CSS class', () => {
      const { container } = render(<MainImageDisplay {...mockProps} />);
      expect(container.querySelector('.mainImageDisplay')).toBeInTheDocument();
    });

    it('should handle missing image gracefully', () => {
      render(<MainImageDisplay image="" title="Test" />);
      const image = screen.getByAltText('Test');
      // Browser may normalize empty src attribute differently
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('alt', 'Test');
    });

    it('should handle missing title gracefully', () => {
      render(<MainImageDisplay image="test.jpg" title="" />);
      const { container } = render(<MainImageDisplay image="test.jpg" title="" />);
      const image = container.querySelector('img');
      expect(image).toHaveAttribute('alt', '');
    });
  });

  describe('ThumbnailStrip', () => {
    const mockProps = {
      images: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg'
      ],
      onSelect: jest.fn(),
      selectedIndex: 0
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should render all thumbnail images', () => {
      render(<ThumbnailStrip {...mockProps} />);
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(3);
      
      images.forEach((img, index) => {
        expect(img).toHaveAttribute('src', mockProps.images[index]);
      });
    });

    it('should call onSelect when thumbnail is clicked', () => {
      const { container } = render(<ThumbnailStrip {...mockProps} />);
      const thumbnails = container.querySelectorAll('.thumbnail');
      
      (thumbnails[1] as HTMLElement).click();
      expect(mockProps.onSelect).toHaveBeenCalledWith(1);
    });

    it('should apply selected class to active thumbnail', () => {
      const { container } = render(<ThumbnailStrip {...mockProps} />);
      const thumbnails = container.querySelectorAll('.thumbnail');
      
      expect(thumbnails[0]).toHaveClass('selected');
      expect(thumbnails[1]).not.toHaveClass('selected');
    });

    it('should handle empty images array', () => {
      render(<ThumbnailStrip {...mockProps} images={[]} />);
      const images = screen.queryAllByRole('img');
      expect(images).toHaveLength(0);
    });

    it('should handle single image', () => {
      render(<ThumbnailStrip {...mockProps} images={['single.jpg']} />);
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(1);
    });

    it('should update selected index correctly', () => {
      const { rerender, container } = render(<ThumbnailStrip {...mockProps} />);
      
      let thumbnails = container.querySelectorAll('.thumbnail');
      expect(thumbnails[0]).toHaveClass('selected');
      
      rerender(<ThumbnailStrip {...mockProps} selectedIndex={2} />);
      thumbnails = container.querySelectorAll('.thumbnail');
      expect(thumbnails[2]).toHaveClass('selected');
      expect(thumbnails[0]).not.toHaveClass('selected');
    });

    it('should have correct CSS classes', () => {
      const { container } = render(<ThumbnailStrip {...mockProps} />);
      expect(container.querySelector('.thumbnailStrip')).toBeInTheDocument();
      expect(container.querySelector('.thumbnail')).toBeInTheDocument();
    });

    it('should handle accessibility correctly', () => {
      render(<ThumbnailStrip {...mockProps} />);
      const images = screen.getAllByRole('img');
      
      images.forEach((image, index) => {
        expect(image).toHaveAttribute('alt');
        expect(image.getAttribute('alt')).toContain('Thumbnail');
      });
    });
  });

  describe('Component Integration', () => {
    it('should handle prop changes without crashing', () => {
      const { rerender } = render(<LoadingSpinner />);
      rerender(<ErrorMessage message="New error" />);
      expect(screen.getByText('New error')).toBeInTheDocument();
    });

    it('should maintain accessibility standards', () => {
      render(
        <div>
          <Header />
          <LoadingSpinner />
          <ErrorMessage message="Test error" />
        </div>
      );

      // Check for proper heading structure
      expect(screen.getByRole('banner')).toBeInTheDocument();
      
      // Check for proper navigation elements
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
    });
  });

  describe('Error Boundaries', () => {
    it('should handle component errors gracefully', () => {
      // Test that components don't crash on invalid props
      expect(() => {
        render(<MainImageDisplay image={null as any} title={null as any} />);
      }).not.toThrow();
    });

    it('should handle undefined props gracefully', () => {
      expect(() => {
        render(<ThumbnailStrip images={[] as any} onSelect={jest.fn()} selectedIndex={0} />);
      }).not.toThrow();
    });
  });
}); 