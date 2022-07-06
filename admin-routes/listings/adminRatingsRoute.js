import express from 'express';
import { admin, protect } from '../../middleware/auth.js';
import { sort } from '../../middleware/sort.js';
import Rating from '../../models/ratingModel.js';

const getAdminRatings = async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;
	try {
		const data = await Rating.find()
			.sort(sort)
			.limit(perpage)
			.skip(skip)
			.populate([
				{ path: 'listing', select: 'name rating reviews' },
				{ path: 'user', select: 'name image' },
			]);
		const count = await Rating.count();

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
};

const router = express.Router();
router.get('/', protect, admin, sort, getAdminRatings);

export default router;
