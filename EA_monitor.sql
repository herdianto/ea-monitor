-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2018 at 02:57 PM
-- Server version: 10.1.25-MariaDB
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ea`
--

-- --------------------------------------------------------

--
-- Table structure for table `ea`
--

CREATE TABLE `ea` (
  `bot_id` varchar(25) NOT NULL,
  `name` varchar(100) NOT NULL,
  `last_beat` datetime NOT NULL,
  `last_check` datetime NOT NULL,
  `update_count` bigint(20) NOT NULL,
  `email_frequency` int(11) NOT NULL,
  `email_to` varchar(100) NOT NULL,
  `enable` enum('yes','no') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ea`
--

INSERT INTO `ea` (`bot_id`, `name`, `last_beat`, `last_check`, `update_count`, `email_frequency`, `email_to`, `enable`) VALUES
('umax_192.3.163.128', 'Umax VPS 1', '2018-10-16 19:53:45', '2018-10-16 19:54:27', 4, 7, 'herdi.16@gmail.com', 'yes');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ea`
--
ALTER TABLE `ea`
  ADD PRIMARY KEY (`bot_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

