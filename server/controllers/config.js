const configService = require('../services/config');

const configController = {
    getConfig(req, res) {
        configService.getConfig(res)
    },
};

module.exports = Object.freeze(configController);
