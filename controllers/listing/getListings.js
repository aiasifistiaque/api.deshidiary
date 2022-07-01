import Listing from '../../models/listingModel.js';

const getListings = async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	try {
		const data = await Listing.find()
			.sort(sort)
			.limit(perpage)
			.skip(skip)
			.populate('category');
		const count = await Listing.count();

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getListings;
