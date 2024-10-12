import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  allocatedAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  }
});

export default mongoose.model('StockSendOrder', OrderSchema);
