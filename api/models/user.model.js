import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [
        'Customer',
        'Stock Manager',
        'Staff Manager',
        'Packing Manager',
        'Vehicle Manager',
        'Product Manager',
        'Notification Manager',
        'Order Manager'
      ],
      default: 'Customer',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
