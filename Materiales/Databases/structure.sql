CREATE DATABASE cricama;

CREATE TABLE users (
	id AUTO_INCREMENT,
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
	first_name VARCHAR,
	last_name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    image VARCHAR,
	user_type_id INTEGER,
	PRIMARY KEY (id),
    FOREIGN KEY (user_type_id) REFERENCES user_type (id) 
)

CREATE TABLE products (
	id AUTO_INCREMENT,
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
    name VARCHAR,
    description TEXT,
    image VARCHAR,
	price INTEGER,
	category_id INTEGER,
	PRIMARY KEY (id),
	FOREIGN KEY (category_id) REFERENCES categories (id)
)

CREATE TABLE users_products (
	id AUTO_INCREMENT,
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
    user_id INTEGER,
    product_id INTEGER,
	quantity INTEGER,
	price INTEGER,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users (id),
	FOREIGN KEY (product_id) REFERENCES products (id) 
)

CREATE TABLE users_types (
	id AUTO_INCREMENT,
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
	type VARCHAR,
	PRIMARY KEY (id)
)

CREATE TABLE categories (
	id AUTO_INCREMENT,
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
	category VARCHAR,
	PRIMARY KEY (id)
)
