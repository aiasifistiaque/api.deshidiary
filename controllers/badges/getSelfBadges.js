import Assign from '../../models/assignModel.js';

const getSelfBadges = async (req, res) => {
	try {
		const data = await Assign.find({ user: req.user._id }).populate([
			{
				path: 'user',
				select: 'name email image',
			},
			{
				path: 'badge',
			},
		]);

		req.meta.totalDocs = data.length;
		return res.status(200).json({ ...req.meta, doc: data });
	} catch (e) {
		return res.status(500).json({ message: e.message });
	}
};

export default getSelfBadges;
