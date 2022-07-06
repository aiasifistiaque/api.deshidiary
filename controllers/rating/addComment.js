import asyncHandler from 'express-async-handler';
import Comment from '../../models/commentsModel.js';
import Rating from '../../models/ratingModel.js';
import addNotification from '../notification/addNotification.js';

const addComment = asyncHandler(async (req, res) => {
	const { details, rating } = req.body;
	try {
		const item = await Comment({
			user: req.user._id,
			rating,
			details,
		});
		const saved = await item.save();

		const review = await Rating.findById(rating);
		if (review) {
			review.comments = review.comments ? review.comments + 1 : 1;
			await review.save();
		}

		addNotification({
			from: req.user._id,
			title: `${req.user.name} commented on your post`,
			details: details,
			user: review.user,
			target: { type: 'comment', id: rating },
			rating: rating,
			listing: review.listing,
			text: 'New Comment',
		});

		return res.status(201).json(saved);
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default addComment;
