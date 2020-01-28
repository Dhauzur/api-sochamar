const reportsService = require('../services/reports');

const reportsController = {
    getAll(req, res) {
        reportsService.getAll(res);
    },
    create(req, res) {
        reportsService.createOne(req, res);
    },
    deleteAll(req, res) {
        reportsService.deleteAll(res);
    },
};

module.exports = Object.freeze(reportsController);
