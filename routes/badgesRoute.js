import express from 'express';
import getAssignedBadges from '../controllers/badges/getAssignedBadges.js';
import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();
router.get('/:id', protect, sort, getAssignedBadges);

export default router;
