module.exports = function(modelo) {
    return {
        agregar:function(req, res){
            modelo.comentario.create({
                idComentario:null,
                idUsuario: req.body.idUsuario,
                idSitioTuristico: req.body.idSitioTuristico,
                comentario: req.body.comentario
            }).then(function(){
                res.json({"mensaje":"Comentario agregado con éxito."});
            }).error(function(err){
                res.json({"mensaje":"Error. El comentario no se pudo agregar a la BD."});
                throw err;
            });
        },
        eliminar:function(req,res){
            modelo.comentario.destroy({
                where: {
                    idComentario: req.params.id
                }
            }).then(function(){
                res.json({"mensaje":"Comenatario eliminado."})
            }).error(function(){
                throw err;
            });
        },
        listar:function(req, res){
            modelo.sequelize.query("CALL sp_verComentarios").then(function(data){
                res.json(data);
            }).error(function(){
                res.json({"mensaje":"No se han podido listar los comentarios. Intente más tarde", "status":500});
            });
        },
        editar:function(req,res){
            modelo.comentario.find({
                where: {
                    idComentario: req.params.id
                }
            }).then(function(comentario){
                if(comentario){
                    comentario.updateAttributes({
                        idUsuario: req.body.idUsuario,
                        idSitioTuristico: req.body.idSitioTuristico,
                        comentario: req.body.comentario
                    }).then(function(comentario){
                        res.json({"mensaje":"Se ha editado el comentario con éxito."});
                    });
                }
            }).error(function(err){
                res.json({"mensaje":"El comentario no se pudo editar "+error,"status":500});
            });
        }
    }
}
