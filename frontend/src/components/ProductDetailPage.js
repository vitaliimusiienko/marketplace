import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductDetailPage.css';

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${productId}/`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <div className="product-detail-container">
      <header className="product-detail-header">
        <div className="product-detail-logo">Marketplace</div>
      </header>
      <main className="product-detail-main">
        {product ? (
          <div className="product-detail-card">
            <img src={`http://localhost:8000${product.image}`} alt={product.name} className="product-detail-image" />
            <h2 className="product-detail-title">{product.name}</h2>
            <p className="product-detail-description">{product.description}</p>
            <p className="product-detail-price">${product.price}</p>
            <button className="product-detail-button">Add to Cart</button>
          </div>
        ) : (
          <p>Loading product details...</p>
        )}
      </main>
      <footer className="product-detail-footer">
        &copy; 2024 Marketplace
      </footer>
    </div>
  );
}

export default ProductDetailPage;