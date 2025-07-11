import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import productSlice from './application/store/productSlice';

// Create a mock store for testing
const createMockStore = () => {
  return configureStore({
    reducer: {
      product: productSlice,
    },
    preloadedState: {
      product: {
        currentProduct: null,
        loading: true,
        error: null
      }
    }
  });
};

test('renders app with loading state', () => {
  const store = createMockStore();
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  
  expect(screen.getByText('Loading product...')).toBeInTheDocument();
});

test('renders header navigation', () => {
  const store = createMockStore();
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  
  expect(screen.getByText('Categories')).toBeInTheDocument();
  expect(screen.getByText('Offers')).toBeInTheDocument();
  expect(screen.getByText('History')).toBeInTheDocument();
});
