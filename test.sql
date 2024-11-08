/*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.8-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	10.11.8-MariaDB-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Objects`
--

DROP TABLE IF EXISTS `Objects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Objects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Matricula` varchar(9) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Status` enum('perdido','encontrado') DEFAULT 'encontrado',
  `Type` enum('Dispositivo electrónico','Mochila','Recipiente de comida','Recipiente de bebida','Objeto personal','Otros') NOT NULL,
  `CreatedAt` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `Matricula` (`Matricula`),
  CONSTRAINT `Objects_ibfk_1` FOREIGN KEY (`Matricula`) REFERENCES `Users` (`Matricula`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Objects`
--

LOCK TABLES `Objects` WRITE;
/*!40000 ALTER TABLE `Objects` DISABLE KEYS */;
INSERT INTO `Objects` VALUES
(1,'A01220835','Mochila','encontrado','Mochila','2024-11-07 04:06:00'),
(2,'A01220835','Laptop Dell','encontrado','Dispositivo electrónico','2024-11-07 04:07:13'),
(3,'A01220835','Botella Azul','encontrado','Recipiente de bebida','2024-11-07 04:07:13'),
(4,'A01220835','Mochila Negra','encontrado','Mochila','2024-11-07 04:07:13'),
(5,'A01220835','Tupper Rojo','encontrado','Recipiente de comida','2024-11-07 04:07:13'),
(6,'A01220835','Llaves de auto','encontrado','Objeto personal','2024-11-07 04:07:13');
/*!40000 ALTER TABLE `Objects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `Matricula` varchar(9) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Phone` varchar(20) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Points` int(11) DEFAULT 0,
  PRIMARY KEY (`Matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES
('A01220835','$2b$10$.a7ijsKIr1LrDjfH0T8Mu.s.X40zYn9WCUYEKUK/Jq5VuOOKtHpCG','Clay','5648954564','dfes@ds.com',0);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'test'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-07  1:40:16
