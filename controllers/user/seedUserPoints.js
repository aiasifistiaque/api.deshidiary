import asyncHandler from 'express-async-handler';
import Assign from '../../models/assignModel.js';
import Listing from '../../models/listingModel.js';
import Photo from '../../models/photoModel.js';
import Rating from '../../models/ratingModel.js';
import User from '../../models/userModel.js';

const seedUserPoints = asyncHandler(async (req, res) => {
	try {
		let users = await User.find();

		users.map(async item => {
			const data = await User.findById(item._id);
			const reviews = await Rating.count({ user: item._id });
			const listings = await Listing.count({ user: item._id });
			const photos = await Photo.count({ user: item._id });
			const badges = await Assign.count({ user: item._id });

			data.reviews = reviews ? reviews : 0;
			data.listings = listings ? listings : 0;
			data.photos = photos ? photos : 0;

			data.points = reviews + listings + photos;

			data.badges = badges;

			await data.save();
		});

		let newUsers = await User.find();

		return res.status(200).json(newUsers);
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default seedUserPoints;
