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
			type: Number,
			required: true,
			min: 1,
			max: 5,
		},
		title: {
			type: String,
			required: true,
		},
		comments: { type: Number, default: 0 },
		date: {
			type: String,
		},
		recommend: {
			type: Number,
		},
		details: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const Rating = mongoose.model('Rating', schema);

export default Rating;
