module.exports = function(modelo) {
    return {
        agregar:function(req, res){
            modelo.sitioturistico.create({
                idSitioTuristico:null,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                idMunicipio: req.body.idMunicipio
            }).then(function(){
                res.json({"mensaje":"Sitio Turistico agregado con éxito."});
            }).error(function(err){
                res.json({"mensaje":"Error. El Sitio Turistico no se pudo agregar a la BD."});
                throw err;
            });
        },
        eliminar:function(req,res){
            modelo.sitioturistico.destroy({
                where: {
                    idSitioTuristico: req.params.id
                }
            }).then(function(){
                res.json({"mensaje":"Sitio Turistico eliminado."})
            }).error(function(){
                throw err;
            });
        },
        listar:function(req, res){
            modelo.sequelize.query("CALL sp_verSitios").then(function(data){
                res.json(data);
            }).error(function(){
                res.json({"mensaje":"No se han podido listar los Sitios Turisticos. Intente más tarde", "status":500});
            });
        },
        editar:function(req,res){
            modelo.sitioturistico.find({
                where: {
                    idSitioTuristico: req.params.id
                }
            }).then(function(sitioturistico){
                if(sitioturistico){
                    sitioturistico.updateAttributes({
                        nombre: req.body.nombre,
                        descripcion: req.body.descripcion,
                        idMunicipio: req.body.idMunicipio,
                    }).then(function(sitioturistico){
                        res.json({"mensaje":"Se ha modificado el Sitio Turistico "+sitioturistico.nombre+" con éxito."});
                    });
                }
            }).error(function(err){
                res.json({"mensaje":"El Sitio Turistico no se pudo editar "+error,"status":500});
            });
        }
    }
}