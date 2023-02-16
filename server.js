const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {db} = require('./src/database/conexion')

const routerPreguntas = require('./src/routes/seguridad/pregunas.routes');
const routerUsuarios = require('./src/routes/seguridad/usuarios.routes');

class Server{
    constructor(){
        this.app=express()
        this.rutasAPI={ //Aquí van todos los nombres de las rutas de las apis por módulo
            usuariosAPI:'/usuarios/api',
            preguntasAPI:'/preguntas/api'
        }
        this.enlaceDB()
        this.middlewares()
        this.routes()
        
    }

    middlewares(){
        // Habilitar el servidor como servidor web
        this.app.use( '/', express.static('./src/public/') );

        // Evitar problemas con CORS
        this.app.use(cors());

        // Lectura del body
        this.app.use(express.json());
    }

    routes(){ //Se debe crear otro igual adentro
        this.app.use(this.rutasAPI.preguntasAPI, routerPreguntas);
        this.app.use(this.rutasAPI.usuariosAPI, routerUsuarios)
    }

    async enlaceDB() {
        // Configurar conexión a la base de datos
        try {
            await db.authenticate();
            console.log('BD en linea 😎');
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }

    listen(){    
        this.app.listen(process.env.PUERTO, ()=>{
            console.log(`\nServidor levantado en el puerto: ${process.env.PUERTO}`)
        })
    }
}

module.exports=Server