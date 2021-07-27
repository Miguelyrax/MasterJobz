const bcryptjs  = require('bcryptjs');
const { response } = require("express");
const { findOne } = require("../models/usuario");
const Usuario = require("../models/usuario");
const {generarJWT} = require("../helpers/jwt");


const login= async(req, res = response)=>{
    try {
        const {email, password} = req.body;
      
        const usuario = await Usuario.findOne({email});
        
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'El usuario no existe',
                body:req.body
            });
        }
        if(!usuario.status){
            return res.status(400).json({
                ok:false,
                msg:'Usuario inactivo'
            });
        }

        
        

        const validarPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validarPassword){
            
                return res.status(400).json({
                    ok:false,
                    msg:'El password no es valido'
                });
            
        }
        const {_id} = usuario;
        const token = await generarJWT(_id,email);
        
         res.status(200).json({
            ok:true,
            msg:'Usuario ingresado',
            usuario,
            token
        });
        
        

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok:false,
            msg:'Error al loguear'
        });
    }
}

const register =async(req, res= response)=>{
    try {
         
        const {nombre, email, password, role} = req.body;
       
        const usuario = new Usuario({nombre, email, password, role});

        const salt = bcryptjs.genSaltSync(1);
        usuario.password = bcryptjs.hashSync(password, salt);

        await usuario.save();
        res.status(201).json({
            ok:true,
            usuario
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'Error al crear usuario',
            error
        });
    }
}



const renewJWT = async(req, res=response)=>{
    const usuario = req.usuario;
    const {_id, email} = req.usuario;

    const token  = await generarJWT(_id, email);

    res.status(200).json({
        ok:true,
        usuario,
        token
    })
    

}

module.exports={
    login,
    renewJWT,
    register
}