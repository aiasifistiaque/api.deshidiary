import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		listing: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Listing',
		},
		rating: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Rating',
		},
		type: {
			type: String,
			required: true,
		},

		text: { type: String, required: true },

		images: [],
	},
	{
		timestamps: true,
	}
);

const Activity = mongoose.model('Activity', schema);

export default Activity;
