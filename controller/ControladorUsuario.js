var jwt = require('jsonwebtoken');

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
		tokenGenerator:function(req,res){
			var token = jwt.sign({
				company:'Kinal'
			}, 'JCLoarca - 2014224');
			res.send(token);
		},
		tokenMiddleware:function(req,res,next){
			var token =	 req.headers['x-access-token'] || req.body.token || req.query.token;
			if(token){
				jwt.verify(token,'JCLoarca - 2014224',function(err,decoded){
					if(err){
						return res.status(403).send({
							success: false,
							mensaje: 'Fallo al validar token'
						});
					}
					req.user = decoded;
					next();
				});
			}else{
				return res.status(403).send({
					success:false,
					mensaje:'No se proporcionó un token'
				});
			}
		},
		listar:function(req, res){
			modelo.sequelize.query("CALL sp_infoUsuarios").then(function(data){
				res.json(data);
			}).error(function(){
				res.json({"mensaje":"No se han podido listar los usuarios. Intente más tarde", "status":500});
			});
		}
	}
	function expiresIn(dias){
		var dateObj= new Date();
		return dateObj.setDate(dateObj.getDate()+dias);
	}
	function genToken(user){
		var payload = jwt.sign({
			"company":"Kinal"
		},
		'JCLoarca - 2014224');
		var token= {
			"token": payload,
			"user": user,
			"exp":expiresIn(1)
		}
		return token;
	}

}