-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2019 at 02:13 AM
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
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `FirstName` char(20) COLLATE utf8mb4_bin NOT NULL,
  `LastName` char(20) COLLATE utf8mb4_bin NOT NULL,
  `StudentID` int(12) NOT NULL,
  `Class1ID` int(6) NOT NULL,
  `Class2ID` int(6) NOT NULL,
  `Class3ID` int(6) NOT NULL,
  `Class4ID` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`FirstName`, `LastName`, `StudentID`, `Class1ID`, `Class2ID`, `Class3ID`, `Class4ID`) VALUES
('John', 'John', 200100, 510100, 510102, 510103, 510104),
('Melissa', 'Johnson', 200101, 510101, 510102, 510103, 510104),
('David', 'Davidson', 200102, 510101, 510102, 510103, 510104),
('Caitlyn', 'Smith', 200103, 510100, 510101, 510102, 510103);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
