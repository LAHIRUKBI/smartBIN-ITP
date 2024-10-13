import Order from '../models/Order_payment.model.js';


export const createOrder = async (req, res) => {
    try {
        const { productId, quantity, totalAmount, recipientDetails, paymentMethod, cardDetails } = req.body;

        // Validate order data
        if (!productId || !quantity || !recipientDetails || !totalAmount) {
            return res.status(400).json({ message: 'Missing required order information.' });
        }

        // Create new order instance
        const newOrder = new Order({
            productId,
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
