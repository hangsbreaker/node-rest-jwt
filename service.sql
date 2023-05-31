-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 31 Bulan Mei 2023 pada 07.23
-- Versi server: 10.4.21-MariaDB
-- Versi PHP: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `service`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `username` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  `token` varchar(40) NOT NULL,
  `bearer` text DEFAULT NULL,
  `ip` text DEFAULT NULL,
  `level` varchar(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`username`, `password`, `token`, `bearer`, `ip`, `level`) VALUES
('hello', '$2b$10$fsYMx1z9LqSfESbhuSgTYeToGPwr0VFzBPsZ3ctAJnnuX6uN62IYK', 'e7eb964cca5667adcd4566c785f645615f2006aa', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiaGVsbG8iLCJ0b2tlbiI6ImU3ZWI5NjRjY2E1NjY3YWRjZDQ1NjZjNzg1ZjY0NTYxNWYyMDA2YWEiLCJsZXZlbCI6IjEiLCJpYXQiOjE2ODU1MTA0NjAsImV4cCI6MTY4NTUxNDA2MH0.bRfmNgQJZrx4Cab2OokKCJ7CFqRviuJSO_tR5m9mJeg', '127.0.0.1,192.168.77.8', '1'),
('newuser', '$2b$10$ZJLc8nM4gxoRrpGAu9zna.vuN6yySxrUSHNm7uPUj.M/wDrl5ej72', '89c8e1f87bc8531b349dbdcce841a9b380fbfc3a', NULL, '127.0.0.1', '0'),
('root', '$2b$10$/vXwiyQWMzfM23f5jqj.du9mzfXbPCTKCx8HZPSBPlkcp.YPvkmPG', '6dac9208c33b51cc9538d02490984686200ab0c1', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicm9vdCIsInRva2VuIjoiNmRhYzkyMDhjMzNiNTFjYzk1MzhkMDI0OTA5ODQ2ODYyMDBhYjBjMSIsImxldmVsIjoiMCIsImlhdCI6MTY4NTUwNzU2MiwiZXhwIjoxNjg1NTExMTYyfQ.cLUDxY5Rr9BSVZ6Li5RYJv-N4TTRUWJlfm8ji-yu4uc', '127.0.0.1', '0'),
('test', '$2b$10$EFpD12rrrZv6PYP47MlmJeKc5y3GBqB.riQ3t/xx6yMJ8gOwnLnM2', '041a113489b39d24988399dd318005da6077c207', NULL, NULL, '0'),
('test2', '$2b$10$9ArRP7qqR.budS2cD.qMfOs43RffokR57PUQh8HHfE9ntPi/o6GIW', '041a113489b39d24988399dd318005da6077c207', NULL, NULL, '0');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
