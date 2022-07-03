import asyncHandler from 'express-async-handler';
import Comment from '../../models/commentsModel.js';

const getComments = asyncHandler(async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;
	try {
		const data = await Comment.find({ rating: req.params.id })
			.sort(sort)
			.limit(perpage)
			.skip(skip)
			.populate([{ path: 'user', select: 'name image' }]);
		const count = await Comment.count({ rating: req.params.id });

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default getComments;
