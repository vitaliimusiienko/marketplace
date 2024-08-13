import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductDetailPage.css';

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  const [newReview, setNewReview] = useState({
    rating: '',
    text: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${productId}/`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/current-user/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCurrentUser(response.data.username);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchProduct();
    fetchCurrentUser();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8000/api/products/${productId}/reviews/`, {
        ...newReview,
        author: currentUser
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNewReview({ rating: '', text: '' });
      const response = await axios.get(`http://localhost:8000/api/products/${productId}/`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="product-detail-container">
      <header className="product-detail-header">
        <div className="product-detail-logo">Marketplace</div>
      </header>
      <main className="product-detail-main">
        {product ? (
          <div className="product-detail-card">
            <img src={`${product.image}`} alt={product.name} className="product-detail-image" />
            <h2 className="product-detail-title">{product.name}</h2>
            <p className="product-detail-description">{product.description}</p>
            <p className="product-detail-price">${product.price}</p>
            <button className="product-detail-button">Add to Cart</button>
            <div className="product-reviews">
              <h3>Reviews</h3>
              {product.reviews && product.reviews.length > 0 ? (
                <ul className="review-list">
                  {product.reviews.map(review => (
                    <li key={review.id} className="review-item">
                      <p><strong>{review.author}</strong> - {review.rating} stars</p>
                      <p>{review.text}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews for this product yet.</p>
              )}
              {currentUser && (
                <form onSubmit={handleSubmit} className="review-form">
                  <h4>Create Review</h4>
                  <div className="form-group">
                    <label htmlFor="rating">Stars (1-5):</label>
                    <input
                      type="number"
                      id="rating"
                      name="rating"
                      value={newReview.rating}
                      onChange={handleChange}
                      min="1"
                      max="5"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="text">Review:</label>
                    <textarea
                      id="text"
                      name="text"
                      value={newReview.text}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="submit-review-button">Create Review</button>
                </form>
              )}
            </div>
          </div>
        ) : (
          <p>Loading product details...</p>
        )}
      </main>
      <footer className="product-detail-footer">
        &copy; 2024 Marketplace
      </footer>
    </div>
  );
}

export default ProductDetailPage;