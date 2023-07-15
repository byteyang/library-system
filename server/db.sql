DROP DATABASE IF EXISTS `library_system`;
CREATE DATABASE `library_system` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `library_system`;

DROP TABLE IF EXISTS `ls_user`;
CREATE TABLE `ls_user` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `username` VARCHAR(20) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` VARCHAR(32) NOT NULL DEFAULT '' COMMENT '密码',
  `role` TINYINT NOT NULL DEFAULT 0 COMMENT '角色 1=管理员 | 2=学生',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户';

INSERT INTO `ls_user` (`id`, `username`, `password`, `role`) VALUES (1, 'admin', '21232f297a57a5a743894a0e4a801fc3', 1),(2, 'student', 'cd73502828457d15655bbd7a63fb0bc8', 2);

DROP TABLE IF EXISTS `ls_book`;
CREATE TABLE `ls_book` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` VARCHAR(20) NOT NULL DEFAULT '' COMMENT '图书名',
  `borrower` TINYINT NOT NULL DEFAULT 0 COMMENT '借书人用户ID 0=未借出',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='图书';
