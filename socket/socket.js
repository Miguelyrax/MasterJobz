
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jwt');

class Sockets {
    constructor(io){
        this.io = io;
        this.socketEvents();
    }
    socketEvents() {
        // Mensajes de Sockets
        this.io.on('connection', client => {
            console.log('Cliente conectado');
        
            const token = client.handshake.headers['x-token'];
            const [valido, uid] = comprobarJWT(token);
            //Verificar autenticacion
            if(!valido){return client.disconnect();}
        
            //Cliente autenticado
            usuarioConectado(uid);
        
            //Ingresar al usuario a una sala
            client.join(uid);
            
       
            //Escuchar del cliente el mensaje personal
            client.on('mensaje-personal',async(payload)=>{
                //TODO grabar el mensaje
            
                await grabarMensaje(payload);
                this.io.to(payload.para).emit('mensaje-personal',payload);
            })
        
            client.on('disconnect', () => {
                usuarioDesconectado(uid);
                console.log('Cliente desconectado');
            });
        
        
        
        
        });
        }
}

module.exports = Sockets;

