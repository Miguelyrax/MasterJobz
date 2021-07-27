const Mensaje = require("../models/mensaje");
const Usuario = require("../models/usuario");
const usuarioConectado = async(uid)=>{

    const usuario = await Usuario.findById(uid);
    if(!usuario){
        return false;
    }
    usuario.online = true;
    await usuario.save();

    return true;

}
const usuarioDesconectado = async(uid)=>{

    const usuario = await Usuario.findById(uid);
    if(!usuario){
        return false;
    }
    usuario.online = false;
    await usuario.save();

    return true;

}

const grabarMensaje = async(payload)=>{
    try {
        const mensaje = new Mensaje(payload);
        await mensaje.save();
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}