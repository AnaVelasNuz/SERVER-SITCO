const { request, response } = require('express');
const { Op } = require('sequelize');

const Preguntas = require('../../models/seguridad/tbl_preguntas');

const cargarPreguntas = async (req = request, res = response) => {

    let { limite = 10, idUsuario, desde = 0, buscar = "" } = req.query;

    try {

        // Cargar la tabla
        const preguntas = await Preguntas.findAll({
            limit: parseInt(limite, 10),
            offset: parseInt(desde, 10),
            where: {
                [Op.or]: [{
                    Pregunta: { [Op.like]: `%${buscar.toUpperCase() }%`}
                }]
            }
        });

        // Cantidad de registros
        const countPreguntas = preguntas.length;
        
        res.json( { 
            ok: true,
            preguntas, 
            countPreguntas
        } )

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error.message
        })
    }
}

const cargarPregunta = async (req = request, res = response) => {

    let { idPregunta } = req.params;

    try {

        // Cargar la tabla
        const pregunta = await Preguntas.findByPk( idPregunta );
        
        res.json( pregunta )

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error.message
        })
    }
}

const crearPregunta = async (req = request, res = response) => {

    const { pregunta, creadoPor } = req.body;
    
    try {

        // crear
        const preguntaNueva = Preguntas.build({
            Pregunta: pregunta,
            Creado_Por: creadoPor,
            Modificado_Por: creadoPor
        }); 

        await preguntaNueva.save();

        res.json({
            ok: true,
            msg: 'Nueva pregunta creada'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error.message
        })
    }
}

const editarPregunta = async (req = request, res = response) => {

    const { idPregunta } = req.params
    const { idUsuario = "", pregunta, modificadoPor } = req.body;

    try {

        console.log(modificadoPor)
        const preguntaVieja = await Preguntas.findByPk(idPregunta)

        // Actualizar tabla Pregunta
        await Preguntas.update({
            
            Pregunta: pregunta,
            Modificado_Por: modificadoPor

        }, {
            where: {
                Id_Pregunta: idPregunta
            }
        })

        res.json({ 
            ok: true, 
            msg: 'Actualización éxitosa'});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: error.message
        })
    }
    
}

const eliminarPregunta = async (req = request, res = response) => {
    const { idPregunta } = req.params
    const { quienElimina } = req.query;

    try {

        // Para bitácora
        const preguntaVieja = await Preguntas.findByPk(idPregunta);

        await Preguntas.destroy({where: {
            Id_Pregunta: idPregunta
        }});

        res.json({
            ok: true, 
            msg: `Eliminación éxitosa`
        });

    } catch (error) {
        
        if (error instanceof ForeignKeyConstraintError) {
            res.status(403).json({
              ok: false,
              msg: `Pregunta en uso`,
            });
          } else {
            console.log(error);
            res.status(500).json({
              msg: error.message,
            });
          }
    }  
}

module.exports = {
    cargarPreguntas,
    cargarPregunta,
    crearPregunta,
    editarPregunta,
    eliminarPregunta
}