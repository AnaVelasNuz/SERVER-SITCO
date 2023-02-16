const { Router } = require('express');
const { check, body } = require('express-validator');
const { cargarUsuarios} = require('../../controllers/seguridad/usuarios.controller');
const { validarCampos } = require('../../functions/validarCampos');

// Exportar router para el servidor
const router = Router();

// APIs !!!
router.get('/', cargarUsuarios);


module.exports = router;