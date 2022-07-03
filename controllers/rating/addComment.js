import asyncHandler from 'express-async-handler';
import Comment from '../../models/commentsModel.js';

const addComment = asyncHandler(async (req, res) => {
	const { details, rating } = req.body;
	try {
		const item = await Comment({
			user: req.user._id,
			rating,
			details,
		});
		const saved = await item.save();

		await item.save();

		res.status(201).json(saved);
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default addComment;
