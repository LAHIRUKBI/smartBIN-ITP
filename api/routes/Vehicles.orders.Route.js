import express from "express";
import {
  getVehicleOrders,
  createVehicleOrder,
  updateVehicleOrder,
  deleteVehicleOrder,
} from "../controllers/Vehicles.orders.controller.js"; // Adjust the import path based on your structure

const router = express.Router();

// Get all vehicle orders
router.get("/", getVehicleOrders);

// Create a new vehicle order
router.post("/", createVehicleOrder);

// Update a specific vehicle order by ID
router.put("/:id", updateVehicleOrder);

// Delete a specific vehicle order by ID
router.delete("/:id", deleteVehicleOrder);

export default router;
