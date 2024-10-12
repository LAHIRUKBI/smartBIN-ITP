import Order from '../models/Stocks_Send.js';

// Send order controller function
export const sendOrder = async (req, res, next) => {
  const { name, allocatedAmount, date, address, phone } = req.body;

  if (!name || !allocatedAmount || isNaN(allocatedAmount) || !address || !phone) {
    return res.status(400).json({ message: 'Invalid order details.' });
  }

  try {
    const newOrder = new Order({
      name,
      allocatedAmount,
      date: date ? new Date(date) : Date.now(),
      address,
      phone,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    next(error);
  }
};




// Fetch orders controller function
export const fetchOrders = async (req, res, next) => {
  try {
    const orders = await Order.find(); // Fetch all orders from the database
    res.status(200).json(orders); // Send the orders back as a response
  } catch (error) {
    next(error); // Handle errors
  }
};