import Shipping from '../models/Shipping.model.js';

export const createShippingOrder = async (req, res) => {
  const { driverName, vehicleType, vehicleNumber, paymentMade, paymentMine, orderId } = req.body;

  try {
    const shippingOrder = new Shipping({
      driverName,
      vehicleType,
      vehicleNumber,
      paymentMade,
      paymentMine,
      orderId,
    });

    const savedOrder = await shippingOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.error('Error creating shipping order:', err);
    res.status(500).json({ message: 'Failed to create shipping order', error: err.message });
  }
};




// Fetch all shipped orders
export const getShippedOrders = async (req, res) => {
  try {
    const shippedOrders = await Shipping.find(); // You can add filters if necessary
    res.status(200).json(shippedOrders);
  } catch (err) {
    console.error('Error fetching shipped orders:', err);
    res.status(500).json({ message: 'Failed to fetch shipped orders', error: err.message });
  }
};





// Delete a shipped order by its ID
export const deleteShippedOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Shipping.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('Error deleting shipped order:', err);
    res.status(500).json({ message: 'Failed to delete order', error: err.message });
  }
};