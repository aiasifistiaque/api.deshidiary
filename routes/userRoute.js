import express from 'express';
import getLeadboard from '../controllers/user/getLeadboard.js';
import getRank from '../controllers/user/getRank.js';
import getUserData from '../controllers/user/getUserData.js';
import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();

router.get('/:id', protect, getUserData);
router.get('/get/leadboard', sort, getLeadboard);
router.get('/get/rank', protect, getRank);

export default router;
