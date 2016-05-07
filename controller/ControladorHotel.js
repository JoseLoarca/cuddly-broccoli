module.exports = function(modelo) {
    return {
        agregar:function(req, res){
            modelo.hotel.create({
                idHotel:null,
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                costo: req.body.costo,
                idMunicipio: req.body.idMunicipio
            }).then(function(){
                res.json({"mensaje":"Hotel agregado con éxito."});
            }).error(function(err){
                res.json({"mensaje":"Error. El hotel no se pudo agregar a la BD."});
                throw err;
            });
        },
        eliminar:function(req,res){
            modelo.hotel.destroy({
                where: {
                    idHotel: req.params.id
                }
            }).then(function(){
                res.json({"mensaje":"Hotel eliminado."})
            }).error(function(){
                throw err;
            });
        },
        listar:function(req, res){
            modelo.hotel.findAll().then(function(data){
                res.json(data);
            }).error(function(){
                res.json({"mensaje":"No se han podido listar los hoteles. Intente más tarde", "status":500});
            });
        },
        editar:function(req,res){
            modelo.hotel.find({
                where: {
                    idHotel: req.params.id
                }
            }).then(function(hotel){
                if(hotel){
                    hotel.updateAttributes({
                        nombre: req.body.nombre,
                        descripcion: req.body.descripcion,
                        costo: req.body.costo,
                        idMunicipio: req.body.idMunicipio,
                    }).then(function(hotel){
                        res.json({"mensaje":"Se ha modificado el hotel "+hotel.nombre+" con éxito."});
                    });
                }
            }).error(function(err){
                res.json({"mensaje":"El hotel no se pudo editar "+error,"status":500});
            });
        }
    }
}