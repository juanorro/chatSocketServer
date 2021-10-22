const { usuarioConectado, usuarioDesconectado } = require("../controllers/socket");
const { comprobarJWT } = require("../helpers/jwt");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async( socket ) => {

            const [ valido, uid ] = comprobarJWT(socket.handshake.query['x-token']);

            if(!valido) {
                console.log('socket no identificado');
                return socket.disconnect();
            }

            const usuario = await usuarioConectado(uid);
            console.log(`se conectó ${usuario.nombre}`)

            //validar JWT: si no existe desconectar

            //saber que usuario está activo por el uid

            //emitir todos los usuarios conectados

            //Socket join, incluir a salas

            //escuchar cuando alguien manda un mensaje
            //mensaje personal

            //desconectado

            socket.on('disconnect', async() => {
                await usuarioDesconectado(uid);
            });
        });
    }


}


module.exports = Sockets;