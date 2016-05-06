module.exports = function (app){
	return{
		add:function(req, res){
			var Departamento = app.get('departamento');
			Departamento.create({
				nombre: req.body.nombre
			}).then(function(departamento){
				res.json(departamento);
			});
		},
		list:function(req, res){
			var Departamento = app.get('departamento');
			Departamento.findAll().then(function(departamentos){
				res.json(departamentos);
			});
		},
		edit:function(req,res){
			var Departamento = app.get('departamento');
			Departamento.find(req.body.idDepartamento).then(function(departamento){
				if(departamento) {
					departamento.updateAttributes({
						nombre: req.body.nombre
					}).then(function(departamento){
						res.json(departamento);
					});
				}else{
					res.status(404).send({mensaje: "Departamento no encontrado."});
				}
			});
		},
		delete:function(req,res){
			Departamento.destroy({
				where: {
					idDepartamento: req.body.idDepartamento
				}
			}).then(function(departamento){
				res.json(departamento);
			});
		},
		byid:function(req,res){
			var Departamento=app.get('departamento');
			Departamento.find(req.body.idDepartamento).then(function(departamento){
				if(departamento){
				  	res.json(departamento);
				}else{
					res.status(404).send({mensaje: "Departamento no encontrado."});
				}				
			});
		},
		/*departamentoMunicipio:function(req, res){
            var Departamento = app.get('departamento');
            var Municipio = app.get('municipio');
            Departamento.find({ where: {idDepartamento: req.params.id }, include: [Municipio] }).then(function(departamento){
                res.json(departamento);
            })
        }*/
	}
}