import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaPlus } from 'react-icons/fa'; // Import icons from react-icons
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import jsPDF autoTable

export default function Product_view() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [modalOpen, setModalOpen] = useState(false); // Modal visibility
  const [productToDelete, setProductToDelete] = useState(null); // Product to delete
  const navigate = useNavigate();

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product');
        const data = await response.json();
        if (data.success) {
          setProducts(data.data); // Set products data
        } else {
          console.error("Failed to fetch products:", data.message);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false); // Stop the loading state
      }
    };
  
    fetchProducts();
  }, []);

  const handleDeleteConfirmation = (productId) => {
    setProductToDelete(productId); // Set the product ID to delete
    setModalOpen(true); // Open the modal
  };

  const handleDelete = async () => {
    if (productToDelete) {
      try {
        const response = await fetch(`/api/product/${productToDelete}`, {
          method: 'DELETE',
        });
        const result = await response.json();
        if (result.success) {
          setProducts(products.filter(product => product._id !== productToDelete)); // Update state after deleting
        }
      } catch (err) {
        console.error("Error deleting product:", err);
      } finally {
        setModalOpen(false); // Close the modal after deletion
        setProductToDelete(null); // Reset the product to delete
      }
    }
  };

  const handleUpdate = (productId) => {
    navigate(`/product_update/${productId}`); // Navigate to the update page with product ID
  };

  // Generate PDF for individual product report
  const handleItemReport = (product) => {
    const doc = new jsPDF();
    doc.text(`Product Report - ${product.name}`, 20, 10);

    // Add product details to the PDF using autoTable
    doc.autoTable({
      head: [["Field", "Details"]],
      body: [
        ["Product Name", product.name],
        ["Material", product.material],
        ["Description", product.description],
        ["Quantity", product.quantity],
        ["Unit Price", `$${product.unitPrice}`],
        ["Date", new Date(product.date).toLocaleDateString()],
      ],
    });

    doc.save(`${product.name}_report.pdf`); // Save PDF with product name
  };

  // Filtered products based on the search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-center mb-6">All Products</h1>

      {/* Navigation Buttons */}
      <div className="mb-4 flex justify-center space-x-4">
        <button
          onClick={() => navigate('/product_welcome')}
          className="bg-gray-700 text-white px-4 py-2 rounded-md shadow hover:bg-gray-800 transition duration-200 flex items-center"
        >
          <FaHome className="mr-2" /> Welcome
        </button>
        <button
          onClick={() => navigate('/product_add')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-200 flex items-center"
        >
          <FaPlus className="mr-2" /> Add Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          className="p-2 border border-gray-300 rounded-lg w-1/2 shadow"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div 
              key={product._id} 
              className="bg-blue-50 p-6 rounded-lg shadow-md space-y-4"
            >
              {/* Product Name Box */}
              <div className="bg-white rounded-lg p-4 shadow">
                <h2 className="text-xl font-bold text-gray-800 text-center">{product.name}</h2> {/* Centered Name */}
              </div>
              
              <div className="space-y-2">
                <p className="text-gray-600">Material: <span className="font-semibold">{product.material}</span></p>
                <p className="text-gray-600">Description: <span className="font-semibold">{product.description}</span></p>
                <p className="text-gray-600">Quantity: <span className="font-semibold">{product.quantity}</span></p>
                <p className="text-gray-600">Unit Price: <span className="font-semibold">${product.unitPrice}</span></p>
                <p className="text-gray-600">Date: <span className="font-semibold">{new Date(product.date).toLocaleDateString()}</span></p>
              </div>

              <div className="flex justify-center space-x-4 pt-4">
                <button
                  onClick={() => handleDeleteConfirmation(product._id)} // Open modal instead of deleting immediately
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleUpdate(product._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-200"
                >
                  Update
                </button>

                <button
                  onClick={() => handleItemReport(product)} // Pass the product to handleItemReport
                  className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition duration-200"
                >
                  Item Report
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      {/* Confirmation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h2 className="text-lg font-bold mb-4">Are you sure you want to delete this item?</h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDelete} // Confirm deletion
                className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
              <button
                onClick={() => setModalOpen(false)} // Cancel deletion
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
