//llamando la conexión de la base de datos
const db = require('../database/conexion.js');

//Se van a implementar los controladores usando el paradigma de programación orientada a objetos
class EstudiantesController {
    constructor () {

    }
    //métodos de Estudiantes Controller

    //GET general
    consultar(req, res) {
        try {
            db.query(`SELECT * FROM estudiantes;`, 
                (err, rows) => {
                    if(err) {
                        return res.status(400).send(err.message);
                    }
                    res.status(200).json(rows);
                    console.log(`Metodo consultar ejecución satisfactoria`);
                });
            
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    //GET particular
    consultarDetalle(req, res) {
        //extraer los parametros necesarios
        const {id} = req.params;
        try {
            //query tiene los siguientes parametros (sqlString, callback) / la segunda forma  es querty(sqString, values, callback), la tercer forma es query(options, callback)
            db.query(`SELECT * FROM estudiantes WHERE id = ?`,[id], (err, rows) => {
                if (err) {
                    return res.status(400).send(err.message);
                }
                res.status(200).json({id: rows.id, payload: rows});
                console.log(`Metodo consultarDetalle ejecución satisfactoria`);
            });
        } catch {
            res.status(500).send(err.message);
        }
    }
    //POST
    ingresar(req, res) {
        try {
            //extraemos los parametros que necesitamos para nuestro payload de estudiante
            const {dni, nombre, apellido, email} = req.body;
            //llamando a la base de datos
            //query permite el proceso de ejecución de operaciones por ejemplo insertar
            // Se le agrega NULL al campo númerico y signos de interrogación en los campos para que db query haga el parser es decir recibir ese dato y transformarlo en el valor que sea necesario
            //El query es una promesa que el manejador espera cumplir
            db.query(`INSERT INTO estudiantes
                (id, dni, nombre, apellido, email)
                VALUES(NULL, ?, ?, ?, ?);`, 
                [dni, nombre, apellido, email], (err, rows) => { //primero es el error y luego la data (rows)
                    //validando si hay error
                    if(err) {
                        return res.status(400).send(err.message);
                    }
                    res.status(201).json({id: rows.insertId, payload: rows})
                    console.log(`Método ingresar ejecución satisfactoria`);
                }); // se le pasa de pues de los parametros el error y el resultado para manejarlos

        } catch (err) {
            //mandando el error con código
            // console.log(err);
            res.status(500).send(err.message); 
        }
    }
    //PUT
    actualizar(req, res) {
        // res.json({msg: 'Actualización de estudiante'});
        const id = req.params;
    
        try {
            const {dni, nombre, apellido, email} = req.body;
            console.log(req.body);
            db.query( `UPDATE estudiantes
                       SET dni=?, nombre=?, apellido=?, email=?
                       WHERE id=?;`, 
            [dni, nombre, apellido, email, id], (err, rows) => {
                //validar si hay error
                if(err) {
                    return res.status(400).send(err.message);
                }
                //si todo bien
                res.status(201).json(rows);
                console.log(rows);
                console.log(`Método actualizar de estudiantes - ejecución satisfactoria`);
            });
        } catch (err) {
            res.status(500).send(err.message);
        }

    }
    //DELETE
    borrar(req, res) {
        const {id} = req.params;
        try {
            db.query( `DELETE FROM estudiantes WHERE id = ?;`, 
            [id], (err, rows) => {
                //validar si hay error
                if(err) {
                    return res.status(400).send(err.message);
                }
                //si todo bien
                res.status(204);
                console.log(`Método borrar desde estudiantes ejecución satisfactoria`);
            });


        }
        catch (err) {
            res.status(500).send(err.message);
        }
    };
}

module.exports = new EstudiantesController();


/*
NOTAS: Todos los metodos llevan 2 parámetros request y response
al principio la definición son métodos asíncronos pero 
se espera que se conviertan en métodos asíncronos

Express comunica los datos de 4 maneras 
    + en el body (que es el payload que se envía en json)
    + como params en las rutas
    + con query string, con pares de clave=valor
    + enviarlos por el header, generalmente eso contiene formatos de autenticación o parámetros de definición de tipo de datos, no se mandan datos como tal

    */