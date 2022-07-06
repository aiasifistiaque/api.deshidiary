import asyncHandler from 'express-async-handler';
import Rating from '../../models/ratingModel.js';

const getReviewById = asyncHandler(async (req, res) => {
	try {
		const data = await Rating.findById(req.params.id)
		.populate([
			{ path: 'listing', select: 'name rating reviews images' },
			{ path: 'user', select: 'name image' },
		]);

		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default getReviewById;
