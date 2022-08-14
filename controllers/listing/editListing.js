import asyncHandler from 'express-async-handler';
import Listing from '../../models/listingModel.js';
import addActivity from '../activity/addActivity.js';

const editListing = asyncHandler(async (req, res) => {
	const {
		id,
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
		const item = await Listing.findById(id);
		if (!item) {
			return res
				.status(404)
				.json({ status: 'error', message: 'Item not found' });
		}

		item.name = name;
		item.description = description;
		item.city = city;
		item.division = division;
		item.street = street;
		item.email = email;
		item.website = website;
		item.phone = phone;
		item.tags = tags;
		item.services = services;
		item.features = features;
		item.paymentOptions = paymentOptions;
		item.geoLocation = { lat, lng };
		item.postCode = postCode;

		const saved = await item.save();
		return res.status(200).json(saved);
	} catch (e) {
		console.log(e.message);
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default editListing;
