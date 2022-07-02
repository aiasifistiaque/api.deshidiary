import Listing from '../../models/listingModel.js';

const filteredSearch = async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;
	const { search, category, location, rating } = req.query;

	const query = {
		...(search &&
			search != 'undefined' && {
				name: { $regex: search, $options: 'i' },
			}),
		...(category && category != 'All' && { category: category }),
		...(location && location != 'All' && { division: location }),
		...(rating &&
			rating != 'undefined' && {
				rating: {
					$gte: Number(rating),
					$lt: Number(rating) + 1,
				},
			}),
	};

	// const query = req.query.location
	// 	? req.query.location == 'All'
	// 		? { name: { $regex: req.params.search, $options: 'i' } }
	// 		: {
	// 				name: { $regex: req.params.search, $options: 'i' },
	// 				division: req.query.location || 'Dhaka',
	// 		  }
	// 	: { name: { $regex: req.params.search, $options: 'i' } };

	try {
		const data = await Listing.find(query)
			.sort(sort)
			.limit(perpage)
			.skip(skip)
			.select('name images category tags city division street rating reviews')
			.populate('category');

		req.meta.docsInPage = data.length;
		req.meta.query = query;
		// req.meta.totalDocs = count;
		// req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		console.log(e.message);
		return res.status(500).json({ message: e.message });
	}
};

export default filteredSearch;
