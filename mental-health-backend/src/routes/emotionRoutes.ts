import express from 'express';
import {
  submitEmotionData,
  getEmotionHistory,
} from '../controllers/emotionController';
import authenticate from '../middleware/authenticate';

const router = express.Router();

router.post('/submit', authenticate, submitEmotionData);
router.get('/history', authenticate, getEmotionHistory);

export default router;
