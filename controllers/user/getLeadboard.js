import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';

const getLeadboard = asyncHandler(async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	try {
		let data = await User.find()
			.sort('-points')
			.limit(perpage)
			.skip(skip)
			.select('-password');

		const count = await User.count();

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default getLeadboard;
