import Listing from '../../models/listingModel.js';

const getCategoryListingCount = async (req, res) => {
	try {
		const count = await Listing.count({ category: req.params.id });

		return res.status(200).json({ count: count });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getCategoryListingCount;
