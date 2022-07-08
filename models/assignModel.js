import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		badge: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Badge',
		},
		assignedBy: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
);

const Assign = mongoose.model('Assign', schema);

export default Assign;
