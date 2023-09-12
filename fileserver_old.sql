-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 30, 2023 at 05:30 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `comp_id`, `comp_name`, `comp_location`, `comp_tel`, `comp_mail`, `created_at`) VALUES
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `dept_id`, `comp_id`, `dept_name`, `dept_location`, `dept_mail`, `tel`, `created_at`) VALUES
(1, 97318, 33, 'New Department', 'Aseey', 'a@d.com', '0547654376', '2023-08-30'),
(2, 29833, 54149, 'Aseey', 'eeeeeee', 'a@d.com', '0547654376', '2023-08-30');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `downloads`
--

INSERT INTO `downloads` (`id`, `userId`, `fileId`, `fileType`, `comp_id`, `dept_id`, `email`, `created_at`) VALUES
(1, 32077, 'eJaJSww0WOCkyoisnD6d2w2dn', '.jpg', 3325, 3, 'danielpmensah926@gmail.com', '2023-08-30'),
(2, 32077, '0oGAsU7Dlgbo2gkDKNMa0ebOU', '.jfif', 3325, 3, 'danielpmensah926@gmail.com', '2023-08-30'),
(3, 32077, '0oGAsU7Dlgbo2gkDKNMa0ebOU', '.jfif', 3325, 3, 'danielpmensah926@gmail.com', '2023-08-30');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `fileId`, `comp_id`, `dept_id`, `description`, `fileName`, `fileSize`, `fileType`, `created_at`) VALUES
(835, 'eJaJSww0WOCkyoisnD6d2w2dn', 33, 532, 'Image 2', 'desktop-wallpaper-code-on-dog-programming-minimal.jpg', 10371, '.jpg', '2023-04-09'),
(845, '0oGAsU7Dlgbo2gkDKNMa0ebOU', 2590, 97318, 'New Files', 'download.jfif', 4508, '.jfif', '2023-08-30'),
(846, 'XlFtqXTQ83C68KWNG97ovH6Py', 2590, 97318, 'New file', 'download.jfif', 4508, '.jfif', '2023-08-30');

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(255) NOT NULL,
  `log_id` int(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `log_id`, `user_id`, `created_at`) VALUES
(1, 12300, 32077, '2023-08-30'),
(2, 69393, 32077, '2023-08-30'),
(3, 35627, 32077, '2023-08-30'),
(4, 44946, 32077, '2023-08-30'),
(5, 70500, 32077, '2023-08-30'),
(6, 65883, 32077, '2023-08-30'),
(7, 83552, 32077, '2023-08-30'),
(8, 27172, 32077, '2023-08-30'),
(9, 2157, 32077, '2023-08-30'),
(10, 92014, 32077, '2023-08-30'),
(11, 79599, 32077, '2023-08-30');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userId`, `userName`, `gmail`, `password`, `role`, `dept_id`, `comp_id`, `created_at`) VALUES
(904, 27603, 'Paul12', 'oseiagyeiwaa@yahoo.com', 'Ama123456', 0, 3325, 33, '2023-04-05'),
(911, 54963, 'Olog1234', '0720000312@ttu.edu.gh', '$2a$10$wGdjaI6ZLBK9uEziDGwN6eaDz/uKaGx6mQjYuW.rxEf6uoUy3eDtK', 0, 3223, 54149, '2023-04-11'),
(912, 18180, 'Daniel12', 'admin@gmail.com', '$2a$10$wGdjaI6ZLBK9uEziDGwN6eaDz/uKaGx6mQjYuW.rxEf6uoUy3eDtK', 1, 0, 0, '2023-04-13'),
(913, 32077, 'Daniel024419', 'danielpmensah926@gmail.com', '$2a$10$590UuhlLG4zhPxpG9GGH6OEFmVKCc.pWdeTqa3Ere7hod.N5.qkDi', 1, 3325, 3, '2023-08-30');

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
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `downloads`
--
ALTER TABLE `downloads`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `error_logs`
--
ALTER TABLE `error_logs`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=847;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `share`
--
ALTER TABLE `share`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=914;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
