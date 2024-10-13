import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    recipientDetails: {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    cardDetails: {
        cardNumber: {
            type: String,
        },
        expiryDate: {
            type: String,
        },
        cvv: {
            type: String,
        },
    },
}, { timestamps: true });

const Order = mongoose.model('Product_Order', OrderSchema);
export default Order;
