"use strict";
const nodemailer = require("nodemailer");

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

  // enviar correo con objeto de transporte definido
  let info = await transporter.sendMail({
    from: "16460121@colima.tecnm.mx",
    to: "arroyob71@gmail.com",
    subject: "Prueba",
    text: "Prueba de funcionamiento",
    html: "<b>Hello world?</b>", 
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);