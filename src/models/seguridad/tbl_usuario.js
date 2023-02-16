const {DataTypes} = require('sequelize');

const { db } = require('../../database/conexion');


const Usuarios = db.define('TBL_MS_USUARIO', {
    Id_Usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Id_Rol: {
        type: DataTypes.INTEGER
    },
    Codigo_Usuario: {
        type: DataTypes.INTEGER
    },
    Usuario: {
        type: DataTypes.STRING
    },
    Nombre_Usuario: {
        type: DataTypes.STRING
    },
    Contrasenia: {
        type: DataTypes.STRING
    },
    Fecha_Ultima_Conexion: {
        type: DataTypes.DATE
    },
    Preguntas_Contestadas: {
        type: DataTypes.INTEGER
    },
    Primer_Ingreso: {
        type: DataTypes.INTEGER
    },
    Fecha_Vencimiento: {
        type: DataTypes.DATE
    },
    Correo_Electronico: {
        type: DataTypes.STRING
    },
    Creado_Por: {
        type: DataTypes.STRING
    },
    Fecha_Creacion: {
        type: DataTypes.DATE
    },
    Modificado_Por: {
        type: DataTypes.STRING
    },
    Fecha_Modificacion: {
        type: DataTypes.DATE
    }
    
}, {
    tableName: 'TBL_MS_USUARIO',
    timestamps: true,
    createdAt: 'Fecha_Creacion',
    updatedAt: 'Fecha_Modificacion'
});

Usuarios.removeAttribute('id');

module.exports = Usuarios;