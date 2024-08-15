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
  const [discountedProducts, setDiscountedProducts] = useState([]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    const fetchDiscountedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/discounted-products/');
        setDiscountedProducts(response.data);
      } catch (error) {
        console.error('Error fetching discounted products:', error);
      }
    };


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

    fetchDiscountedProducts();
    fetchCategories();
    fetchRecommendedProducts();
  }, []);

  return (
    <div className="container">
      <Header isAuthenticated={isAuthenticated} />
      <div className="layout">
        <aside className="sidebar categories">
          <h2>Categories</h2>
          <div className="categories-list">
            {categories.length > 0 ? (
              categories.map(category => (
                <Link key={category.id} to={`/products?category=${category.id}`} className="category-link">
                  {category.name}
                </Link>
              ))
            ) : (
              <p>No categories available.</p>
            )}
          </div>
        </aside>
        <main className="main-content">
          <div className="content-wrapper">
            <div className="promotions">
              <h2 className="promotions-title">Promotions</h2>
              <div className='product-list'>
                {discountedProducts.map(product => (
                  <div key={product.id} className='product-card'>
                    <Link to={`/products/${product.id}`}>
                      <img src={product.image} alt={product.name} className='product-image' />
                      <h3 className='product-name'>{product.name}</h3>
                      <p className="product-price">${product.discounted_price}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <aside className="sidebar recommendations">
          <h2>Recommended Products</h2>
          <div className="recommendations-list">
            {recommendedProducts.length > 0 ? (
              recommendedProducts.map(product => (
                <div key={product.id} className="product-card">
                  <Link to={`/products/${product.id}`}>
                    <img src={product.image} alt={product.name} className="product-image" />
                    <h3 className='product-name'>{product.name}</h3>
                    <p className="product-price">${product.discounted_price}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p>No recommendations available.</p>
            )}
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;