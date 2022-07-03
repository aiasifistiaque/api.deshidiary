import mongoose from 'mongoose';

const schema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		rating: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Rating',
		},

		details: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

const Comment = mongoose.model('Comment', schema);

export default Comment;
