import Order from "../models/ServiceRequest.model.js"; // Adjust the import path based on your structure

// Get all vehicle orders
export const getVehicleOrders = async (req, res) => {
  try {
    const vehicleOrders = await Order.find(); // Fetching all orders from the database
    res.status(200).json(vehicleOrders); // Returning the fetched data as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Error fetching vehicle orders", error });
  }
};

// Create a new vehicle order
export const createVehicleOrder = async (req, res) => {
  const newOrder = new Order(req.body); // Create a new order instance
  try {
    const savedOrder = await newOrder.save(); // Save the order to the database
    res.status(201).json(savedOrder); // Return the saved order
  } catch (error) {
    res.status(500).json({ message: "Error creating vehicle order", error });
  }
};

// Update a specific vehicle order by ID
export const updateVehicleOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating vehicle order", error });
  }
};

// Delete a specific vehicle order by ID
export const deleteVehicleOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting vehicle order", error });
  }
};
