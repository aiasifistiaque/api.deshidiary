import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		images: [],
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
		},

		description: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
		},
		phone: {
			type: String,
			trim: true,
		},
		extraPhone: {
			type: String,
			trim: true,
		},
		website: {
			type: String,
			trim: true,
		},
		services: [{ type: String, trim: true }],
		features: [{ type: String, trim: true }],
		tags: [{ type: String, trim: true }],
		paymentOptions: [{ type: String, trim: true }],

		address: { type: String, trim: true },
		city: { type: String, trim: true },
		division: { type: String, trim: true },
		area: { type: String, trim: true },
		street: { type: String, trim: true },
		postCode: { type: Number, trim: true },
		rating: { type: Number, required: true, default: 0 },
		reviews: { type: Number, required: true, default: 0 },
		additionalAddress: { type: String, trum: true },

		oneStar: { type: Number, required: true, default: 0 },
		twoStar: { type: Number, required: true, default: 0 },
		threeStar: { type: Number, required: true, default: 0 },
		fourStar: { type: Number, required: true, default: 0 },
		fiveStar: { type: Number, required: true, default: 0 },

		note: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

const Listing = mongoose.model('Listing', schema);

export default Listing;
