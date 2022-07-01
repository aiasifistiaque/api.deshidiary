import express from 'express';
import getListings from '../../controllers/listing/getListings.js';
import { admin, protect } from '../../middleware/auth.js';
import { sort } from '../../middleware/sort.js';

const router = express.Router();
router.get('/', protect, admin, sort, getListings);

export default router;
