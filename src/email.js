/**
 * Autor: Arroyo Chávez Brayan Alberto
 * Fecha: February 22, 2021
 */

"use strict";
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars")
const path = require('path');

async function main() {

    // crea un objeto transportador reutilizable utilizando el transporte SMTP predeterminado
    let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "16460121@colima.tecnm.mx",
      pass: "cuije1804"
    }
    });

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
     *  transporter.use('compile',hbs({
     *      viewEngine: 'express-handlebars',
     *      viewPath: path.resolve(__dirname, ".././."),
     *  }));
     */
    

    // enviar correo con objeto de transporte definido
    let info = await transporter.sendMail({
    from: "16460121@colima.tecnm.mx",
    to: "arroyob71@gmail.com",
    subject: "Prueba",
    template: "email"
    });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);