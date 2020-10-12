-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 12, 2020 at 11:03 AM
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
(000041, 'Harry Partridge and the Prisoner of Afghanistan', 'Harry tries to save Osama Bin Laden from the CIA', 'KJ Walking'),
(000042, 'Chebureki', 'Breeki', ''),
(000043, 'Testingers', 'tester', ''),
(000044, 'xd', 'xd', ''),
(000045, 'Diary of a Chad', 'Omega EZee', 'Chad Bradley'),
(000046, 'Diary of a Simpy Kid', 'Simpy', 'Kid'),
(000047, 'The Communist Manifesto', 'Thank you Jeff Bezos', 'Karl Marx'),
(000048, 'Harry Partridge and the Kidney Stone', 'Harry tries to live a healthy life but he encounters a kidney stone', 'KJ Walking'),
(000049, 'Harry Partridge and the Chamber of Terces', 'Harry Partridge enters a spooky dungeon to fight the slave master, Terces', 'KJ Walking'),
(000050, 'Harry Partridge and the Goblet of White Blood', 'Harry Partridge proves himself by obtaining the chalice of...', 'KJ Walking'),
(000051, 'Harry Partridge and the Order of the Slave Masters', 'Harry Partridge joins Osama Bin Laden in the Order of the Slave Masters', 'KJ Walking'),
(000052, 'Harry Partridge and the Half-Slave Master', 'Harry Partridge finds out that he is the Half-Slave Master, and must fulfill his destiny', 'KJ Walking'),
(000053, 'Harry Partridge and the Deathly Swallows', 'Harry Partridge realizes the his one true destiny is a risky endeavor', 'KJ Walking');

-- --------------------------------------------------------

--
-- Table structure for table `item_variant`
--

CREATE TABLE `item_variant` (
  `item_id` int(6) UNSIGNED ZEROFILL NOT NULL,
  `variant_id` int(3) UNSIGNED ZEROFILL NOT NULL,
  `item_price` decimal(10,2) NOT NULL,
  `item_stock` int(6) NOT NULL,
  `isActive` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `item_variant`
--

INSERT INTO `item_variant` (`item_id`, `variant_id`, `item_price`, `item_stock`, `isActive`) VALUES
(000041, 001, '500.00', 10, 1),
(000042, 001, '321.00', 123, 0),
(000042, 002, '543.00', 123, 0),
(000042, 003, '66.00', 4, 0),
(000043, 001, '321.00', 123, 0),
(000043, 003, '123.00', 123, 0),
(000044, 001, '33.00', 1, 0),
(000044, 004, '23.00', 1, 0),
(000045, 001, '500.00', 52, 1),
(000045, 002, '750.00', 11, 0),
(000046, 001, '500.00', 30, 1),
(000046, 002, '750.00', 10, 1),
(000046, 003, '999.99', 5, 1),
(000046, 004, '650.00', 5, 1),
(000047, 001, '500.00', 10, 1),
(000047, 002, '750.00', 5, 1),
(000047, 003, '1200.00', 5, 1),
(000048, 001, '500.00', 35, 1),
(000049, 001, '500.00', 50, 1),
(000049, 002, '750.00', 50, 1),
(000049, 004, '650.00', 50, 1),
(000050, 001, '500.00', 50, 1),
(000050, 002, '750.00', 50, 1),
(000051, 001, '500.00', 50, 1),
(000051, 002, '750.00', 20, 1),
(000052, 001, '500.00', 50, 1),
(000052, 002, '750.00', 30, 1),
(000053, 001, '500.00', 30, 1),
(000053, 002, '750.00', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `order_line`
--

CREATE TABLE `order_line` (
  `order_id` int(6) UNSIGNED ZEROFILL NOT NULL,
  `item_id` int(6) UNSIGNED ZEROFILL NOT NULL,
  `variant_id` int(6) UNSIGNED ZEROFILL NOT NULL,
  `account_id` int(6) UNSIGNED ZEROFILL NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_order`
--

CREATE TABLE `user_order` (
  `order_id` int(6) UNSIGNED ZEROFILL NOT NULL,
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
-- Indexes for table `order_line`
--
ALTER TABLE `order_line`
  ADD KEY `order_id` (`order_id`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `variant_id` (`variant_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `user_order`
--
ALTER TABLE `user_order`
  ADD PRIMARY KEY (`order_id`);

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
  MODIFY `item_id` int(6) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `user_order`
--
ALTER TABLE `user_order`
  MODIFY `order_id` int(6) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT;

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
-- Constraints for table `order_line`
--
ALTER TABLE `order_line`
  ADD CONSTRAINT `account_id` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`),
  ADD CONSTRAINT `item_id` FOREIGN KEY (`item_id`) REFERENCES `item_variant` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `user_order` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `variant_id` FOREIGN KEY (`variant_id`) REFERENCES `item_variant` (`variant_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
