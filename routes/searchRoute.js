import express from 'express';
import listingSearch from '../controllers/search/listingSearch.js';
import topSearch from '../controllers/search/topSearch.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();

router.get('/:search', sort, listingSearch);
router.get('/', sort, topSearch);

export default router;
