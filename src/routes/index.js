import { Router } from 'express';
import { verifyAccessToken } from '../helpers/jwt';
import auth from './auth';
import product from './product';
import order from './order';

const router = Router();

router.get('/', (req, res) => {
  res.end('hey'); 
});

router.use('/auth', auth);
router.use('/product', product);
router.use('/order', verifyAccessToken, order);

export default router;

