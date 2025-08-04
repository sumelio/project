import React from 'react';
import { Provider } from 'react-redux';
import { store } from './application/store/store';
import Header from './infrastructure/components/Header';
import ProductDetailPage from './infrastructure/components/ProductDetailPage';
import ProductList from './infrastructure/components/ProductList';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:productId" element={<ProductDetailPageWrapper />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

// Wrapper to extract productId param and pass as prop
const ProductDetailPageWrapper = () => {
  const { productId } = useParams<{ productId: string }>();
  return <ProductDetailPage productId={productId} />;
};

export default App;
