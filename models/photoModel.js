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

		image: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Photo = mongoose.model('Photo', schema);

export default Photo;
