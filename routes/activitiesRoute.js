import express from 'express';
import getActivities from '../controllers/activity/getActivities.js';
import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();

router.get('/', sort, getActivities);

export default router;
