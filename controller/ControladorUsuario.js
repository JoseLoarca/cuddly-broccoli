module.exports = function(modelo){
	return {
		registro:function(peticion, respuesta){
            modelo.sequelize.query( "CALL sp_registroUsuario ('"+peticion.body.nombreCompleto+"', '"+peticion.body.telefono+"', '"+peticion.body.correo+"', '"+peticion.body.direccion+"', '"+peticion.body.username+"', '"+peticion.body.password+"')")
                .then(function(){
					respuesta.send({ "mensaje": "Usuario registrado con éxito" , "status":"200"});
				}).error(function(err){
				    respuesta.send({"mensaje":"Error "+err,"status":"500"});
			});
		},
		login:function(peticion, respuesta){
            modelo.sequelize.query("CALL sp_autenticarUsuario ('"+peticion.body.username+"', '"+peticion.body.password+"')")
                .then(function(data){
				    respuesta.json(data);
			}).error(function(err){
				respuesta.send({ "mensaje":"Error "+err,"status":"500" });
			});
		},
		listar:function(req, res){
			modelo.sequelize.query("CALL sp_infoUsuarios").then(function(data){
				res.json(data);
			}).error(function(){
				res.json({"mensaje":"No se han podido listar los usuarios. Intente más tarde", "status":500});
			});
		}
	}
}