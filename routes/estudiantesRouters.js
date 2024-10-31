const express = require('express');

//instanciamos solamente el segmento de gestión de rutas
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController.js');

//get estudiantes
router.get('/', estudiantesController.consultar);

//post estudiantes
router.post('/', estudiantesController.ingresar);

// path --> id ( cualquir ruta que pase por id)
router.route('/:id')
    //get 1 estudiante
    .get(estudiantesController.consultarDetalle)
    //put estudiantes
    .put(estudiantesController.actualizar)
    //delete 1 estudiantes
    .delete(estudiantesController.borrar);


module.exports = router;


/*
NOTAS:
    Router tiene la función route que se implementa routes.route('/:id')
    y se le pasa la ruta que queremos especificar, para que no sea repetitiva
    y para que tenga mayor legibilidad y usamos chaining notation

*/