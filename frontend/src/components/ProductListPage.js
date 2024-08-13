import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProductListPage.css';

function ProductListPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list-container">
      <header className="product-list-header">
        <div className="product-list-logo">Marketplace</div>
      </header>
      <main className="product-list-main">
        <div className="product-list">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">
                ${product.discounted_price}
                {product.discounted_price < product.price && <span className="original-price">${product.price}</span>}
              </p>
            </div>
          ))}
        </div>
      </main>
      <footer className="product-list-footer">
        &copy; 2024 Marketplace
      </footer>
    </div>
  );
}

export default ProductListPage;