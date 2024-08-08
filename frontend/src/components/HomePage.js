import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/HomePage.css';

function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    // Загрузка категорий
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/categories/'); // Адрес вашего API для категорий
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.reload();
  };

  return (
    <div className="container">
      <header>
        <div className="header-logo">Marketplace</div>
        <nav>
          <ul>
            {isAuthenticated ? (
              <>
                <li><Link to="/add-product" className="auth-button add-product-button">Add Product</Link></li>
                <li><button onClick={handleLogout} className="auth-button logout-button">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/register" className="auth-button register-button">Register</Link></li>
                <li><Link to="/login" className="auth-button login-button">Login</Link></li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <div className="categories">
          <h2 className="categories-title">Product Categories</h2>
          <div className="categories-list">
            {categories.map(category => (
              <div key={category.id} className="category-item">
                <Link to={`/products?category=${category.id}`}>{category.name}</Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer>
        &copy; 2024 Marketplace
      </footer>
    </div>
  );
}

export default HomePage;