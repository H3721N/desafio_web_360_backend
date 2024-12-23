drop database if exists GDA00411_OT_herlin_gomez;

create database GDA00411_OT_herlin_gomez;

use GDA00411_OT_herlin_gomez;

create table Estados (
    idestados int auto_increment primary key,
    nombre varchar(45)
);

create table Rol (
    idrol int auto_increment primary key,
    nombre varchar(45)
);

create table Clientes ( 
    idcliente int auto_increment primary key,
    razon_social varchar(245),
    nombre_comercial varchar(345),
    direccion_entrega varchar(45),
    telefono varchar(45),
    email varchar(45) unique
);

create table Usuarios (
    idusuarios int auto_increment primary key,
    rol_idrol int,
    estados_idestados int,
    correo_electronico varchar(50) unique,
    nombre_completo varchar(75),
    password varchar(100),
    telefono varchar(45),
    fecha_nacimiento date,
    fecha_creacion datetime,
    Clientes_idClientes int,
    constraint fk_rol foreign key (rol_idrol) references Rol(idrol),
    constraint fk_estado foreign key (estados_idestados) references Estados(idestados),
    constraint fk_cliente foreign key (Clientes_idClientes) references Clientes(idcliente)
);

create table CategoriaProductos (
    idCategoriaProductos int auto_increment primary key,
    usuarios_idusuarios int,
    nombre varchar(45),
    estados_idestados int,
    fecha_creacion datetime,
    constraint fk_usuarios foreign key (usuarios_idusuarios) references Usuarios(idusuarios),
    constraint fk_estados foreign key (estados_idestados) references Estados(idestados)
);

create table Orden (
    idOrden int auto_increment primary key,
    usuarios_idusuarios int,
    estados_idestados int,
    fecha_creacion datetime,
    nombre_completo varchar(75),
    direccion varchar(545),
    telefono varchar(45),
    correo_electronico varchar(75) unique,
    fecha_entrega date,
    total_orden float,
    constraint fk_usuario_orden foreign key (usuarios_idusuarios) references Usuarios(idusuarios),
    constraint fk_estados_orden foreign key (estados_idestados) references Estados(idestados)
);

create table Productos (
    idProductos int auto_increment primary key,
    CategoriasProductos_idCategoriaProductos int,
    usuarios_idusuarios int,
    nombre varchar(45),
    marca varchar(45),
    codigo varchar(45),
    stock float,
    estados_idestados int,
    precios float,
    fecha_creacion datetime,
    foto binary(255),
    constraint fk_Categoria foreign key (CategoriasProductos_idCategoriaProductos) references CategoriaProductos(idCategoriaProductos),
    constraint fk_usuarios_idusuarios foreign key (usuarios_idusuarios) references Usuarios(idusuarios),
    constraint fk_Estados_idestados foreign key (estados_idestados) references Estados (idestados)
);

create table OrdenDetalles (
    idOrdenDetalles int auto_increment primary key,
    Orden_idOrden int,
    Productos_idProductos int,
    cantidad int,
    precio float,
    subtotal float,
    constraint fk_Orden foreign key (Orden_idOrden) references Orden(idOrden),
    constraint fk_Productos foreign key (Productos_idProductos) references Productos(idProductos)
);

-- /******************CREATE */////////////////

DELIMITER $$
create procedure addEstado (in estado_nombre varchar(45))
begin
	insert into Estados (nombre) values (estado_nombre);
end $$
DELIMITER;

DELIMITER $$
create procedure addRol (in rol_nombre varchar (45))
begin
	insert into Rol (nombre) values (rol_nombre);
end $$
DELIMITER ;

DELIMITER $$
create procedure addCliente(
    in cliente_razon_social varchar(245),
    in cliente_nombre_comercial varchar(345),
    in cliente_direccion_entrega varchar(245),
    in cliente_telefono varchar(45),
    in cliente_email varchar(45)
)
begin
    insert into Clientes (
        razon_social, nombre_comercial, direccion_entrega, telefono, email
    ) values (
        cliente_razon_social, cliente_nombre_comercial, cliente_direccion_entrega, cliente_telefono, cliente_email
    );
end $$
DELIMITER;

DELIMITER $$
create procedure addUsuario(
	in usuario_rol_idrol int,
    in usuario_estados_idestados int,
    in usuario_correo_electronico varchar(50),
    in usuario_nombre_completo varchar(75),
    in usuario_password varchar(45),
    in usuario_telefono varchar(45),
    in usuario_fecha_nacimiento date,
    in usuario_clientes_idclientes int
    )
begin
	insert into Usuarios (
		rol_idrol, estados_idestados, correo_electronico, nombre_completo, password, telefono, fecha_nacimiento, Clientes_idClientes
    ) values (
		usuario_rol_idrol, usuario_estados_idestados, usuario_correo_electronico, usuario_nombre_completo, usuario_password,
        usuario_telefono, usuario_fecha_nacimiento, usuario_clientes_idclientes
    );
end $$
DELIMITER ;

DELIMITER $$
create procedure addCategoriaProducto(
    in cp_usuarios_idusuarios int,
    in cp_nombre varchar(45),
    in cp_estados_idestados int,
    in cp_fecha_creacion dateTime
)
begin
    insert into CategoriaProductos (
        usuarios_idusuarios, nombre, estados_idestados, fecha_creacion
    ) values (
        cp_usuarios_idusuarios, cp_nombre, cp_estados_idestados, cp_fecha_creacion
    );
end $$
DELIMITER;

DELIMITER $$
create procedure addOrden(
    in o_usuarios_idusuarios int,
    in o_estados_idestados int,
    in o_fecha_creacion date,
    in o_nombre_completo varchar(75),
    in o_direccion varchar(545),
    in o_telefono varchar(45),
    in o_correo_electronico varchar(75),
    in o_fecha_entrega date,
    in o_total_orden float
)
begin
    insert into Orden (
        usuarios_idusuarios, estados_idestados, fecha_creacion, nombre_completo, direccion, telefono, correo_electronico, fecha_entrega, total_orden
    ) values (
        o_usuarios_idusuarios, o_estados_idestados, o_fecha_creacion, o_nombre_completo, o_direccion, o_telefono, o_correo_electronico, o_fecha_entrega, o_total_orden
    );
end $$
DELIMITER;

DELIMITER $$
create procedure addProducto(
		in p_CategoriasProductos_idCategoriaProductos int,
		in p_usuarios_idusuarios int,
		in p_nombre varchar(45),
		in p_marca varchar(45),
		in p_codigo varchar(45),
		in p_stock float,
		in p_estados_idestados int,
		in p_precios float,
        in p_foto binary(255)
	)
	begin
		insert into Productos (
			CategoriasProductos_idCategoriaProductos, usuarios_idusuarios, nombre, marca, codigo, stock, estados_idestados, precios, fecha_creacion, foto
		) values (
			p_CategoriasProductos_idCategoriaProductos, p_usuarios_idusuarios, p_nombre, p_marca, p_codigo, p_stock, p_estados_idestados, p_precios, NOW(), p_foto
		);
	end $$
DELIMITER;

DELIMITER $$
create procedure addOrdenDetalle(
    in od_Orden_idOrden int,
    in od_Productos_idProductos int,
    in od_cantidad int,
    in od_precio float,
    in od_subtotal float
)
begin
    insert into OrdenDetalles (
        Orden_idOrden, Productos_idProductos, cantidad, precio, subtotal
    ) values (
        od_Orden_idOrden, od_Productos_idProductos, od_cantidad, od_precio, od_subtotal
    );
end $$
DELIMITER;

call addestado('existente');
call addRol('Admin');
call addCliente('Empresa X', 'Comercial X', 'Dirección X', '555-5678', 'email@dominio.com');

call addUsuario(1, 1, 'usuario@dominio.com', 'Juan Pérez', 'password123', '555-1234', '1990-01-01', 1);
call addUsuario(1, 1, 'usuario@dominio.com', 'Herlin Gomez', 'password123', '555-1234', '1990-01-01', 1);
call addUsuario(1, 1, 'usuario@dominio.com', 'Pedro Ramirez', 'password123', '555-1234', '1990-01-01', 1);

call addCategoriaProducto(1, 'Categoría A', 1, NOW());

call addOrden(1, 1, '2024-08-30', 'Juan Pérez', 'Calle Ficticia 123', '555-4321', 'juanp@dominio.com', NOW(), 1000.00);
call addOrden(2, 1, '2024-08-30', 'Fernando Gomez', 'Calle Ficticia 123', '555-4321', 'hgomez@dominio.com', NOW(), 4000.00);
call addOrden(3, 1, '2024-08-30', 'Pedro Ramirez', 'Calle Ficticia 123', '555-4321', 'pedror@dominio.com', NOW(), 3000.00);

select * from orden;

call addProducto(1, 1, 'Producto A', 'Marca A', 'A1234', 100, 1, 50.00, 0x1234567890ABCDEF);
call addProducto(1, 1, 'Producto B', 'Marca A', 'A1234', 100, 1, 50.00, 0x1234567890ABCDEF);
call addProducto(1, 1, 'Producto C', 'Marca B', 'A1234', 100, 1, 50.00, 0x1234567890ABCDEF);

call addOrdenDetalle(1, 2, 1, 50.00, 100.00);
call addOrdenDetalle(1, 2, 1, 50.00, 100.00);

select * from Productos;

select * from OrdenDetalles;



-- /***************** READ *****************/


DELIMITER $$
create procedure readUsuario(
    in usuario_id int
)
begin
    select * from usuarios where idusuarios = usuario_id;
end $$
DELIMITER;

DELIMITER $$
create procedure readProducto(
    in producto_id int
)
begin
    select * from productos where idProductos = producto_id;
end $$
DELIMITER;

DELIMITER $$
create procedure readCategoriaProducto(
    in categoria_id int
)
begin
    select * from categoriaProductos where idCategoriaProductos = categoria_id;
end $$
DELIMITER;

DELIMITER $$
create procedure readOrden(
    in orden_id int
)
begin
    select * from orden where idOrden = orden_id;
end $$
DELIMITER;

DELIMITER $$
create procedure readOrdenDetalle(
    in orden_detalle_id int
)
begin
    select * from ordenDetalles where idOrdenDetalles = orden_detalle_id;
end $$
DELIMITER;

DELIMITER $$
create procedure readEstado(
    in estado_id int
)
begin
    select * from estados where idestados = estado_id;
end $$
DELIMITER;

DELIMITER $$
create procedure readRol(
    in rol_id int
)
begin
    select * from rol where idrol = rol_id;
end $$
DELIMITER;

DELIMITER $$
create procedure readCliente(
    in cliente_id int
)
begin
    select * from clientes where idcliente = cliente_id;
end $$
DELIMITER;


call readUsuario(1);

call readProducto(1);

call readCategoriaProducto(1);

call readOrden(1);

call readOrdenDetalle(1);

call readEstado(1);

call readRol(1);

CALL readCliente(1);

-- /**************Update****************/

DELIMITER $$
create procedure updateEstado(
    in estado_id int,
    in estado_nombre varchar(45)
)
begin
    update Estados
    set nombre = estado_nombre
    where idestados = estado_id;
end $$
DELIMITER;

DELIMITER $$
create procedure updateRol(
    in rol_id int,
    in rol_nombre varchar(45)
)
begin
    update Rol
    set nombre = rol_nombre
    where idrol = rol_id;
end $$
DELIMITER;

DELIMITER $$
create procedure updateCliente(
    in cliente_id int,
    in cliente_razon_social varchar(245),
    in cliente_nombre_comercial varchar(345),
    in cliente_direccion_entrega varchar(45),
    in cliente_telefono varchar(45),
    in cliente_email varchar(45)
)
begin
    update Clientes
    set razon_social = cliente_razon_social,
        nombre_comercial = cliente_nombre_comercial,
        direccion_entrega = cliente_direccion_entrega,
        telefono = cliente_telefono,
        email = cliente_email
    where idcliente = cliente_id;
end $$
DELIMITER ;

DELIMITER $$
create procedure updateUsuario(
    in usuario_id int,
    in us_rol_idrol int,
    in us_estados_idestados int,
    in us_correo_electronico varchar(50),
    in us_nombre_completo varchar(75),
    in us_password varchar(45),
    in us_telefono varchar(45),
    in us_fecha_nacimiento date,
    in us_clientes_idclientes int
)
begin
    update usuarios
    set
        rol_idrol = us_rol_idrol,
        estados_idestados = us_estados_idestados,
        correo_electronico = us_correo_electronico,
        nombre_completo = us_nombre_completo,
        password = us_password,
        telefono = us_telefono,
        fecha_nacimiento = us_fecha_nacimiento,
        Clientes_idClientes = us_clientes_idclientes
    where idusuarios = usuario_id;
end $$
DELIMITER;

DELIMITER $$
create procedure updateCategoriaProducto(
    in categoria_id int,
    in categoria_nombre varchar(45),
    in categoria_estado_id int
)
begin
    update CategoriaProductos
    set nombre = categoria_nombre, estados_idestados = categoria_estado_id
    where idCategoriaProductos = categoria_id;
end $$
DELIMITER ;

DELIMITER $$
create procedure updateProducto(
    in producto_id int,
    in producto_categoria_id int,
    in producto_estado_id int,
    in producto_nombre varchar(100),
    in producto_marca varchar(45),
    in producto_codigo varchar(45),
    in producto_stock int,
    in producto_precio float,
    in producto_foto binary(255)
)
begin
    update Productos
    set CategoriasProductos_idCategoriaProductos = producto_categoria_id,
        estados_idestados = producto_estado_id, nombre = producto_nombre,
        marca = producto_marca, codigo = producto_codigo, stock = producto_stock,
        precios = producto_precio, foto = producto_foto
    where idProductos = producto_id;
end $$
DELIMITER ;



DELIMITER $$
create procedure updateOrden(
    in orden_id int,
    in orden_usuario_id int,
    in orden_estado_id int,
    in orden_nombre_completo varchar(75),
    in orden_direccion varchar(545),
    in orden_telefono varchar(45),
    in orden_correo_electronico varchar(75),
    in orden_fecha_entrega date,
    in orden_total float
)
begin
    update Orden
    set usuarios_idusuarios = orden_usuario_id, estados_idestados = orden_estado_id,
        nombre_completo = orden_nombre_completo, direccion = orden_direccion,
        telefono = orden_telefono, correo_electronico = orden_correo_electronico,
        fecha_entrega = orden_fecha_entrega, total_orden = orden_total
    where idOrden = orden_id;
END $$
DELIMITER ;

DELIMITER $$
create procedure updateOrdenDetalle(
    in orden_detalle_id int,
    in orden_id int,
    in producto_id int,
    in cantidad int,
    in precio float,
    in subtotal float
)
begin
    update OrdenDetalles
    set Orden_idOrden = orden_id,
        Productos_idProductos = producto_id,
        cantidad = cantidad,
        precio = precio,
        subtotal = subtotal
    where idOrdenDetalles = orden_detalle_id;
end $$
DELIMITER ;

call updateEstado(1, 'estado actualizado');
call updateRol(1, 'rol actualizado');
call updateCliente(1, 'empresa actualizada', 'comercial actualizado', 'dirección actualizada', '555-6789', 'actualizado@dominio.com');
call updateUsuario(1, 1, 1, 'actualizado@dominio.com', 'juan actualizado', 'nuevaPassword123', '555-5678', '1995-01-01', 1);
call updateCategoriaProducto(1, 'categoría actualizada', 1);
call updateProducto(1, 1, 1, 'Producto actualizado', 'Marca A', 'A1234', 150, 60.00, 0x1234567890ABCDEF);
call updateOrden(1, 1, 1, 'nombre actualizado', 'dirección actualizada', '555-9999', 'correo_actualizado@dominio.com', '2024-10-01', 2000.00);
call updateOrdenDetalle(1, 2, 3, 88, 100.00, 300.00);

select * from  Usuarios;
select * from Estados;

-- /**************Delete****************/

DELIMITER $$
create procedure deleteEstado(
    in estado_id int
)
begin
    delete from Estados
    where idestados = estado_id;
end $$
DELIMITER ;

DELIMITER $$
create procedure deleteRol(
    in rol_id int
)
begin
    delete from Rol
    where idrol = rol_id;
end $$
DELIMITER ;


DELIMITER $$
create procedure deleteCliente(
    in cliente_id int
)
begin
    delete from Clientes
    where idcliente = cliente_id;
end $$
DELIMITER ;

DELIMITER $$
create procedure deleteUsuario(
    in usuario_id int
)
begin
    delete from Usuarios
    where idusuarios = usuario_id;
end $$
DELIMITER ;

DELIMITER $$
create procedure deleteCategoriaProducto(
    in categoria_id int
)
begin
    delete from CategoriaProductos
    where idCategoriaProductos = categoria_id;
end $$
DELIMITER ;

DELIMITER $$
create procedure deleteOrden(
    in orden_id int
)
begin
    delete from Orden
    where idOrden = orden_id;
end $$
DELIMITER ;

DELIMITER $$
create procedure deleteProducto(
    in producto_id int
)
begin
    delete from Productos
    where idProductos = producto_id;
end $$
DELIMITER ;

DELIMITER $$
create procedure deleteOrdenDetalle(
    in orden_detalle_id int
)
begin
    delete from OrdenDetalles
    where idOrdenDetalles = orden_detalle_id;
end $$
DELIMITER ;
/*
CALL deleteCliente(1);
CALL deleteOrden(1);
CALL deleteProducto(1);
CALL deleteCategoriaProducto(1);
CALL deleteOrdenDetalle(1);
CALL deleteEstado(1);
CALL deleteRol(1);

*/
CALL deleteUsuario(12);

-- /*****************  VISTAS ******************\

create view productosDisponibles as 
select idProductos, nombre, stock, precios from Productos 
where estados_idestados = 1 and stock > 0;

create view ventas_agosto_2024 as
select SUM(total_orden) AS total_ventas_agosto_2024 from Orden
where year(fecha_creacion) = 2024 and month(fecha_creacion) = 8;

create view top_10_clientes as
select 
    o.usuarios_idusuarios as cliente_id, 
    u.nombre_completo as cliente_nombre,
    SUM(o.total_orden) as total_consumo
from 
    Orden o join Usuarios u on o.usuarios_idusuarios = u.idusuarios
group by 
    o.usuarios_idusuarios, u.nombre_completo
order by 
    total_consumo desc
limit 10;


create view top_10_productos as
select 
    p.nombre as producto,
    SUM(od.cantidad) as cantidad_vendida
from 
    OrdenDetalles od
join 
    Productos p on od.Productos_idProductos = p.idProductos
group by 
    p.idProductos
order by 
    cantidad_vendida asc
limit 10;

select * from Estados;

SELECT `idestados`, `nombre` FROM `Estados` AS `estado` WHERE `estado`.`idestados` = '3' LIMIT 1;

select * from Rol;
select * from Estados;
select * from Clientes;
select * from Usuarios;
select * from CategoriaProductos;
select * from Productos;
select * from OrdenDetalles;

/*
ALTER TABLE Usuarios MODIFY password VARCHAR(100);
DESCRIBE Usuarios;
*/


-- drop view top_10_productos;

-- select correo_electronico, password from usuarios where correo_electronico = 'qwery2@example.com';
