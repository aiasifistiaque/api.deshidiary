import Assign from '../../models/assignModel.js';

const getAssignedBadges = async (req, res) => {
	const query = req.params.id == 'self' ? req.user._id : req.params.id;

	try {
		const data = await Assign.find({ user: query }).populate([
			{
				path: 'user',
				select: 'name email',
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

export default getAssignedBadges;
