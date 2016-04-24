var ruta = require('express').Router();
var usuario = require('../controller/ControladorUsuario.js');

ruta.get('/', function(peticion, respuesta){
	respuesta.send("Servidor iniciado");
});

/*Rutas del usuario*/
ruta.post('/usuario/registro', usuario.registro);
ruta.post('/usuario/login', usuario.login);

module.exports=ruta;