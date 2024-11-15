import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBox, FaUser, FaMapMarkerAlt, FaPhone, FaMoneyBillWave, FaCreditCard } from 'react-icons/fa';

export default function Order_update() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  // Set initial state for the order details
  const [productName, setProductName] = useState(order?.productName || '');
  const [quantity, setQuantity] = useState(order?.quantity || 1);
  const [totalAmount, setTotalAmount] = useState(order?.totalAmount || '');
  const [recipientName, setRecipientName] = useState(order?.recipientDetails.name || '');
  const [address, setAddress] = useState(order?.recipientDetails.address || '');
  const [phoneNumber, setPhoneNumber] = useState(order?.recipientDetails.phoneNumber || '');
  const [paymentMethod, setPaymentMethod] = useState(order?.paymentMethod || ''); // Default empty or prefilled value

  // State for validation errors
  const [errors, setErrors] = useState({
    productName: '',
    quantity: '',
    totalAmount: '',
    recipientName: '',
    address: '',
    phoneNumber: '',
    paymentMethod: ''
  });

  useEffect(() => {
    if (quantity > 0) {
      calculateTotalAmount();
    }
  }, [quantity]);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'productName':
        if (!value.trim()) error = 'Product Name is required';
        break;
      case 'quantity':
        if (!value || value <= 0) error = 'Quantity must be greater than 0';
        break;
      case 'totalAmount':
        if (!value || value <= 0) error = 'Total Amount must be greater than 0';
        break;
      case 'recipientName':
        if (!value.trim()) error = 'Recipient Name is required';
        break;
      case 'address':
        if (!value.trim()) error = 'Address is required';
        break;
      case 'phoneNumber':
        if (!/^\d{10}$/.test(value)) error = 'Phone Number must be 10 digits';
        break;
      case 'paymentMethod':
        if (!value.trim()) error = 'Payment Method is required';
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const calculateTotalAmount = () => {
    const pricePerUnit = 50; // Example: Price per unit (can be dynamic based on your logic)
    const total = pricePerUnit * quantity;
    setTotalAmount(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    validateField('productName', productName);
    validateField('quantity', quantity);
    validateField('totalAmount', totalAmount);
    validateField('recipientName', recipientName);
    validateField('address', address);
    validateField('phoneNumber', phoneNumber);
    validateField('paymentMethod', paymentMethod);

    // Check if there are any validation errors
    if (Object.values(errors).some((error) => error !== '') || !productName || !quantity || !recipientName || !address || !phoneNumber || !paymentMethod) {
      alert('Please fix validation errors before submitting.');
      return;
    }

    const updatedOrder = {
      productName,
      quantity,
      totalAmount,
      recipientDetails: {
        name: recipientName,
        address,
        phoneNumber,
      },
      paymentMethod,
    };

    try {
      await axios.put(`/api/productorder/${order._id}`, updatedOrder);
      alert('Order updated successfully!');
      navigate('/order_orders');
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Update Order</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md space-y-4">
        
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaBox className="text-gray-500 mr-2" />
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            onBlur={(e) => validateField('productName', e.target.value)}
            placeholder="Product Name"
            className="flex-grow focus:outline-none"
            required
          />
        </div>
        {errors.productName && <p className="text-red-500 text-sm">{errors.productName}</p>}

        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaMoneyBillWave className="text-gray-500 mr-2" />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, e.target.value))}
            onBlur={(e) => validateField('quantity', e.target.value)}
            placeholder="Quantity"
            className="flex-grow focus:outline-none"
            required
          />
        </div>
        {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}

        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaMoneyBillWave className="text-gray-500 mr-2" />
          <input
            type="number"
            value={totalAmount}
            placeholder="Total Amount"
            className="flex-grow focus:outline-none"
            required
            disabled
          />
        </div>
        {errors.totalAmount && <p className="text-red-500 text-sm">{errors.totalAmount}</p>}

        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaUser className="text-gray-500 mr-2" />
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            onBlur={(e) => validateField('recipientName', e.target.value)}
            placeholder="Recipient Name"
            className="flex-grow focus:outline-none"
            required
          />
        </div>
        {errors.recipientName && <p className="text-red-500 text-sm">{errors.recipientName}</p>}

        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaMapMarkerAlt className="text-gray-500 mr-2" />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onBlur={(e) => validateField('address', e.target.value)}
            placeholder="Address"
            className="flex-grow focus:outline-none"
            required
          />
        </div>
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaPhone className="text-gray-500 mr-2" />
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
            onBlur={(e) => validateField('phoneNumber', e.target.value)}
            placeholder="Phone Number"
            className="flex-grow focus:outline-none"
            required
          />
        </div>
        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <FaCreditCard className="text-gray-500 mr-2" />
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            onBlur={(e) => validateField('paymentMethod', e.target.value)}
            className="flex-grow focus:outline-none"
            required
          >
            <option value="" disabled>Select Payment Method</option>
            <option value="Card Payment">Card Payment</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>
        {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg py-2 px-4 w-full hover:bg-blue-600 transition duration-200"
        >
          Update Order
        </button>
      </form>
    </div>
  );
}
