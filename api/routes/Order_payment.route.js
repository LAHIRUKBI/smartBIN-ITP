// Order_payment.route.js
import express from 'express';
import { createOrder, deleteOrder, getAllOrders, updateOrder } from '../controllers/Order_payment.controller.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.delete('/:id', deleteOrder);
router.put('/:id', updateOrder);


export default router;
