import React from 'react';
import { Provider } from 'react-redux';
import { store } from './application/store/store';
import Header from './infrastructure/components/Header';
import ProductDetailPage from './infrastructure/components/ProductDetailPage';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <main>
          <ProductDetailPage productId="1" />
        </main>
      </div>
    </Provider>
  );
}

export default App;
