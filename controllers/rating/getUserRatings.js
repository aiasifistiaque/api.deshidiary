import asyncHandler from 'express-async-handler';
import Rating from '../../models/ratingModel.js';

const getUserRatings = asyncHandler(async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	const query = req.params.id == 'self' ? req.user._id : req.params.id;

	try {
		const data = await Rating.find({
			user: query,
		})
			.sort(sort)
			.limit(perpage)
			.skip(skip)
			.populate([
				{ path: 'listing', select: 'name rating reviews images' },
				{ path: 'user', select: 'name image' },
			]);
		const count = await Rating.count({ user: query });

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default getUserRatings;
