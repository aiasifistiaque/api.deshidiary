import express from 'express';
import addListing from '../controllers/listing/addListing.js';
import getListingById from '../controllers/listing/getListingById.js';
import getListings from '../controllers/listing/getListings.js';
import { protect } from '../middleware/auth.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();

router.get('/', sort, getListings);
router.get('/:id', getListingById);
router.post('/', protect, addListing);

export default router;
