import express from 'express';
import Order from '../controllers/order/order';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, Order.Create); 
router.get('/', authMiddleware, Order.List); 
router.get('/my-orders', authMiddleware, Order.GetMyOrders); 

export default router;
