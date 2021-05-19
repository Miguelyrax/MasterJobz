const bcryptjs  = require('bcryptjs');
const { response } = require("express");
const { findOne } = require("../models/usuario");
const Usuario = require("../models/usuario");
const {generarJWT} = require("../helpers/jwt");


const login= async(req, res = response)=>{
    try {
        const {email, password} = req.body;
      
        const usuario = await Usuario.findOne({email});
        
        if(!usuario.status){
            return res.json({
                ok:false,
                msg:'Usuario inactivo'
            });
        }

        if(!usuario){
            return res.json({
                ok:false,
                msg:'El usuario no existe'
            });
        }
        console.log('aqui')

        const validarPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validarPassword){
            
                return res.json({
                    ok:false,
                    msg:'El password no es valido'
                });
            
        }
        const {_id} = usuario;
        const token = await generarJWT(_id,email);
        
         res.json({
            ok:true,
            msg:'Usuario ingresado',
            token
        });
        
        console.log(validarPassword)

    } catch (error) {
        console.log(error)
        return res.json({
            ok:false,
            msg:'Error al loguear'
        });
    }
}

module.exports={
    login
}