const { request, response } = require('express');
const { Op } = require('sequelize');
const Usuarios = require('../../models/seguridad/tbl_usuario');


const cargarUsuarios = async (req = request, res = response) => {

    let { limite = 10, idUsuario, desde = 0, buscar = "" } = req.query;

    try {

        const usuario=await Usuarios.findAll()
        
        res.json( { 
            ok: true,
            msg: 'Esto es una prueba xd',usuario
        } )

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error.message
        })
    }
}



module.exports = {
    cargarUsuarios,
}