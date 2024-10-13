import Order from '../models/Order_payment.model.js';


export const createOrder = async (req, res) => {
    try {
        const { productId, productName, quantity, totalAmount, recipientDetails, paymentMethod, cardDetails } = req.body;

        // Validate order data
        if (!productId || !productName || !quantity || !recipientDetails || !totalAmount) {
            return res.status(400).json({ message: 'Missing required order information.' });
        }

        // Create new order instance
        const newOrder = new Order({
            productId,
            productName,  // Include product name in the order
            quantity,
            totalAmount,
            recipientDetails,
            paymentMethod,
            cardDetails,
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        // Respond with the saved order
        return res.status(201).json({ success: true, message: 'Order created successfully', order: savedOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({ message: 'An error occurred while creating the order.', error });
    }
};








// Controller for fetching all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('productId'); // Fetch and populate product details
        return res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({ message: 'An error occurred while fetching orders.', error });
    }
};







// Controller for deleting an order
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params; // Get the order ID from the request parameters

        // Find and delete the order
        const deletedOrder = await Order.findByIdAndDelete(id);
        
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        return res.status(200).json({ success: true, message: 'Order deleted successfully.' });
    } catch (error) {
        console.error('Error deleting order:', error);
        return res.status(500).json({ message: 'An error occurred while deleting the order.', error });
    }
};




export const updateOrder = async (req, res) => {
    try {
      const { id } = req.params; // Get the order ID from the request parameters
      const updatedData = req.body; // Get the updated data from the request body
  
      // Validate the incoming data (you can customize validation as needed)
      if (!updatedData.productName || !updatedData.quantity || !updatedData.totalAmount) {
        return res.status(400).json({ message: 'Missing required order information.' });
      }
  
      // Update the order in the database
      const updatedOrder = await Order.findByIdAndUpdate(id, updatedData, { new: true }); // `new: true` returns the updated document
  
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found.' });
      }
  
      return res.status(200).json({ success: true, message: 'Order updated successfully.', order: updatedOrder });
    } catch (error) {
      console.error('Error updating order:', error);
      return res.status(500).json({ message: 'An error occurred while updating the order.', error });
    }
  };
  





