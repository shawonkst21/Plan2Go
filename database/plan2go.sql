-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2025 at 02:20 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `plan2go`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(1, 'john_doe', 'john@example.com', '$2a$14$qME.SmX81PzxgAImgq7lH.BgWQ1DTQmbUO/ot.GtsYw63boOZ8Gyi', '2025-11-14 13:20:55'),
(4, 'shawon', 'john123@example.com', '$2a$14$mOb5EaVaBYyPrXCYt016.OxIsu76EJYLlO/32rvI1uxQaJIdI6OV6', '2025-11-14 13:42:14'),
(5, 'shawon hosan', 'john12443@example.com', '$2a$14$.grlHGgTsLQV4G0KM9jMYO4EUI68j4316iRyMwUJr49sfMtOqMNxu', '2025-11-14 14:56:18'),
(7, 'shawon hosan nirob', 'john12gg4435@example.com', '$2a$14$zqocBJPHpU9bhyVWFnvsbePzQQQALXPukkQt.ad40QFTmoWe0qNs6', '2025-11-14 15:01:09'),
(8, 'shawon hosan nirob jjjj', 'john12gg4j435@example.com', '$2a$14$djbsZHFr5DfrTDukuIX8SeiguWtIZbYKuKAZqhtRInMdz80Ml.Apq', '2025-11-14 15:10:59'),
(9, 'shawon hosan nirob jjjj kalu', 'john12gg4j4f35@example.com', '$2a$14$jar4vNM/rEHSStRDzPjm4e8QtVRT7p54nX9mpO9/3N2xPC0Y1CNue', '2025-11-14 15:20:00'),
(11, 'shawon nafi', 'shawon@example.com', '$2a$14$MeMlIaJ/AFpMfzt4vTD8Me/ZKPtDWfP4tL4MeEIOVtrXh2J8AmzKu', '2025-11-16 09:05:18'),
(13, 'shawon hhyyy nafi', 'shawo3n@example.com', '$2a$14$lNkIvBQXbl8CM67DRIJFfOMj1hmoFlNSRD7QrsG96J5WylwamO9O6', '2025-11-16 11:45:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
