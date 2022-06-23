import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_CONNECTION_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log(`Mongo DB connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(`error: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
