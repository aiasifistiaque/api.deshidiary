import express from 'express';
import seedUserPoints from '../../controllers/user/seedUserPoints.js';
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

const getUserById = async (req, res) => {
	try {
		const data = await User.findById(req.params.id).select('-password');
		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

const searchUsers = async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	try {
		const data = await User.find({
			name: { $regex: req.params.id, $options: 'i' },
		})
			.select('-password')
			.sort(sort)
			.limit(10);
		const count = await User.count({
			name: { $regex: req.params.id, $options: 'i' },
		});

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
router.get('/:id', protect, admin, getUserById);
router.post('/seed', protect, admin, seedUserPoints);
router.get('/search/:id', protect, admin, sort, searchUsers);

export default router;
