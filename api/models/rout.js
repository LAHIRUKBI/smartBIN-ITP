// models/route.js
import mongoose from "mongoose";

// Define the Route schema
const routeSchema = new mongoose.Schema(
  {
    routeID: {
      type: String,
      required: true,
      unique: true, // Ensure routeID is unique across documents
    },
    startPoint: {
      type: String,
      required: true,
    },
    endPoint: {
      type: String,
      required: true,
    },
    destination: {
      type: Number,
      required: true,
      min: 0, // Ensure destination is a positive number
    },
    duration: {
      type: Number, // Duration in minutes
      required: false,
      min: 0, // Ensure duration is a positive number if set
    },
    distance: {
      type: Number, // Distance in kilometers
      required: false,
      min: 0, // Ensure distance is a positive number if set
    },

    vehicleType: {
      type: String, // Type of vehicle (e.g., bus, truck)
      required: false,
      default: "bus", // Example default value
    },
    status: {
      type: String, // Current status (e.g., active, inactive)
      enum: ["active", "inactive"],
      default: "active",
    },
    routeDescription: {
      type: String, // Brief description of the route
      required: false,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create and export the Route model
const Route = mongoose.model("Route", routeSchema);
export default Route; // Use export default
