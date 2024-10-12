import express from 'express';
import { createShippingOrder, getShippedOrders, deleteShippedOrder } from '../controllers/Shipping.controller.js';

const router = express.Router();

// Route to create a shipping order
router.post('/', createShippingOrder);
// Route to get shipped orders
router.get('/', getShippedOrders);

router.delete('/:id', deleteShippedOrder);


export default router;
