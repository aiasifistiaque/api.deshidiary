import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		listingOne: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Rating',
		},
		listingTwo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Rating',
		},
		listingThree: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Rating',
		},
	},
	{
		timestamps: true,
	}
);

const Feature = mongoose.model('Feature', schema);

export default Feature;
