"use strict";
/**
 * Autor: Arroyo Chávez Brayan Alberto
 * Fecha: February 22, 2021
 */

/**
 * + Se usa la libreria nodemailer para el envio de correo electronicos y nodemailer-express-handlebars para poder enviar archivos con contenido html, esto a través de un 
 * archivo con la extensión .handlebars.
 * + Se hace uso de path para trabajar rutas de archivos
 */
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars")
const path = require('path');
const connection = require('./connection')

async function main() {

  var sql = "SELECT FROM criptomonedas (name, symb, price, date) VALUES ('"+name+"', '"+symb+"','"+price+"','"+datetime+"')";
    connection.con.query(sql, function (err, result) {
        if (err) throw err;
    });

  //crea un objeto transportador
  let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "",
    pass: ""
  }
  });

  //Busqueda del archivo handlebars
  const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve(__dirname, "views"),
        defaultLayout: false,
      },
      viewPath: path.resolve(__dirname, "views"),
      extName: ".handlebars",
  };
    
  transporter.use(
      "compile",
      hbs(handlebarOptions)
  );

  // enviar correo con objeto de transporte definido
  let info = await transporter.sendMail({
  from: "",
  to: "",
  subject: "Prueba",
  template: "email"
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);