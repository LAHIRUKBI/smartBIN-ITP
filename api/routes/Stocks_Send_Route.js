import express from 'express';
import { fetchOrders, sendOrder } from '../controllers/Stocks_Send_Controller.js';

const router = express.Router();

// POST request to send and save the order
router.post('/send', sendOrder);
router.get('/orders', fetchOrders);


export default router;
