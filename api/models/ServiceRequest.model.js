import mongoose from 'mongoose';

const { Schema } = mongoose;

const serviceRequestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
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
  additionalInfo: {
    type: String,
    default: '',
  },
  serviceId: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true, // Ensure this field is required
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});


const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

export default ServiceRequest;
