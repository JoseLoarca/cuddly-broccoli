module.exports = function(sequelize, DataTypes) {
    return sequelize.define('hotel', {
        idHotel: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: true
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        costo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        idMunicipio: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'municipio',
                key: 'idMunicipio'
            }
        }
    }, {
        tableName: 'hotel',
        timestamps:false
    });
};

