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

  var login = await getAuth();
  var contact = await getContact();
  var from = ""
  contact.forEach(element => from = from.concat(',', element.email));
  from = from.substr(1);

  function getAuth() {
    return dbQuery("SELECT p.email, u.password FROM `persona` AS p JOIN `persona_usuario` AS pu ON p.id = pu.id_persona JOIN `usuario` AS u ON u.id = pu.id_usuario WHERE p.type = 'admin'");
  }

  function getContact() {
    return dbQuery("SELECT email FROM `persona` WHERE type = 'contacto'");
  }

  function dbQuery(databaseQuery) {
    return new Promise(data => {
      connection.con.query(databaseQuery, function (error, result) {
        if (error) throw error;
        try {
          data(result);
        } catch (error) {
          data({});
          throw error;
        }
      });
    });
  }

  //crea un objeto transportador
  let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: login[0].email,
    pass: login[0].password
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
  from: login[0].email,
  to: from,
  subject: "Prueba",
  template: "email"
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);