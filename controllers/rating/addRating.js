import asyncHandler from 'express-async-handler';
import Rating from '../../models/ratingModel.js';
import Listing from '../../models/listingModel.js';
import addActivity from '../activity/addActivity.js';

const addRating = asyncHandler(async (req, res) => {
	const { rating, recommend, title, date, details, listing } = req.body;
	try {
		const item = await Rating({
			user: req.user._id,
			rating: parseInt(rating),
			recommend: parseInt(recommend),
			title,
			date,
			details,
			listing,
		});
		const saved = await item.save();

		const data = await Listing.findById(listing);

		console.log(data);

		const dataReviews = data?.reviews ? data.reviews : 0;
		const dataRating = data?.rating ? data.rating : 0;

		const totalValue = dataReviews == 0 ? 0 : dataReviews * dataRating;
		const newValue = totalValue + parseInt(rating);
		data.rating = newValue / (dataReviews + 1);
		data.reviews = dataReviews + 1;

		if (rating == 1) {
			data.oneStar = data.oneStar + 1;
		} else if (rating == 2) {
			data.twoStar = data.twoStar + 1;
		} else if (rating == 3) {
			data.threeStar = data.threeStar + 1;
		} else if (rating == 4) {
			data.fourStar = data.fourStar + 1;
		} else if (rating == 5) {
			data.fiveStar = data.fiveStar + 1;
		}

		await data.save();

		if (saved) {
			addActivity({
				user: req.user._id,
				listing: listing,
				rating: saved._id,
				text: 'posted a review on',
				type: 'review',
			});
		}

		res.status(201).json(saved);
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default addRating;
