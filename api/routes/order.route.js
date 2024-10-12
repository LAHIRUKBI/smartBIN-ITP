import express from 'express';
import { getAllOrders, submitRequest, deleteOrder, updateOrder } from '../controllers/order.controller.js'; // Adjust path as necessary

const router = express.Router();

router.post('/submit', submitRequest);
router.get('/all', getAllOrders);
router.delete('/delete/:id', deleteOrder);
router.put('/update/:id', updateOrder);

export default router;
    