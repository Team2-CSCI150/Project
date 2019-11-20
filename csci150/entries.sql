-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2019 at 02:14 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `entries`
--

CREATE TABLE `entries` (
  `StudentID` int(12) NOT NULL,
  `ClassID` int(6) NOT NULL,
  `AssignName` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `AssignType` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `MaxScore` float NOT NULL,
  `Attempted` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `entries`
--

INSERT INTO `entries` (`StudentID`, `ClassID`, `AssignName`, `AssignType`, `MaxScore`, `Attempted`) VALUES
(200100, 510100, 'Homework1', 'Assignment', 10, 10),
(200100, 510100, 'Homework2', 'Assignment', 10, 10),
(200100, 510100, 'Homework3', 'Assignment', 10, 9),
(200100, 510100, 'Quiz1', 'Quiz', 25, 22),
(200100, 510100, 'Exam1', 'Exam', 100, 89),
(200100, 510102, 'Homework1', 'Assignment', 10, 8),
(200100, 510102, 'Homework2', 'Assignment', 10, 7),
(200100, 510102, 'Essay1', 'Assignment', 25, 20),
(200100, 510102, 'Quiz1', 'Quiz', 20, 16),
(200100, 510102, 'Exam1', 'Exam', 100, 81),
(200100, 510103, 'Assignment1', 'Assignment', 15, 14),
(200100, 510103, 'Assignment2', 'Assignment', 15, 12),
(200100, 510103, 'Lab1', 'Assignment', 20, 18),
(200100, 510103, 'Lab2', 'Assignment', 20, 17),
(200100, 510103, 'Quiz1', 'Quiz', 30, 25),
(200100, 510104, 'Homework1', 'Assignment', 10, 8),
(200100, 510104, 'Homework2', 'Assignment', 10, 7),
(200100, 510104, 'Quiz1', 'Quiz', 20, 17),
(200100, 510104, 'Quiz2', 'Quiz', 20, 16),
(200100, 510104, 'Exam1', 'Exam', 100, 79),
(200101, 510101, 'Assignment1', 'Assignment', 10, 8),
(200101, 510101, 'Assignment2', 'Assignment', 10, 7),
(200101, 510101, 'Assignment3', 'Assignment', 10, 9),
(200101, 510101, 'Essay1', 'Assignment', 30, 28),
(200101, 510101, 'Exam1', 'Exam', 100, 90),
(200101, 510102, 'Homework1', 'Assignment', 10, 7),
(200101, 510102, 'Homework2', 'Assignment', 10, 7),
(200101, 510102, 'Essay1', 'Assignment', 25, 22),
(200101, 510102, 'Quiz1', 'Quiz', 20, 17),
(200101, 510102, 'Exam1', 'Exam', 100, 88),
(200101, 510103, 'Assignment1', 'Assignment', 15, 10),
(200101, 510103, 'Assignment2', 'Assignment', 15, 11),
(200101, 510103, 'Lab1', 'Assignment', 20, 16),
(200101, 510103, 'Lab2', 'Assignment', 20, 15),
(200101, 510103, 'Quiz1', 'Quiz', 30, 24),
(200101, 510104, 'Homework1', 'Assignment', 10, 7),
(200101, 510104, 'Homework2', 'Assignment', 10, 8),
(200101, 510104, 'Quiz1', 'Quiz', 20, 19),
(200101, 510104, 'Quiz2', 'Quiz', 20, 18),
(200101, 510104, 'Exam1', 'Exam', 100, 91),
(200102, 510101, 'Assignment1', 'Assigment', 10, 5),
(200102, 510101, 'Assignment2', 'Assignment', 10, 6),
(200102, 510101, 'Assignment3', 'Assignment', 10, 7),
(200102, 510101, 'Essay1', 'Essay', 30, 20),
(200102, 510101, 'Exam1', 'Exam', 100, 75),
(200102, 510102, 'Homework1', 'Assignment', 10, 7),
(200102, 510102, 'Homework2', 'Assignment', 10, 6),
(200102, 510102, 'Essay1', 'Assignment', 25, 18),
(200102, 510102, 'Quiz1', 'Quiz', 20, 15),
(200102, 510102, 'Exam1', 'Exam', 100, 77),
(200102, 510103, 'Assignment1', 'Assignment', 15, 13),
(200102, 510103, 'Assignment2', 'Assignment', 15, 12),
(200102, 510103, 'Lab1', 'Assignment', 20, 18),
(200102, 510103, 'Lab2', 'Assignment', 20, 16),
(200102, 510103, 'Quiz1', 'Quiz', 30, 26),
(200102, 510104, 'Homework1', 'Assignment', 10, 10),
(200102, 510104, 'Homework2', 'Assignment', 10, 9),
(200102, 510104, 'Quiz1', 'Quiz', 20, 17),
(200102, 510104, 'Quiz2', 'Quiz', 20, 18),
(200102, 510104, 'Exam1', 'Exam', 100, 87),
(200103, 510100, 'Homework1', 'Assignment', 10, 10),
(200103, 510100, 'Homework2', 'Assignment', 10, 9),
(200103, 510100, 'Homework3', 'Assignment', 10, 9),
(200103, 510100, 'Quiz1', 'Quiz', 25, 25),
(200103, 510100, 'Exam1', 'Exam', 100, 99),
(200103, 510101, 'Assignment1', 'Assigment', 10, 10),
(200103, 510101, 'Assignment2', 'Assignment', 10, 10),
(200103, 510101, 'Assignment3', 'Assignment', 10, 10),
(200103, 510101, 'Essay1', 'Assignment', 30, 29),
(200103, 510101, 'Exam1', 'Exam', 100, 98),
(200103, 510102, 'Homework1', 'Assignment', 10, 9),
(200103, 510102, 'Homework2', 'Assignment', 10, 10),
(200103, 510102, 'Essay1', 'Assignment', 25, 22),
(200103, 510102, 'Quiz1', 'Quiz', 20, 19),
(200103, 510102, 'Exam1', 'Exam', 100, 99),
(200103, 510103, 'Assignment1', 'Assignment', 15, 15),
(200103, 510103, 'Assignment2', 'Assignment', 15, 15),
(200103, 510103, 'Lab1', 'Assignment', 20, 19),
(200103, 510103, 'Lab2', 'Assignment', 20, 19),
(200103, 510103, 'Quiz1', 'Quiz', 30, 30);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
