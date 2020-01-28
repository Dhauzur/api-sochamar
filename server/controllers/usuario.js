const usuariosService = require('../services/usuarios');

const usuariosController = {
    getAll(req, res) {
        usuariosService.getAll(res)
    },
    createOne(req, res) {
        usuariosService.createOne(req, res)
    },
    deleteAll(req, res) {
        usuariosService.deleteAll(res)
    },
    editOne(req, res) {
        usuariosService.editOne(req, res)
    },
    deleteOne(req, res) {
        usuariosService.deleteOne(req, res)
    },
};

module.exports = Object.freeze(usuariosController);
