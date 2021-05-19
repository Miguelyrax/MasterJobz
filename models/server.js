const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const dbConection = require('../db/config');
class Server {

    constructor(){
        this.app = express();
        this.port=process.env.PORT;
        this.server=http.createServer(this.app);
        this.usuarios = '/api/usuarios';
        this.auth = '/api/auth';

        dbConection();
    }

    middlewares() {
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(this.usuarios,require('../routes/usuarios'));
        this.app.use(this.auth,require('../routes/auth'));
        
    }

    listen(){
        this.middlewares();
        this.server.listen(this.port, ()=>{
            console.log(`Server corriendo en el puerto : ${this.port}`)
        })
    }

}

module.exports = Server;