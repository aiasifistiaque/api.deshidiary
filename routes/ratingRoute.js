import express from 'express';
import addPhoto from '../controllers/rating/addPhoto.js';
import addRating from '../controllers/rating/addRating.js';
import getPhotos from '../controllers/rating/getPhotos.js';
import getRatings from '../controllers/rating/getRatings.js';
import getReviewById from '../controllers/rating/getReviewById.js';
import getUserRatings from '../controllers/rating/getUserRatings.js';
import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();

router.post('/', protect, addRating);
router.get('/:id', sort, getRatings);
router.get('/user/:id', protect, sort, getUserRatings);
router.get('/review/:id', getReviewById);
router.post('/photo', protect, addPhoto);
router.get('/photo/get/:id', sort, getPhotos);

export default router;
