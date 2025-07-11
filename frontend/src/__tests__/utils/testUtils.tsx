import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import productReducer, { ProductState } from '../../application/store/productSlice';
import { Product } from '../../domain/entities/Product';

// Mock product data for testing
export const mockProduct: Product = {
  id: '1',
  images: [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg'
  ],
  title: 'Samsung Galaxy A55 5G Dual SIM 256 GB azul oscuro 8 GB RAM',
  description: 'Test product description for Samsung Galaxy A55',
  price: '$1,853,861',
  paymentMethods: [
    'Credit cards (Visa, Mastercard, American Express)',
    'Debit cards (Visa Débito, Mastercard Débito)',
    'Cash through Efecty'
  ],
  sellerInformation: {
    name: 'laeternaproductos',
    productsCount: '100mil',
    reputation: {
      level: 'MercadoLíder',
      description: '¡Uno de los mejores del sitio!'
    },
    metrics: {
      sales: '1000',
      service: 'Brinda buena atención',
      delivery: 'Entrega sus productos a tiempo'
    },
    purchaseOptions: {
      price: 1853861
    }
  },
  additionalDetails: {
    ratings: '4.8',
    reviews: '769',
    availableStock: '4'
  }
};

export const mockRelatedProducts = [
  {
    id: '2',
    image: 'https://example.com/related1.jpg',
    title: 'Zte Blade A55 Dual Sim 128gb 4gb Ram',
    originalPrice: 500000,
    currentPrice: 294900,
    discount: 41,
    installments: {
      quantity: 3,
      amount: 98300
    },
    hasFreeShipping: true
  },
  {
    id: '3',
    image: 'https://example.com/related2.jpg',
    title: 'Zte Blade V70 Dual Sim 256gb 8gb Ram',
    originalPrice: 850000,
    currentPrice: 504900,
    discount: 40,
    installments: {
      quantity: 3,
      amount: 168300
    },
    hasFreeShipping: true
  }
];

// Create a mock store for testing
export function createMockStore(initialState?: Partial<ProductState>) {
  const defaultState: ProductState = {
    currentProduct: null,
    loading: false,
    error: null,
    ...initialState
  };

  return configureStore({
    reducer: {
      product: productReducer
    },
    preloadedState: {
      product: defaultState
    }
  });
}

// Custom render function with Redux Provider
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialState?: Partial<ProductState>;
}

export function renderWithRedux(
  ui: ReactElement,
  { initialState, ...renderOptions }: CustomRenderOptions = {}
) {
  const store = createMockStore(initialState);
  
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    store
  };
}

// Mock API responses
export const mockApiResponses = {
  getProductSuccess: mockProduct,
  getProductError: new Error('Product not found'),
  networkError: new Error('Network error')
};

// Common test assertions
export const commonAssertions = {
  expectElementToBeVisible: (element: HTMLElement) => {
    expect(element).toBeInTheDocument();
    expect(element).toBeVisible();
  },
  
  expectTextContent: (element: HTMLElement, text: string) => {
    expect(element).toHaveTextContent(text);
  },
  
  expectImageSrc: (element: HTMLElement, src: string) => {
    expect(element).toHaveAttribute('src', src);
  }
};

// Wait for async operations
export const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 0)); 

// Dummy test to prevent "must contain at least one test" error
describe('testUtils', () => {
  it('should export mock utilities', () => {
    expect(mockProduct).toBeDefined();
    expect(createMockStore).toBeDefined();
    expect(renderWithRedux).toBeDefined();
  });
}); 