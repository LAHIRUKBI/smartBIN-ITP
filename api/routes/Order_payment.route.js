// Order_payment.route.js
import express from 'express';
import { createOrder } from '../controllers/Order_payment.controller.js';

const router = express.Router();

router.post('/', createOrder);

export default router;
