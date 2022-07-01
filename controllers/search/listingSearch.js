import Listing from '../../models/listingModel.js';

const listingSearch = async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	const query = req.query.location
		? req.query.location == 'All'
			? { name: { $regex: req.params.search, $options: 'i' } }
			: {
					name: { $regex: req.params.search, $options: 'i' },
					division: req.query.location || 'Dhaka',
			  }
		: { name: { $regex: req.params.search, $options: 'i' } };

	try {
		const data = await Listing.find(query)
			.sort('name')
			.limit(6)
			.skip(skip)
			.select('name images category tags city division street rating')
			.populate('category');

		req.meta.docsInPage = data.length;
		// req.meta.totalDocs = count;
		// req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default listingSearch;
