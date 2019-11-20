-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 18, 2019 at 07:40 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

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
-- Table structure for table `classinfo`
--

CREATE TABLE `classinfo` (
  `ClassID` int(6) NOT NULL,
  `Lattitude` decimal(10,7) NOT NULL,
  `Longitude` decimal(20,16) NOT NULL,
  `Variance` decimal(10,7) NOT NULL,
  `StartTime` time NOT NULL,
  `EndTime` time NOT NULL,
  `WeekDays` char(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `classinfo`
--

INSERT INTO `classinfo` (`ClassID`, `Lattitude`, `Longitude`, `Variance`, `StartTime`, `EndTime`, `WeekDays`) VALUES
(510100, '36.8017408', '-119.7309952000000000', '0.0000000', '00:00:00', '23:59:59', 'MTUW'),
(510100, '36.8017408', '-119.7309952000000000', '0.0000000', '00:00:00', '23:59:59', 'THF');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
