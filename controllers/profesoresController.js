//llamando la conexión de la base de datos
const db = require('../database/conexion.js');

class ProfesoresController {

    constructor() {}

    //Métodos de profesores controller

    //GET general
    consultar (req, res) {
        // Antigua manera:
        // res.json({msg: 'Consulta profesores desde clase'});
        try {
            db.query(`SELECT * FROM profesores;`, 
                (err, rows) => {
                    if(err) {
                        return res.status(400).send(err.message);
                    }
                    res.status(200).json(rows);
                    console.log(`Metodo consultar desde profesores - ejecución satisfactoria`);
                });
            
        } catch (err) {
            res.status(500).send(err.message);
        }
    };
    //GET de 1 solo profesor
    consultarDetalle (req, res) {
        //Con destructuración sacamos la parte de id
        const {id} = req.params;
        // Primer workaround
        // res.json({msg: `Consulta Detalle de 1 profesor desde clase con id ${id}`})
        try {
            //query tiene los siguientes parametros (sqlString, callback) / la segunda forma  es querty(sqString, values, callback), la tercer forma es query(options, callback)
            db.query(`SELECT * FROM profesores WHERE id = ?`,[id], (err, rows) => {
                if (err) {
                    return res.status(400).send(err.message);
                }
                res.status(200).json({id: rows.id, payload: rows});
                console.log(`Metodo consultarDetalle desde profesores - ejecución satisfactoria`);
            });
        } catch {
            res.status(500).send(err.message);
        }
    }
    //POST 
    ingresar(req, res) {
        // Primer workaround
        // res.json({msg: 'Ingreso profesores desde clase'});
        try {
            //extraemos los parametros que necesitamos para nuestro payload de estudiante
            const {dni, nombre, apellido, email, profesion, telefono} = req.body;
            //llamando a la base de datos
            //query permite el proceso de ejecución de operaciones por ejemplo insertar
            // Se le agrega NULL al campo númerico y signos de interrogación en los campos para que db query haga el parser es decir recibir ese dato y transformarlo en el valor que sea necesario
            //El query es una promesa que el manejador espera cumplir
            db.query(`INSERT INTO profesores
                (id, dni, nombre, apellido, email, profesion, telefono)
                VALUES(NULL, ?, ?, ?, ?, ?, ?);`, 
                [dni, nombre, apellido, email, profesion, telefono], (err, rows) => { //primero es el error y luego la data (rows)
                    //validando si hay error
                    if(err) {
                        return res.status(400).send(err.message);
                    }
                    res.status(201).json({id: rows.insertId, payload: rows})
                    console.log(`Método ingresar desde profesores - ejecución satisfactoria`);
                }); // se le pasa de pues de los parametros el error y el resultado para manejarlos

        } catch (err) {
            //mandando el error con código
            // console.log(err);
            res.status(500).send(err.message); 
        }

    }
    //PUT
    actualizar(req, res) {
        // Manera antigua
        // res.json({msg: 'Actualización de 1 profesor desde clase'})
        const id = req.params;
    
        try {
            const {dni, nombre, apellido, email, profesion, telefono} = req.body;
            console.log(req.body);
            db.query( `UPDATE profesores
                       SET dni=?, nombre=?, apellido=?, email=?, profesion=?, telefono=?
                       WHERE id=?;`, 
            [dni, nombre, apellido, email, profesion, telefono, id], (err, rows) => {
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
        //Profesores borrar primer workaround
        // res.json({msg: 'Borrado de profesor desde clase'})
        const {id} = req.params;
        try {
            db.query( `DELETE FROM profesores WHERE id = ?;`, 
            [id], (err, rows) => {
                //validar si hay error
                if(err) {
                    return res.status(400).send(err.message);
                }
                //si todo bien
                res.status(201).json(rows);
                console.log(`Método borrar desde profesores -  ejecución satisfactoria`);
            });


        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }

}

module.exports = new ProfesoresController();