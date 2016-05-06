var ruta = require('express').Router();
module.exports = (function(app){
	var departamento = require('../controller/ControladorDepartamento.js')(app);
    var usuario = require('../controller/ControladorUsuario')(app);

    /*Usuario*/
    ruta.post('/usuario/registro', usuario.registro);
    ruta.post('/usuario/login', usuario.login);
    
    /*Departamento*/
    ruta.get('/departamento', departamento.list);
    ruta.post('/deparamento', departamento.add);
    ruta.put('/departamento', departamento.edit);
    ruta.delete('/departamento', departamento.delete);
    /*ruta.get('departamento/:id', departamento.departamentoMunicipio());*/

    return ruta;

});