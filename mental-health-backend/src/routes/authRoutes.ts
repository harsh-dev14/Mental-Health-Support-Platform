import express from 'express';
import { confirmSignUp, signIn, signUp } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signUp);
router.post('/confirm-signup', confirmSignUp);
router.post('/signin', signIn);

export default router;
