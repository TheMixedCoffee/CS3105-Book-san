-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 11, 2020 at 04:32 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `account_id` int(6) UNSIGNED ZEROFILL NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_id`, `username`, `password`, `isAdmin`) VALUES
(000001, 'booksan-admin', '*6BC7B23AC601346C17210344E1DD6A661293B004', 1),
(000002, 'admin', '$2b$10$Mk94NQFvQloSu3gZzeqYluqWQibYMMLpCYQsUybXdY2Wc2vPAGrUi', 1),
(000003, 'Paimon', '$2b$10$NypkLA0zxdopjcDfbmMcbORqDmYhrwAelKZbLI.xMbiNiqRsrHZqS', 1),
(000004, 'xd', '$2b$10$dJbXwQPPWnmTeIERYHn3z.xqk2UQRSRKUkcnq7Q.TiyibGfjpHrMi', 0);

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `item_id` int(6) UNSIGNED ZEROFILL NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `item_desc` text NOT NULL,
  `item_author` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`item_id`, `item_name`, `item_desc`, `item_author`) VALUES
(000041, 'Harry Partridge and the Prisoner of Afghanistan', 'Harry tries to save Osama Bin Laden from the CIA', ''),
(000042, 'Chebureki', 'Breeki', ''),
(000043, 'Testingers', 'tester', ''),
(000044, 'xd', 'xd', '');

-- --------------------------------------------------------

--
-- Table structure for table `item_variant`
--

CREATE TABLE `item_variant` (
  `item_id` int(6) UNSIGNED ZEROFILL NOT NULL,
  `variant_id` int(3) UNSIGNED ZEROFILL NOT NULL,
  `item_price` decimal(5,2) NOT NULL,
  `item_stock` int(6) NOT NULL,
  `isActive` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `item_variant`
--

INSERT INTO `item_variant` (`item_id`, `variant_id`, `item_price`, `item_stock`, `isActive`) VALUES
(000041, 001, '500.00', 10, 0),
(000042, 001, '321.00', 123, 0),
(000042, 002, '543.00', 123, 0),
(000042, 003, '66.00', 4, 0),
(000043, 001, '321.00', 123, 0),
(000043, 003, '123.00', 123, 0),
(000044, 001, '33.00', 1, 0),
(000044, 004, '23.00', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `order_t`
--

CREATE TABLE `order_t` (
  `order_id` int(6) UNSIGNED ZEROFILL NOT NULL,
  `account_id` int(6) UNSIGNED ZEROFILL NOT NULL,
  `item_id` int(6) UNSIGNED ZEROFILL NOT NULL,
  `variant_id` int(3) UNSIGNED ZEROFILL NOT NULL,
  `quantity` int(4) NOT NULL,
  `total_price` decimal(5,2) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `variant`
--

CREATE TABLE `variant` (
  `variant_id` int(3) UNSIGNED ZEROFILL NOT NULL,
  `variant_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `variant`
--

INSERT INTO `variant` (`variant_id`, `variant_name`) VALUES
(001, 'softbound'),
(002, 'hardbound'),
(003, 'jacketed'),
(004, 'pocket');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `item_variant`
--
ALTER TABLE `item_variant`
  ADD KEY `variant_fk` (`variant_id`),
  ADD KEY `item_fk` (`item_id`) USING BTREE;

--
-- Indexes for table `order_t`
--
ALTER TABLE `order_t`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `account_fk` (`account_id`),
  ADD KEY `item_fk2` (`item_id`),
  ADD KEY `variant_fk2` (`variant_id`);

--
-- Indexes for table `variant`
--
ALTER TABLE `variant`
  ADD PRIMARY KEY (`variant_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `account_id` int(6) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `item_id` int(6) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `order_t`
--
ALTER TABLE `order_t`
  MODIFY `order_id` int(6) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `variant`
--
ALTER TABLE `variant`
  MODIFY `variant_id` int(3) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `item_variant`
--
ALTER TABLE `item_variant`
  ADD CONSTRAINT `item_fk` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `variant_fk` FOREIGN KEY (`variant_id`) REFERENCES `variant` (`variant_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_t`
--
ALTER TABLE `order_t`
  ADD CONSTRAINT `account_fk` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `item_fk2` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `variant_fk2` FOREIGN KEY (`variant_id`) REFERENCES `variant` (`variant_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
