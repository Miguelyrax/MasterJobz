const { response } = require("express");
const Mensaje = require("../models/mensaje");


const getMensajes = async(req, res = response)=>{
    try {
        const de = req.params.de;
    const {_id:miID} = req.usuario;
    const mensajes = await Mensaje.find({
        $or:[{de : de, para : miID},{de : miID, para : de}]
    }).sort({createdAt:'desc'}).limit(30);

    res.status(201).json({
        mensajes,
    })
    } catch (error) {
        res.status(201).json({
            ok:false,
            error
        })
        console.log(error)
    }
}

module.exports = {
    getMensajes
}