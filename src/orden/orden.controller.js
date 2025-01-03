const Orden = require ('./orden.model')
const OrdenDetalle = require ('../ordenDetalles/ordenDetalle.model')
const Producto = require ('../producto/producto.model')
const Estado = require ('../estado/estado.model')
const Cliente = require ('../clientes/cliente.model')
const sequelize = require('../db/mysql');

const postOrden = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const dataOrden = req.body;
        console.log('La orden es: ', dataOrden);
        const ordenDetalle = dataOrden.ordenDetalle;
        console.log('ordenDetalle',dataOrden.ordenDetalle);

        for (const detalle of ordenDetalle) {
            const getProducto = await Producto.findOne({
                where: { id: detalle.idProducto },
                transaction
            });

            if(detalle.cantidad > getProducto.stock){
                await transaction.rollback();
                res.status(400).json({
                    message: 'No hay suficiente stock'
                });
            }
        }

        const totalOrden = ordenDetalle.reduce((total, detalle) => {
            const subTotal = detalle.cantidad * detalle.precio;
            return total + subTotal;
        }, 0);

        const cliente = await Cliente.findOne({ where: { email: dataOrden.email } });
        if (!cliente) {
            await transaction.rollback();
            return res.status(400).json({
                message: 'El email no pertenece a ningun cliente registrado'
            });
        }


        const createOrden = await Orden.create({
            id: dataOrden.id,
            idUsuario: dataOrden.idUsuario,
            idEstado: dataOrden.idEstado,
            fecha: dataOrden.fecha,
            nombre: dataOrden.nombre,
            direccion: cliente.direccionEntrega,
            telefono: dataOrden.telefono,
            email: dataOrden.email,
            fechaEntrega: dataOrden.fechaEntrega,
            total: totalOrden,
        }, { transaction });
        if (ordenDetalle.length > 0) {
            for (const detalle of ordenDetalle) {
                const subTotal = detalle.cantidad * detalle.precio;
                await OrdenDetalle.create({
                    idOrden: createOrden.id,
                    idProducto: detalle.idProducto,
                    cantidad: detalle.cantidad,
                    precio: detalle.precio,
                    subtotal: subTotal
                }, { transaction });
                console.log('subTotal', subTotal);

                const getProducto = await Producto.findOne({
                    where: {id: detalle.idProducto},
                    transaction
                });

                const updateProducto = await Producto.update({
                    stock: getProducto.stock - detalle.cantidad,
                }, {
                    where: { id: detalle.idProducto },
                    transaction
                });
            }
        }

        await transaction.commit();

        res.status(200).json({
            message: 'Orden creada con exito',
            data: createOrden, ordenDetalle
        });

    }catch(error){
        console.log('Error', error);
        await transaction.rollback();
        res.status(500).json({
            message: error,
            error: error.message,

        })
    }
}

const updateOrden = async (req, res) => {
    const transaction = await Sequelize.transaction();
    try {
        const dataOrden = req.body;
        const id = req.params.id;
        console.log('La orden es: ', dataOrden);
        const updateOrden = await Orden.update({
            idEstado: dataOrden.idEstado,
        }, {
            where: { id: id },
            transaction
        });

        const getOrden = await Orden.findOne({
            where: { id: id },
            transaction
        });

        const getEstado = await Estado.findOne({
            where: { id: dataOrden.idEstado },
            transaction
        });

        await transaction.commit();

        res.status(200).json({
            message: 'Orden actualizada con exito',
            data: updateOrden, getOrden, getEstado
        });
    }catch(error){
        await transaction.rollback();
        res.status(500).json({
            message: error,
            error: error.message,
        })
    }
}

const getOrden = async (req, res) => {
    try {
        console.log('User:', req.user.rol, ' ID:', req.user.id);
        if (!req.user || !req.user.rol || !req.user.id) {
            return res.status(400).json({
                message: 'User information is missing or incomplete'
            });
        }

        const userRole = req.user.rol;
        const userId = req.user.id;

        console.log('User Role:', userRole);
        console.log('User ID:', userId);

        let ordenes;

        if (userRole === 'Admin' || userRole === 'Administrador') {
            ordenes = await Orden.findAll({
                include: [{
                    model: OrdenDetalle,
                    as: 'ordenDetalles',
                }]
            });
        } else {
            ordenes = await Orden.findAll({
                where: { idUsuario: userId },
                include: [{
                    model: OrdenDetalle,
                    as: 'ordenDetalles',
                }]
            });
        }

        console.log('Ordenes:', ordenes);

        res.status(200).json({
            message: 'Ordenes obtenidas con éxito',
            data: ordenes
        });
    } catch (error) {
        console.error('Error al obtener las ordenes:', error);
        res.status(500).json({
            message: 'Error al obtener las ordenes',
            error: error.message
        });
    }
};

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginRequest } from "../../services/authService.jsx";
import toast from 'react-hot-toast';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const decodeJWT = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };

    const login = async (email, password) => {
        if (!email || !password) {
            toast.error('Email and password are required');
            return;
        }

        setIsLoading(true);

        const response = await loginRequest({
            email,
            password
        });

        console.log('Response:', response);

        setIsLoading(false);

        if (response.error) {
            toast.error('Error al iniciar sesión');
            return;
        }

        const token = response.data.token;

        if (!token) {
            toast.error('Token is undefined');
            return;
        }

        console.log('Token:', token);
        localStorage.setItem('token', token);

        const decodedToken = decodeJWT(token);
        console.log('Decoded Token:', decodedToken);

        const userRole = decodedToken.userRol;
        console.log('User Role:', userRole);

        if (userRole === 'Admin') {
            navigate('/orden', { state: { email, password } });
        } else {
            navigate('/home', { state: { email, password } });
        }
    };

    return { login, isLoading };
};

module.exports = {
    postOrden,
    updateOrden,
    getOrden
}