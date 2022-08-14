import express from 'express';
import Category from '../../models/categoriesModel.js';
import Listing from '../../models/listingModel.js';
import Rating from '../../models/ratingModel.js';
import User from '../../models/userModel.js';

const getKpi = async (req, res) => {
	try {
		const listings = await Listing.count();
		const users = await User.count();
		const reviews = await Rating.count();
		const categories = await Category.count();

		return res.status(200).json([
			{ title: 'Listings', value: listings },
			{ title: 'Users', value: users },
			{ title: 'Reviews', value: reviews },
			{ title: 'Categories', value: categories },
		]);
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
};

const router = express.Router();
router.get('/', getKpi);

export default router;
