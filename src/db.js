/**
 * Autor: Arroyo Chávez Brayan Alberto
 * Fecha: February 22, 2021
 */

const connection = require('./connection')

/**
 * Función para insertar registros en la base de datos
 */
function insert(){
    var sql = connection.query('INSERT INTO ?? SET ?', [columns, table], function (error, results, fields) {
        if (error) throw error;   
    });

    connection.con.query(sql, function (err, result) {
        if (err) throw err;
    });
}
/**
 * Función para realizar consultas a la base de datos
 */
function select(columns, table, condition){
    if (arguments.length = 3){
        var sql = connection.query('SELECT ?? FROM ?? WHERE id = ?', [columns, table, condition], function (error, results, fields) {
            if (error) throw error;   
        });
    }else{
        var sql = connection.query('SELECT ?? FROM ??', [columns, table], function (error, results, fields) {
            if (error) throw error;   
        });
    }
    connection.con.query(sql, function (err, result) {
        if (err) throw err;
    });
}