import asyncHandler from 'express-async-handler';
import Assign from '../../models/assignModel.js';
import Listing from '../../models/listingModel.js';
import Photo from '../../models/photoModel.js';
import Rating from '../../models/ratingModel.js';
import User from '../../models/userModel.js';

const getUserData = asyncHandler(async (req, res) => {
	try {
		let data = await User.findById(req.params.id).select('-password');

		const badges = await Assign.count({ user: req.params.id });

		const reviews = await Rating.count({ user: req.params.id });
		const listings = await Listing.count({ user: req.params.id });
		const photos = await Photo.count({ user: req.params.id });

		data.reviews = reviews ? reviews : 0;
		data.listings = listings ? listings : 0;
		data.photos = photos ? photos : 0;

		data.points = reviews + listings + photos;

		data.badges = badges;
		data.viewer = data._id != req.user._id ? req.user._id : 'self';

		await data.save();

		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default getUserData;
