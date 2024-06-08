import express from 'express';
import Order from '../controllers/order/order';
import authMiddleware from '../middlewares/authMiddleware';
import Create from '../controllers/order/order'

const router = express.Router();

router.post('/', authMiddleware, Create); 
router.get('/', authMiddleware, Order.List); 
router.get('/my-orders', authMiddleware, Order.GetMyOrders); 

export default router;
