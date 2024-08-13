import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductDetailPage.css';

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  const [newProductReview, setNewProductReview] = useState({
    rating: '',
    text: ''
  });
  const [newSellerReview, setNewSellerReview] = useState({
    rating: '',
    text: ''
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

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

  const handleProductReviewChange = (e) => {
    const { name, value } = e.target;
    setNewProductReview({
      ...newProductReview,
      [name]: value
    });
  };

  const handleSellerReviewChange = (e) => {
    const { name, value } = e.target;
    setNewSellerReview({
      ...newSellerReview,
      [name]: value
    });
  };

  const handleProductReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8000/api/products/${productId}/reviews/`, {
        ...newProductReview,
        author: currentUser
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNewProductReview({ rating: '', text: '' });
      const response = await axios.get(`http://localhost:8000/api/products/${productId}/`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error submitting product review:', error);
    }
  };

  const handleSellerReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8000/api/products/${productId}/seller-review/`, {
        ...newSellerReview
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNewSellerReview({ rating: '', text: '' });
      setReviewSubmitted(true);
    } catch (error) {
      console.error('Error submitting seller review:', error);
    }
  };

  const handlePurchase = async () => {
    alert('Purchase successful! Please provide a review for the seller.');
    setReviewSubmitted(false);
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
            <button className="product-detail-button" onClick={handlePurchase}>Buy Now</button>
            <div className="product-reviews">
              <h3>Product Reviews</h3>
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
              {currentUser && !reviewSubmitted && (
                <form onSubmit={handleProductReviewSubmit} className="review-form">
                  <h4>Leave a Review for the Product</h4>
                  <div className="form-group">
                    <label htmlFor="rating">Stars (1-5):</label>
                    <input
                      type="number"
                      id="rating"
                      name="rating"
                      value={newProductReview.rating}
                      onChange={handleProductReviewChange}
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
                      value={newProductReview.text}
                      onChange={handleProductReviewChange}
                      required
                    />
                  </div>
                  <button type="submit" className="submit-review-button">Submit Review</button>
                </form>
              )}
              {currentUser && !reviewSubmitted && (
                <form onSubmit={handleSellerReviewSubmit} className="review-form">
                  <h4>Leave a Review for the Seller</h4>
                  <div className="form-group">
                    <label htmlFor="rating">Stars (1-5):</label>
                    <input
                      type="number"
                      id="rating"
                      name="rating"
                      value={newSellerReview.rating}
                      onChange={handleSellerReviewChange}
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
                      value={newSellerReview.text}
                      onChange={handleSellerReviewChange}
                      required
                    />
                  </div>
                  <button type="submit" className="submit-review-button">Submit Review</button>
                </form>
              )}
              {reviewSubmitted && (
                <p>Thank you for your review!</p>
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