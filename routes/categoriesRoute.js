import express from 'express';
import getCategories from '../controllers/listing/getCategories.js';
import getCategoriesByName from '../controllers/listing/getCategoryByName.js';
import getCategoryListingCount from '../controllers/listing/getCategoryListingCount.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/:name', getCategoriesByName);
router.get('/count/:id', getCategoryListingCount);

export default router;
