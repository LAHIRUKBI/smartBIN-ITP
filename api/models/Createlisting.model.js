import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitOfMeasure: { type: String, required: true },
    category: { type: String, required: true },
    addDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    price: { type: Number, required: true },
    userRef: { type: String, required: true },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);
export default Listing;
