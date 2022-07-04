import asyncHandler from 'express-async-handler';
import Listing from '../../models/listingModel.js';
import addActivity from '../activity/addActivity.js';

const addListing = asyncHandler(async (req, res) => {
	const {
		name,
		category,
		email,
		phone,
		extraPhone,
		postCode,
		website,
		description,
		city,
		division,
		street,
		additionalAddress,
		services,
		features,
		paymentOptions,
		tags,
		images,
		lat,
		lng,
	} = req.body;
	try {
		const item = await Listing({
			user: req.user._id,
			name,
			category,
			email,
			phone,
			extraPhone,
			postCode,
			website,
			description,
			city,
			division,
			street,
			additionalAddress,
			services,
			features,
			paymentOptions,
			tags,
			images,
			rating: 0,
			reviews: 0,
			geoLocation: {
				lat,
				lng,
			},
		});
		const saved = await item.save();
		if (saved) {
			addActivity({
				user: req.user._id,
				listing: saved._id,
				type: 'listing',
				text: 'added a new listing: ',
			});
		}
		return res.status(201).json(saved);
	} catch (e) {
		console.log(e.message);
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default addListing;
