import asyncHandler from 'express-async-handler';
import Notification from '../../models/notificationModel.js';

const addNotification = asyncHandler(async body => {
	try {
		const item = new Notification(body);
		await item.save();
	} catch (e) {
		console.log(e);
	}
});

export default addNotification;
