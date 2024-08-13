import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/RecommendationListPage.css'; // Стили для плиток

function RecommendationListPage() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/recommendations/');
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="recommendation-list-container">
      <h2>Recommended Products</h2>
      <div className="recommendation-list">
        {recommendations.length > 0 ? (
          recommendations.map(product => (
            <div key={product.id} className="recommendation-item">
              <Link to={`/products/${product.id}`}>
                <img src={product.image} alt={product.name} className="recommendation-image" />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>
    </div>
  );
}

export default RecommendationListPage;