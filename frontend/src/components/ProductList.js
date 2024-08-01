import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:8000/api/products/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
      });
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <Link to="/products/create">Add Product</Link>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <Link to={`/products/edit/${product.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;