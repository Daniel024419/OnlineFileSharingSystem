-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2023 at 11:18 AM
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
  `ComP_Ucod` text NOT NULL,
  `comp_location` text NOT NULL,
  `comp_tel` text NOT NULL,
  `comp_mail` text NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `comp_id`, `comp_name`, `ComP_Ucod`, `comp_location`, `comp_tel`, `comp_mail`, `created_at`) VALUES
(9, 3, 'Twibu', '985366SDA', 'Accra', 'Ada', '06534366333', '0000-00-00'),
(42, 54149, 'qsq', 'AWISDEFR4', 'qwq', 'qwq', 'qwqw', '2023-03-25'),
(50, 259, 'sasb', '', 'asggg', '1234567890101', 's@gm.com', '2023-04-14'),
(51, 19177, 'TTU NEW', 'VA2X2CKBS1', 'TAKORADI', '0234662234', 'edu@edu.gh', '2023-09-05');

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
(1, 97318, 3, 'New updated new', 'Aseey new', 'new@d.com', '0547654376', '2023-08-30'),
(2, 29833, 54149, 'Aseey', 'eeeeeee', 'a@d.com', '0547654376', '2023-08-30'),
(3, 94685, 3, 'New Dept', 'Budoo', 'a@s.com', '+233269264768', '2023-09-06');

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
(1, 32077, 'eJaJSww0WOCkyoisnD6d2w2dn', '.jpg', 3325, 3, 'danielpmensah926@gmail.com', '2023-08-30'),
(2, 32077, '0oGAsU7Dlgbo2gkDKNMa0ebOU', '.jfif', 3325, 3, 'danielpmensah926@gmail.com', '2023-08-30'),
(3, 32077, '0oGAsU7Dlgbo2gkDKNMa0ebOU', '.jfif', 3, 3, 'danielpmensah926@gmail.com', '2023-08-30'),
(4, 0, '0gG7q4kYUajmcFBGw4CcVNMG7ee', '.jpeg', 0, 0, '', '2023-09-09'),
(5, 32077, '3PjMp1e8Usv6ZS0TrMANLKHn2', '.jpeg', 3325, 3, 'danielpmensah926@gmail.com', '2023-09-09'),
(6, 32077, '3PjMp1e8Usv6ZS0TrMANLeeKHn2', '.jpeg', 3325, 3, 'danielpmensah926@gmail.com', '2023-09-12');

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
(1, 82735, 'danielpmensah926@gmail.com', 'admin', '2023-09-04'),
(2, 96116, 'danielpmensah926@gmail.com', 'admin', '2023-09-04');

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
(24, '3PjMp1e8Usv6ZS0TrMANLeeKHn2', 3, 97318, 'Asee', 'WhatsApp Image 2023-09-04 at 11.44.53 PM.jpeg', 43005, '.jpeg', '2023-09-09'),
(25, 'PusKeeCDOTy80FU7Pqb8nm06r', 3, 97318, 'Aees', 'recorded-video.webm', 1938545, '.webm', '2023-09-09');

-- --------------------------------------------------------

--
-- Table structure for table `files_logs`
--

CREATE TABLE `files_logs` (
  `id` int(255) NOT NULL,
  `fileId` text NOT NULL,
  `comp_id` text NOT NULL,
  `dept_id` text NOT NULL,
  `description` text NOT NULL,
  `fileName` text NOT NULL,
  `fileSize` bigint(255) NOT NULL,
  `fileType` text NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(11, 79599, 32077, '2023-08-30'),
(12, 75658, 32077, '2023-09-04'),
(13, 13095, 32077, '2023-09-04'),
(14, 45405, 32077, '2023-09-04'),
(15, 99730, 32077, '2023-09-04'),
(16, 17370, 32077, '2023-09-04'),
(17, 64650, 32077, '2023-09-04'),
(18, 55499, 32077, '2023-09-04'),
(19, 5841, 32077, '2023-09-04'),
(20, 24004, 32077, '2023-09-04'),
(21, 10861, 32077, '2023-09-04'),
(22, 11387, 32077, '2023-09-04'),
(23, 66112, 32077, '2023-09-04'),
(24, 77359, 32077, '2023-09-04'),
(25, 62353, 32077, '2023-09-04'),
(26, 59546, 32077, '2023-09-04'),
(27, 592, 32077, '2023-09-04'),
(28, 97016, 32077, '2023-09-04'),
(29, 8259, 32077, '2023-09-04'),
(30, 75138, 32077, '2023-09-04'),
(31, 95342, 32077, '2023-09-04'),
(32, 34806, 32077, '2023-09-04'),
(33, 9354, 32077, '2023-09-04'),
(34, 29479, 32077, '2023-09-04'),
(35, 86948, 32077, '2023-09-04'),
(36, 27091, 32077, '2023-09-04'),
(37, 15981, 32077, '2023-09-04'),
(38, 94871, 32077, '2023-09-04'),
(39, 83820, 32077, '2023-09-04'),
(40, 21063, 32077, '2023-09-04'),
(41, 94718, 32077, '2023-09-04'),
(42, 92809, 32077, '2023-09-05'),
(43, 66176, 32077, '2023-09-05'),
(44, 72956, 32077, '2023-09-05'),
(45, 72425, 32077, '2023-09-05'),
(46, 16751, 32077, '2023-09-05'),
(47, 90413, 32077, '2023-09-05'),
(48, 94483, 32077, '2023-09-05'),
(49, 19016, 32077, '2023-09-05'),
(50, 74683, 32077, '2023-09-05'),
(51, 24624, 32077, '2023-09-05'),
(52, 52221, 32077, '2023-09-05'),
(53, 75757, 32077, '2023-09-05'),
(54, 77844, 32077, '2023-09-05'),
(55, 34213, 32077, '2023-09-05'),
(56, 51561, 32077, '2023-09-05'),
(57, 36736, 32077, '2023-09-05'),
(58, 37484, 32077, '2023-09-05'),
(59, 23460, 32077, '2023-09-05'),
(60, 98337, 32077, '2023-09-05'),
(61, 37022, 32077, '2023-09-05'),
(62, 48103, 32077, '2023-09-05'),
(63, 48560, 32077, '2023-09-05'),
(64, 57760, 32077, '2023-09-05'),
(65, 96878, 32077, '2023-09-05'),
(66, 879, 32077, '2023-09-05'),
(67, 53144, 32077, '2023-09-05'),
(68, 16793, 32077, '2023-09-05'),
(69, 82612, 32077, '2023-09-05'),
(70, 13386, 32077, '2023-09-05'),
(71, 60842, 32077, '2023-09-05'),
(72, 18958, 32077, '2023-09-05'),
(73, 79667, 32077, '2023-09-05'),
(74, 58807, 32077, '2023-09-05'),
(75, 35860, 32077, '2023-09-05'),
(76, 29977, 32077, '2023-09-05'),
(77, 7868, 32077, '2023-09-05'),
(78, 52672, 32077, '2023-09-05'),
(79, 93698, 32077, '2023-09-05'),
(80, 94604, 32077, '2023-09-05'),
(81, 7317, 32077, '2023-09-05'),
(82, 63473, 32077, '2023-09-05'),
(83, 20493, 32077, '2023-09-05'),
(84, 25963, 32077, '2023-09-05'),
(85, 8317, 32077, '2023-09-05'),
(86, 12607, 32077, '2023-09-05'),
(87, 84834, 32077, '2023-09-05'),
(88, 99228, 32077, '2023-09-05'),
(89, 15359, 32077, '2023-09-05'),
(90, 55900, 32077, '2023-09-05'),
(91, 62164, 32077, '2023-09-05'),
(92, 18421, 32077, '2023-09-05'),
(93, 29712, 32077, '2023-09-05'),
(94, 16628, 32077, '2023-09-05'),
(95, 36288, 32077, '2023-09-05'),
(96, 22904, 32077, '2023-09-05'),
(97, 98614, 32077, '2023-09-05'),
(98, 29800, 32077, '2023-09-05'),
(99, 40681, 32077, '2023-09-05'),
(100, 86041, 32077, '2023-09-05'),
(101, 45187, 32077, '2023-09-05'),
(102, 57985, 32077, '2023-09-05'),
(103, 66903, 32077, '2023-09-06'),
(104, 38081, 32077, '2023-09-06'),
(105, 92166, 32077, '2023-09-06'),
(106, 90414, 32077, '2023-09-06'),
(107, 39706, 32077, '2023-09-06'),
(108, 63366, 32077, '2023-09-06'),
(109, 62679, 32077, '2023-09-06'),
(110, 42963, 32077, '2023-09-06'),
(111, 90703, 32077, '2023-09-06'),
(112, 34097, 32077, '2023-09-06'),
(113, 1025, 32077, '2023-09-06'),
(114, 22308, 32077, '2023-09-06'),
(115, 47017, 32077, '2023-09-06'),
(116, 46455, 32077, '2023-09-06'),
(117, 48558, 32077, '2023-09-06'),
(118, 39596, 32077, '2023-09-06'),
(119, 61190, 32077, '2023-09-06'),
(120, 19805, 32077, '2023-09-06'),
(121, 91253, 32077, '2023-09-09'),
(122, 94902, 32077, '2023-09-09'),
(123, 46764, 32077, '2023-09-09'),
(124, 75460, 32077, '2023-09-09'),
(125, 28992, 32077, '2023-09-09'),
(126, 83870, 32077, '2023-09-09'),
(127, 26832, 32077, '2023-09-09'),
(128, 5102, 32077, '2023-09-09'),
(129, 71621, 32077, '2023-09-09'),
(130, 49220, 32077, '2023-09-09'),
(131, 24148, 32077, '2023-09-09'),
(132, 27120, 32077, '2023-09-09'),
(133, 45435, 32077, '2023-09-09'),
(134, 2119, 32077, '2023-09-09'),
(135, 56356, 32077, '2023-09-09'),
(136, 38833, 32077, '2023-09-09'),
(137, 81323, 32077, '2023-09-09'),
(138, 85715, 32077, '2023-09-09'),
(139, 95712, 32077, '2023-09-09'),
(140, 12506, 32077, '2023-09-09'),
(141, 93776, 32077, '2023-09-09'),
(142, 49501, 32077, '2023-09-09'),
(143, 30524, 32077, '2023-09-09'),
(144, 6190, 32077, '2023-09-09'),
(145, 6085, 32077, '2023-09-09'),
(146, 39964, 32077, '2023-09-09'),
(147, 67412, 32077, '2023-09-09'),
(148, 40947, 32077, '2023-09-09'),
(149, 15119, 32077, '2023-09-09'),
(150, 71501, 32077, '2023-09-09'),
(151, 2992, 32077, '2023-09-09'),
(152, 94824, 32077, '2023-09-09'),
(153, 56463, 32077, '2023-09-09'),
(154, 82256, 32077, '2023-09-09'),
(155, 6993, 32077, '2023-09-09'),
(156, 26432, 32077, '2023-09-09'),
(157, 7015, 32077, '2023-09-09'),
(158, 78370, 32077, '2023-09-09'),
(159, 32310, 32077, '2023-09-09'),
(160, 95371, 32077, '2023-09-09'),
(161, 94766, 32077, '2023-09-09'),
(162, 53121, 32077, '2023-09-09'),
(163, 58239, 32077, '2023-09-09'),
(164, 71167, 32077, '2023-09-09'),
(165, 40152, 32077, '2023-09-09'),
(166, 9676, 32077, '2023-09-09'),
(167, 62776, 32077, '2023-09-09'),
(168, 14016, 32077, '2023-09-09'),
(169, 13745, 32077, '2023-09-09'),
(170, 48766, 32077, '2023-09-09'),
(171, 70357, 32077, '2023-09-09'),
(172, 44442, 32077, '2023-09-09'),
(173, 16171, 32077, '2023-09-09'),
(174, 13278, 32077, '2023-09-09'),
(175, 30216, 32077, '2023-09-09'),
(176, 29450, 32077, '2023-09-09'),
(177, 39370, 32077, '2023-09-12');

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
  `tel` text NOT NULL,
  `role` int(255) NOT NULL,
  `dept_id` bigint(255) NOT NULL,
  `comp_id` bigint(255) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userId`, `userName`, `gmail`, `password`, `tel`, `role`, `dept_id`, `comp_id`, `created_at`) VALUES
(904, 27603, 'Paul12', 'oseiagyeiwaa@yahoo.com', 'Ama123456', '', 0, 3325, 33, '2023-04-05'),
(911, 54963, 'Olog1234', '0720000312@ttu.edu.gh', '$2a$10$wGdjaI6ZLBK9uEziDGwN6eaDz/uKaGx6mQjYuW.rxEf6uoUy3eDtK', '', 0, 3223, 54149, '2023-04-11'),
(912, 18180, 'Daniel12', 'admin@gmail.com', '$2a$10$wGdjaI6ZLBK9uEziDGwN6eaDz/uKaGx6mQjYuW.rxEf6uoUy3eDtK', '', 1, 0, 0, '2023-04-13'),
(913, 32077, 'Daniel024419', 'danielpmensah926@gmail.com', '$2a$10$590UuhlLG4zhPxpG9GGH6OEFmVKCc.pWdeTqa3Ere7hod.N5.qkDi', '', 0, 3325, 3, '2023-08-30'),
(914, 78506, 'Daniel93', 'new@gmail.com', '$2a$10$otnFQMmtnWFFX/21m5zIoO3KH6hpPNw94FkFHiEJxT5cLLseEwuCO', '0547901448', 0, 97318, 54149, '2023-09-04'),
(915, 38893, 'danielpmensah926@gmail.com', 'oseiagyeiwaa@yahoo.com', '$2a$10$IksrSsy93uPPys7o3iPnfucje/nu61Vhc//nT3dG7yYap3d2i7202', '0244868409', 1, 532, 0, '2023-09-05'),
(917, 46909, '@gmail.com', 'su.go.com', '$2a$10$yMIZW0JkKOnwFSLHi.Xvf.xkghfLGR/3TPu1z2SbvxDLSXM8HdU5K', '0547901448', 2, 41, 0, '2023-09-05'),
(919, 19316, 'daniel.forson', 'danielforson27@gmail.com', '$2a$10$RDJFxbTEYksQh41f8ql/LemeejN/byFXVnJAR5IIv5OF7DtrhluGm', '0553494453', 2, 3325, 3, '2023-09-05'),
(928, 60041, '3A@gmail.com', '23@gmail.com', '$2a$10$sZPcsrUa6KAX28ELQ6c1M.YX6Y.5c4/Q1LpXOree4ZNVobd9xrOyu', '+233269264768', 0, 97318, 3, '2023-09-07'),
(929, 95275, '3A@gmail.com', '23@gmail.com', '$2a$10$uMBq1sk4kuPTqeBwLrbSaOos2uwb9aGn7D1o/lwoAytCOnbhKaXD2', '+233269264768', 0, 97318, 3, '2023-09-07'),
(932, 60627, '3A@gmail.com', '23@gmail.com', '$2a$10$NWaBS3KP6ozsLkihsqJ2Xew5g5omwA/Ok07dEUy1xudTbDhCF4foa', '+233269264768', 0, 97318, 3, '2023-09-07'),
(933, 94914, 'danielpmensah926@gmail.com', 'd6@gmail.com', '$2a$10$/DWGvujsZo/UTWuxL4VT0u4VJzg9TFTXSTBZMVnFfgqVt2s6IsG5m', '+233269264768', 0, 29833, 3, '2023-09-07'),
(934, 67349, 'A2@gmail.com', 'a@yahoo.com', '$2a$10$jS7IeawPGQK2aKFDJRqHROgXvQJqcgi/x8VyTvKDwoorKOiSi2DHe', '0244868409', 0, 97318, 3, '2023-09-07'),
(935, 40120, 'Aq22@gmail.com', 'qww@gmail.com', '$2a$10$XrLgPNdxlX3lavxuhi7ZKu62dPjnO.h7LT.LuLh/kDJqctcx8JDFK', '+233269264768', 0, 97318, 3, '2023-09-07'),
(936, 25347, 'A23@gmail.com', 'da@gmail.com', '$2a$10$LNA8bUOrwISfETrPs9XoFuDlVOIqTQu533j6Gpoxt1P2ycLU/3ndS', '+233269264768', 0, 97318, 3, '2023-09-07');

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
-- Indexes for table `files_logs`
--
ALTER TABLE `files_logs`
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
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `downloads`
--
ALTER TABLE `downloads`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `error_logs`
--
ALTER TABLE `error_logs`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `files_logs`
--
ALTER TABLE `files_logs`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;

--
-- AUTO_INCREMENT for table `share`
--
ALTER TABLE `share`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=937;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
