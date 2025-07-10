import React from 'react';
import { Provider } from 'react-redux';
import { store } from './application/store/store';
import ProductDetail from './infrastructure/components/ProductDetail';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>🏪 MarketPlace</h1>
          <p>Frontend with Redux Saga consuming Backend API</p>
        </header>
        <main>
          <ProductDetail />
        </main>
      </div>
    </Provider>
  );
}

export default App;
