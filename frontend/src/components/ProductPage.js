
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductPage() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/categories/')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    return (
        <div>
            <h2>Products by Category</h2>
            {categories.map(category => (
                <div key={category.id}>
                    <h3>{category.name}</h3>
                    <ProductList categoryId={category.id} />
                </div>
            ))}
        </div>
    );
}

function ProductList({ categoryId }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/products/?category=${categoryId}`)
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, [categoryId]);

    return (
        <div>
            {products.map(product => (
                <div key={product.id} className="product">
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                    {product.image && <img src={`http://localhost:8000${product.image}`} alt={product.name} />}
                    <div>
                        <h5>Reviews:</h5>
                        {product.reviews.length > 0 ? (
                            <ul>
                                {product.reviews.map((review, index) => (
                                    <li key={index}>
                                        <p><strong>{review.user}</strong> ({review.rating} stars)</p>
                                        <p>{review.comment}</p>
                                        <p><em>Posted on {new Date(review.created_at).toLocaleDateString()}</em></p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductPage;