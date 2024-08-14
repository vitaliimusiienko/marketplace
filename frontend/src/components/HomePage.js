import React, { useState, useEffect } from 'react';
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/HomePage.css';

function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [categories, setCategories] = useState([]);
  
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

    fetchCategories();
  }, []);

  return (
    <div className="container">
      <Header isAuthenticated={isAuthenticated} />
      <main>
        <div className="categories">
          <h2 className="categories-title">Product Categories</h2>
          <div className="categories-list">
            {categories.length > 0 ? (
              categories.map(category => (
                <Link key={category.id} to={`/products?category=${category.id}`} className="category-button">
                  {category.name}
                </Link>
              ))
            ) : (
              <p>No categories available.</p>
            )}
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