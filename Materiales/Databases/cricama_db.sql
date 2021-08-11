DROP DATABASE IF EXISTS cricama_db;
CREATE DATABASE IF NOT EXISTS cricama_db;
USE cricama_db;

DROP TABLE IF EXISTS userTypes;
CREATE TABLE userTypes (
	id_user_type	SMALLINT(4) UNSIGNED NOT NULL,
	created_at 		TIMESTAMP NULL DEFAULT NULL,
	updated_at		TIMESTAMP NULL DEFAULT NULL,
	type			VARCHAR(100),
	PRIMARY KEY (id_user_type)
)ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES userTypes WRITE;
INSERT INTO userTypes VALUES 
	(1,NULL,NULL,'admin'),
    (2,NULL,NULL,'normal');
UNLOCK TABLES;



DROP TABLE IF EXISTS users;
CREATE TABLE users (
	id_user			SMALLINT(6) UNSIGNED NOT NULL AUTO_INCREMENT,
	created_at 		TIMESTAMP NULL DEFAULT NULL,
	updated_at 		TIMESTAMP NULL DEFAULT NULL,
	first_name 		VARCHAR(100),
	last_name	 	VARCHAR(100),
    email	 		VARCHAR(100),
    password 		VARCHAR(255),
    image			VARCHAR(255),
	id_user_type 	SMALLINT(4) UNSIGNED NOT NULL,
	PRIMARY KEY (id_user),
	INDEX (id_user_type),
	FOREIGN KEY (id_user_type) REFERENCES userTypes (id_user_type) 
)ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES users WRITE;
INSERT INTO users VALUES 
	(1,NULL,NULL,'Carlos','Rossi','carlos91rossi@gmail.com','$2a$10$QsXH/ynuFyL7e5PgYJ4hUu94wZDEZRNUbSNIDg.q8KlSMV5U/JxmW','uploads/users/image-1627681292318.jpg',1),
    (2,NULL,NULL,'Cristian','Leiva','cristian.leivalot@gmail.com','$2a$10$QsXH/ynuFyL7e5PgYJ4hUu94wZDEZRNUbSNIDg.q8KlSMV5U/JxmW','uploads/users/image-1626904089092.jpg',1),
    (3,NULL,NULL,'Manuel','Nacht','mlqlknf@hipis.com','$2a$10$9uGvMGRQNuxsYo8OSjs/.OUTeqYJXDDPfzUxHuA7mvGVGeKf30bru','uploads/users/image-1627335156763.png',2);
UNLOCK TABLES;



DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
	id_category		SMALLINT(6) UNSIGNED NOT NULL AUTO_INCREMENT,
	created_at 		TIMESTAMP NULL DEFAULT NULL,
	updated_at 		TIMESTAMP NULL DEFAULT NULL,
	category 		VARCHAR(100),
	PRIMARY KEY (id_category)
)ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES categories WRITE;
INSERT INTO categories VALUES 
	(1,NULL,NULL,'insumos'),
    (2,NULL,NULL,'macetas'),
    (3,NULL,NULL,'plantas');
UNLOCK TABLES;



DROP TABLE IF EXISTS products;
CREATE TABLE products (
	id_product 		SMALLINT(6) UNSIGNED NOT NULL AUTO_INCREMENT,
	created_at 		TIMESTAMP NULL DEFAULT NULL,
	updated_at 		TIMESTAMP NULL DEFAULT NULL,
    name 			VARCHAR(100),
    description 	TEXT,
    image 			VARCHAR(255),
	price 			DECIMAL(10,2),
	id_category 	SMALLINT(6) UNSIGNED NOT NULL,
	PRIMARY KEY (id_product),
	INDEX (id_category),
	FOREIGN KEY (id_category) REFERENCES categories (id_category)
)ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES products WRITE;
INSERT INTO products VALUES 
	(1,NULL,NULL,'ANTHURIUM X MACROLOBIUM','Lorem ipsum dolor sit amet consectetur adipiscing elit placerat',NULL,2000,3),
    (2,NULL,NULL,'MACETA CILINDRO CEMENTO','Lorem ipsum dolor sit amet consectetur adipiscing elit placerat',NULL,500,2),
    (3,NULL,NULL,'FERTILIZANTE GENERAL','Lorem ipsum dolor sit amet consectetur adipiscing elit placerat',NULL,99.99,1);
UNLOCK TABLES;



DROP TABLE IF EXISTS userProducts;
CREATE TABLE userProducts (
	id_user_products 	SMALLINT(6) UNSIGNED NOT NULL AUTO_INCREMENT,
	created_at 			TIMESTAMP NULL DEFAULT NULL,
	updated_at 			TIMESTAMP NULL DEFAULT NULL,
    id_user 			SMALLINT(6) UNSIGNED NOT NULL,
    id_product 			SMALLINT(6) UNSIGNED NOT NULL,
	quantity 			INTEGER,
	price 				DECIMAL(10,2),
	PRIMARY KEY (id_user_products),
	INDEX (id_user),
	FOREIGN KEY (id_user) REFERENCES users (id_user),
	INDEX (id_product),
	FOREIGN KEY (id_product) REFERENCES products (id_product) 
);