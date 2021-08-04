CREATE DATABASE cricama;

CREATE TABLE users (
	id PRIMARY KEY AUTO_INCREMENT,
  	created_at TIMESTAMP,
  	updated_at TIMESTAMP,
  	first_name VARCHAR,
  	last_name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    image VARCHAR,
    user_type_id FOREIGN KEY INTEGER
)

CREATE TABLE products (
	id PRIMARY KEY AUTO_INCREMENT,
  	created_at TIMESTAMP,
  	updated_at TIMESTAMP,
    name VARCHAR,
    description TEXT,
    image VARCHAR,
  	price INTEGER,
    category_id FOREIGN KEY INTEGER
)

CREATE TABLE users_products (
	id PRIMARY KEY AUTO_INCREMENT,
  	created_at TIMESTAMP,
  	updated_at TIMESTAMP,
    user_id FOREIGN KEY INTEGER,
    product_id FOREIGN KEY INTEGER,
  	quantity INTEGER,
  	price INTEGER
)

CREATE TABLE users_types (
	id PRIMARY KEY AUTO_INCREMENT,
  	created_at TIMESTAMP,
  	updated_at TIMESTAMP,
  	type VARCHAR
)

CREATE TABLE categories (
	id PRIMARY KEY AUTO_INCREMENT,
  	created_at TIMESTAMP,
  	updated_at TIMESTAMP,
  	category VARCHAR
)
