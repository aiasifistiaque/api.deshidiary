import express from 'express';
import getNotifications from '../controllers/notification/getNotifications.js';
import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();

router.get('/', protect, sort, getNotifications);

export default router;
