const {DataTypes} = require('sequelize');

const { db } = require('../../database/conexion');


const Preguntas = db.define('TBL_MS_PREGUNTAS', {
    Id_Pregunta: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Pregunta: {
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
    tableName: 'TBL_MS_PREGUNTAS',
    timestamps: true,
    createdAt: 'Fecha_Creacion',
    updatedAt: 'Fecha_Modificacion'
});

Preguntas.removeAttribute('id');

module.exports = Preguntas;