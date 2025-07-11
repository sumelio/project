import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../application/store/store';
import { fetchProductByIdStart, clearProduct } from '../../application/store/productSlice';

const ProductDetail: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentProduct, loading, error } = useSelector((state: RootState) => state.product);
  const [productId, setProductId] = useState('');

  const handleFetchProduct = () => {
    if (productId.trim()) {
      console.log(`🔍 Requesting product with ID: ${productId}`);
      dispatch(fetchProductByIdStart(productId.trim()));
    }
  };

  const handleClearProduct = () => {
    dispatch(clearProduct());
    setProductId('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleFetchProduct();
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>🛍️ Product Detail Fetcher</h2>
      <p>Enter a product ID to fetch from the backend API: <code>GET /product/:id</code></p>
      
      {/* Input Section */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter product ID (e.g., 1)"
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            flex: 1,
          }}
        />
        <button
          onClick={handleFetchProduct}
          disabled={loading || !productId.trim()}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#3483fa',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? '🔄 Loading...' : '🔍 Fetch Product'}
        </button>
        {currentProduct && (
          <button
            onClick={handleClearProduct}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            🗑️ Clear
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          marginBottom: '20px',
        }}>
          <div>🔄 Fetching product from backend...</div>
          <small style={{ color: '#666' }}>Making API call to: <code>/product/{productId}</code></small>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={{
          padding: '20px',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          color: '#721c24',
          marginBottom: '20px',
        }}>
          <strong>❌ Error:</strong> {error}
        </div>
      )}

      {/* Success State - Product Display */}
      {currentProduct && (
        <div style={{
          padding: '20px',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          marginBottom: '20px',
        }}>
          <h3>✅ Product Found</h3>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '4px',
            border: '1px solid #e5e5e5',
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>{currentProduct.title}</h4>
            <p style={{ color: '#666', margin: '0 0 10px 0' }}>{currentProduct.description}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
              <div>
                <strong>💰 Price:</strong> ${currentProduct.price}
              </div>
              <div>
                <strong>👤 Seller:</strong> {currentProduct.sellerInformation.name}
              </div>
            </div>

            {currentProduct.additionalDetails && (
              <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <strong>📊 Additional Details:</strong>
                <div style={{ marginTop: '8px', fontSize: '14px' }}>
                  <div>⭐ Rating: {currentProduct.additionalDetails.ratings}</div>
                  <div>💬 Reviews: {currentProduct.additionalDetails.reviews}</div>
                  <div>📦 Stock: {currentProduct.additionalDetails.availableStock}</div>
                </div>
              </div>
            )}

            <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
              <strong>API Response:</strong> <code>GET /product/{currentProduct.id}</code>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div style={{
        padding: '15px',
        backgroundColor: '#f1f3f4',
        borderRadius: '4px',
        fontSize: '14px',
        color: '#555',
      }}>
        <strong>💡 How to test:</strong>
        <ol style={{ margin: '10px 0 0 0', paddingLeft: '20px' }}>
          <li>Make sure your backend is running on <code>http://localhost:8080</code></li>
          <li>Enter a product ID (e.g., "1") in the input field</li>
          <li>Click "Fetch Product" or press Enter</li>
          <li>Watch the Redux Saga consume the <code>/product/:id</code> API</li>
        </ol>
      </div>
    </div>
  );
};

export default ProductDetail; 