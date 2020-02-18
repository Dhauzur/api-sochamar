import configService from '../services/config';

const configController = {
	getConfig(req, res) {
		configService.getConfig(res);
	},
};

export default Object.freeze(configController);
