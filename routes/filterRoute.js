import express from 'express';
import filteredSearch from '../controllers/search/filteredSearch.js';
import { sort } from '../middleware/sort.js';

const router = express.Router();

router.get('/', sort, filteredSearch);

export default router;
