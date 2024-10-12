import Order from '../models/order.model.js';

export const submitRequest = async (req, res) => {
  try {
    const { name, email, phone, address, serviceId, paymentMethod, quantity } = req.body;

    // Validate input
    if (!name || !email || !phone || !address || !serviceId || !paymentMethod || !quantity) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new order
    const newOrder = new Order({
      name, // Stock name automatically passed from frontend
      email,
      phone,
      address,
      serviceId,
      paymentMethod,
      quantity, // Include quantity in the order
    });

    await newOrder.save();
    
    res.status(201).json({ message: 'Order submitted successfully', newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting order', error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders from the database
    res.status(200).json(orders); // Send the orders as a response
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};





export const deleteOrder = async (req, res) => {
  const { id } = req.params; // Extract the order ID from the request params
  try {
    const order = await Order.findByIdAndDelete(id); // Delete the order by ID
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};






export const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id; // Get the order ID from the URL
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, { new: true }); // Update the order

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully', updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
};