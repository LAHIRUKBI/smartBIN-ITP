// Order_payment.route.js
import express from 'express';
import { createOrder, getAllOrders } from '../controllers/Order_payment.controller.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);

export default router;
