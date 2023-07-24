-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 02, 2023 at 03:37 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fileserver`
--

-- --------------------------------------------------------

--
-- Table structure for table `about`
--

CREATE TABLE `about` (
  `id` int(255) NOT NULL,
  `footer` text NOT NULL,
  `logo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` int(255) NOT NULL,
  `comp_id` int(255) NOT NULL,
  `comp_name` text NOT NULL,
  `comp_location` text NOT NULL,
  `comp_tel` text NOT NULL,
  `comp_mail` text NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `comp_id`, `comp_name`, `comp_location`, `comp_tel`, `comp_mail`, `created_at`) VALUES
(6, 3, 'Dodo', 'Kuba', '', '', '0000-00-00'),
(9, 33, 'Twibu', 'Ada', '', '', '0000-00-00'),
(42, 54149, 'qsq', 'qwq', 'qwq', 'qwqw', '2023-03-25'),
(50, 2590, 'sasbb', 'asggg', '1234567890101', 's@gm.com', '2023-04-14');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(255) NOT NULL,
  `dept_id` int(255) NOT NULL,
  `comp_id` bigint(255) NOT NULL,
  `dept_name` text NOT NULL,
  `dept_location` text NOT NULL,
  `dept_mail` text NOT NULL,
  `tel` text NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `dept_id`, `comp_id`, `dept_name`, `dept_location`, `dept_mail`, `tel`, `created_at`) VALUES
(9, 3223, 55, 'Sola', 'Accra', 'dd@gmai.vom', '00087666', '2024-03-08'),
(20, 58260, 0, 'sooa', 'accra', 'ad@gmal.com', '12345', '2023-03-29'),
(21, 17794, 54149, 'dasass', 'Budoo', 'a@s.com', '1234567890', '2023-04-13'),
(22, 3293, 0, 'gf', 'qqw', 'a@s.com', '09876555gg', '2023-04-14'),
(23, 39541, 54149, 'ggg', 'qqw', 'a@s.com', '1234567890', '2023-04-14'),
(24, 84361, 2590, 'rwrwsds', 's', 'sdf', '1234567890', '2023-04-14');

-- --------------------------------------------------------

--
-- Table structure for table `downloads`
--

CREATE TABLE `downloads` (
  `id` int(255) NOT NULL,
  `userId` int(255) NOT NULL,
  `fileId` text NOT NULL,
  `fileType` text NOT NULL,
  `comp_id` bigint(255) NOT NULL,
  `dept_id` bigint(255) NOT NULL,
  `email` text NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `downloads`
--

INSERT INTO `downloads` (`id`, `userId`, `fileId`, `fileType`, `comp_id`, `dept_id`, `email`, `created_at`) VALUES
(1, 0, 'i2KhRqPY1OM0m4zcy7el29xjN', '.jpg', 0, 0, '', '2023-06-13'),
(2, 54963, 'eJaJSww0WOCkyoisnD6d2w2dn', '.jpg', 3223, 54149, '0720000312@ttu.edu.gh', '2023-06-13'),
(3, 54963, 'i2KhRqPY1OM0m4zcy7el29xjN', '.jpg', 3223, 54149, '0720000312@ttu.edu.gh', '2023-06-14'),
(4, 54963, 'i2KhRqPY1OM0m4zcy7el29xjN', '.jpg', 3223, 54149, '0720000312@ttu.edu.gh', '2023-06-29'),
(5, 54963, 'i2KhRqPY1OM0m4zcy7el29xjN', '.jpg', 3223, 54149, '0720000312@ttu.edu.gh', '2023-06-29'),
(6, 54963, 'i2KhRqPY1OM0m4zcy7el29xjN', '.jpg', 3223, 54149, '0720000312@ttu.edu.gh', '2023-06-29');

-- --------------------------------------------------------

--
-- Table structure for table `error_logs`
--

CREATE TABLE `error_logs` (
  `id` int(255) NOT NULL,
  `log_id` bigint(20) NOT NULL,
  `gmail` text NOT NULL,
  `password` text NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `error_logs`
--

INSERT INTO `error_logs` (`id`, `log_id`, `gmail`, `password`, `created_at`) VALUES
(1, 36211, '0720000312@ttu.edu.gh', 'ama', '2023-06-13'),
(2, 29548, '0720000312@ttu.edu.gh', 'ama', '2023-06-13'),
(3, 2900, '0720000312@ttu.edu.gh', 'ama', '2023-06-13'),
(4, 16990, '0720000312@ttu.edu.gh', 'ama', '2023-06-13');

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(255) NOT NULL,
  `fileId` text NOT NULL,
  `comp_id` int(255) NOT NULL,
  `dept_id` int(255) NOT NULL,
  `description` text NOT NULL,
  `fileName` text NOT NULL,
  `fileSize` bigint(255) NOT NULL,
  `fileType` text NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `fileId`, `comp_id`, `dept_id`, `description`, `fileName`, `fileSize`, `fileType`, `created_at`) VALUES
(830, 'yiwd2oKkbE463yGl80ph5aEA1', 33, 3223, 'Audio', 'Mavado_-_Forever_(Audio)(128k).mp3', 3029506, '.mp3', '2023-04-09'),
(831, 'G7dX9kfVdkg8QAu6vzqOoVatw', 77438, 532, 'video', 'mango.mp4', 217176, '.mp4', '2023-04-09'),
(832, 'i2KhRqPY1OM0m4zcy7el29xjN', 77438, 58260, 'Picture', 'NJMYSQL.jpg', 7115, '.jpg', '2023-04-09'),
(833, '5GE356qvMD4mbcfdc8yHEFGnC', 33, 3325, 'Gif', 'Final2 (1).gif', 13876866, '.gif', '2023-04-09'),
(834, 'wxAA1mZYuYzYPZkMEUoeMbMys', 3, 23, 'Audio 2', 'Tommy_Lee_Sparta_-_Procreator_(Official_Audio)(128k).mp3', 2770371, '.mp3', '2023-04-09'),
(835, 'eJaJSww0WOCkyoisnD6d2w2dn', 33, 532, 'Image 2', 'desktop-wallpaper-code-on-dog-programming-minimal.jpg', 10371, '.jpg', '2023-04-09');

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(255) NOT NULL,
  `log_id` int(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `log_id`, `user_id`, `created_at`) VALUES
(1, 51253, 18180, '2023-04-14'),
(2, 50301, 18180, '2023-04-14'),
(3, 44696, 18180, '2023-04-14'),
(4, 91305, 18180, '2023-04-14'),
(5, 39779, 18180, '2023-06-13'),
(6, 22249, 18180, '2023-06-13'),
(7, 16523, 54963, '2023-06-13'),
(8, 53204, 54963, '2023-06-13'),
(9, 69216, 54963, '2023-06-13'),
(10, 65717, 54963, '2023-06-13'),
(11, 68718, 54963, '2023-06-13'),
(12, 75591, 54963, '2023-06-14'),
(13, 55965, 54963, '2023-06-16'),
(14, 72123, 54963, '2023-06-17'),
(15, 37977, 54963, '2023-06-17'),
(16, 48695, 54963, '2023-06-17'),
(17, 14845, 54963, '2023-06-17'),
(18, 23991, 54963, '2023-06-17'),
(19, 50107, 54963, '2023-06-17'),
(20, 64937, 54963, '2023-06-17'),
(21, 72477, 54963, '2023-06-17'),
(22, 23273, 54963, '2023-06-17'),
(23, 7870, 54963, '2023-06-17'),
(24, 90467, 54963, '2023-06-17'),
(25, 30453, 54963, '2023-06-17'),
(26, 88965, 54963, '2023-06-17'),
(27, 65762, 54963, '2023-06-17'),
(28, 27958, 54963, '2023-06-17'),
(29, 62142, 54963, '2023-06-17'),
(30, 21537, 54963, '2023-06-17'),
(31, 51052, 54963, '2023-06-29'),
(32, 34788, 54963, '2023-06-29'),
(33, 53962, 18180, '2023-06-29'),
(34, 62199, 54963, '2023-06-30'),
(35, 38353, 54963, '2023-06-30'),
(36, 96429, 54963, '2023-06-30'),
(37, 74483, 54963, '2023-06-30');

-- --------------------------------------------------------

--
-- Table structure for table `share`
--

CREATE TABLE `share` (
  `id` int(255) NOT NULL,
  `userId` int(255) NOT NULL,
  `fileType` text NOT NULL,
  `fileId` int(255) NOT NULL,
  `comp_id` bigint(255) NOT NULL,
  `dept_id` bigint(255) NOT NULL,
  `receiver` text NOT NULL,
  `downloaded_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `share`
--

INSERT INTO `share` (`id`, `userId`, `fileType`, `fileId`, `comp_id`, `dept_id`, `receiver`, `downloaded_at`) VALUES
(1, 333, '.png', 232, 233, 111, 'a@gmail.com', '2023-04-12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `userId` int(255) NOT NULL,
  `userName` text NOT NULL,
  `gmail` text NOT NULL,
  `password` longtext NOT NULL,
  `role` int(255) NOT NULL,
  `dept_id` bigint(255) NOT NULL,
  `comp_id` bigint(255) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userId`, `userName`, `gmail`, `password`, `role`, `dept_id`, `comp_id`, `created_at`) VALUES
(904, 27603, 'Paul12', 'oseiagyeiwaa@yahoo.com', 'Ama123456', 0, 3325, 33, '2023-04-05'),
(905, 24610, 'Polo12', 'abc@yahoo.com', 'Abc123456', 0, 58260, 54149, '2023-04-05'),
(911, 54963, 'Olog1234', '0720000312@ttu.edu.gh', '$2a$10$wGdjaI6ZLBK9uEziDGwN6eaDz/uKaGx6mQjYuW.rxEf6uoUy3eDtK', 0, 3223, 54149, '2023-04-11'),
(912, 18180, 'Daniel12', 'admin@gmail.com', '$2a$10$wGdjaI6ZLBK9uEziDGwN6eaDz/uKaGx6mQjYuW.rxEf6uoUy3eDtK', 1, 0, 0, '2023-04-13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about`
--
ALTER TABLE `about`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `downloads`
--
ALTER TABLE `downloads`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `error_logs`
--
ALTER TABLE `error_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `share`
--
ALTER TABLE `share`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about`
--
ALTER TABLE `about`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `downloads`
--
ALTER TABLE `downloads`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `error_logs`
--
ALTER TABLE `error_logs`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=838;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `share`
--
ALTER TABLE `share`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=913;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
