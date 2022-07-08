import asyncHandler from 'express-async-handler';
import Assign from '../../models/assignModel.js';
import Rating from '../../models/ratingModel.js';
import User from '../../models/userModel.js';

const getUserData = asyncHandler(async (req, res) => {
	try {
		let data = await User.findById(req.params.id).select('-password');
		const count = await Rating.count({ user: req.params.id });
		const badges = await Assign.count({ user: req.params.id });

		data.reviews = count;
		data.badges = badges;
		data.viewer = data._id != req.user._id ? req.user._id : 'self';

		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default getUserData;
