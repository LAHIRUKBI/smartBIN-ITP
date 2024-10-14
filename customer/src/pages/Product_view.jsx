import React, { useState, useEffect } from 'react';

export default function Product_view() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product');
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);  // Set products data
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);  // Stop the loading state
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Show loading state
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-center mb-6">All Products</h1>
      <div className="space-y-4">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p>Material: {product.material}</p>
              <p>Description: {product.description}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Unit Price: ${product.unitPrice}</p>
              <p>Date: {new Date(product.date).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}
