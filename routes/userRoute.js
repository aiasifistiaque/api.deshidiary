import express from 'express';
import getUserData from '../controllers/user/getUserData.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', protect, getUserData);

export default router;
