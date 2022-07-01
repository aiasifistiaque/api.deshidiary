import express from 'express';
import addRating from '../controllers/rating/addRating.js';
import getRatings from '../controllers/rating/getRatings.js';
import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();

router.post('/', protect, addRating);
router.get('/:id', sort, getRatings);

export default router;
