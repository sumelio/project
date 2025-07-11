import { mockProduct } from '../utils/testUtils';

// Mock implementation for axios
export const axiosMock: any = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  create: jest.fn((): any => axiosMock),
  defaults: {
    headers: {
      common: {},
      get: {},
      post: {},
      put: {},
      patch: {},
      delete: {}
    }
  },
  interceptors: {
    request: {
      use: jest.fn(),
      eject: jest.fn()
    },
    response: {
      use: jest.fn(),
      eject: jest.fn()
    }
  }
};

// Mock axios default export
const axiosDefault = axiosMock;

// Export both named and default
export default axiosDefault;
export { axiosMock as axios };

// Dummy test to prevent "must contain at least one test" error
describe('apiMocks', () => {
  it('should export axios mock', () => {
    expect(axiosMock).toBeDefined();
    expect(axiosMock.get).toBeDefined();
  });
});

// Mock ProductApiService
export class MockProductApiService {
  async getProductById(id: string) {
    if (id === '1') {
      return mockProduct;
    } else if (id === 'error') {
      throw new Error('Product not found');
    } else if (id === 'network-error') {
      const error = new Error('Network error');
      (error as any).request = {};
      throw error;
    }
    throw new Error('Product not found');
  }

  async testConnection() {
    return true;
  }
}

// Setup axios mock using the mock prefix naming convention
const mockAxios = {
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    }
  })),
  isAxiosError: jest.fn(() => false)
};

jest.mock('axios', () => mockAxios);

// Export mock responses
export const mockResponses = {
  success: {
    data: mockProduct,
    status: 200,
    config: { url: '/product/1' }
  },
  notFound: {
    response: {
      status: 404,
      data: { message: 'Product not found' }
    }
  },
  serverError: {
    response: {
      status: 500,
      data: { message: 'Internal server error' }
    }
  },
  networkError: {
    request: {},
    message: 'Network Error'
  }
}; 