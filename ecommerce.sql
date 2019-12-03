-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `orders` (
  `seller_id` char(50) DEFAULT NULL,
  `buyer_id` char(50) DEFAULT NULL,
  `product_id` mediumint(9) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=ascii;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('ghi@gmail.com','parth_sach',25),('parth_sach','parth_sach',41);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `products` (
  `product_id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `product_name` char(50) DEFAULT NULL,
  `user_id` char(50) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `category` char(50) DEFAULT NULL,
  `img_url` char(200) DEFAULT NULL,
  `description` mediumtext,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `user_id_fk` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (14,'Xiommi redmi 5','parth_sach',7000,'electronics','https://apollo-singapore.akamaized.net/v1/files/0wm6grc8rdx43-IN/image;s=144x108;in_;slot=1;filename=0wm6grc8rdx43-IN_.jpg','Very good condition',1),(24,'Scooter','parth_sach',27000,'bikes','https://apollo-singapore.akamaized.net/v1/files/vh08vhgb9c122-IN/image;s=144x108;in_;slot=1;filename=vh08vhgb9c122-IN_.jpg','Very less used',0),(25,'TVS APACHE','parth_sach',60000,'bikes','https://apollo-singapore.akamaized.net/v1/files/z2i6f9ekfa6m3-IN/image;s=144x108;in_;slot=1;filename=z2i6f9ekfa6m3-IN_.jpg','Bike is in a good condition ',0),(28,'Acer core i3 4gb15.6screen','kushal_ag',42000,'electronics','https://apollo-singapore.akamaized.net/v1/files/xm2b365r36w42-IN/image;s=144x108;in_;slot=1;filename=xm2b365r36w42-IN_.jpg','Very good condition laptop',1),(29,'Samsung Bluray DVD in mint condition','kushal_ag',1000,'electronics','https://apollo-singapore.akamaized.net/v1/files/f72h4jj5a35c1-IN/image;s=144x108;in_;slot=1;filename=f72h4jj5a35c1-IN_.jpg','Unused dvd. Very good condition. ',1),(30,'PUBG mobile controller high quality','kushal_ag',1000,'electronics','https://apollo-singapore.akamaized.net/v1/files/2ts1mnowqvbj2-IN/image;s=144x108;in_;slot=1;filename=2ts1mnowqvbj2-IN_.jpg','Very good condition. Not much used.',1),(31,'MacBook Pro','kushal_ag',30000,'electronics','https://apollo-singapore.akamaized.net/v1/files/x4ekrjx09dfo2-IN/image;s=144x108;in_;slot=1;filename=x4ekrjx09dfo2-IN_.jpg','Very fast laptop. Smooth processing.',1),(32,'Audi A6','kushal_ag',1800000,'cars','https://apollo-singapore.akamaized.net/v1/files/tnf5v2wsj7uv1-IN/image;s=144x108;in_;slot=2;filename=tnf5v2wsj7uv1-IN_.jpg','Excellent condition car 8 year old',1),(34,'Maruti Suzuki Wagon R 1.0 Lxi Cng 2014 Cng','ninad_dighe',230000,'cars','https://apollo-singapore.akamaized.net/v1/files/vrr5mbnzcso42-IN/image;s=144x108;in_;slot=1;filename=vrr5mbnzcso42-IN_.jpg','Wagon-R great family car. Very good condition.',1),(35,'Fiat Punto Dynamic 1.3 2009 Diesel','ninad_dighe',215000,'cars','https://apollo-singapore.akamaized.net/v1/files/7murw1dk7cko3-IN/image;s=144x108;in_;slot=1;filename=7murw1dk7cko3-IN_.jpg','very nice car.  Smooth handling.',1),(36,'RE classic','ninad_dighe',75000,'bikes','https://apollo-singapore.akamaized.net/v1/files/hj41j05281x23-IN/image;s=144x108;in_;slot=1;filename=hj41j05281x23-IN_.jpg','Unused phone. Very good condition.',1),(41,'iphone 11','parth_sach',20000,'electronics','/uploads/uploadedImage-1575315042458.png','Nice iPhone good condition',0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `user_id` char(50) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `address` text,
  `phone` varchar(11) DEFAULT NULL,
  `password` varchar(10) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('john_cena','John Cena','New York, NY','123457689','john_john'),('kushal_ag','Kushal Agrawal','Keerthi Royal Palms','9538179246','kushal'),('ninad_dighe','Ninad Dighe','B-211, VRR Nest, Lavakusha Nagar, Konappana Agrahara','9301732558','ninad123'),('parth_sach','Parth','B-211, VRR Nest, Lavakusha Nagar, Konappana Agrahara','9993904879','parth');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-03 19:25:01
