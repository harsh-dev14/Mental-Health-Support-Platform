import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController';
import authenticate from '../middleware/authenticate';

const router = express.Router();

router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, updateUserProfile);

export default router;
