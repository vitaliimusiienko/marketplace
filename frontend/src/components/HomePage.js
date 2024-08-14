import React, { useState, useEffect } from 'react';
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/HomePage.css';

function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [categories, setCategories] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchRecommendedProducts = async () =>  {
      try {
        const response = await axios.get('http://localhost:8000/api/recommendations/', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRecommendedProducts(response.data);
      } catch (error) {
        console.error('Error fetching recommended products:', error);
      }
    };

    fetchCategories();
    fetchRecommendedProducts();
  }, []);

  return (
    <div className="container">
      <Header isAuthenticated={isAuthenticated} />
      <main>
        <div className="content-wrapper">
          <div className="categories">
            <h2 className="categories-title">Product Categories</h2>
            <div className="categories-list">
              {categories.length > 0 ? (
              categories.map(category => (
                  <Link key={category.id} to={`/products?category=${category.id}`}  className="category-button">
                    {category.name}
                  </Link>
                ))
              ) : (
                <p>No categories available.</p>
              )}
           </div>
          </div>
          <div className="recommended-products">
            <h2 className="recommended-title">Top Products</h2>
            <div className="recommended-list">
            {recommendedProducts.length > 0 ? (
              recommendedProducts.map(product => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <h3>{product.name}</h3>
                  <p className="product-price">${product.discounted_price}</p>
                </div>  
              ))
            ) : (
              <p>No recommendations available</p>
            )}
          </div>
        </div>
      </div>
      {isAuthenticated && (
        <Link to="/add-product" className="add-product-button">Add Product</Link>
      )}
    </main>
    <Footer />
    </div>
  );
}

export default HomePage;