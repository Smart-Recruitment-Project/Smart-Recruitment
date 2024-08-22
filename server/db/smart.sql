-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: placement
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `admin_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `contact_info` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `application_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `job_id` int DEFAULT NULL,
  `application_date` datetime DEFAULT NULL,
  `status` enum('pending','accepted','rejected') DEFAULT NULL,
  PRIMARY KEY (`application_id`),
  KEY `student_id` (`student_id`),
  KEY `job_id` (`job_id`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE,
  CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collegeemployees`
--

DROP TABLE IF EXISTS `collegeemployees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collegeemployees` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `college_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `contact_info` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `user_id` (`user_id`),
  KEY `college_id` (`college_id`),
  CONSTRAINT `collegeemployees_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `collegeemployees_ibfk_2` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`college_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collegeemployees`
--

LOCK TABLES `collegeemployees` WRITE;
/*!40000 ALTER TABLE `collegeemployees` DISABLE KEYS */;
/*!40000 ALTER TABLE `collegeemployees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colleges`
--

DROP TABLE IF EXISTS `colleges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colleges` (
  `college_id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int DEFAULT NULL,
  `college_name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`college_id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `colleges_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colleges`
--

LOCK TABLES `colleges` WRITE;
/*!40000 ALTER TABLE `colleges` DISABLE KEYS */;
/*!40000 ALTER TABLE `colleges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `company_id` int NOT NULL AUTO_INCREMENT,
  `college_id` int DEFAULT NULL,
  `added_by_employee_id` int DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `industry_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`company_id`),
  KEY `college_id` (`college_id`),
  KEY `added_by_employee_id` (`added_by_employee_id`),
  CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`college_id`) ON DELETE CASCADE,
  CONSTRAINT `companies_ibfk_2` FOREIGN KEY (`added_by_employee_id`) REFERENCES `collegeemployees` (`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companyemployees`
--

DROP TABLE IF EXISTS `companyemployees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companyemployees` (
  `company_employee_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `contact_info` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`company_employee_id`),
  KEY `user_id` (`user_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `companyemployees_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `companyemployees_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companyemployees`
--

LOCK TABLES `companyemployees` WRITE;
/*!40000 ALTER TABLE `companyemployees` DISABLE KEYS */;
/*!40000 ALTER TABLE `companyemployees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feeds`
--

DROP TABLE IF EXISTS `feeds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feeds` (
  `feed_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `feed_date` datetime DEFAULT NULL,
  `feed_content` text,
  PRIMARY KEY (`feed_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `feeds_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `collegeemployees` (`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feeds`
--

LOCK TABLES `feeds` WRITE;
/*!40000 ALTER TABLE `feeds` DISABLE KEYS */;
/*!40000 ALTER TABLE `feeds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `job_id` int NOT NULL AUTO_INCREMENT,
  `company_id` int DEFAULT NULL,
  `job_title` varchar(255) DEFAULT NULL,
  `job_description` text,
  `requirements` text,
  `posting_date` datetime DEFAULT NULL,
  `application_deadline` datetime DEFAULT NULL,
  PRIMARY KEY (`job_id`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `college_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `year_of_study` int DEFAULT NULL,
  `contact_info` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `user_id` (`user_id`),
  KEY `college_id` (`college_id`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `students_ibfk_2` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`college_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testresults`
--

DROP TABLE IF EXISTS `testresults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testresults` (
  `result_id` int NOT NULL AUTO_INCREMENT,
  `test_id` int DEFAULT NULL,
  `student_id` int DEFAULT NULL,
  `score` float DEFAULT NULL,
  `remarks` text,
  PRIMARY KEY (`result_id`),
  KEY `test_id` (`test_id`),
  KEY `student_id` (`student_id`),
  CONSTRAINT `testresults_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `tests` (`test_id`) ON DELETE CASCADE,
  CONSTRAINT `testresults_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testresults`
--

LOCK TABLES `testresults` WRITE;
/*!40000 ALTER TABLE `testresults` DISABLE KEYS */;
/*!40000 ALTER TABLE `testresults` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tests`
--

DROP TABLE IF EXISTS `tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tests` (
  `test_id` int NOT NULL AUTO_INCREMENT,
  `created_by` int DEFAULT NULL,
  `test_title` varchar(255) DEFAULT NULL,
  `test_description` text,
  `test_date` datetime DEFAULT NULL,
  PRIMARY KEY (`test_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `tests_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `collegeemployees` (`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tests`
--

LOCK TABLES `tests` WRITE;
/*!40000 ALTER TABLE `tests` DISABLE KEYS */;
/*!40000 ALTER TABLE `tests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Admin','CollegeEmployee','Student','CompanyEmployee') NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-22 13:48:20
