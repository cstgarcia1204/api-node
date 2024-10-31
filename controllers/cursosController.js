//llamando la conexión de la base de datos
const db = require('../database/conexion.js');


class CursosController {

    constructor() {
    }

    //GET general
    consultar(req, res) {
        //primer workaround de cursos
        // res.json({msg: 'Consulta cursos desde clase'});
        try {
            db.query(`SELECT * FROM cursos;`, 
                (err, rows) => {
                    if(err) {
                        return res.status(400).send(err.message);
                    }
                    res.status(200).json({payload: rows});
                    console.log(`Metodo consultar desde cursos - ejecución satisfactoria`);
                });
            
        } catch (err) {
            res.status(500).send(err.message);
            
        }
    }
    //GET particular
    consultarDetalle(req, res) {
        //Forma antigua
        // res.json({msg: 'Consulta detalle de 1 curso desde clase'});

        const {id} = req.params;
            try {
                db.query(
                    `SELECT * FROM cursos WHERE id = ?;`,
                     [id], (err, rows) => {
                    if (err) {
                        return res.status(400).send(err.message);
                    }
                    res.status(200).json({payload: rows});
                    console.log('Método consultar detalle desde cursos - ejecución satisfactoria');
                })

            } catch (err) {
                res.status(500).send(err.message);                                
            }
    }
    //POST
    ingresar (req, res) {
        //primer workaround de cursos
        // res.json({msg: 'Ingreso de cursos desde clase'});
        try {
            //extraemos los parametros que necesitamos para nuestro payload de estudiante
            const {nombre, descripcion, profesor_id} = req.body;
            //llamando a la base de datos
            //query permite el proceso de ejecución de operaciones por ejemplo insertar
            // Se le agrega NULL al campo númerico y signos de interrogación en los campos para que db query haga el parser es decir recibir ese dato y transformarlo en el valor que sea necesario
            //El query es una promesa que el manejador espera cumplir
            db.query(`INSERT INTO cursos
                (id, nombre, descripcion, profesor_id)
                VALUES(NULL, ?, ?, ?);`, 
                [nombre, descripcion, profesor_id], (err, rows) => { //primero es el error y luego la data (rows)
                    //validando si hay error
                    if(err) {
                        return res.status(400).send(err.message);
                    }
                    res.status(201).json({id: rows.insertId, payload: rows})
                    console.log(`Método ingresar desde cursos - ejecución satisfactoria`);
                }); // se le pasa de pues de los parametros el error y el resultado para manejarlos

        } catch (err) {
            //mandando el error con código
            // console.log(err);
            res.status(500).send(err.message); 
        }
    }

    asociarEstudiante (req, res) {
        try {
            //extraemos los parametros que necesitamos para nuestro payload de estudiante
            const {curso_id, estudiante_id} = req.body;
            //llamando a la base de datos
            //query permite el proceso de ejecución de operaciones por ejemplo insertar
            // Se le agrega NULL al campo númerico y signos de interrogación en los campos para que db query haga el parser es decir recibir ese dato y transformarlo en el valor que sea necesario
            //El query es una promesa que el manejador espera cumplir
            db.query(`INSERT INTO cursos_estudiantes
                (curso_id, estudiante_id)
                VALUES(?, ?);`, 
                [curso_id, estudiante_id], (err, rows) => { //primero es el error y luego la data (rows)
                    //validando si hay error
                    if(err) {
                        return res.status(400).send(err.message);
                    }
                    res.status(201).json({respuesta: 'Estudiante registrado con éxito'})
                    console.log(`Método asociar estudiante desde cursos - ejecución satisfactoria`);
                }); // se le pasa de pues de los parametros el error y el resultado para manejarlos

        } catch (err) {
            //mandando el error con código
            // console.log(err);
            res.status(500).send(err.message); 
        }
    }

    //PUT
    actualizar(req, res) {
        //Forma antigua
        // res.json({msg: 'Actualización de curso'});
        const id = req.params;
    
        try {
            const {dni, nombre,descripcion, profesor_id} = req.body;
            console.log(req.body);
            db.query( `UPDATE cursos
                       SET dni=?, nombre=?, descripcion=?, profesion_id=? WHERE id=?;`, 
            [dni, nombre, descripcion, profesor_id], (err, rows) => {
                //validar si hay error
                if(err) {
                    return res.status(400).send(err.message);
                }
                //si todo bien
                res.status(201).json(rows);
                console.log(rows);
                console.log(`Método actualizar de profesores - ejecución satisfactoria`);
            });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
    //DELETE
    borrar(req, res) {
        res.json({msg: 'Borrado de curso desde clase '});
    };


}

module.exports = new CursosController();