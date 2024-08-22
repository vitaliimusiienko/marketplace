import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProductListPage from './components/ProductListPage';
import AddProductPage from './components/AddProductPage';
import ProductDetailPage from './components/ProductDetailPage';
import UpdateUserPage from './components/UpdateUserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} /> 
        <Route path="/update-user" element={<UpdateUserPage />} />
      </Routes>
    </Router>
  );
}

export default App;