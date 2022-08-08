import asyncHandler from 'express-async-handler';
import addActivity from '../activity/addActivity.js';
import Photo from '../../models/photoModel.js';

const addPhoto = asyncHandler(async (req, res) => {
	const { image, listing } = req.body;
	try {
		const item = await Photo({
			user: req.user._id,
			image,
			listing,
			src: image,
		});
		const saved = await item.save();

		if (saved) {
			addActivity({
				user: req.user._id,
				listing: listing,
				photo: saved._id,
				text: 'posted a new picture',
				type: 'photo',
			});
		}

		res.status(201).json(saved);
	} catch (e) {
		return res.status(500).json({ status: 'error', message: e.message });
	}
});

export default addPhoto;
