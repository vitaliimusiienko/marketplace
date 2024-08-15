import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import '../styles/ProductListPage.css';

function ProductListPage() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products/', {
          params: { category: categoryId }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [categoryId]);

  return (
        <div className="product-list-container container">
      <Header isAuthenticated={isAuthenticated} />
      <main className="main-content">
        <h2 className="product-list-title">Products</h2>
        <div className="product-list">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className="product-item">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <Link to={`/products/${product.id}`} className="view-details-button">View Details</Link>
              </div>
            ))
          ) : (
            <p>No products found for this category.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductListPage;