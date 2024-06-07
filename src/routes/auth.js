import express from 'express';
import auth from '../controllers/auth/auth';
import { verifyAccessToken } from '../helpers/jwt';

const router = express.Router();

router.post('/register', auth.Register);
router.post('/login', auth.Login); 
router.post('/refresh_token', auth.RefreshToken); 
router.post('/logout', auth.Logout); 
router.get('/me', verifyAccessToken, auth.Me); 

export default router;
