CREATE DATABASE eltoro;
USE eltoro;

CREATE TABLE producto (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(15),
  precio_compra DECIMAL(8,2),
  precio_venta DECIMAL(8,2),
  descripcion VARCHAR(30),
  cantidad INT,
  imagen LONGTEXT,
  Categoria VARCHAR(40)
);

CREATE TABLE consumibles (
  id_Consumible INT AUTO_INCREMENT PRIMARY KEY,
  id_producto INT UNIQUE,
  fecha_vencimiento DATETIME,
  CONSTRAINT FK_CONSU_PRODUCTO FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

CREATE TABLE Videojuegos (
  id_videojuegos INT AUTO_INCREMENT PRIMARY KEY,
  id_producto INT UNIQUE,
  plataforma VARCHAR(10),
  CONSTRAINT FK_VIDEO_PRODUCTO2 FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

CREATE TABLE Electronicos (
  id_electronicos INT AUTO_INCREMENT PRIMARY KEY,
  id_producto INT UNIQUE,
  marca VARCHAR(15),
  CONSTRAINT FK_ELECTRO_PRODUCTO FOREIGN KEY (id_producto) REFERENCES producto(id_producto)
);

CREATE TABLE CLIENTE(
id_Cliente INT AUTO_INCREMENT PRIMARY KEY,
nombres VARCHAR(50),
apellidos varchar(50),
direccion varchar(100),
cedula varchar(16),
telefono integer,
correo varchar(40)
);

CREATE TABLE MODO_PAGO(
num_pago INT AUTO_INCREMENT PRIMARY KEY, 
 id_detalleventa INT,
 tipo_pago boolean
);

CREATE TABLE Venta (
  id_venta INT AUTO_INCREMENT PRIMARY KEY,
  fecha INT
);


CREATE TABLE Detalle_Venta (
  id_detalleventa INT AUTO_INCREMENT PRIMARY KEY,
  num_pago INT, 
  Cantidad INT,
  id_Consumible INT,
  id_videojuegos INT,
  id_electronicos INT,
  id_venta INT,
  CONSTRAINT FK_Produco1_Consu FOREIGN KEY (id_Consumible) REFERENCES consumibles(id_Consumible),
  CONSTRAINT FK_Produco2_ViJu FOREIGN KEY (id_videojuegos) REFERENCES Videojuegos(id_videojuegos),
  CONSTRAINT FK_Produco3_Consu1 FOREIGN KEY (id_electronicos) REFERENCES Electronicos(id_electronicos),
  CONSTRAINT FK_venta_venta2 FOREIGN KEY (id_venta) REFERENCES Venta(id_venta),
  foreign key (num_pago) References MODO_PAGO(num_pago)
);