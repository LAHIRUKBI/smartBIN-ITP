import mongoose from 'mongoose';

const shippingSchema = new mongoose.Schema({
  driverName: { type: String, required: true },
  vehicleType: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  paymentMade: { type: Boolean, required: true },
  paymentMine: { type: String, required: false }, // or appropriate type
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
}, {
  timestamps: true,
});

const Shipping = mongoose.model('Shipping', shippingSchema);
export default Shipping;
