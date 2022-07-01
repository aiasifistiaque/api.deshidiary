import asyncHandler from 'express-async-handler';
import Activity from '../../models/activitiesModel.js';

const addActivity = asyncHandler(async body => {
	try {
		const activity = new Activity(body);
		await activity.save();
	} catch (e) {
		console.log(e);
	}
});

export default addActivity;
