import express from 'express';
import { admin, protect } from '../../middleware/auth.js';
import { sort } from '../../middleware/sort.js';
import Category from '../../models/categoriesModel.js';
import Joi from 'joi';

const addCategory = async (req, res) => {
	const { name, description, image } = req.body;

	// const { error } = validate(req.body);
	// if (error) return res.status(400).send({ message: error.details[0].message });

	try {
		const exists = await Category.findOne({ name: name.toLowerCase() });
		if (exists)
			return res.status(400).send({ message: 'Category Already Exists' });
		const data = new Category({
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

function validate(data) {
	const schema = Joi.object({
		name: Joi.string().min(3).max(255).required().messages({
			'any.required': 'Name is required',
			'string.min': 'Category name too short',
		}),
	});
	return schema.validate(data);
}

const editCategory = async (req, res) => {
	const { name, description, image, id } = req.body;

	// const { error } = validate(req.body);
	// if (error) return res.status(400).send({ message: error.details[0].message });

	try {
		const exists = await Category.findById(id);
		if (!exists)
			return res.status(400).send({ message: 'Category Does Not Exist' });

		exists.image = image;
		exists.name = name;

		const saved = await exists.save();
		return res.status(200).json(saved);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

const getAllCategories = async (req, res) => {
	const { sort, page, perpage, skip } = req.meta;

	try {
		const data = await Category.find().sort(sort).limit(perpage).skip(skip);
		const count = await Category.count();

		req.meta.docsInPage = data.length;
		req.meta.totalDocs = count;
		req.meta.totalPages = Math.ceil(count / perpage);

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

const router = express.Router();
router.get('/', protect, admin, sort, getAllCategories);
router.post('/', protect, admin, addCategory);
router.put('/', protect, admin, editCategory);

export default router;
