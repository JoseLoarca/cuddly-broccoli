/*
SQLyog Community v12.2.1 (64 bit)
MySQL - 10.1.9-MariaDB : Database - db_appturismo
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`db_appturismo` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `db_appturismo`;

/*Table structure for table `comentario` */

DROP TABLE IF EXISTS `comentario`;

CREATE TABLE `comentario` (
  `idComentario` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `idSitioTuristico` int(11) NOT NULL,
  `comentario` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`idComentario`),
  KEY `idUsuario` (`idUsuario`),
  KEY `idSitioTuristico` (`idSitioTuristico`),
  CONSTRAINT `comentario_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  CONSTRAINT `comentario_ibfk_2` FOREIGN KEY (`idSitioTuristico`) REFERENCES `sitioturistico` (`idSitioTuristico`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `comentario` */

insert  into `comentario`(`idComentario`,`idUsuario`,`idSitioTuristico`,`comentario`) values 
(1,4,1,'Me parece una buena opción para relajarse en familia.');

/*Table structure for table `departamento` */

DROP TABLE IF EXISTS `departamento`;

CREATE TABLE `departamento` (
  `idDepartamento` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`idDepartamento`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

/*Data for the table `departamento` */

insert  into `departamento`(`idDepartamento`,`nombre`) values 
(5,'Petén'),
(6,'Huehuetenango'),
(7,'Quiché'),
(8,'Alta Verapaz'),
(9,'Izabal'),
(10,'San Marcos'),
(11,'Quetzaltenango'),
(12,'Totonicapán'),
(13,'Sololá'),
(14,'Chimaltenango'),
(15,'Sacatepéquez'),
(16,'Guatemala'),
(17,'Baja Verapaz'),
(18,'El Progreso'),
(19,'Jalapa'),
(20,'Zacapa'),
(21,'Chiquimula'),
(22,'Retalhuleu'),
(23,'Suchitepéquez'),
(24,'Escuintla'),
(25,'Santa Rosa'),
(26,'Jutiapa');

/*Table structure for table `hotel` */

DROP TABLE IF EXISTS `hotel`;

CREATE TABLE `hotel` (
  `idHotel` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(128) DEFAULT NULL,
  `descripcion` varchar(128) DEFAULT NULL,
  `costo` varchar(128) DEFAULT NULL,
  `idMunicipio` int(11) DEFAULT NULL,
  PRIMARY KEY (`idHotel`),
  KEY `idMunicipio` (`idMunicipio`),
  CONSTRAINT `hotel_ibfk_1` FOREIGN KEY (`idMunicipio`) REFERENCES `municipio` (`idMunicipio`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `hotel` */

insert  into `hotel`(`idHotel`,`nombre`,`descripcion`,`costo`,`idMunicipio`) values 
(2,'Mansión del Río','El mejor hotel de todo Izabal, con la mejor vista al río e infinidades de actividades y servicios con los que podrás pasar momen','Desde $60 la noche.',3);

/*Table structure for table `municipio` */

DROP TABLE IF EXISTS `municipio`;

CREATE TABLE `municipio` (
  `idMunicipio` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(128) DEFAULT NULL,
  `idDepartamento` int(11) DEFAULT NULL,
  PRIMARY KEY (`idMunicipio`),
  KEY `idDepartamento` (`idDepartamento`),
  CONSTRAINT `municipio_ibfk_1` FOREIGN KEY (`idDepartamento`) REFERENCES `departamento` (`idDepartamento`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `municipio` */

insert  into `municipio`(`idMunicipio`,`nombre`,`idDepartamento`) values 
(1,'Ciudad de Guatemala',16),
(3,'El Estor',9);

/*Table structure for table `sitioturistico` */

DROP TABLE IF EXISTS `sitioturistico`;

CREATE TABLE `sitioturistico` (
  `idSitioTuristico` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(128) DEFAULT NULL,
  `descripcion` varchar(128) DEFAULT NULL,
  `idMunicipio` int(11) DEFAULT NULL,
  PRIMARY KEY (`idSitioTuristico`),
  KEY `idMunicipio` (`idMunicipio`),
  CONSTRAINT `sitioturistico_ibfk_1` FOREIGN KEY (`idMunicipio`) REFERENCES `municipio` (`idMunicipio`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `sitioturistico` */

insert  into `sitioturistico`(`idSitioTuristico`,`nombre`,`descripcion`,`idMunicipio`) values 
(1,'Río Dulce','Mientras pasea por los aguas de Río Dulce mantenga un ojo abierto para observar a las bellas aves acuáticas como son los pelícan',3);

/*Table structure for table `usuario` */

DROP TABLE IF EXISTS `usuario`;

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombreCompleto` varchar(128) DEFAULT NULL,
  `telefono` varchar(128) DEFAULT NULL,
  `correo` varchar(128) DEFAULT NULL,
  `direccion` varchar(128) DEFAULT NULL,
  `username` varchar(128) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `usuario` */

insert  into `usuario`(`idUsuario`,`nombreCompleto`,`telefono`,`correo`,`direccion`,`username`,`password`) values 
(2,'postman','89784523','postman@gmail.com','Postworld','postman','03d476861afd384510f2cb80ccfa8511'),
(4,'José Loarca','30305435','jc@gmail.com','Ciudad de Guatemala','jose','662eaa47199461d01a623884080934ab');

/* Procedure structure for procedure `sp_autenticarUsuario` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_autenticarUsuario` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_autenticarUsuario`(IN _username varchar(128), IN _password VARCHAR(128))
BEGIN
	select nombreCompleto, telefono, correo, direccion, username from usuario WHERE usuario.`username`=_username and usuario.`password`=md5(_password);
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_infoUsuarios` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_infoUsuarios` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_infoUsuarios`()
BEGIN
	SELECT u.nombreCompleto AS Nombre, u.telefono AS Teléfono, u.correo AS Correo, u.direccion AS Dirección
	FROM usuario AS u;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_registroUsuario` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_registroUsuario` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_registroUsuario`(in _nombreCompleto varchar(128), IN _telefono VARCHAR(128), in _correo varchar(128),
    IN _direccion varchar(128), IN _username VARCHAR(128), in _password varchar(128))
BEGIN
	INSERT INTO usuario VALUES (null, _nombreCompleto, _telefono, _correo, _direccion, _username, md5(_password));
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_verComentarios` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_verComentarios` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_verComentarios`()
BEGIN
	SELECT c.comentario AS Comentario, u.nombreCompleto AS Usuario,  s.nombre AS SitioTuristico
	FROM comentario AS c 
	INNER JOIN usuario AS u
	ON c.idUsuario = u.idUsuario
	INNER JOIN sitioturistico AS s
	ON c.idSitioTuristico = s.idSitioTuristico;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_verHoteles` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_verHoteles` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_verHoteles`()
BEGIN
	SELECT h.nombre AS Nombre, h.descripcion AS Descripción, h.costo AS Costo, m.nombre AS Municipio, d.nombre AS Departamento
	FROM hotel AS h
	INNER JOIN municipio AS m
	ON m.idMunicipio = h.idMunicipio
	INNER JOIN departamento AS d
	ON m.idDepartamento = d.idDepartamento;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_verMunicipio` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_verMunicipio` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_verMunicipio`()
BEGIN
	SELECT m.nombre AS Municipio, d.nombre AS Departamento FROM municipio AS m INNER JOIN departamento AS d ON m.idDepartamento = d.idDepartamento;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_verSitios` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_verSitios` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_verSitios`()
BEGIN
	SELECT s.nombre AS Nombre, s.descripcion AS Descripción, m.nombre AS Municipio, d.nombre AS Departamento
	FROM sitioturistico AS s 
	INNER JOIN municipio AS m
	ON s.idMunicipio = m.idMunicipio
	INNER JOIN departamento AS d
	ON m.idDepartamento = d.idDepartamento;
    END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
