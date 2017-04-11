/*
Navicat MySQL Data Transfer

Source Server         : bendi
Source Server Version : 50550
Source Host           : localhost:3306
Source Database       : etable

Target Server Type    : MYSQL
Target Server Version : 50550
File Encoding         : 65001

Date: 2017-04-11 10:40:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for et_data
-- ----------------------------
DROP TABLE IF EXISTS `et_data`;
CREATE TABLE `et_data` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `c_a` varchar(30) DEFAULT NULL,
  `c_b` varchar(30) DEFAULT NULL,
  `c_c` varchar(30) DEFAULT NULL,
  `c_d` varchar(30) DEFAULT NULL,
  `c_e` varchar(30) DEFAULT NULL,
  `c_f` varchar(30) DEFAULT NULL,
  `c_g` varchar(30) DEFAULT NULL,
  `c_h` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of et_data
-- ----------------------------
INSERT INTO `et_data` VALUES ('3', '你好', '哦哦', '商城', '哈哈', '呵呵', 'ID', '订单', '简介');
INSERT INTO `et_data` VALUES ('7', '啊', '吧', '池', '的', '额', '发', '个', '好');
INSERT INTO `et_data` VALUES ('8', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h');
INSERT INTO `et_data` VALUES ('9', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight');
