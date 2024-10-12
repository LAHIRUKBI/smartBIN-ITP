import mongoose from "mongoose";

// Define the Vehicle schema
const vehicleSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: String,
      required: true,
      unique: true,
    },
    vehicleCategory: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
    duty: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    rental: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create and export the Vehicle model
const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle; // Use export default
