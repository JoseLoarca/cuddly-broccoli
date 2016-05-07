module.exports = function(modelo) {
    return {
        agregar:function(req, res){
            modelo.departamento.create({
                idDepartmento:null,
                nombre: req.body.nombre
            }).then(function(){
                    res.json({"mensaje":"Departamento agregado con éxito."});
            }).error(function(err){
                    res.json({"mensaje":"Error. El departamento no se pudo agregar a la BD."});
                throw err;
            });
        },
        eliminar:function(req,res){
            modelo.departamento.destroy({
                where: {
                    idDepartamento: req.params.id
                }
            }).then(function(){
                res.json({"mensaje":"Departamento eliminado."})
            }).error(function(){
                throw err;
            });
        },
        listar:function(req, res){
            modelo.departamento.findAll().then(function(data){
               res.json(data);
            }).error(function(){
               res.json({"mensaje":"No se han podido listar los departamentos. Intente más tarde", "status":500});
            });
        },
        editar:function(req,res){
             modelo.departamento.find({
                 where: {
                     idDepartamento: req.params.id
                 }
             }).then(function(departamento){
                if(departamento){
                    departamento.updateAttributes({
                        nombre: req.body.nombre,
                    }).then(function(departamento){
                        res.json({"mensaje":"Se ha modificado el departamento "+departamento.nombre+" con éxito."});
                    });
                }
             }).error(function(err){
                    res.json({"mensaje":"El departamento no se pudo editar "+error,"status":500});
             });
        }
    }
}