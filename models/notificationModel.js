import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		from: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		target: {
			type: { type: String, required: true, lowercase: true },
			id: { type: String, required: true },
		},
		listing: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Listing',
		},
		review: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Review',
		},

		text: { type: String, required: true },

		title: {
			type: String,
			required: true,
			trim: true,
		},

		details: {
			type: String,
			required: true,
			trim: true,
		},
		seen: { type: Boolean, required: true, default: false },

		images: [],
	},
	{
		timestamps: true,
	}
);

const Notification = mongoose.model('Notification', schema);

export default Notification;
