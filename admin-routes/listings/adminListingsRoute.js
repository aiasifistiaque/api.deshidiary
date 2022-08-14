import express from 'express';
import editListing from '../../controllers/listing/editListing.js';
import getListingById from '../../controllers/listing/getListingById.js';
import getListings from '../../controllers/listing/getListings.js';
import { admin, protect } from '../../middleware/auth.js';
import { sort } from '../../middleware/sort.js';
import Listing from '../../models/listingModel.js';

const searchListing = async (req, res) => {
	try {
		const data = await Listing.find({
			name: { $regex: req.params.id, $options: 'i' },
		}).limit(10);

		return res.status(200).json({ doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

const router = express.Router();
router.get('/', protect, admin, sort, getListings);
router.put('/', protect, admin, editListing);
router.get('/:id', getListingById);
router.get('/search/:id', protect, admin, searchListing);

export default router;
