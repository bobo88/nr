# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.16)
# Database: nanrong
# Generation Time: 2018-06-10 04:30:19 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table ims_footer
# ------------------------------------------------------------
# 


DROP TABLE IF EXISTS `ims_footer`;
CREATE TABLE `ims_footer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT '名称',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '跳转链接',
  `createtime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# Dump of table ims_img_info
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ims_img_info`;
CREATE TABLE `ims_img_info` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
  `logo` varchar(200) NOT NULL COMMENT 'logo图片路径',
  `title` varchar(500) DEFAULT '' COMMENT '图片名称',
  `type` tinyint(2) NOT NULL COMMENT '类型，1是logo，2是轮播图，3是热销产品，4是合作伙伴',
  `url` varchar(255) DEFAULT '' COMMENT '跳转链接',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='logo';

:
* 各类图片管理
*包含所有图片展示，添加，修改，删除
*type参数 1是logo，2是轮播图，3是热销产品，4是合作伙伴 （logo只能上传一张，其他不限制）
*action:del(删除)，add(添加)，update(修改)，find(查询)
*id 新增不需要传此参数，其他条件都需要
saveimg.php





CREATE TABLE `ims_scene` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT '' COMMENT '场景',
  `weight` int(9) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;



























CREATE TABLE `ims_message` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT '' COMMENT '姓名',
  `email` varchar(50) DEFAULT '' COMMENT '邮箱',
  `tel` varchar(15) DEFAULT '' COMMENT '电话',
  `address` varchar(200) DEFAULT '' COMMENT '地址',
  `content` text COMMENT '内容',
  `addtime` varchar(29) DEFAULT '' COMMENT '发起时间',
  `status` tinyint(2) DEFAULT '0' COMMENT '0正常，',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

# Dump of table ims_members
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ims_members`;

CREATE TABLE `ims_members` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `username` varchar(30) NOT NULL COMMENT '用户名',
  `password` varchar(200) NOT NULL COMMENT '用户密码',
  `salt` varchar(10) NOT NULL COMMENT '加密盐',
  `email` varchar(80) NOT NULL COMMENT '用户邮箱',
  `avatar` varchar(200) NOT NULL DEFAULT '' COMMENT '用户头像',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '会员状态，0正常，-1禁用',
  `joindate` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '注册时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `email` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='用户表';



# Dump of table ims_news
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ims_news`;

CREATE TABLE `ims_news` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
  `img` varchar(500) DEFAULT '' COMMENT '图片',
  `title` varchar(100) NOT NULL COMMENT '资讯标题',
  `descinfo` varchar(200) NOT NULL COMMENT '新闻简讯简介',
  `content` text NOT NULL COMMENT '内容详情',
  `url` varchar(200) NOT NULL COMMENT '外部链接地址',
  `newsdata` int(10) NOT NULL COMMENT '资讯时间',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态，0正常，-1禁用',
  `createtime` int(10) NOT NULL DEFAULT '0' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='新闻资讯表';

CREATE TABLE `ims_news` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
  `descinfo` text NOT NULL COMMENT '新闻简讯简介',

  `type` tinyint(2) DEFAULT '1' COMMENT '新闻类别1，新闻资讯，2是企业动态，3是轮播图片，4是好消息列表',
  `source` varchar(200) DEFAULT '' COMMENT '来源',
  `num` int(9) DEFAULT '0' COMMENT '阅读量',
  `weight` int(11) DEFAULT '0' COMMENT '权重值',
  
  `title` varchar(100) NOT NULL COMMENT '资讯标题',
  `content` text NOT NULL COMMENT '内容详情',
  `img` varchar(500) DEFAULT '' COMMENT '图片',
  `url` varchar(200) NOT NULL COMMENT '外部链接地址',
  `newsdata` int(10) NOT NULL COMMENT '资讯时间',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态，0正常，-1禁用',
  `create_time` varchar(20) DEFAULT '' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='新闻资讯表';



# Dump of table ims_product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ims_product`;

CREATE TABLE `ims_product` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tid` int(9) NOT NULL COMMENT '所属产品类型id',
  `type` tinyint(2) DEFAULT '2' COMMENT '营销类型，1是热销，2 新品,',
  `name` varchar(200) DEFAULT '' COMMENT '产品名称',
  `url` varchar(200) DEFAULT '' COMMENT '购买链接',
  `img` text COMMENT '产品图片（多张合并上传）',
  `imgsmall` text COMMENT '所有缩略图',
  `money` float(9,2) DEFAULT '0.00' COMMENT '价格',
  `seoname` varchar(500) DEFAULT '' COMMENT 'seo',
  `desc` text COMMENT '产品描述',
  `keyword` varchar(200) DEFAULT '' COMMENT '关键词',
  `detail` text COMMENT '产品详情',
  `technical` text COMMENT '技术参数',
  `sale` text COMMENT '售后',
  `status` tinyint(2) DEFAULT '0' COMMENT '产品状态0：正常，-1下架',
  `hotsale` tinyint(2) DEFAULT '0' COMMENT '是否推荐首页热销，1是，0否',
  `weight` tinyint(9) DEFAULT NULL COMMENT '产品权重。排序用',
  `update_time` varchar(10) DEFAULT '' COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table ims_product_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ims_product_type`;

CREATE TABLE `ims_product_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` varchar(30) NOT NULL COMMENT '产品名字',
  `weight` int(9) NOT NULL DEFAULT '0' COMMENT '权重值，默认为0，越高优先级越高',
  `scene` int(9) DEFAULT '0' COMMENT '默认适合所有场景，根据页面字段设置1：公园，2旅游景点，3小区，4购物商场，5游乐场所，6室外观光',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='产品类别';

LOCK TABLES `ims_product_type` WRITE;
/*!40000 ALTER TABLE `ims_product_type` DISABLE KEYS */;

INSERT INTO `ims_product_type` (`id`, `name`, `weight`, `scene`)
VALUES
	(1,'观光车',1,1);

/*!40000 ALTER TABLE `ims_product_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table ims_sale
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ims_sale`;

CREATE TABLE `ims_sale` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tid` int(9) NOT NULL COMMENT '销售案列类型id',
  `type` tinyint(2) DEFAULT '2' COMMENT '类型，1是最新，2 热销,',
  `name` varchar(200) DEFAULT '' COMMENT '案列名称',
  `img` varchar(200) DEFAULT NULL COMMENT '案列图片',
  `total` int(9) DEFAULT '0' COMMENT '浏览量',
  `detail` text COMMENT '案例详情',
  `source` varchar(200) DEFAULT NULL COMMENT '来源',
  `status` tinyint(2) DEFAULT '0' COMMENT '案例状态0：正常，-1下架',
  `weight` tinyint(9) DEFAULT NULL COMMENT '案例权重。排序用',
  `createtime` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table ims_sale_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ims_sale_type`;

CREATE TABLE `ims_sale_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` varchar(30) NOT NULL COMMENT '产品名字',
  `fid` int(9) NOT NULL DEFAULT '0' COMMENT '父级id',
  `weight` int(9) NOT NULL DEFAULT '0' COMMENT '权重值，默认为0，越高优先级越高',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='销售案列类别';




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



* 商品管理类
*包含商品展示，添加，修改，删除
*action:del(删除)，add(添加)，update(修改)，find(查询)，up(下架)


http://luiyi.viphk.ngrok.org/nanrong/admin/server/sale.php 销售案例接口
http://luiyi.viphk.ngrok.org/nanrong/admin/server/saletype.php 销售l案例类型接口
http://luiyi.viphk.ngrok.org/nanrong/admin/server/news.php xinwen 新闻接口
http://luiyi.viphk.ngrok.org/nanrong/admin/server/message.php 留言接口


CREATE TABLE `ims_sale` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tid` int(9) NOT NULL COMMENT '销售案列类型id',
  `type` tinyint(2) DEFAULT '2' COMMENT '类型，1是最新，2 热销,',
  `name` varchar(200) DEFAULT '' COMMENT '案列名称',
  `img` varchar(200) DEFAULT NULL COMMENT '案列图片',
  `descont` text COMMENT '描述',
  `total` int(9) DEFAULT '0' COMMENT '浏览量',
  `detail` text COMMENT '案例详情',
  `source` varchar(200) DEFAULT NULL COMMENT '来源',
  `status` tinyint(2) DEFAULT '0' COMMENT '案例状态0：正常，-1下架',
  `weight` tinyint(9) DEFAULT NULL COMMENT '案例权重。排序用',
  `createtime` varchar(20) DEFAULT '' COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
