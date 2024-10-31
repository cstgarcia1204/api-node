const express = require('express');

//No toda la aplicación sino solo el segmento de gestión de rutas
const router = express.Router();
const profesoresController = require('../controllers/profesoresController.js');

//Consulta en general
router.get('/', profesoresController.consultar);
//post
router.post('/', profesoresController.ingresar);
// path --> cualquiera que pase por id
router.route('/:id')
    .get(profesoresController.consultarDetalle)
    .put(profesoresController.actualizar)
    .delete(profesoresController.borrar);

module.exports = router;
