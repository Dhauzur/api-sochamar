const moment = require('moment');
const getConfig = res => {
	res.json({
		stack: true,
		editable: true,
		start: moment('2019-01-01'),
		end: moment('2019-01-07'),
		zoomMin: 259200000,
		zoomMax: 5184000000,
		hiddenDates: {
			start: '2019-01-01 12:00:00',
			end: '2019-01-01 11:00:00',
			repeat: 'daily',
		},
	});
};

const configService = {
	getConfig,
};

module.exports = Object.freeze(configService);
