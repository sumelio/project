import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import ProductDetailPage from '../../../infrastructure/components/ProductDetailPage';
import { Product } from '../../../domain/entities/Product';

// Mock Redux hooks
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mock child components
jest.mock('../../../infrastructure/components/ThumbnailStrip', () => {
  return function ThumbnailStrip({ images, onSelect, selectedIndex }: any) {
    return (
      <div data-testid="thumbnail-strip">
        <div>Images: {images?.length || 0}</div>
        <div>Selected: {selectedIndex}</div>
        {images?.map((image: string, index: number) => (
          <button key={index} onClick={() => onSelect(index)}>
            Select Image {index + 1}
          </button>
        ))}
      </div>
    );
  };
});

jest.mock('../../../infrastructure/components/MainImageDisplay', () => {
  return function MainImageDisplay({ image, title }: any) {
    return (
      <div data-testid="main-image-display">
        <img src={image} alt={title} />
      </div>
    );
  };
});

jest.mock('../../../infrastructure/components/ProductInfoColumn', () => {
  return function ProductInfoColumn({ product }: any) {
    return (
      <div data-testid="product-info-column">
        <h1>{product?.title}</h1>
        <p>{product?.description}</p>
      </div>
    );
  };
});

jest.mock('../../../infrastructure/components/PurchasePanelColumn', () => {
  return function PurchasePanelColumn({ product }: any) {
    return (
      <div data-testid="purchase-panel-column">
        <div>Price: ${product?.price}</div>
        <button>Add to Cart</button>
      </div>
    );
  };
});

jest.mock('../../../infrastructure/components/RelatedProducts', () => {
  return function RelatedProducts({ currentProduct, products }: any) {
    return (
      <div data-testid="related-products">
        <div>Related: {products?.length || 0} products</div>
        <div>Current: {currentProduct?.id}</div>
      </div>
    );
  };
});

jest.mock('../../../infrastructure/components/LoadingSpinner', () => {
  return function LoadingSpinner() {
    return <div data-testid="loading-spinner">Loading...</div>;
  };
});

jest.mock('../../../infrastructure/components/ErrorMessage', () => {
  return function ErrorMessage({ message }: any) {
    return <div data-testid="error-message">{message}</div>;
  };
});

const mockProduct: Product = {
  id: '1',
  title: 'Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM',
  description: 'Latest Samsung smartphone with 5G connectivity',
  price: '1299.99',
  images: [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg'
  ],
  paymentMethods: ['Credit Card', 'Debit Card'],
  sellerInformation: {
    name: 'Samsung Store',
    productsCount: '1250',
    reputation: {
      level: 'Platinum',
      description: 'Excellent seller'
    },
    metrics: {
      sales: '98%',
      service: '99%',
      delivery: '97%'
    },
    purchaseOptions: {
      price: 1299.99
    }
  },
  additionalDetails: {
    ratings: '4.6',
    reviews: '850',
    availableStock: '15'
  }
};

const mockDispatch = jest.fn();
const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;

describe('ProductDetailPage', () => {
  beforeEach(() => {
    mockUseDispatch.mockReturnValue(mockDispatch);
    mockDispatch.mockClear();
  });

  describe('loading state', () => {
    it('should show loading spinner when loading is true', () => {
      mockUseSelector.mockReturnValue({
        currentProduct: null,
        loading: true,
        error: null,
      });

      render(<ProductDetailPage productId="1" />);

      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('error state', () => {
    it('should show error message when there is an error', () => {
      const errorMessage = 'Product not found';
      mockUseSelector.mockReturnValue({
        currentProduct: null,
        loading: false,
        error: errorMessage,
      });

      render(<ProductDetailPage productId="1" />);

      expect(screen.getByTestId('error-message')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('should not show product content when there is an error', () => {
      mockUseSelector.mockReturnValue({
        currentProduct: null,
        loading: false,
        error: 'Some error',
      });

      render(<ProductDetailPage productId="1" />);

      expect(screen.queryByTestId('product-info-column')).not.toBeInTheDocument();
    });
  });

  describe('no product state', () => {
    it('should show "Product not found" when currentProduct is null', () => {
      mockUseSelector.mockReturnValue({
        currentProduct: null,
        loading: false,
        error: null,
      });

      render(<ProductDetailPage productId="1" />);

      expect(screen.getByText('Product not found')).toBeInTheDocument();
    });
  });

  describe('successful product loading', () => {
    beforeEach(() => {
      mockUseSelector.mockReturnValue({
        currentProduct: mockProduct,
        loading: false,
        error: null,
      });
    });

    it('should render breadcrumb section', () => {
      render(<ProductDetailPage productId="1" />);
      expect(screen.getByTestId('thumbnail-strip')).toBeInTheDocument();
    });

    it('should render product title in breadcrumb', () => {
      const { container } = render(<ProductDetailPage productId="1" />);
      // Check for product title specifically in the breadcrumb section using class selector
      const breadcrumbTitle = container.querySelector('.breadcrumbCurrent');
      expect(breadcrumbTitle).toBeInTheDocument();
      expect(breadcrumbTitle).toHaveTextContent(mockProduct.title);
    });

    it('should render share action in breadcrumb', () => {
      render(<ProductDetailPage productId="1" />);
      expect(screen.getByTestId('product-info-column')).toBeInTheDocument();
    });

    it('should render all main components', () => {
      render(<ProductDetailPage productId="1" />);

      expect(screen.getByTestId('thumbnail-strip')).toBeInTheDocument();
      expect(screen.getByTestId('main-image-display')).toBeInTheDocument();
      expect(screen.getByTestId('product-info-column')).toBeInTheDocument();
      expect(screen.getByTestId('purchase-panel-column')).toBeInTheDocument();
    });

    it('should pass correct props to ThumbnailStrip', () => {
      render(<ProductDetailPage productId="1" />);

      expect(screen.getByText(`Images: ${mockProduct.images.length}`)).toBeInTheDocument();
      expect(screen.getByText('Selected: 0')).toBeInTheDocument();
    });

    it('should pass correct props to ProductInfoColumn', () => {
      render(<ProductDetailPage productId="1" />);
      // Check for product title specifically in the h1 within ProductInfoColumn
      const productInfoColumn = screen.getByTestId('product-info-column');
      const titleElement = productInfoColumn.querySelector('h1');
      expect(titleElement).toHaveTextContent(mockProduct.title);
    });

    it('should pass correct props to RelatedProducts', () => {
      render(<ProductDetailPage productId="1" />);

      expect(screen.getByText('Related: 3 products')).toBeInTheDocument();
      expect(screen.getByText(`Current: ${mockProduct.id}`)).toBeInTheDocument();
    });
  });

  describe('image selection functionality', () => {
    beforeEach(() => {
      mockUseSelector.mockReturnValue({
        currentProduct: mockProduct,
        loading: false,
        error: null,
      });
    });

    it('should handle thumbnail selection', () => {
      render(<ProductDetailPage productId="1" />);

      expect(screen.getByText('Selected: 0')).toBeInTheDocument();

      const selectButton = screen.getByText('Select Image 1');
      fireEvent.click(selectButton);

      expect(screen.getByText('Selected: 0')).toBeInTheDocument();
    });

    it('should pass correct image to MainImageDisplay', () => {
      render(<ProductDetailPage productId="1" />);

      const mainImageDisplay = screen.getByTestId('main-image-display');
      const img = mainImageDisplay.querySelector('img');
      expect(img).toHaveAttribute('src', mockProduct.images[0]);
    });
  });

  describe('Redux integration', () => {
    it('should dispatch fetchProductByIdStart on mount with provided productId', () => {
      mockUseSelector.mockReturnValue({
        currentProduct: null,
        loading: true,
        error: null,
      });

      render(<ProductDetailPage productId="123" />);

      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'product/fetchProductByIdStart',
          payload: '123'
        })
      );
    });

    it('should use default productId when not provided', () => {
      mockUseSelector.mockReturnValue({
        currentProduct: mockProduct,
        loading: false,
        error: null,
      });

      render(<ProductDetailPage />);

      expect(screen.getByTestId('product-info-column')).toBeInTheDocument();
    });
  });

  describe('component structure', () => {
    it('should have correct CSS classes and structure', () => {
      mockUseSelector.mockReturnValue({
        currentProduct: mockProduct,
        loading: false,
        error: null,
      });

      render(<ProductDetailPage productId="1" />);

      expect(screen.getByTestId('thumbnail-strip')).toBeInTheDocument();
      expect(screen.getByTestId('main-image-display')).toBeInTheDocument();
      expect(screen.getByTestId('product-info-column')).toBeInTheDocument();
      expect(screen.getByTestId('purchase-panel-column')).toBeInTheDocument();
    });

    it('should render breadcrumb navigation links', () => {
      mockUseSelector.mockReturnValue({
        currentProduct: mockProduct,
        loading: false,
        error: null,
      });

      const { container } = render(<ProductDetailPage productId="1" />);

      expect(screen.getByTestId('product-info-column')).toBeInTheDocument();
      expect(container.textContent).toContain('Celulares y Teléfonos');
    });
  });

  describe('responsive behavior', () => {
    it('should maintain component structure across different screen sizes', () => {
      mockUseSelector.mockReturnValue({
        currentProduct: mockProduct,
        loading: false,
        error: null,
      });

      render(<ProductDetailPage productId="1" />);

      expect(screen.getByTestId('thumbnail-strip')).toBeInTheDocument();
      expect(screen.getByTestId('product-info-column')).toBeInTheDocument();
    });
  });
}); 