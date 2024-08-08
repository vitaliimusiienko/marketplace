import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import '../styles/ProductPage.css';

const ProductPage = ({ match }) => {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products/${match.params.id}/`);
                setProduct(response.data);
            } catch (error) {
                console.error('There was an error!', error);
            }
        };

        fetchProduct();
    }, [match.params.id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-container">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <h3>Reviews:</h3>
            {product.reviews.map((review) => (
                <div key={review.id} className="review">
                    <p><strong>{review.user}</strong></p>
                    <p>Rating: {review.rating}</p>
                    <p>{review.comment}</p>
                </div>
            ))}
            <ReviewForm productId={product.id} />
        </div>
    );
};

export default ProductPage;