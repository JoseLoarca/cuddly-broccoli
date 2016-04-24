var mysql = require('mysql');
var connection = mysql.createConnection({
	host	: 'localhost'	,
	user	:	'root'  ,
	password 	:	'',
	database:	'db_appturismo'
});
connection.connect();
var usuario={
	registro:function(req, res){
		connection.query( "CALL sp_registroUsuario ('"+req.body.nombreCompleto+"', '"+req.body.telefono+"', '"+req.body.correo+"', '"+req.body.direccion+"', '"+req.body.username+"', '"+req.body.password+"')", function(err, rows){
			if(err)
				throw err;
			else
				res.json({"mensaje":"Objeto agregado correctamente."});
		});
	},
	login:function(req, res){
		connection.query( "CALL sp_autenticarUsuario ('"+req.body.username+"', '"+req.body.password+"')", function(err, rows){
			if(err)
				throw err;
			else
				res.json(rows);
		});
	}
}
module.exports=usuario;	