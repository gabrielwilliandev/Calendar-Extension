// Define as rotas da api e exporta
const express = require('express');
const router = express.Router();
const controller = require('../controllers/UsuarioController');

router.get('/', controller.listarUsuarios);

module.exports = router



