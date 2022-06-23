import express from 'express';
import { admin, protect } from '../../middleware/auth.js';
import { sort } from '../../middleware/sort.js';
import User from '../../models/userModel.js';

const getAllUsers = async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	try {
		const data = await User.find()
			.select('-password')
			.sort(sort)
			.limit(perpage)
			.skip(skip);
		const count = await User.count();

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

const router = express.Router();
router.get('/', protect, admin, sort, getAllUsers);

export default router;
