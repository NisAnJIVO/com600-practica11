require("dotenv").config({ quiet: true });
const jwt = require("jsonwebtoken");

const SECRETO = process.env.JWT_SECRET || "clave-ficticia-de-aula-no-usar";

const carga = { sub: "u-100", nombre: "Ana Quispe", rol: "usuario" };

const token = jwt.sign(carga, SECRETO, {
  expiresIn: "15m",
  issuer: "practica11",
});

console.log(token);
