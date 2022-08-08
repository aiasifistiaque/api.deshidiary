import asyncHandler from 'express-async-handler';
import Photo from '../../models/photoModel.js';
import Rating from '../../models/ratingModel.js';

const getPhotos = asyncHandler(async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;
	try {
		const data = await Photo.find({ listing: req.params.id })
			.sort(sort)
			.limit(perpage)
			.skip(skip)
			.populate([
				{ path: 'listing', select: 'name rating reviews' },
				{ path: 'user', select: 'name image' },
			]);
		const count = await Photo.count({ listing: req.params.id });

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default getPhotos;
