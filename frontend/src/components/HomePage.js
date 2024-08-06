import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
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
              <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            ) : (
              <>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <div className="card">
          <h2 className="card-title">Welcome to Marketplace</h2>
          <p className="card-description">Find the best deals on your favorite products.</p>
        </div>
      </main>
      <footer>
        &copy; 2024 Marketplace
      </footer>
    </div>
  );
}

export default HomePage;