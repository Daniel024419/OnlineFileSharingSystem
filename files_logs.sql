-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 09, 2023 at 09:26 AM
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
-- Database: `files_logserver`
--

-- --------------------------------------------------------

--
-- Table structure for table `files_logs`
--

CREATE TABLE `files_logs` (
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
-- Dumping data for table `files_logs`
--

INSERT INTO `files_logs` (`id`, `fileId`, `comp_id`, `dept_id`, `description`, `fileName`, `fileSize`, `fileType`, `created_at`) VALUES
(1, 'uv0Tg2ZAXt47yDG4BXoVBgvjm', 3, 3325, 'New file from paul', 'recorded-video.webm', 1938545, '.webm', '2023-09-04'),
(2, 'bgrAA0CTtOnvkAprXsoMOVOEl', 33, 97318, 'Somo Seal', 'COVER PAGE.pdf', 8783, '.pdf', '2023-09-04'),
(3, 'j0ffql9CKksWm0wVVvf2wNm6l', 3, 3325, 'NEw Ser', 'CHAPTER 6  RECOMMENDATION.docx', 14126, '.docx', '2023-09-04'),
(4, 'sks9N9O0ckFeJbOiJznpqbFdY', 33, 97318, 'See Noo', 'COVER PAGE.docx', 13310, '.docx', '2023-09-04'),
(5, 'c6h4Q83kCAK9x4KNpv9XWcLks', 19177, 97318, 'Try Sms File', 'English Proficiency - Frank.pdf', 9288, '.pdf', '2023-09-05'),
(6, '3tCfUmyfIZWFBoRIwBv3vOjmA', 54149, 97318, 'Announcement', 'Attendance-Management-System-Project-Proposal.pdf', 95879, '.pdf', '2023-09-05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `files_logs`
--
ALTER TABLE `files_logs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `files_logs`
--
ALTER TABLE `files_logs`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
