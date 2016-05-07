module.exports = function(modelo) {
    return {
        agregar:function(req, res){
            modelo.municipio.create({
                idMunicipio:null,
                nombre: req.body.nombre,
                idDepartamento: req.body.idDepartamento
            }).then(function(){
                res.json({"mensaje":"Municipio agregado con éxito."});
            }).error(function(err){
                res.json({"mensaje":"Error. El municipio no se pudo agregar a la BD."});
                throw err;
            });
        },
        eliminar:function(req,res){
            modelo.municipio.destroy({
                where: {
                    idMunicipio: req.params.id
                }
            }).then(function(){
                res.json({"mensaje":"Municipio eliminado."})
            }).error(function(){
                throw err;
            });
        },
        listar:function(req, res){
            modelo.municipio.findAll().then(function(data){
                res.json(data);
            }).error(function(){
                res.json({"mensaje":"No se han podido listar los municipios. Intente más tarde", "status":500});
            });
        },
        editar:function(req,res){
            modelo.municipio.find({
                where: {
                    idMunicipio: req.params.id
                }
            }).then(function(municipio){
                if(municipio){
                    municipio.updateAttributes({
                        nombre: req.body.nombre,
                        idDepartamento: req.body.idDepartamento,
                    }).then(function(municipio){
                        res.json({"mensaje":"Se ha modificado el municipio "+municipio.nombre+" con éxito."});
                    });
                }
            }).error(function(err){
                res.json({"mensaje":"El municipio no se pudo editar "+error,"status":500});
            });
        }
    }
}