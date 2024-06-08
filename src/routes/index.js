import { Router } from 'express';
import { verifyAccessToken } from '../helpers/jwt';
import auth from './auth';
import product from './product';
import order from './order';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', (req, res) => {
  res.end('hey'); 
});

router.use('/auth', auth);
router.use('/product', product);
router.post('/order', authMiddleware, Create);

export default router;
