import moment from 'moment';

export function sort(req, res, next) {
	const sort = req.query.sort ? req.query.sort : '-createdAt';
	const page = req.query.page
		? req.query.page > 0
			? parseInt(req.query.page)
			: 1
		: 1;
	const perpage = req.query.perpage ? parseInt(req.query.perpage) : 10;

	req.sort = sort;
	req.page = page;
	req.perpage = perpage;
	req.skip = (page - 1) * perpage;
	req.meta = {
		sort,
		page,
		perpage,
		skip: (page - 1) * perpage,
		date: req.query.date,
	};
	req.date = getDate(req.query.date);
	req.meta.query = { store: req.store, ...req.date };
	next();
}

const getDate = query => {
	if (query == 'today' || query == 'daily') {
		return {
			createdAt: {
				$gte: moment().startOf('day').toDate(),
				$lte: moment().endOf('day').toDate(),
			},
		};
	} else if (query == 'weekly') {
		return {
			createdAt: {
				$gte: moment().startOf('week').toDate(),
				$lte: moment().endOf('week').toDate(),
			},
		};
	} else if (query == 'monthly') {
		return {
			createdAt: {
				$gte: moment().startOf('month').toDate(),
				$lte: moment().endOf('month').toDate(),
			},
		};
	} else if (query == 'yearly') {
		return {
			createdAt: {
				$gte: moment().startOf('year').toDate(),
				$lte: moment().endOf('year').toDate(),
			},
		};
	}
	return {};
};
