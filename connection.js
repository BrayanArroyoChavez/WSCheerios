/**
 * Autor: Arroyo Chávez Brayan Alberto
 * Fecha: February 22, 2021
 */

const mysql = require('mysql');

function connection(){
    const connection = mysql.createConnection({
        host: 'localhost',
        database: 'criptomonedas',
        user: 'root',
        passworld: ''
    });  
    
    connection.connect(function(error){
        if(error){
            throw error;
        }else{
            console.log("conectado")
        }
    });
    
    exports.con = connection;
}

connection();