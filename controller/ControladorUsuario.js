module.exports = function(app){
	return {
		registro:function(req, res){
			var Sequelize = app.get('sequelize');
			Sequelize.query( "CALL sp_registroUsuario ('"+req.body.nombreCompleto+"', '"+req.body.telefono+"', '"+req.body.correo+"', '"+req.body.direccion+"', '"+req.body.username+"', '"+req.body.password+"')").then(function(res){
					res.status(200).send({ message: "Usuario registrado con éxito" });
				}).error(function(err){
				res.json(err);
			});
		},
		login:function(req, res){
			var Sequelize = app.get('sequelize');
			Sequelize.query("CALL sp_autenticarUsuario ('"+req.body.username+"', '"+req.body.password+"')").then(function(response){
				if(response.length > 0){
					res.status(200).send(response);
				}else{
					res.status(400).send({ message: "Usuario y/o contraseña inválidos." })
				}
			}).error(function(err){
				res.json(err);
			});
		}
	}
}