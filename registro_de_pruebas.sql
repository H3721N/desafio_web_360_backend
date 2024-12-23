use GDA00411_OT_herlin_gomez;

/* Script para insertar y editar el registro en la tabla estaados*/

INSERT INTO Estados (nombre) VALUES ('Comprador');

UPDATE Estados SET nombre = 'Agotado' WHERE idestados = 1;

/* Script para insertar y editar el registro en la tabla roles*/
INSERT INTO Rol (nombre) VALUES ('Gerente');
UPDATE Rol SET nombre = 'Admin' WHERE idrol = 1;

/* Script para insertar y editar un cliente*/

INSERT INTO Clientes (razon_social, nombre_comercial, direccion_entrega, telefono, email)
VALUES ('Empresa Duolingo S.A.', 'XYZ Ninja Store', 'Calle Garcia 123, Zona 1', '1234567890', 'duolingo@edu.com');

UPDATE Clientes SET
	razon_social = 'Empresa ABC S.A.',
    nombre_comercial = 'ABC Store',
	direccion_entrega = 'Avenida Ficticia 456, Zona 2',
    telefono = '50237326926',
    email = 'duolingo@edu.com'
WHERE idcliente = 1;

/* Script para insertar y editar el registro en la tabla usuarios*/

INSERT INTO Usuarios ( 
	rol_idrol, estados_idestados, correo_electronico, nombre_completo,
    password, telefono, fecha_nacimiento, fecha_creacion, Clientes_idClientes
) 
VALUES (1, 3, 'sgomez@gmail.com', 'Bart Berne Actualizado', 'nueva_contraseña_segura', '9876543210', '1990-05-20', '2024-12-15 12:00:00', 2);

UPDATE Usuarios
SET
    rol_idrol = 1,
    estados_idestados = 1,
    nombre_completo = 'Herlin Fernando',
    password = '123456',
    telefono = '37326926',
    fecha_nacimiento = '1990-05-20',
    fecha_creacion = '1990-06-20',
    Clientes_idClientes = 2
WHERE idusuarios = 1;

/* Script para insertar y editar el registro en la tabla categoria productos*/

INSERT INTO CategoriaProductos (usuarios_idusuarios, nombre, estados_idestados, fecha_creacion) 
VALUES ( 1, 'Electrónica IV', 1, '2024-12-15 18:00:00');

UPDATE CategoriaProductos
SET 
    usuarios_idusuarios = 1,
    nombre = 'Informatica',
    estados_idestados = 2,
    fecha_creacion = '2024-12-17 20:00:00'
WHERE idCategoriaProductos = 1;

/* Script para insertar y editar el registro en la tabla productos*/

INSERT INTO Productos (CategoriasProductos_idCategoriaProductos, usuarios_idusuarios, nombre, marca,
    codigo, stock, estados_idestados, precios, fecha_creacion, foto) 
VALUES ( 1, 1, 'Celular Redmi Note 6', 'Xiaomi', 'D12345', 50.888, 1, 1500.99, '2024-12-16 10:30:00', 'base64_encoded_image_data' );

UPDATE Productos
SET 
    CategoriasProductos_idCategoriaProductos = 1,
    usuarios_idusuarios = 2,
    nombre = 'Laptop Gaming Red Magic',
    marca = 'Dell',
    codigo = 'D12345-G',
    stock = 45.0,
    estados_idestados = 1,
    precios = 1800.99,
    fecha_creacion = '2024-12-16 10:30:00',
    foto = 'base64_encoded_image_data'  
WHERE idProductos = 1;

/* Script para insertar y editar el registro en la tabla orden detalles*/

INSERT INTO OrdenDetalles (Orden_idOrden, Productos_idProductos, cantidad, precio, subtotal) 
VALUES ( 1, 2, 20, 100.50, 502.50);

UPDATE OrdenDetalles
SET 
    Orden_idOrden = 1,
    Productos_idProductos = 3,
    cantidad = 10,
    precio = 95.75,
    subtotal = 957.50
WHERE idOrdenDetalles = 1;






