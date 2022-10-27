import Listing from '../../models/listingModel.js';

const listingSearch = async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	const query = req.query.location
		? req.query.location == 'All'
			? {
					$or: [
						{ name: { $regex: req.params.search, $options: 'i' } },
						{ tags: { $in: [req.params.search] } },
					],
			  }
			: {
					$or: [
						{ name: { $regex: req.params.search, $options: 'i' } },
						{ tags: { $in: [req.params.search] } },
					],
					division: req.query.location || 'Dhaka',
			  }
		: {
				$or: [
					{ name: { $regex: req.params.search, $options: 'i' } },
					{ tags: { $in: [req.params.search] } },
				],
		  };

	try {
		const data = await Listing.find(query)
			.sort('name')
			.limit(6)
			.skip(skip)
			.select('name images category tags city division street rating')
			.populate('category');

		req.meta.docsInPage = data.length;

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default listingSearch;
