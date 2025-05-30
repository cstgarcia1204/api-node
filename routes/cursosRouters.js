const express = require('express');

//instanciamos solamente el segmento de gestión de rutas
const router = express.Router();
const cursosController = require('../controllers/cursosController.js');

//get cursos
router.get('/', cursosController.consultar);

//post cursos
router.post('/', cursosController.ingresar);
router.post('/registraEstudiante', cursosController.asociarEstudiante);


// path --> id ( cualquir ruta que pase por id)
router.route('/:id')
    //get 1 curso
    .get(cursosController.consultarDetalle)
    //put cursos
    .put(cursosController.actualizar)
    //delete 1 curso
    .delete(cursosController.borrar);


module.exports = router;


/*
NOTAS:
    Router tiene la función route que se implementa routes.route('/:id')
    y se le pasa la ruta que queremos especificar, para que no sea repetitiva
    y para que tenga mayor legibilidad y usamos chaining notation

*/