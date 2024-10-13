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
