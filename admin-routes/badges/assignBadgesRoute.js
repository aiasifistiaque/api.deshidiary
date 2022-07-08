import express from 'express';
import getAssignedBadges from '../../controllers/badges/getAssignedBadges.js';
import { admin, protect } from '../../middleware/auth.js';
import { sort } from '../../middleware/sort.js';
import Assign from '../../models/assignModel.js';

const assignBadge = async (req, res) => {
	const { user, badge } = req.body;

	try {
		const exists = await Assign.findOne({ user: user, badge: badge });
		if (exists)
			return res
				.status(400)
				.send({ message: 'Badge Already Assigned to User' });

		const data = new Assign({
			user,
			badge,
			assignedBy: req.user._id,
		});

		const saved = await data.save();
		return res.status(201).json(saved);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

const router = express.Router();
router.get('/:id', protect, sort, getAssignedBadges);
router.post('/', protect, admin, assignBadge);

export default router;
