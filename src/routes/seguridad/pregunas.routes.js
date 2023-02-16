const { Router } = require('express');
const { check, body } = require('express-validator');
const { cargarPreguntas, cargarPregunta, crearPregunta, editarPregunta, eliminarPregunta } = require('../../controllers/seguridad/preguntas.controller');
const { validarCampos } = require('../../functions/validarCampos');

// Exportar router para el servidor
const router = Router();

// APIs !!!
router.get('/', cargarPreguntas);
router.get('/:idPregunta', cargarPregunta);
router.post('/create/pregunta', crearPregunta);
router.put('/put/:idPregunta',[
    check('idPregunta', 'La pregunta es obligatoria').not().isEmpty(),
    check('idPregunta', 'La pregunta debe estar solo en mayúsculas').isUppercase(),
    validarCampos
], editarPregunta);
router.delete('/delete/:idPregunta', eliminarPregunta);

module.exports = router;