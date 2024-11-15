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
  const [fieldErrors, setFieldErrors] = useState({});

  const totalAmount = (product?.unitPrice || 0) * quantity;

  const validateField = (name, value) => {
    let errorMsg = '';

    switch (name) {
      case 'name':
        if (!value.trim()) errorMsg = 'Name is required.';
        break;
      case 'address':
        if (!value.trim()) errorMsg = 'Address is required.';
        break;
      case 'phoneNumber':
        if (!value.trim()) {
          errorMsg = 'Phone number is required.';
        } else if (!/^\d{10}$/.test(value)) {
          errorMsg = 'Phone number must be 10 digits.';
        }
        break;
      case 'cardNumber':
        if (!value.trim()) {
          errorMsg = 'Card number is required.';
        } else if (!/^\d{16}$/.test(value)) {
          errorMsg = 'Card number must be 16 digits.';
        }
        break;
      case 'expiryDate':
        if (!value.trim()) {
          errorMsg = 'Expiry date is required.';
        } else if (!/^\d{2}\/\d{2}$/.test(value)) {
          errorMsg = 'Expiry date must be in MM/YY format.';
        }
        break;
      case 'cvv':
        if (!value.trim()) {
          errorMsg = 'CVV is required.';
        } else if (!/^\d{3}$/.test(value)) {
          errorMsg = 'CVV must be 3 digits.';
        }
        break;
      default:
        break;
    }

    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));

    return errorMsg === '';
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const isRecipientValid =
      validateField('name', recipientDetails.name) &&
      validateField('address', recipientDetails.address) &&
      validateField('phoneNumber', recipientDetails.phoneNumber);

    const isCardValid =
      paymentMethod === 'card'
        ? validateField('cardNumber', cardDetails.cardNumber) &&
          validateField('expiryDate', cardDetails.expiryDate) &&
          validateField('cvv', cardDetails.cvv)
        : true;

    if (!isRecipientValid || !isCardValid) {
      setError('Please correct the highlighted fields.');
      return;
    }

    const orderData = {
      productId: product._id,
      productName: product.name,
      quantity,
      totalAmount,
      recipientDetails,
      paymentMethod,
      cardDetails: paymentMethod === 'card' ? cardDetails : null,
    };

    setLoading(true);
    setError('');

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
        alert('Order submitted successfully!');
        navigate('/');
      } else {
        setError('Order submission failed. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Error during order submission:', error);
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
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Recipient Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Recipient Name</label>
              <input
                type="text"
                name="name"
                value={recipientDetails.name}
                onChange={(e) => setRecipientDetails({ ...recipientDetails, name: e.target.value })}
                onBlur={handleBlur}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {fieldErrors.name && <p className="text-red-600">{fieldErrors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={recipientDetails.address}
                onChange={(e) => setRecipientDetails({ ...recipientDetails, address: e.target.value })}
                onBlur={handleBlur}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {fieldErrors.address && <p className="text-red-600">{fieldErrors.address}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={recipientDetails.phoneNumber}
                onChange={(e) => setRecipientDetails({ ...recipientDetails, phoneNumber: e.target.value })}
                onBlur={handleBlur}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {fieldErrors.phoneNumber && <p className="text-red-600">{fieldErrors.phoneNumber}</p>}
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
                    onBlur={handleBlur}
                    required
                    maxLength="16"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  {fieldErrors.cardNumber && <p className="text-red-600">{fieldErrors.cardNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date (MM/YY)</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                    onBlur={handleBlur}
                    required
                    placeholder="MM/YY"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  {fieldErrors.expiryDate && <p className="text-red-600">{fieldErrors.expiryDate}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    onBlur={handleBlur}
                    required
                    maxLength="3"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  {fieldErrors.cvv && <p className="text-red-600">{fieldErrors.cvv}</p>}
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`mt-4 w-full p-3 bg-teal-600 text-white rounded-lg ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-700'
              }`}
            >
              {loading ? 'Submitting...' : 'Submit Order'}
            </button>
          </form>
        </div>
      ) : (
        <p className="text-center">Product details are not available.</p>
      )}
    </div>
  );
}
