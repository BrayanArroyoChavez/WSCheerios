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

  /**
   * Se hace uso del await para que el programa detenga su ejecución hasta que se obtengas los valores de las
   * variables login y contac
   */
  var login = await getAuth();
  var contact = await getContact();
  var from = ""
  contact.forEach(element => from = from.concat(',', element.email));
  from = from.substr(1);
  /**
   * Consulta a la base de datos para extraer el correo que sera usado como remitente
   */
  function getAuth() {
    return dbQuery("SELECT p.email, u.password FROM `persona` AS p JOIN `persona_usuario` AS pu ON p.id = pu.id_persona JOIN `usuario` AS u ON u.id = pu.id_usuario WHERE p.type = 'admin'");
  }
  /**
   * Consulta a la base de datos para extraer todos los correcos de contacto
   */
  function getContact() {
    return dbQuery("SELECT email FROM `persona` WHERE type = 'contacto'");
  }
  /**
   * Se creo una función que recibe como parametro las consultas de las bases de datos para ejecutarlas
   * y que a su vez también devuelve el resultado obtenido haciendo uso de las promesas
   */
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
  /**
   * crea un objeto transportador
   */
  let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: login[0].email,
    pass: login[0].password
  }
  });
  /**
   * Busqueda del archivo handlebars
   */
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
  /**
   * enviar correo con objeto de transporte definido
   */
  let info = await transporter.sendMail({
  from: login[0].email,
  to: from,
  subject: "Prueba",
  template: "email"
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);