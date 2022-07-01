import Category from '../../models/categoriesModel.js';

const getCategoriesByName = async (req, res) => {
	try {
		const data = await Category.findOne({ name: req.params.name });

		if (!data) return res.status(404).send({ message: 'Category Not Found' });

		return res.status(200).json(data);
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getCategoriesByName;
