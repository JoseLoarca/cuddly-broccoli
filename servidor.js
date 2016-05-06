(function(){
	var express = require('express');
	var bodyParser = require('body-parser');
	var mysql = require('mysql');
	var morgan = require('morgan');
	var Sequelize = require('sequelize');

	var sequelize = new Sequelize('db_appturismo', 'root', '', {
		host: 'localhost',
		dialect: 'mysql',
		pool: {
			max: 20,
			min: 0,
			idle: 10000
		}
	});

	var Usuario = sequelize.define('usuario', {
		idUsuario: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
		nombreCompleto: { type: Sequelize.STRING, allowNull: false },
		telefono: { type: Sequelize.STRING, allowNull: false },
		correo: { type: Sequelize.STRING, allowNull: false },
		direccion: { type: Sequelize.STRING, allowNull: false },
		username: { type: Sequelize.STRING, allowNull: false },
		password: { type: Sequelize.STRING, allowNull: false }
	});

	var Departamento = sequelize.define('departamento', {
		idDepartamento: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
		nombre: { type: Sequelize.STRING, allowNull: false}
	});

	var Municipio = sequelize.define('municipio',{
        idMunicipio: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: Sequelize.STRING, allowNull: false},
        idDepartamento: { type: Sequelize.INTEGER, references: {
            model: Departamento,
            key: 'idDepartamento'
        }}
    });

    Departamento.hasMany(Municipio, { foreignKey: 'idMunicipio' });
    Municipio.belongsTo(Departamento, { foreignKey: 'idMunicipio' });

	sequelize.sync({ force: false});
	var puerto = 3001;
	var conf = require('./config');
	var app = express();
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
    app.use(morgan('dev'));
	app.use('/api/v1', require('./rutas')(app));
    app.set('usuario', Usuario);
	app.set('departamento', Departamento);
    app.set('municipio', Municipio);
	app.listen(puerto, function(){
		console.log("Servidor iniciado en el puerto: " +puerto);
	})
})();