import mongoose from 'mongoose';

const schema = new mongoose.Schema(
	{
		name: { type: String, required: true, trim: true, lowercase: true },
		description: { type: String },
		image: { type: String },
	},
	{
		timestamps: true,
	}
);

const Badge = mongoose.model('Badge', schema);

export default Badge;
