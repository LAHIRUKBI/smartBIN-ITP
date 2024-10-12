import mongoose from 'mongoose';

const { Schema } = mongoose;

const OrderSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  serviceId: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  quantity: { type: Number, required: true }, // Include quantity field
  submittedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
