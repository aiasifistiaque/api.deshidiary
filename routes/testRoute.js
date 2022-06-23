import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
	return res
		.status(200)
		.json({ status: 'Success', message: 'Routes are running smoothly' });
});

export default router;
