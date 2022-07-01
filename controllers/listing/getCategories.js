import Category from '../../models/categoriesModel.js';

const getCategories = async (req, res) => {
	try {
		const data = await Category.find();

		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getCategories;
