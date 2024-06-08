import express from 'express';
import Order from '../controllers/order/order';

const router = express.Router();

router.post('/', Order.Create); 
router.get('/', Order.List); 
router.get('/my-orders', Order.GetMyOrders); 

export default router;
