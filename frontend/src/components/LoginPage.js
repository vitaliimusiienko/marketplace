import React, { useState } from 'react';
import axios from 'axios';
import Footer from './Footer'
import '../styles/LoginPage.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', { username, password });
      const token = response.data.access;
        if (token) {
          localStorage.setItem('token', token)
        } else {
          console.error('No token returned from login');
        }
      navigate('/');
    } catch (error) {
      console.error('There was an error!', error);
      alert('Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div>
            <label>Username:</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Login</button>
        </form>
      <Footer />
    </div>
  );
}

export default LoginPage;