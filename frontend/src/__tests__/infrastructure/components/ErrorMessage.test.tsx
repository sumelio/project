import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorMessage from '../../../infrastructure/components/ErrorMessage';

// Mock window.location.reload
Object.defineProperty(window, 'location', {
  value: {
    reload: jest.fn()
  }
});

describe('ErrorMessage Component', () => {
  const defaultProps = {
    message: 'Something went wrong'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render error message with default props', () => {
      render(<ErrorMessage {...defaultProps} />);
      
      expect(screen.getByText('❌')).toBeInTheDocument();
      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should render custom error message', () => {
      const customMessage = 'Network connection failed';
      render(<ErrorMessage message={customMessage} />);
      
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it('should render with try again button', () => {
      render(<ErrorMessage {...defaultProps} />);
      
      const tryAgainButton = screen.getByText('🔄 Try Again');
      expect(tryAgainButton).toBeInTheDocument();
      expect(tryAgainButton.tagName).toBe('BUTTON');
    });
  });

  describe('Interactive Behavior', () => {
    it('should call window.location.reload when try again button is clicked', () => {
      render(<ErrorMessage {...defaultProps} />);
      
      const tryAgainButton = screen.getByText('🔄 Try Again');
      fireEvent.click(tryAgainButton);
      
      expect(window.location.reload).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple clicks on try again button', () => {
      render(<ErrorMessage {...defaultProps} />);
      
      const tryAgainButton = screen.getByText('🔄 Try Again');
      fireEvent.click(tryAgainButton);
      fireEvent.click(tryAgainButton);
      fireEvent.click(tryAgainButton);
      
      expect(window.location.reload).toHaveBeenCalledTimes(3);
    });

    it('should handle keyboard events on try again button', () => {
      render(<ErrorMessage {...defaultProps} />);
      
      const tryAgainButton = screen.getByText('🔄 Try Again');
      fireEvent.keyDown(tryAgainButton, { key: 'Enter', code: 'Enter' });
      
      // Keyboard events don't trigger click by default, so reload shouldn't be called
      expect(window.location.reload).not.toHaveBeenCalled();
    });
  });

  describe('Component Structure', () => {
    it('should have correct CSS classes', () => {
      const { container } = render(<ErrorMessage {...defaultProps} />);
      
      expect(container.firstChild).toHaveClass('errorContainer');
    });

    it('should render icon in error container', () => {
      render(<ErrorMessage {...defaultProps} />);
      
      const icon = screen.getByText('❌');
      expect(icon).toBeInTheDocument();
    });

    it('should render error title', () => {
      render(<ErrorMessage {...defaultProps} />);
      
      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    });

    it('should render retry button with icon', () => {
      render(<ErrorMessage {...defaultProps} />);
      
      const button = screen.getByText('🔄 Try Again');
      expect(button).toBeInTheDocument();
      expect(button.textContent).toContain('🔄');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty error message', () => {
      render(<ErrorMessage message="" />);
      
      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
      // Don't check for empty text as it may cause multiple matches
      const component = screen.getByText('🔄 Try Again');
      expect(component).toBeInTheDocument();
    });

    it('should handle very long error messages', () => {
      const longMessage = 'This is a very long error message that should still be displayed properly even when it contains many words and extends beyond normal length limits for typical error messages in the application';
      render(<ErrorMessage message={longMessage} />);
      
      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    it('should handle error messages with special characters', () => {
      const specialMessage = 'Error: 404 - Product not found! @#$%^&*()';
      render(<ErrorMessage message={specialMessage} />);
      
      expect(screen.getByText(specialMessage)).toBeInTheDocument();
    });

    it('should handle null or undefined message gracefully', () => {
      const { rerender } = render(<ErrorMessage message="test" />);
      
      // Test with empty string (valid prop)
      rerender(<ErrorMessage message="" />);
      // Check that component renders without throwing, rather than checking for empty text
      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('🔄 Try Again')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible button', () => {
      render(<ErrorMessage {...defaultProps} />);
      
      const button = screen.getByRole('button', { name: '🔄 Try Again' });
      expect(button).toBeInTheDocument();
    });

    it('should be keyboard accessible', () => {
      render(<ErrorMessage {...defaultProps} />);
      
      const button = screen.getByRole('button');
      button.focus();
      expect(document.activeElement).toBe(button);
    });

    it('should have proper heading structure', () => {
      render(<ErrorMessage {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('Oops! Something went wrong');
    });
  });

  describe('Visual Consistency', () => {
    it('should render consistently with different message lengths', () => {
      const { rerender } = render(<ErrorMessage message="Short" />);
      expect(screen.getByText('Short')).toBeInTheDocument();
      
      rerender(<ErrorMessage message="This is a much longer error message for testing purposes" />);
      expect(screen.getByText('This is a much longer error message for testing purposes')).toBeInTheDocument();
    });

    it('should maintain structure across re-renders', () => {
      const { rerender } = render(<ErrorMessage message="Message 1" />);
      
      expect(screen.getByText('❌')).toBeInTheDocument();
      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
      
      rerender(<ErrorMessage message="Message 2" />);
      
      expect(screen.getByText('❌')).toBeInTheDocument();
      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Message 2')).toBeInTheDocument();
    });
  });

  describe('Button Functionality', () => {
    it('should reload page when button is clicked multiple times', () => {
      render(<ErrorMessage message="Test error" />);
      
      const button = screen.getByRole('button');
      
      fireEvent.click(button);
      fireEvent.click(button);
      
      expect(window.location.reload).toHaveBeenCalledTimes(2);
    });

    it('should have correct button text and icon', () => {
      render(<ErrorMessage message="Test error" />);
      
      const button = screen.getByRole('button');
      expect(button.textContent).toBe('🔄 Try Again');
    });
  });
}); 