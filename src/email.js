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
const db = require('./db')
var ejs = require("ejs");

async function main() {
  /**
   * Se hace uso del await para que el programa detenga su ejecución hasta que se obtengas los valores de las
   * variables login y contac
   */
  var login = await db.getAuth();
  var contact = await db.getContact();
  var from = ""
  contact.forEach(element => from = from.concat(',', element.email));
  from = from.substr(1);
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
  ejs.renderFile(__dirname + "/views/email.ejs", { name: 'Stranger' }, async function (err, data) {
    if (err) {
      console.log(err);
    } else {
      let info = await transporter.sendMail({
      from: login[0].email,
      to: from,
      subject: 'Criptomonedas',
      });
    
      console.log("Message sent: %s", info.messageId);
    } 
  });
}

main().catch(console.error);