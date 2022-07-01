import express from 'express';
import getCategories from '../controllers/listing/getCategories.js';
import getCategoriesByName from '../controllers/listing/getCategoryByName.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/:name', getCategoriesByName);

export default router;
