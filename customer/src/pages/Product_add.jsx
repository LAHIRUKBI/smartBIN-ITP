import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaTag, FaClipboardList, FaDollarSign, FaCalendarAlt } from 'react-icons/fa'; // Importing icons from react-icons

export default function Product_add() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    material: '',
    description: '',
    quantity: '',
    unitPrice: '',
    date: '',
  });

  const [errors, setErrors] = useState({
    quantity: '',
    unitPrice: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error messages on change
    if (name === 'quantity' || name === 'unitPrice') {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateFields = () => {
    const newErrors = {};

    // Check for positive numbers
    if (formData.quantity <= 0) {
      newErrors.quantity = 'Quantity must be a positive number';
    }
    if (formData.unitPrice <= 0) {
      newErrors.unitPrice = 'Unit Price must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateFields()) {
      return; // Stop submission if validation fails
    }

    const response = await fetch('/api/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.success) {
      alert('Product added successfully!');
      navigate('/product_welcome'); // Navigate to Product_welcome page
    } else {
      alert('Error adding product');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-500">
              <FaBoxOpen className="ml-3 text-gray-500" />
              <input
                type="text"
                name="name"
                placeholder="Item Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 focus:outline-none"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-500">
              <FaTag className="ml-3 text-gray-500" />
              <input
                type="text"
                name="material"
                placeholder="Material"
                value={formData.material}
                onChange={handleChange}
                required
                className="w-full p-3 focus:outline-none"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-500">
              <FaClipboardList className="ml-3 text-gray-500" />
              <textarea
                name="description"
                placeholder="Description (max 50 words)"
                value={formData.description}
                onChange={handleChange}
                required
                maxLength={250} // Limit the number of characters to 250
                className="w-full p-3 focus:outline-none"
              />
            </div>
            <p className="text-right text-gray-500">{formData.description.split(' ').length}/50 words</p>

            <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-500">
              <FaDollarSign className="ml-3 text-gray-500" />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                onBlur={validateFields} // Validate on blur
                required
                className={`w-full p-3 focus:outline-none ${errors.quantity ? 'border-red-500' : ''}`} // Highlight error
              />
              {errors.quantity && <p className="text-red-500 text-xs">{errors.quantity}</p>}
            </div>

            <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-500">
              <FaDollarSign className="ml-3 text-gray-500" />
              <input
                type="number"
                name="unitPrice"
                placeholder="Unit Price"
                value={formData.unitPrice}
                onChange={handleChange}
                onBlur={validateFields} // Validate on blur
                required
                className={`w-full p-3 focus:outline-none ${errors.unitPrice ? 'border-red-500' : ''}`} // Highlight error
              />
              {errors.unitPrice && <p className="text-red-500 text-xs">{errors.unitPrice}</p>}
            </div>

            <div className="flex items-center border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-500">
              <FaCalendarAlt className="ml-3 text-gray-500" />
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full p-3 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>

      <footer className="bg-green-800 text-white text-center py-4 mt-auto">
        <div className="container mx-auto">
          <h3 className="text-lg font-bold mb-2">Join Us in Making a Difference!</h3>
          <p className="mb-2">Your journey towards a greener planet starts here.</p>
          <div className="flex justify-center mb-2">
            <a href="https://facebook.com" className="mx-2 text-gray-300 hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" className="mx-2 text-gray-300 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" className="mx-2 text-gray-300 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" className="mx-2 text-gray-300 hover:text-white">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
