import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OrderPayment() {
  const location = useLocation();
  const product = location.state;
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [recipientDetails, setRecipientDetails] = useState({
    name: '',
    address: '',
    phoneNumber: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' for cash on delivery
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const totalAmount = (product?.unitPrice || 0) * quantity;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!recipientDetails.name || !recipientDetails.address || !recipientDetails.phoneNumber) {
      setError("Please fill in all recipient details.");
      return;
    }

    // Validate card details if payment method is 'card'
    if (paymentMethod === 'card') {
      if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
        setError("Please fill in all card details.");
        return;
      }
    }

    const orderData = {
      productId: product._id,
      quantity,
      totalAmount,
      recipientDetails,
      paymentMethod,
      cardDetails: paymentMethod === 'card' ? cardDetails : null, // Include card details only for card payment
    };

    setLoading(true);
    setError(''); // Reset error message

    try {
      const response = await fetch('/api/productorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(`Order submission failed: ${errorData.message}`);
        return;
      }

      const data = await response.json();
      if (data.success) {
        alert("Order submitted successfully!");
        navigate('/');
      } else {
        setError("Order submission failed. Please try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Error during order submission:", error); // Log error for debugging
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-8 text-teal-600">Order Payment</h2>
      {product ? (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4 shadow-md" />
          <h3 className="text-2xl font-bold mb-4 text-teal-600">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2"><strong>Material:</strong> {product.material}</p>
          <p className="text-sm text-gray-600 mb-2"><strong>Description:</strong> {product.description}</p>
          <p className="text-sm text-gray-600 mb-2"><strong>Unit Price:</strong> ${product.unitPrice}</p>
          <div className="flex items-center mb-4">
            <p className="text-sm text-gray-600 mr-2"><strong>Quantity:</strong></p>
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-gray-300 rounded-md w-16 p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <p className="text-lg font-bold mb-4"><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</p>
          {error && <p className="text-red-600 mb-4">{error}</p>} {/* Display error message */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Recipient Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Recipient Name</label>
              <input
                type="text"
                name="name"
                value={recipientDetails.name}
                onChange={(e) => setRecipientDetails({ ...recipientDetails, name: e.target.value })}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={recipientDetails.address}
                onChange={(e) => setRecipientDetails({ ...recipientDetails, address: e.target.value })}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={recipientDetails.phoneNumber}
                onChange={(e) => setRecipientDetails({ ...recipientDetails, phoneNumber: e.target.value })}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            
            {/* Payment Method Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="cod">Cash on Delivery</option>
                <option value="card">Bank Card</option>
              </select>
            </div>

            {/* Card Details (conditional rendering) */}
            {paymentMethod === 'card' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-md bg-teal-600 text-white font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-700'}`}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        </div>
      ) : (
        <p className="text-center text-red-600">Product not found.</p>
      )}
    </div>
  );
}
