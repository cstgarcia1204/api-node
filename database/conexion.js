const mysql = require('mysql2');
//creando la conexión a la bd
//create createConnection recibe un objeto de configuración
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Balundre87#',
        database: 'cursos'
    }
);

//Una vez teniendo las configuraciones entonces se llama a la funcion conectar
//como es un proceso para saber si se sconecto o no, necesita un callback
db.connect((err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log('Base de datos conectada');
});

//una vez hecha la conexión se tiene solamente de manera aislada y hay que exportar la conexión en este caso solamente db
module.exports = db;

/*
NOTAS aqui va tener es una definición simple de la conexión con require

Una vez que se tiene la conexión y se ha exportado se tiene que incorporar la base de datos a los Controladores en este caso a todos los controladores para tener acceso a la base de datos



*/