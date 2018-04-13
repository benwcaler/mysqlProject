DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL, 
price DECIMAL(15,2) NOT NULL,
stock_quantity INT(10) NOT NULL,
PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Butterbeer", "Hogsmeade", 3.50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wand", "Diagon Alley", 25.00, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Owl", "Diagon Alley", 10.00, 47);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cauldron", "Diagon Alley", 7.50, 55);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sorcerer's Stone", "Diagon Alley", 5000000000.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dress Robes", "Hogsmeade", 15.00, 37);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Marauder's Map", "Hogsmeade", 1000.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Gillyweed", "Hogsmeade", 1.00, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nimbus 2000", "Diagon Alley", 100.00, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pensieve", "Hogsmeade", 347, 2);