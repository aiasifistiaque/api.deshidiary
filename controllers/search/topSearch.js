import Listing from '../../models/listingModel.js';

const topSearch = async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	const query = req.query.location
		? req.query.location == 'All'
			? {}
			: { division: req.query.location }
		: {};

	try {
		const data = await Listing.find(query)
			.sort('name')
			.limit(5)
			.select('name images  city division  rating');

		req.meta.docsInPage = data.length;
		// req.meta.totalDocs = count;
		// req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default topSearch;
