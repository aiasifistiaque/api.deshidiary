import Activity from '../../models/activitiesModel.js';

const getActivities = async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	try {
		const data = await Activity.find()
			.sort(sort)
			.limit(perpage)
			.skip(skip)
			.populate([
				{ path: 'user', select: 'name image' },
				{ path: 'listing', select: 'name images' },
				{ path: 'rating' },
			]);
		const count = await Activity.count();

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getActivities;
