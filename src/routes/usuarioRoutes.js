// Define as rotas da api e exporta
const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

// router.get('/', UsuarioController.listarUsuarios);

router.post('/login', UsuarioController.login);

router.post('/cadastrar', UsuarioController.cadastrar);

module.exports = router



