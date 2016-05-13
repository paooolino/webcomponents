-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versione server:              5.7.9 - MySQL Community Server (GPL)
-- S.O. server:                  Win64
-- HeidiSQL Versione:            9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dump della struttura di tabella c9.field_definitions
DROP TABLE IF EXISTS `field_definitions`;
CREATE TABLE IF NOT EXISTS `field_definitions` (
  `idfd` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_item` bigint(20) unsigned NOT NULL DEFAULT '0',
  `field_name` varchar(255) NOT NULL DEFAULT '',
  `field_type` varchar(255) NOT NULL DEFAULT '',
  `field_options` text NOT NULL,
  `inheritance` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idfd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dump dei dati della tabella c9.field_definitions: ~0 rows (circa)
/*!40000 ALTER TABLE `field_definitions` DISABLE KEYS */;
/*!40000 ALTER TABLE `field_definitions` ENABLE KEYS */;


-- Dump della struttura di tabella c9.field_values
DROP TABLE IF EXISTS `field_values`;
CREATE TABLE IF NOT EXISTS `field_values` (
	`id_item` BIGINT(20) NOT NULL DEFAULT '0',
	`field_name` VARCHAR(255) NOT NULL DEFAULT '',
	`field_value` TEXT NOT NULL,
	PRIMARY KEY (`id_item`, `field_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dump dei dati della tabella c9.field_values: ~0 rows (circa)
/*!40000 ALTER TABLE `field_values` DISABLE KEYS */;
/*!40000 ALTER TABLE `field_values` ENABLE KEYS */;


-- Dump della struttura di tabella c9.items
DROP TABLE IF EXISTS `items`;
CREATE TABLE IF NOT EXISTS `items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `lang` varchar(255) NOT NULL DEFAULT '',
  `id_parent` bigint(20) NOT NULL DEFAULT '0',
  `name` varchar(255) NOT NULL DEFAULT '',
  `slug` varchar(255) NOT NULL DEFAULT '',
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dump dei dati della tabella c9.items: ~0 rows (circa)
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
REPLACE INTO `items` (`id`, `lang`, `id_parent`, `name`, `slug`, `ts`) VALUES
	(1, 'en', 0, 'Homepage', '', '2016-05-12 12:38:45'),
	(2, 'en', 0, 'About', '', '2016-05-12 12:38:45'),
	(3, 'en', 0, 'Products', '', '2016-05-12 12:38:45'),
	(4, 'en', 0, 'Contacts', '', '2016-05-12 12:38:45'),
	(5, 'en', 3, 'Music', '', '2016-05-12 12:40:20'),
	(6, 'en', 3, 'Books', '', '2016-05-12 12:40:26'),
	(7, 'en', 5, 'Bob Marley', '', '2016-05-12 12:40:35'),
	(8, 'en', 5, 'Michael Bublé', '', '2016-05-12 12:40:51'),
	(9, 'en', 5, 'Madonna', '', '2016-05-12 12:41:11'),
	(10, 'it', 0, 'Home page', '', '2016-05-12 12:41:19'),
	(11, 'it', 0, 'Informazioni', '', '2016-05-12 12:41:29'),
	(12, 'it', 0, 'Prodotti', '', '2016-05-12 12:41:37'),
	(13, 'it', 0, 'Contatti', '', '2016-05-12 12:41:42');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;


-- Dump della struttura di tabella c9.options
DROP TABLE IF EXISTS `options`;
CREATE TABLE IF NOT EXISTS `options` (
  `ido` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `option_name` varchar(255) NOT NULL DEFAULT '',
  `option_value` text NOT NULL,
  PRIMARY KEY (`ido`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dump dei dati della tabella c9.options: ~1 rows (circa)
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
REPLACE INTO `options` (`ido`, `option_name`, `option_value`) VALUES
	(1, 'languages', '{\r\n"main_language": "en",\r\n"languages": [\r\n   {\r\n      "lang": "it"\r\n   },\r\n   {\r\n      "lang": "en"\r\n   }\r\n]\r\n}');
/*!40000 ALTER TABLE `options` ENABLE KEYS */;


-- Dump della struttura di tabella c9.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `idu` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT '',
  `password` varchar(255) DEFAULT '',
  `permissions` text,
  PRIMARY KEY (`idu`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dump dei dati della tabella c9.users: ~1 rows (circa)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
REPLACE INTO `users` (`idu`, `username`, `password`, `permissions`) VALUES
	(1, 'admin', 'c3284d0f94606de1fd2af172aba15bf3', NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
