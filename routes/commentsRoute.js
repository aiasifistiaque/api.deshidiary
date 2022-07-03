import express from 'express';
import addComment from '../controllers/rating/addComment.js';
import getComments from '../controllers/rating/getComments.js';
import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();

router.post('/', protect, addComment);
router.get('/:id', sort, getComments);

export default router;
