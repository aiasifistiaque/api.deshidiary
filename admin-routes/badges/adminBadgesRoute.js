import express from 'express';
import { admin, protect } from '../../middleware/auth.js';
import { sort } from '../../middleware/sort.js';
import Category from '../../models/categoriesModel.js';
import Joi from 'joi';
import Badge from '../../models/badgesModel.js';

const addBadges = async (req, res) => {
	const { name, description, image } = req.body;

	// const { error } = validate(req.body);
	// if (error) return res.status(400).send({ message: error.details[0].message });

	try {
		const exists = await Badge.findOne({ name: name.toLowerCase() });
		if (exists)
			return res.status(400).send({ message: 'Badge Already Exists' });
		const data = new Badge({
			name,
			description,
			image: image?.src && image.src,
		});

		const saved = await data.save();
		return res.status(201).json(saved);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

const getAllBadges = async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	try {
		const data = await Badge.find().sort(sort).limit(perpage).skip(skip);
		const count = await Badge.count();

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

const router = express.Router();
router.get('/', protect, admin, sort, getAllBadges);
router.post('/', protect, admin, addBadges);

export default router;
