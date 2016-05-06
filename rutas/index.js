var ruta=require('express').Router();
module.exports=(function(modelo){
    var usuario=require('../controller/ControladorUsuario.js')(modelo);
    ruta.get('/',function(peticion,respuesta){
        respuesta.send("Servicio iniciado");
    });

    /*Usuario*/
    ruta.post('/usuario/registro',usuario.registro);
    ruta.post('/usuario/login',usuario.login);

    return ruta;
});