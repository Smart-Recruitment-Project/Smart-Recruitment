USE placement;

-- Disabling foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

-- Table structure for table `users`
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Admin','CollegeEmployee','Student','CompanyEmployee') NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `admins`
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `admin_id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `contact_info` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users` (`username`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `colleges`
DROP TABLE IF EXISTS `colleges`;
CREATE TABLE `colleges` (
  `college_id` int NOT NULL AUTO_INCREMENT,
  `admin_id` varchar(255) DEFAULT NULL,
  `college_name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`college_id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `colleges_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`admin_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `collegeemployees`
DROP TABLE IF EXISTS `collegeemployees`;
CREATE TABLE `collegeemployees` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `college_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `contact_info` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `username` (`username`),
  KEY `college_id` (`college_id`),
  CONSTRAINT `collegeemployees_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE,
  CONSTRAINT `collegeemployees_ibfk_2` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`college_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `companies`
DROP TABLE IF EXISTS `companies`;
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

-- Table structure for table `companyemployees`
DROP TABLE IF EXISTS `companyemployees`;
CREATE TABLE `companyemployees` (
  `company_employee_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `contact_info` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`company_employee_id`),
  KEY `username` (`username`),
  KEY `company_id` (`company_id`),
  CONSTRAINT `companyemployees_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE,
  CONSTRAINT `companyemployees_ibfk_2` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `students`
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `college_id` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `year_of_study` int DEFAULT NULL,
  `contact_info` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  KEY `username` (`username`),
  KEY `college_id` (`college_id`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE,
  CONSTRAINT `students_ibfk_2` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`college_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table structure for table `applications`
DROP TABLE IF EXISTS `applications`;
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

-- Table structure for table `jobs`
DROP TABLE IF EXISTS `jobs`;
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

-- Table structure for table `tests`
DROP TABLE IF EXISTS `tests`;
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

-- Table structure for table `testresults`
DROP TABLE IF EXISTS `testresults`;
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

-- Table structure for table `feeds`
DROP TABLE IF EXISTS `feeds`;
CREATE TABLE `feeds` (
  `feed_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int DEFAULT NULL,
  `feed_date` datetime DEFAULT NULL,
  `feed_content` text,
  PRIMARY KEY (`feed_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `feeds_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `collegeemployees` (`employee_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Enabling foreign key checks after creation
SET FOREIGN_KEY_CHECKS = 1;
