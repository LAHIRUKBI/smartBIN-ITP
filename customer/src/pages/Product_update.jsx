import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPen, FaCube, FaClipboardList, FaSortNumericUp, FaDollarSign } from 'react-icons/fa';

export default function ProductUpdate() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/${id}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.data);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    const validationErrors = validateProduct(product);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop the update process if there are validation errors
    }
    try {
      const response = await fetch(`/api/product/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      const result = await response.json();
      if (result.success) {
        navigate('/product_view');
      }
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const validateProduct = (product) => {
    const errors = {};
    if (!product.name) errors.name = "Product name is required.";
    if (!product.material) errors.material = "Material is required.";
    if (!product.description) errors.description = "Description is required.";
    if (!Number.isInteger(product.quantity) || product.quantity <= 0) {
      errors.quantity = "Quantity must be a positive integer.";
    }
    if (typeof product.unitPrice !== 'number' || product.unitPrice <= 0) {
      errors.unitPrice = "Unit price must be a positive number.";
    }
    return errors;
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    const intValue = parseInt(value, 10);
    
    if (/^\d*$/.test(value) && intValue >= 0) { // Allow only digits and zero
      setProduct({ ...product, quantity: intValue });
      setErrors((prevErrors) => {
        const { quantity, ...rest } = prevErrors; // Remove quantity error if valid
        return rest;
      });
    } else {
      // Set an error if input is invalid
      setErrors((prevErrors) => ({ ...prevErrors, quantity: "Only positive integers are allowed." }));
    }
  };

  const handleUnitPriceChange = (e) => {
    const value = e.target.value;
    const floatValue = parseFloat(value);
    
    if (/^\d*(\.\d{0,2})?$/.test(value) && floatValue >= 0) { // Allow only digits and decimal points up to 2 decimal places
      setProduct({ ...product, unitPrice: floatValue });
      setErrors((prevErrors) => {
        const { unitPrice, ...rest } = prevErrors; // Remove unitPrice error if valid
        return rest;
      });
    } else {
      // Set an error if input is invalid
      setErrors((prevErrors) => ({ ...prevErrors, unitPrice: "Only positive numbers are allowed." }));
    }
  };

  const handleInputChange = (field, value) => {
    setProduct({ ...product, [field]: value });
    if (!value) {
      setErrors({ ...errors, [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required.` });
    } else {
      delete errors[field];
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-red-600">Product not found</div>
      </div>
    );
  }

  const isFormValid = Object.keys(errors).length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
        <FaPen className="inline-block mr-2" /> Update Product
      </h1>
      <div className="max-w-2xl mx-auto bg-white p-12 rounded-lg shadow-lg border border-gray-300">
        {/* Name Field */}
        <label className="block mb-6">
          <span className="text-gray-700 flex items-center text-lg mb-2">
            <FaCube className="mr-3 text-blue-500" /> Name
          </span>
          <input
            type="text"
            value={product.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`mt-2 block w-full h-12 px-4 border ${errors.name ? 'border-red-500' : 'border-black'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="Enter product name"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </label>

        {/* Material Field */}
        <label className="block mb-6">
          <span className="text-gray-700 flex items-center text-lg mb-2">
            <FaClipboardList className="mr-3 text-green-500" /> Material
          </span>
          <input
            type="text"
            value={product.material}
            onChange={(e) => handleInputChange('material', e.target.value)}
            className={`mt-2 block w-full h-12 px-4 border ${errors.material ? 'border-red-500' : 'border-black'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500`}
            placeholder="Enter material"
          />
          {errors.material && <p className="text-red-500 text-sm">{errors.material}</p>}
        </label>

        {/* Description Field */}
        <label className="block mb-6">
          <span className="text-gray-700 flex items-center text-lg mb-2">
            <FaClipboardList className="mr-3 text-yellow-500" /> Description
          </span>
          <textarea
            value={product.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className={`mt-2 block w-full h-24 px-4 border ${errors.description ? 'border-red-500' : 'border-black'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500`}
            placeholder="Enter product description"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </label>

        {/* Quantity Field */}
        <label className="block mb-6">
          <span className="text-gray-700 flex items-center text-lg mb-2">
            <FaSortNumericUp className="mr-3 text-purple-500" /> Quantity
          </span>
          <input
            type="number"
            value={product.quantity}
            onChange={handleQuantityChange} // Handle change with validation
            className={`mt-2 block w-full h-12 px-4 border ${errors.quantity ? 'border-red-500' : 'border-black'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
            placeholder="Enter quantity"
          />
          {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
        </label>

        {/* Unit Price Field */}
        <label className="block mb-6">
          <span className="text-gray-700 flex items-center text-lg mb-2">
            <FaDollarSign className="mr-3 text-red-500" /> Unit Price
          </span>
          <input
            type="number"
            value={product.unitPrice}
            onChange={handleUnitPriceChange} // Handle change with validation
            className={`mt-2 block w-full h-12 px-4 border ${errors.unitPrice ? 'border-red-500' : 'border-black'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500`}
            placeholder="Enter unit price"
          />
          {errors.unitPrice && <p className="text-red-500 text-sm">{errors.unitPrice}</p>}
        </label>

        {/* Submit Button */}
        <button
          onClick={handleUpdate}
          className={`w-full h-12 bg-blue-600 text-white font-bold rounded-lg ${isFormValid ? '' : 'opacity-50 cursor-not-allowed'}`}
          disabled={!isFormValid} // Disable button if form is invalid
        >
          Update Product
        </button>
      </div>
    </div>
  );
}
