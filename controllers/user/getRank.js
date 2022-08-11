import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';

const getRank = asyncHandler(async (req, res) => {
	try {
		let rank = 0;
		let data = await User.find().sort('-points');
		let points = 0;
		let reviews = 0;

		data.map((item, i) => {
			if (item._id == req.user._id) {
				console.log(item);
				rank = i + 1;
				points = item.points;
				reviews = item.reviews;
			}
		});

		return res
			.status(200)
			.json({ rank: rank, id: req.user._id, points, reviews });
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default getRank;
