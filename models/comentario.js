module.exports = function(sequelize, DataTypes) {
    return sequelize.define('comentario', {
        idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'usuario',
                key: 'idUsuario'
            }
        },
        idSitioTuristico: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'sitioturistico',
                key: 'idSitioTuristico'
            }
        },
        comentario: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'comentario',
        timestamps:false
    });
};
