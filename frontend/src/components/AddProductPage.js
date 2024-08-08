import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddProductPage.css';

const AddProductPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [article, setArticle] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('article', article);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:8000/api/products/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${localStorage.getItem('token')}`  
        }
      });
      setSuccess('Product added successfully!');
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setArticle('');
      setImage(null);
    } catch (error) {
      setError('Failed to add product. Please try again.');
      console.error('Error creating product:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Article:</label>
          <input
            type="number"
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;