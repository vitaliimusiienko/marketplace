import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import Header from './Header';
import Footer from './Footer';
import '../styles/ProductDetailPage.css';

function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [newProductReview, setNewProductReview] = useState({
    rating: 0,
    comment: ''
  });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${productId}/`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleProductReviewChange = (e) => {
    const { name, value } = e.target;
    setNewProductReview({
      ...newProductReview,
      [name]: value
    });
  };

  const handleProductReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8000/api/products/${productId}/reviews/`, {
        ...newProductReview
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNewProductReview({ rating: 0, comment: '' });
      const response = await axios.get(`http://localhost:8000/api/products/${productId}/`);
      setProduct(response.data);
      setReviewSubmitted(true);
    } catch (error) {
      console.error('Error submitting product review:', error);
    }
  };

  const handlePurchase = async () => {
    try {
        const token = localStorage.getItem('token');
        await axios.post(`http://localhost:8000/api/products/${productId}/purchase/`, {
            quantity: 1
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        alert('Purchase successful! Please provide a review for the seller.');
        setReviewSubmitted(false);
    } catch (error) {
        console.error('Error making purchase:', error);
        alert('Purchase failed');
    }
  };

  return (
    <div className="product-detail-container">
      <Header isAuthenticated={isAuthenticated} />
      <main className="product-detail-main">
        {product ? (
          <div className="product-detail-card">
            <img src={product.image} alt={product.name} className="product-detail-image" />
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
                      <p><strong>{review.user}</strong> - {review.rating} stars</p>
                      <p>{review.comment}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews for this product yet.</p>
              )}
              {isAuthenticated && !reviewSubmitted && (
                <form onSubmit={handleProductReviewSubmit} className="review-form">
                  <h4>Leave a Review for the Product</h4>
                  <div className="form-group">
                    <label htmlFor="productRating">Rating:</label>
                    <ReactStars
                      id="productRating"
                      value={newProductReview.rating}
                      onChange={(rating) => setNewProductReview(prev => ({ ...prev, rating }))}
                      size={24}
                      half={false}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="text">Review:</label>
                    <textarea
                      id="text"
                      name="comment"
                      value={newProductReview.comment}
                      onChange={handleProductReviewChange}
                      required
                    />
                  </div>
                  <button type="submit" className="submit-review-button">Submit Product Review</button>
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
      <Footer />
    </div>
  );
}

export default ProductDetailPage;