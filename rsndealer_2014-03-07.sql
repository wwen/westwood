# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.10)
# Database: rsndealer
# Generation Time: 2014-03-08 00:48:54 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `categoryID` char(32) NOT NULL DEFAULT '',
  `categoryName` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `categoryID` (`categoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;

INSERT INTO `categories` (`id`, `categoryID`, `categoryName`)
VALUES
	(1,'4eded94cb91ff6f639ca2363dc9d4dfa','bedrooms'),
	(2,'6cc59fd63d3f8c42123aae2cb198fefd','bathrooms'),
	(3,'4b4cd1668c6b0e1e266987992152640e','storage'),
	(4,'547771399c4f2c8f579865e0ff927b41','price'),
	(5,'f34c357519e2688fc8ce0bb769dc4f4e','propertytype'),
	(6,'ca2fa7d91de57beb762dae9d0afc621d','buildingtype'),
	(7,'6c3f07e4a4427fcd4d4f9598a03fe56b','floorarea'),
	(8,'f89e81d041f0fe858a03675bdefbd454','lotsize'),
	(9,'890df8417536a1ea278f5b3feb5c5c30','parking'),
	(10,'3c67bbf8c07e84a5831deb7775b33ca1','age'),
	(12,'96ad4f4fbded20240abd23f24fd17d0b','address'),
	(13,'d8bb34fa9697121f1b57cc7df0dfe035','city'),
	(14,'14d065a7ca949b5dcb195fa1f76b99c0','province'),
	(15,'1e0974bb71e06e401615d1bd5f9ab6c7','country'),
	(16,'061a565c5287bf9b5c2bcb9779f3ea12','description'),
	(17,'0ec7df1e0f3def3447403097a57b9552','mlsnumber'),
	(18,'5ebf99e2802f223cc1e5d94d93c842a9','longitude'),
	(19,'eb451e2956e86a8d5effa0003b43f4b0','latitude');

/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
