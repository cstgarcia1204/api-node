const express = require('express');
const cors = require('cors');

// llamando a la instancia de express
const app = express();
const estudiantesRoutes = require('./routes/estudiantesRouters');
const profesoresRoutes = require('./routes/profesoresRouters');
const crursosRoutes = require('./routes/cursosRouters');

const puerto = 3020;

//middleware para conseguir el body en el formato json
app.use(express.json());
//middleware para usar cors
app.use(cors());

//metodo GET / parametros ruta y funcion para procesar req
app.get('/', (req, res) => {
    res.send(`Servidor en escucha en el puerto ${puerto}`);
});

//Aqui en este middleware use se define el nombre de estudiantesRouters
app.use('/estudiantes', estudiantesRoutes);

//middleware use para definir nombre de profesores
app.use('/profesores', profesoresRoutes);

//middleware use para definir noombre de cursos
app.use('/cursos', crursosRoutes);

//en escucha del puerto determinado
app.listen(puerto, () => {
    console.log('Servidor activo');
});





/*
NOTAS:

    + En controllers está toda la lógica de la API
    + En views está la definición de las rutas
    + En models está la definición de los datos

    Rutas estáticas:
    Una vez que se tienen los archivos en cada carpeta models, controllers, views
    nos vamos al archivo de rutas para empezar a definir

    Rutas dinámicas: son rutas que van a cambiar : Estas consultas se dan incluido detalles por ejemeplo
    Consultar un estudiante por detalle  o para el caso de put, patch, delete


*/