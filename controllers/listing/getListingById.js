import Listing from '../../models/listingModel.js';

const getListingById = async (req, res) => {
	try {
		const data = await Listing.findById(req.params.id).populate('category');

		if (!data) return res.status(500).json({ message: 'Item Not Found' });

		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getListingById;
