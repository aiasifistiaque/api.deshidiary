import asyncHandler from 'express-async-handler';
import Rating from '../../models/ratingModel.js';

const getRatings = asyncHandler(async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;
	try {
		const data = await Rating.find({ listing: req.params.id })
			.sort(sort)
			.limit(perpage)
			.skip(skip)
			.populate([
				{ path: 'listing', select: 'name rating reviews' },
				{ path: 'user', select: 'name image' },
			]);
		const count = await Rating.count({ listing: req.params.id });

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default getRatings;
